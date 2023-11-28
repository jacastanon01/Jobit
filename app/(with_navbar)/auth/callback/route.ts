import createSupabaseServerClient, {
  createSupabaseServerServiceClient,
} from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const { searchParams } = requestUrl;
  const code = searchParams.get('code');

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { data: session, error } =
      await supabase.auth.exchangeCodeForSession(code);

    if (!error && session) {
      const { user } = session;
      const userMetadata = user.user_metadata;
      const userId = user.id;

      // Retrieve the existing profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      // Update the profile if it exists
      if (profile) {
        const updates: {
          full_name: string;
          image_url: string;
          email: string;
          username?: string;
        } = {
          full_name: profile.full_name || userMetadata.full_name,
          image_url: profile.image_url || userMetadata.avatar_url,
          email: profile.email || userMetadata.email,
        };

        if (
          profile &&
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
            profile.username,
          )
        ) {
          const newUsername = await generateUniqueUsername(
            userMetadata.full_name,
          );
          await supabase
            .from('profiles')
            .update({ username: newUsername })
            .eq('id', userId);
        }

        await supabase.from('profiles').update(updates).eq('id', userId);
      } else {
        // Create a new profile if it doesn't exist
        await supabase.from('profiles').insert([
          {
            id: userId,
            full_name: userMetadata.full_name,
            image_url: userMetadata.avatar_url,
            email: userMetadata.email,
            username: generateUniqueUsername(userMetadata.full_name),
          },
        ]);
      }

      return NextResponse.redirect(requestUrl.origin + '/profile');
    }
  }

  return NextResponse.redirect('/auth/auth-code-error');
}

async function generateUniqueUsername(fullName: string) {
  const baseUsername = fullName
    .toLowerCase()
    .replace(/[^a-z0-9]/gi, '')
    .substring(0, 100);

  // include the username the user is trying to register
  const potentialUsernames = [baseUsername];

  // add all the other ones
  for (let i = 1; i <= 100; i++) {
    potentialUsernames.push(`${baseUsername}${i}`);
  }

  try {
    const supabase = await createSupabaseServerServiceClient();

    // connect and query once to get the usernames that match our giant list
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .in('username', potentialUsernames);

    if (error) {
      throw error;
    }

    // parse it and return the first username NOT in the list of returned names
    const takenUsernames = new Set(data.map((u) => u.username));
    const availableUsername = potentialUsernames.find(
      (u) => !takenUsernames.has(u),
    );

    if (availableUsername) {
      return availableUsername;
    } else {
      throw new Error('Unable to generate a unique username');
    }
  } catch (err) {
    console.error('Error in generating unique username:', err);
    throw err;
  }
}

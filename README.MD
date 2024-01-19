![Jobit](https://gcdnb.pbrd.co/images/gfihVlbEfT9X.jpg?o=1)

## 📝 Overview

Jobit is a job search application designed for developers. It streamlines the job search process with recommendations, search functionality, and salary estimations based on location. Job listings are sourced from the [jsearch api](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch) and uses the google maps api to present you with the latest jobs in your area.

## 🔗 Links

- 💼 [Demo video](https://www.loom.com/share/429658f8a5f34d12b9f9195e7a365b4f)
- 🌎 [Live site](https://jobit-codemigos.vercel.app/)
- ⭐️ [Github Repo](https://github.com/jacastanon01/Jobit/)

## Features

- Job search recommendations
- Advanced search engine with filter functionality
- Browse all the job listings from your favorite companies
- Salary estimations based on job title, location, etc
- Profile and portfolio creation
- Ability to save job listings

## Technologies Used

- Next.js
- Supabase (Storage, Auth, Database)
- Vitest
- JSearch API
- Tailwind CSS
- Zod
- Eslint & Prettier
- ShadCN

## Installation

```bash
git clone https://github.com/jacastanon01/Jobit
npm install
```

Create a `.env.local` with this structure (you'll need to generate your own API key for it to work):

```bash
XRapidAPIKey=[API KEY]
NEXT_PUBLIC_GoogleMapsAPIKey=[GOOGLE MAPS API KEY]
NEXT_PUBLIC_SUPABASE_URL=[SUPABASE URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[SUPABASE ANON KEY]
NEXT_PUBLIC_SUPABASE_STORAGE_URL=[SUPABASE STORAGE URL]
CompaniesAPIKey=[COMPANIES API KEY]
SUPABASE_SECRET_KEY=[SUPABASE SECRET SERVICE KEY]
```

Launch the project on local host:

```bash
npm run dev
```

## 🤝 Acknowledgements

Thanks to the JSMastery Team - Adrian, Brandon, Christopher, and all the mentors for guiding our team during the project and help us grow as software engineers.

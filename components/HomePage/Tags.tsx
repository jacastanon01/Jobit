import React from 'react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

type TagItem = {
  text?: string | null;
  image: string;
};

type TagProps = {
  tags: TagItem[];
};

const Tags = ({ tags }: TagProps) => {
  return (
    <div className='flex flex-wrap gap-3'>
      {tags.map(
        (tag) =>
          tag?.text && (
            <div
              key={uuidv4()}
              className='flex h-fit w-fit items-center bg-natural-3 px-3 py-1 text-sm text-natural-6 dark:bg-darkbg-3 max-sm:px-1'
            >
              <Image
                src={tag.image}
                alt={tag?.text}
                width={18}
                height={18}
                className='inline-block'
              />
              <span className='ml-1'>{tag.text}</span>
            </div>
          ),
      )}
    </div>
  );
};

export default Tags;

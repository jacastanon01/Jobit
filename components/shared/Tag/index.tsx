const Tag = ({ tag }: { tag: string }) => {
  return (
    <div className='rounded-[5px] bg-natural-4 px-[10px] py-[5px] text-[13px] font-medium leading-[18px] text-natural-6 dark:bg-darkbg-2'>
      {tag}
    </div>
  );
};

export default Tag;

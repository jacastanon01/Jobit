import Image from 'next/image';

const List = ({ description }: { description?: string }) => {
  return (
    <div className='flex gap-3'>
      <Image src='/assets/icons/Oval.svg' alt='oval' height={15} width={10} />
      <p className='dark:text-white'>{description}</p>
    </div>
  );
};

export default List;

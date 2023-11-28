const PaginationButton = ({
  currentPage,
  i,
  handlePaginationClick,
}: {
  currentPage: number;
  i: number;
  handlePaginationClick: (page: number) => void;
}) => {
  return (
    <button
      disabled={currentPage === i}
      className={
        currentPage === i
          ? 'flex h-[40px] w-[40px] items-center justify-center rounded-lg border-natural-4 bg-primary font-medium text-base-white '
          : 'flex h-[40px] w-[40px] items-center justify-center rounded-lg border-natural-4 font-medium transition-all hover:border hover:bg-[#FCFCFC] hover:shadow-md dark:border-natural-8 dark:text-natural-6 dark:hover:border-natural-8 dark:hover:bg-natural-8 dark:hover:text-natural-3'
      }
      onClick={() => {
        handlePaginationClick(i);
      }}
    >
      {i}
    </button>
  );
};

export default PaginationButton;

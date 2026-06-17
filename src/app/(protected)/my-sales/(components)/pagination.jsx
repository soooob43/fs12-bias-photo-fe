'use client';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages = [];

    pages.push(1);

    if (currentPage > 3) {
      pages.push('left-ellipsis');
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let page = startPage; page <= endPage; page += 1) {
      pages.push(page);
    }

    if (currentPage < totalPages - 2) {
      pages.push('right-ellipsis');
    }

    pages.push(totalPages);

    return [...new Set(pages)];
  };

  const pages = getPages();

  const handlePrevPage = () => {
    if (currentPage === 1) {
      return;
    }

    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage === totalPages) {
      return;
    }

    onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center gap-10">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="text-white disabled:opacity-30"
      >
        ◀
      </button>

      {pages.map((page) => {
        if (page === 'left-ellipsis' || page === 'right-ellipsis') {
          return (
            <span key={page} className="text-white">
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              flex h-[45px] w-[45px]
              items-center justify-center
              text-[20px] font-bold
              transition-all
              ${
                currentPage === page
                  ? 'border border-white text-white'
                  : 'text-gray-400 hover:text-white'
              }
            `}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="text-white disabled:opacity-30"
      >
        ▶
      </button>
    </div>
  );
};

export default Pagination;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination(props: PaginationProps) {
  const { currentPage, totalPages, baseUrl } = props;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showEllipsis = totalPages > 7;

  const getVisiblePages = () => {
    if (!showEllipsis) return pages;
    
    if (currentPage <= 4) {
      return [...pages.slice(0, 5), '...', totalPages];
    }
    
    if (currentPage >= totalPages - 3) {
      return [1, '...', ...pages.slice(totalPages - 5)];
    }
    
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  };

  return (
    <nav class="flex justify-center space-x-2 my-8">
      <a
        href={currentPage > 1 ? `${baseUrl}/${currentPage - 1}` : '#'}
        class={`px-3 py-2 rounded-md ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        aria-disabled={currentPage === 1}
      >
        Previous
      </a>

      {getVisiblePages().map((page, index) => (
        page === '...' ? (
          <span class="px-3 py-2 text-gray-500">
            ...
          </span>
        ) : (
          <a
            href={`${baseUrl}/${page}`}
            class={`px-3 py-2 rounded-md ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {page}
          </a>
        )
      ))}

      <a
        href={currentPage < totalPages ? `${baseUrl}/${currentPage + 1}` : '#'}
        class={`px-3 py-2 rounded-md ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        aria-disabled={currentPage === totalPages}
      >
        Next
      </a>
    </nav>
  );
} 
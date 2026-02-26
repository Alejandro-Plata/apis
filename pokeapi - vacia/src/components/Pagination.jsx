/**
 * Componente de paginación
 * Muestra botones para navegar entre páginas
 */
function Pagination({ currentPage, totalPages, onPageChange }) {
  const maxVisiblePages = 10;
  const pages = Array.from(
    { length: Math.min(totalPages, maxVisiblePages) }, 
    (_, i) => i + 1
  );

  return (
    <div className="pagination-container">
      <button 
        className="page-btn prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ❮
      </button>
      
      <div className="page-numbers">
        {pages.map(page => (
          <button
            key={page}
            className={`page-num ${page === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button 
        className="page-btn next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ❯
      </button>
    </div>
  );
}

export default Pagination;

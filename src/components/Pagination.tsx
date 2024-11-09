interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    size?: "small";
}

const Pagination = ({currentPage, totalPages, onPageChange, size}: PaginationProps) => {
    const handleNextPage = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const buttonClasses = `join-item btn ${size === "small" ? "btn-xs" : ""}`;

    return (
        <div className="join mt-4 mb-4 flex justify-center">
            <button className={buttonClasses} onClick={handlePrevPage} disabled={currentPage === 1}>«</button>
            <button className={buttonClasses}>Page {currentPage}</button>
            <button className={buttonClasses} onClick={handleNextPage} disabled={currentPage === totalPages}>»</button>
        </div>
    );
};

export default Pagination;
import * as React from 'react';

interface IPaginationProps {
    currentPage: number;
    pageCount: number;
}

const Pagination: React.FC<IPaginationProps> = ({ currentPage, pageCount }) => {
    return <span>pagination</span>;
};

export default Pagination;

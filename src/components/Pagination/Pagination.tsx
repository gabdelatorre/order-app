import { useEffect, useState } from 'react';
import { Pagination as BSPagination } from 'react-bootstrap';

export interface TPaginationProps {
  active: number;
  totalSize: number;
  pageSize: number;
  onChange?: (pageNumber: number) => void;
}

export const Pagination = ({ active, totalSize, pageSize, onChange }: TPaginationProps) => {
  const [pageCount, setPageCount] = useState(1);

  const handlePaginationClick = (idx: number) => () => {
    if (typeof onChange === 'function') onChange(idx);
  };

  useEffect(() => {
    let pCount = totalSize / pageSize;
    if (totalSize % pageSize > 0) pCount++;
    setPageCount(Math.floor(pCount));
  }, [totalSize, pageSize]);

  return (
    <BSPagination>
      {new Array(pageCount).fill(0).map((_, idx) => {
        const pageIdx = idx + 1;
        return (
          <BSPagination.Item
            data-testid={`pagination-page-${pageIdx}`}
            key={pageIdx}
            active={active === pageIdx}
            onClick={handlePaginationClick(pageIdx)}
          >
            {idx + 1}
          </BSPagination.Item>
        );
      })}
    </BSPagination>
  );
};

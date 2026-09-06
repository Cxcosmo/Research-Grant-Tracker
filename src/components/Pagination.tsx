import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface PaginationProps {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, pageCount, onChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button type="button" disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Previous">
        <ChevronLeftIcon />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={p === page ? 'is-active' : ''}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        disabled={page >= pageCount}
        onClick={() => onChange(page + 1)}
        aria-label="Next"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}

"use client";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  // 👉 show limited pages (better UX)
  const getPages = () => {
    const pages = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">

      {/* PREV */}
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className={`px-4 py-2 rounded-lg border text-sm font-medium transition
          ${
            page === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-gray-100 shadow-sm"
          }
        `}
      >
        ← Prev
      </button>

      {/* FIRST PAGE */}
      {page > 3 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-2 rounded-lg border text-sm hover:bg-gray-100"
          >
            1
          </button>
          <span className="px-2 text-gray-400">...</span>
        </>
      )}

      {/* PAGE NUMBERS */}
      {getPages().map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition
            ${
              page === p
                ? "bg-blue-600 text-white shadow-md scale-105"
                : "bg-white border hover:bg-gray-100 shadow-sm"
            }
          `}
        >
          {p}
        </button>
      ))}

      {/* LAST PAGE */}
      {page < totalPages - 2 && (
        <>
          <span className="px-2 text-gray-400">...</span>
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-2 rounded-lg border text-sm hover:bg-gray-100"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* NEXT */}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className={`px-4 py-2 rounded-lg border text-sm font-medium transition
          ${
            page === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-gray-100 shadow-sm"
          }
        `}
      >
        Next →
      </button>
    </div>
  );
}
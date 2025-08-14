const Pagination = ({ page, onPrev, onNext, hasNext }) => (
  <div className="mt-10 flex justify-center items-center gap-4">
    <button
      onClick={onPrev}
      disabled={page === 1}
      className="cursor-pointer px-5 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50 hover:bg-indigo-700 transition"
    >
      Previous
    </button>
    <span className="px-4 py-2 text-gray-700 dark:text-gray-300 font-semibold">
      Page {page}
    </span>
    <button
      onClick={onNext}
      disabled={!hasNext}
      className="cursor-pointer px-5 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50 hover:bg-indigo-700 transition"
    >
      Next
    </button>
  </div>
);

export default Pagination;

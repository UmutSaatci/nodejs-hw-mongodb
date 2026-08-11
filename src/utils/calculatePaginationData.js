export const calculatePaginationData = (totalItems, page, perPage) => {
  const calculatedTotalPages = Math.ceil(totalItems / perPage);
  const totalPages = calculatedTotalPages === 0 ? 1 : calculatedTotalPages;
  const hasPreviousPage = page > 1 && page <= totalPages;
  const hasNextPage = page < totalPages;

  return {
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

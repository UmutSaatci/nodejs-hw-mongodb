export const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;

  const allowedSortOrder = ['asc', 'desc'];
  const parsedSortOrder = allowedSortOrder.includes(sortOrder)
    ? sortOrder
    : 'asc';
  const allowedSortByKeys = ['name', 'isFavourite'];

  const isCorrectSortBy =
    typeof sortBy === 'string' && allowedSortByKeys.includes(sortBy);

  const parsedSortBy = isCorrectSortBy ? sortBy : 'name';

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};

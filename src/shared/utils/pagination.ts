export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export const getPagination = (
  queryPage?: unknown,
  queryLimit?: unknown
): PaginationParams => {
  const page = Math.max(1, parseInt(queryPage as string, 10) || 1);
  const limit = Math.max(1, Math.min(100, parseInt(queryLimit as string, 10) || 10));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

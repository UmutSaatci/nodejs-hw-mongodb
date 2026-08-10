import httpErrors from 'http-errors';

export const notFoundHandler = (req, res, next) => {
  next(new httpErrors(404, 'Route not found'));
};

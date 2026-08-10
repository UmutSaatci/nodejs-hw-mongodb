export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = 'HttpError';
  }
}

export const errorHandler = (err, req, res, next) => {
  // 1. Eğer bizim fırlattığımız özel bir HTTP hatası ise (Örn: 404)
  if (err.status) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }

  // 2. Eğer Mongoose ID formatı hatası ise (CastError)
  if (err.name === 'CastError') {
    return res.status(400).json({
      status: 400,
      message: 'Invalid ID format',
    });
  }

  // 3. Beklenmeyen bir sistemsel hata ise (500)
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    error: err.message,
  });
};

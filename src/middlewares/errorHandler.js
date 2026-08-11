import httpErrors from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  // Fırlatılan hatanın bir http-errors nesnesi olup olmadığını kontrol ediyoruz
  if (httpErrors.isHttpError(err)) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }

  // Mongoose geçersiz ID formatı hatası (CastError)
  if (err.name === 'CastError') {
    return res.status(400).json({
      status: 400,
      message: 'Invalid ID format',
    });
  }

  // Beklenmeyen sistemsel hatalar (500)
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    error: err.message,
  });
};

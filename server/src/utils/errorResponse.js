const errorResponse = (response, status, message) => {
  return response.status(status).json({
    status,
    error: message,
  });
};

export default errorResponse;

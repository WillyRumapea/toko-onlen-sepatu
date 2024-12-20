const response = (statusCode, payload, message, res) => {
  res.json({
    status_code: statusCode,
    payload: payload,
    message: message,
    metadata: {
      prev: "",
      next: "",
      prev: "",
    },
  });
};

module.exports = response;

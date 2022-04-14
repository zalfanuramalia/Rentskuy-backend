exports.showSuccess = (data) => {
  var result = data.result == null ? { message: data.message } : { message: data.message, results: data.result };
  return data.response.json({
    success: true,
    ...result
  });
};

const getPagination = (pagination) => {
  const last = Math.ceil(pagination.total / pagination.limit);
  const url = `http://localhost:5000/${pagination.route}&page=`;
  return {
    prev: pagination.page > 1 ? `${url}${pagination.page-1}` : null,
    next: pagination.page < last ? `${url}${pagination.page+1}` : null,
    totalData: pagination.total,
    currentPage: pagination.page,
    lastPage: last
  };
};

exports.showSuccessWithPagination = (data, pagination) => {
  return data.response.json({
    success: true,
    message: data.message,
    results: data.result,
    pageInfo: getPagination(pagination)
  });
};

exports.showError = (data) => {
  var result = data.error == null ? { message: data.message } : { message: data.message, error: data.error };
  return data.response.status(data.status).json({
    success: false,
    ...result
  });
};

exports.showResponse = (res, message, result, status = 200) => {
  let success = true;
  if (status >= 400) {
    success = false;
  }
  let data = { success, message };
  if (result) {
    data.result = result;
  }
  return res.status(status).json(data);
};
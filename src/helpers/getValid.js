exports.validationPagination = (pagination) => {
  var result = null;
  const { page, limit } = pagination;

  if (isNaN(parseInt(page))) {
    result = {...result, page: 'Page must be a number.' };
  } else if (page == 0) {
    result = {...result, page: 'Page must be grather then 0.' };
  }

  if (isNaN(parseInt(limit))) {
    result = {...result, limit: 'Limit must be a number.' };
  } else if (limit == 0) {
    result = {...result, limit: 'Limit must be grather than 0.' };
  }
  return result;
};
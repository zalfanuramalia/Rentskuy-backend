const searchModel = require('../models/search');
const getValid = require('../helpers/getValid');
const getAPI = require('../helpers/getAPI');
const moment = require('moment');

const getSearch = async(req, res) => {
  const category_id = req.params.category_id;
  let { brand, date, page, limit, sort, order } = req.query;
  brand = brand || '';
  date = date || '';
  sort = sort || 'createdAt';
  var filledFilter = ['location', 'type', 'payment'];
  var filter = {};
  page = ((page != null && page !== '') ? parseInt(page) : 1);
  limit = ((limit != null && limit !== '') ? parseInt(limit) : 10);
  order = order || 'desc';
  let pagination = { page, limit };
  let dataJson = { response: res, message: '' };
  var route = 'search?';
  var searchParam = '';
  if (brand) {
    searchParam = `brand=${brand}`;
  }
  if (date) {
    searchParam = `date=${date}`;
  }
  filledFilter.forEach((item) => {
    if (req.query[item]) {
      filter[item] = req.query[item];
      if (searchParam == '') {
        searchParam += `${item}=${filter[item]}`;
      } else {
        searchParam += `&${item}=${filter[item]}`;
      }
    }
  });
  route += searchParam;

  if (getValid.validationPagination(pagination) == null) {
    const offset = (page - 1) * limit;
    let data = { brand, filter, date, limit, offset, sort, order };
    var dataSearch = await searchModel.getDataSearchVehicle(data, category_id);
    dataSearch.forEach((item) => {
      if (item.start_rent !== null && item.end_rent) {
        item.start_rent = moment(item.start_rent).format('DD MMM YYYY');
        item.end_rent = moment(item.end_rent).format('DD MMM YYYY');
      }
    });
    try {
      if (dataSearch.length > 0) {
        var result = await searchModel.countDataSearchVehicle(data);
        const { total } = result[0];
        pagination = {...pagination, total: total, route: route };
        dataJson = {...dataJson, message: 'List Data Search.', result: dataSearch, pagination };
        return getAPI.showSuccessWithPagination(dataJson, pagination);
      } else {
        dataJson = {...dataJson, message: 'Data not found', status: 404 };
        return getAPI.showError(dataJson);
      }
    } catch (err) {
      dataJson = {...dataJson, message: 'Data failed ', status: 500, error: err };
      return getAPI.showError(dataJson);
    }

  } else {
    dataJson = { response: res, message: 'Pagination was not valid.', error: getValid.validationPagination(pagination), status: 400 };
    getAPI.showError(dataJson);
  }
};

module.exports = { getSearch };
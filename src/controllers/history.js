const historyModel = require('../models/history');
const {APP_URL} = process.env;
const response = require('../helpers/response');

const dataHistory = (req, res) => {
  let {search, page, limit, tool, sort, loc} = req.query;
  search = search || '';
  page = ((page != null && page !== '') ? parseInt(page) : 1);
  limit = ((limit != null && limit !== '') ? parseInt(limit) : 50);
  tool = tool || 'id';
  sort = sort || 'desc';
  const offset = (page - 1) * limit;
  const data = { search, page, limit, offset, tool, sort, loc };
  if(data.limit < 0 && data.page < 0){
    return response(res, 'Page and Limit Must be More Than 0', null, 400);
  }
  if(data.limit < 0){
    return response(res, 'Limit Must be More Than 0', null, 400);
  }
  if(data.page < 0){
    return response(res, 'Page Must be More Than 0', null, 400);
  }
  historyModel.dataHistory(data, (result) => {
    historyModel.countHistory(data,(count) => {
      const { total } = count[0];
      const last = Math.ceil(total/limit);
      if (result.length> 0){
        return res.send({
          success: true,
          message: 'Data History',
          result,
          pageInfo: {
            prev: page > 1 ? `https://rentskuy.herokuapp.com/history?page=${page-1}`: null,
            next: page < last ? `https://rentskuy.herokuapp.com/history?page=${page+1}`: null,
            totalData:total,
            currentPage: page,
            lastPage: last
          }
        });
      } else {
        return res.status(400).send({
          success: false,
          message: 'You must input correctly',
          pageInfo: {
            prev: page > 1 ? `https://rentskuy.herokuapp.com/history?page=${page-1}`: null,
            next: page < last ? `https://rentskuy.herokuapp.com/history?page=${page+1}`: null,
            totalData:total,
            currentPage: page,
            lastPage: last
          }
        });
      }
    });
        
  });
};

const detailHistory = (req, res)=>{
  const dataID = parseInt(req.params.id);
  if (isNaN(dataID)===true){
    return response(res, 'Data ID must be Number', null, 400);
  }
  historyModel.detailHistory(dataID, (results) => {
    if (results.length > 0){
      return response(res, 'List Detail User', results[0], 200);
    } else {
      return response(res, 'There is no Vehicles with that ID', null, 404);
    }        
  });
};

const detailHistoryUser = (req, res)=>{
  const dataID = parseInt(req.params.id);
  // if (isNaN(dataID)===true){
  //   return response(res, 'Data ID must be Number', null, 400);
  // }
  historyModel.detailHistory(dataID, (results) => {
    if (results.length > 0){
      return response(res, 'List Detail User', results, 200);
    } else {
      return response(res, 'You haven\'t ordered anything', null, 404);
    }        
  });
};

const popularVehicles = (req, res) => {
  let {search, page, limit, tool, sort, location, payment} = req.query;
  search = search || '';
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 4;
  location = location || '';
  payment = payment || '';
  tool = tool || '';
  sort = sort || '';
  const offset = (page - 1) * limit;
  const data = { search, page, limit, offset, tool, sort, location, payment};
  historyModel.popularVehicles(data, (result) => {
    const processedResult = result.map((obj) => {
      if(obj.image !== null){
        obj.image = `${APP_URL}/${obj.image}`;
      }
      return obj;
    });
    historyModel.countHistory(data,(count) => {
      const { total } = count[0];
      const last = Math.ceil(total/limit);
      if (result.length> 0){
        return res.send({
          success: true,
          message: 'Most Popular Vehicles',
          results: processedResult,
          pageInfo: {
            prev: page > 1 ? `https://rentskuy.herokuapp.com/history/vehicles?page=${page-1}`: null,
            next: page < last ? `https://rentskuy.herokuapp.com/history/vehicles?page=${page+1}`: null,
            totalData:total,
            currentPage: page,
            lastPage: last
          }
        });
      } else {
        return response(res, 'Data Not Found!', null, 404);
      }
    });
  });       
};

const popularBasedonMonth = (req, res) => {
  let { month, year } = req.query; 
  month = parseInt(month) || null;
  year = parseInt(year) || null;
  const data = {month, year};
  if (!month && !year){
    return response(res, 'Month and Year must be filled with number', null, 400);
  }
  if (!month){
    return response(res, 'Month must be filled with number', null, 400);
  }
  if (!year){
    return response(res, 'Year must be filled with number', null, 400);
  }
  historyModel.popularBasedonMonth(data, (result) => {
    const cekMonth = (month) => {
      return new Promise((resolve, reject) =>{
        setTimeout(()=>{
          const mon = [1,2,3,4,5,6,7,8,9,10,11,12];
          let cek = mon.find((item)=>{
            return item === month;
          });
          if(cek){
            resolve(cek);    
          } else {
            reject(new Error('Month ' + month + ' does not include month'));
          }
        }, 2000);
      });
    };
    cekMonth(month, year).then((cek)=>{
      if (result.length > 0){
        return response(res, 'Most Popular Vehicles in month ' + cek + ' ' + year,result, 200);
      } else {
        return response(res, 'Data vehicles not found', null, 404);
      }
    }).catch((err)=>{
      return response(res, ''+ err + '' , null, 400);
    });
  });
};

const postHistory = (req, res) => {
  const data2 = {
    id: res.length + 1,
    id_users: parseInt(req.body.id_users),
    id_vehicles: parseInt(req.body.id_vehicles),
    returned: 'No',
  };
  if (isNaN(data2.id_users)===true && isNaN(data2.id_vehicles)===true){
    return response(res, 'ID user and vehicles must be filled with number!', null, 400);
  }
  if (isNaN(data2.id_users)===true){
    return response(res, 'ID user must be filled with number!', null, 400);
  }
  if (isNaN(data2.id_vehicles)===true){
    return response(res, 'ID vehicles must be filled with number!', null, 400);
  }
  historyModel.postHistory(data2, (result) =>{
    if (result.affectedRows == 1){
      historyModel.getPostHistory( (result) => {
        const mapResults = result.map(o => {
          if(o.image!== null){
            o.image = `${APP_URL}/${o.image}`;
          }
          return o;
        });
        return response(res, 'History Posted', mapResults[0], 200);
      });
    } else {
      return response(res, 'History failed to Post', null, 500);
    }
  }); 
};

const delHistory = (req, res) => {
  const dataID = parseInt(req.params.id);
  if (isNaN(dataID)===true){
    return response(res, 'Data ID must be Number', null, 400);
  }
  historyModel.getDelHistory(dataID, (result) => {
    historyModel.delHistory(dataID, () => {
      if (result.affectedRows !== 1){
        historyModel.delHistory(dataID, () => {
          if(result.length > 0){
            return response(res, 'History Success Deleted', result, 200);
          } else {
            return response(res, 'Data History not Found', null, 404);
          }
        });
      } else {
        return response(res, 'Data History failed to Delete', null, 500);
      }
    });
  });
    
};

const patchHistory = (req, res)=>{
  const dataID = parseInt(req.params.id);
  if (isNaN(dataID)===true){
    return response(res, 'Data ID must be Number', null, 400);
  }
  const data = {
    id_users: parseInt(req.body.id_users),
    id_vehicles: parseInt(req.body.id_vehicles),
    returned: req.body.returned,
    new_arrival: req.body.new_arrival,
  };
  if (isNaN(data.id_users)===true && isNaN(data.id_vehicles)===true){
    return response(res, 'ID user and vehicles must be filled with number!', null, 400);
  }
  if (isNaN(data.id_users)===true){
    return response(res, 'ID user must be filled with number!', null, 400);
  }
  if (isNaN(data.id_vehicles)===true){
    return response(res, 'ID vehicles must be filled with number!', null, 400);
  }
  historyModel.patchHistory(data, dataID, (result) =>{
    if (result.affectedRows == 1){
      historyModel.getPatchHistory(dataID, (result) => {
        return response(res, 'Data History Updated', result, 200);
      });
    } else {
      return response(res, 'Data History not Found with that ID', null, 404);
    }
  });
};

module.exports = {dataHistory, detailHistory, detailHistoryUser, popularVehicles, popularBasedonMonth, postHistory, delHistory, patchHistory};
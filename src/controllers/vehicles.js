const vehicleModel = require('../models/vehicles');
const {APP_URL} = process.env;
const getValid = require('../helpers/getValid');
const getAPI = require('../helpers/getAPI');
const moment = require('moment');
const upload = require('../helpers/upload').single('image');

const getVehicles = async (req, res)=>{
  let { search, page, limit, date, sort, order } = req.query;
  search = search || '';
  page = ((page != null && page !== '') ? parseInt(page) : 1);
  limit = ((limit != null && limit !== '') ? parseInt(limit) : 10);
  date = date || '';
  sort = sort || 'createdAt';
  var filledFilter = ['location', 'type', 'payment'];
  var filter = {};
  order = order || 'desc';
  let dataJson = { response: res, message: '' };
  let pagination = { page, limit };
  var route = 'search?';
  var searchParam = '';
  if (search) {
    searchParam = `search=${search}`;
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
    const data = { search, filter, limit, offset, date, sort, order};
    var dataSearch = await vehicleModel.getVehiclesSearch(data);
    dataSearch.forEach((item) => {
      if (item.start_rent !== null && item.end_rent) {
        item.start_rent = moment(item.start_rent).format('DD MMM YYYY');
        item.end_rent = moment(item.end_rent).format('DD MMM YYYY');
      }
    });
    try {
      if (dataSearch.length > 0) {
        var result = await vehicleModel.countVehiclesSearch(data);
        const { total } = result[0];
        pagination = {...pagination, total: total, route: route };
        dataJson = {...dataJson, message: 'List Data Search.', result: dataSearch, pagination };
        return getAPI.showSuccessWithPagination(dataJson, pagination);
      } else{
        dataJson = {...dataJson, message: 'Data not found', status: 404 };
        return getAPI.showError(dataJson);
      }
    } catch(e) {
      dataJson = {...dataJson, message: 'Data failed ', status: 500, error: e };
      return getAPI.showError(dataJson);
    }
  } else {
    dataJson = { response: res, message: 'Pagination was not valid.', error: getValid.validationPagination(pagination), status: 400 };
    getAPI.showError(dataJson);
  }
  // const data = { search, limit, offset, date, sort, order};
  // if(data.limit < 0 && data.page < 0){
  //   return res.status(400).send({
  //     success: false,
  //     message: 'Page and Limit Must be More Than 0'
  //   });
  // }
  // if(data.limit < 0){
  //   return res.status(400).send({
  //     success: false,
  //     message: 'Limit Must be More Than 0'
  //   });
  // }
  // if(data.page < 0){
  //   return res.status(400).send({
  //     success: false,
  //     message: 'Page Must be More Than 0'
  //   });
  // }
  // vehicleModel.getVehicles(data, (result) =>{
  //   const processedResult = result.map((obj) => {
  //     if(obj.image !== null){
  //       obj.image = `${APP_URL}/${obj.image}`;
  //     }
  //     return obj;
  //   });
  //   vehicleModel.countVehicles(data, (count) => {
  //     const { total } = count[0];
  //     const last = Math.ceil(total/limit);
  //     if (result.length > 0){
  //       return res.send({
  //         success: true,
  //         message: 'Data Vehicle Found',
  //         result: processedResult,
  //         pageInfo: {
  //           prev: page > 1 ? `http://localhost:5000/vehicles?page=${page-1}`: null,
  //           next: page < last ? `http://localhost:5000/vehicles?page=${page+1}`: null,
  //           totalData:total,
  //           currentPage: page,
  //           lastPage: last
  //         }
  //       });
  //     } else {
  //       return res.status(404).send({
  //         success: false,
  //         message: 'Vehicle Not Found',
  //         pageInfo: {
  //           prev: page > 1 ? `http://localhost:5000/vehicles?page=${page-1}`: null,
  //           next: page < last ? `http://localhost:5000/vehicles?page=${page+1}`: null,
  //           totalData:total,
  //           currentPage: page,
  //           lastPage: last
  //         }
  //       });
  //     }    
  //   });
  // });
};

const getVehicle = (req, res)=>{
  const dataID = parseInt(req.params.id);
  if (!dataID){
    return res.status(400).send({
      success: false,
      message: 'Data ID must be Number'
    });
  }
  if(dataID == ''){
    return res.status(400).send({
      success: false,
      message: 'ID is required'        
    });
  }
  vehicleModel.getVehicle(dataID, results => {
    const processedResult = results.map((obj) => {
      if(obj.image !== null){
        obj.image = `${APP_URL}/${obj.image}`;
      }
      return obj;
    });
    console.log(processedResult);
    if (results.length > 0){
      return res.send({
        success: true,
        message: 'List Detail Vehicle',
        results: results[0]
      });
    } else {
      return res.status(404).send({
        success: false,
        message: 'There is no Vehicles with that ID'
      });
    }        
  });
};

const delVehicle = (req, res) => {
  const dataID = parseInt(req.params.id) || null;
  if(!dataID){
    return res.status(400).send({
      success: false,
      message: 'ID must be Number!'
    });
  }
  vehicleModel.getDelVehicle(dataID, (result) => {
    vehicleModel.delVehicle(dataID, () => {
      if (result.affectedRows !== 1){
        vehicleModel.delVehicle(dataID, () => {
          if(result.length > 0){
            return res.send({
              success: false,
              message : 'Vehicle Data Success Deleted',
              result
            });
          } else {
            return res.status(404).send({
              success: true,
              message : 'Vehicle Data not Found',
            });
          }
        });
      } else {
        return res.status(500).send({
          success: false,
          message: 'Vehicle Data failed to Delete'
        });
      }
    });
  });
};

const postVehicle = async (req, res) => {
  upload(req, res, async function(err){
    if(err){
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    try {
      const data1 = {  };
      const fillable = ['brand', 'price','description', 'location','category_id', 'qty'];
      fillable.forEach(field => {
        if (req.body[field]) {
          return data1[field] = req.body[field]; // data.qty = req.body.qty
        }
      });
      if(req.file){
        data1.image = `uploads/${req.file.filename}`;
      }
      if(!data1.price && !data1.qty){
        return res.status(400).send({
          success: false,
          message: 'Price and Quantity Data must be Number!'
        });
      }
      if(!data1.price){
        return res.status(400).send({
          success: false,
          message: 'Price Data must be Number!'
        });
      }
      if(!data1.qty){
        return res.status(400).send({
          success: false,
          message: 'Quantity Data must be Number!'
        });
      }
      if(!data1.category_id){
        return res.status(400).send({
          success: false,
          message: 'ID category must be Number!'
        });
      }
      const results = await vehicleModel.postVehicle(data1);
      if (results.affectedRows == 1){
        const fin = await vehicleModel.getPostVehicle(results.insertId);
        const mapResults = fin.map(o => {
          if(o.image!== null){
            o.image = `${APP_URL}/${o.image}`;
          }
          return o;
        });
        return res.send({
          success: true,
          message: 'Vehicle data created!',
          results: mapResults[0]
        });
      } else {
        return res.status(404).send({
          success: false,
          message: 'Unexpected Data'
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
};

const patchVehicle = (req, res)=>{
  upload(req, res, function(err){
    if(err){
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    const dataID = parseInt(req.params.id);
    if (!dataID){
      return res.status(400).send({
        success: false,
        message: 'ID must be number!'
      });
    }
    vehicleModel.getPatchVehicle(dataID, (result) => {
      console.log(result);
      if (result.length >=1){
        const data = {    };
        // data["discount"] == data.discount
        const fillable = ['category_id', 'brand','price', 'image', 'location','qty', 'can_prepayment', 'isAvailable'];
        fillable.forEach(field => {
          if (req.body[field]) {
            return data[field] = req.body[field]; // data.qty = req.body.qty
          } 
        });
        console.log(data);
        if(req.file){
          data.image = `uploads/${req.file.filename}`;
        }      
        // if(!parseInt(data.price) && !parseInt(data.qty)){
        //   return res.status(400).send({
        //     success: false,
        //     message: 'Price and Quantity Data must be Number!'
        //   });
        // }
        // if(!parseInt(data.price)){
        //   return res.status(400).send({
        //     success: false,
        //     message: 'Price Data must be Number!'
        //   });
        // }
        // if(!parseInt(data.qty)){
        //   return res.status(400).send({
        //     success: false,
        //     message: 'Quantity Data must be Number!'
        //   });
        // }
        // if (!parseInt(req.body.category_id)){
        //   return res.status(400).send({
        //     success: false,
        //     message: 'ID category must be number!'
        //   });
        // } 
        vehicleModel.patchVehicle(data, dataID, (result) =>{
          if (result.affectedRows == 1){
            vehicleModel.getPatchVehicle(dataID, (fin) =>{
              const mapResult = fin.map(o => {
                if(o.image!== null){
                  o.image = `${APP_URL}/${o.image}`;
                }
                return o;
              });
              return res.send({
                success: true,
                message: 'Update Vehicle Data Success!',
                results: mapResult[0]
              });
            });
          } else {
            return res.status(404).send({
              success: false,
              message: 'Unexpected Error!',
            });          
          }   
        });
      } else {
        return res.status(404).send({
          success: false,
          message: 'Unexpected Data'
        });
      }   
    });
  });
};

const updateVehicle = async (req, res) => {
  const { id } = req.params;
  const result = await vehicleModel.getVehicleAsync(id);
  if (result.length >= 1) {
    const data = {    };
    // data["discount"] == data.discount
    const fillable = ['category_id', 'brand', 'image','price', 'location','qty', 'can_prepayment', 'isAvailable'];
    fillable.forEach(field => {
      if (req.body[field]) {
        return data[field] = req.body[field]; // data.qty = req.body.qty
      }
    });
    console.log(data);
    try {
      const resultUpdate = await vehicleModel.updateVehicleAsync(data, id);
      if (resultUpdate.affectedRows) {
        const fetchNew = await vehicleModel.getVehicleAsync(id);
        // const mapResult = fin.map(o => {
        //   if(o.image!== null){
        //     o.image = `${APP_URL}/${o.image}`;
        //   }
        //   return o;
        // });
        return res.json({
          success: true,
          message: 'Update Data Success!',
          result: fetchNew[0]
        });
      }
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: 'Unexpected Error'
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: 'Unexpected data'
    });
  }
};


const vehiclesCategory = (req, res) => {
  const category = parseInt(req.params.category_id);
  let { search, page, limit, tool, sort} = req.query;
  search = search || '';
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 4;
  tool = tool || 'price';
  sort = sort || '' ;
  // var filledFilter = [ 'type', 'payment'];
  // var filter = {};
  // var searchParam = '';
  // if (date) {
  //   searchParam = `date=${date}`;
  // }
  // filledFilter.forEach((item) => {
  //   if (req.query[item]) {
  //     filter[item] = req.query[item];
  //     if (searchParam == '') {
  //       searchParam += `${item}=${filter[item]}`;
  //     } else {
  //       searchParam += `&${item}=${filter[item]}`;
  //     }
  //   }
  // });
  const offset = (page - 1) * limit;
  const data = { search, limit, offset, tool, sort};
  if(data.limit < 0 && data.page < 0){
    return res.status(400).send({
      success: false,
      message: 'Page and Limit Must be More Than 0'
    });
  }
  if(data.limit < 0){
    return res.status(400).send({
      success: false,
      message: 'Limit Must be More Than 0'
    });
  }
  if(data.page < 0){
    return res.status(400).send({
      success: false,
      message: 'Page Must be More Than 0'
    });
  }
  
  vehicleModel.vehiclesCategory(data, category, results => {
    const processedResult = results.map((obj) => {
      if(obj.image !== null){
        obj.image = `${APP_URL}/${obj.image}`;
      }
      return obj;
    });
    vehicleModel.countVehiclesSearch(data, (count) => {
      const { total } = count[0];
      const last = Math.ceil(total/limit);
      if (results.length > 0){
        return res.send({
          success: true,
          message: 'Data Category',
          results: processedResult,
          pageInfo: {
            prev: page > 1 ? `http://localhost:8080/vehicles/category/:category_id?page=${page-1}`: null,
            next: page < last ? `http://localhost:8080/vehicles/category/:category_id?page=${page+1}`: null,
            totalData:total,
            currentPage: page,
            lastPage: last
          }
        });
      } else {
        return res.status(404).send({
          success: false,
          message: 'Data Not Found!'
        });
      }
    });        
  });
};

const vehiclesOnLocation = (req, res) => {
  const location = req.params.location;
  let { search, page, limit, tool, sort, type} = req.query;
  search = search || '';
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 4;
  tool = tool || 'price';
  sort = sort || '' ;
  type = type || '';
  const offset = (page - 1) * limit;
  const data = { search, limit, offset, tool, sort, type};
  if(data.limit < 0 && data.page < 0){
    return res.status(400).send({
      success: false,
      message: 'Page and Limit Must be More Than 0'
    });
  }
  if(data.limit < 0){
    return res.status(400).send({
      success: false,
      message: 'Limit Must be More Than 0'
    });
  }
  if(data.page < 0){
    return res.status(400).send({
      success: false,
      message: 'Page Must be More Than 0'
    });
  }
  
  vehicleModel.vehiclesOnLocation(data, location, results => {
    const processedResult = results.map((obj) => {
      if(obj.image !== null){
        obj.image = `${APP_URL}/${obj.image}`;
      }
      return obj;
    });
    vehicleModel.countVehicles(data, (count) => {
      const { total } = count[0];
      const last = Math.ceil(total/limit);
      if (results.length > 0){
        return res.send({
          success: true,
          message: 'Data Category',
          results: processedResult,
          pageInfo: {
            prev: page > 1 ? `http://localhost:8080/vehicles?page=${page-1}`: null,
            next: page < last ? `http://localhost:8080/vehicles?page=${page+1}`: null,
            totalData:total,
            currentPage: page,
            lastPage: last
          }
        });
      } else {
        return res.status(404).send({
          success: false,
          message: 'There is Data Category Vehicles with that ID'
        });
      }
    });        
  });
};

module.exports = {getVehicles, getVehicle, patchVehicle, updateVehicle, delVehicle, postVehicle, vehiclesCategory, vehiclesOnLocation};
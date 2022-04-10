const db = require('../helpers/database');
const { APP_URL } = process.env;

exports.getDataSearchVehicle = (data, category_id) => new Promise((resolve, reject) => {
  var filled = ['location', 'type', 'payment'];
  var resultFillter = '';
  filled.forEach((item) => {
    if (data.filter[item]) {
      resultFillter += ` and ${item}='${data.filter[item]}'`;
    }
  });
  const query = db.query(`select v.id,v.brand,v.category_id,c.name as type,concat('${APP_URL}/',v.image) as image,v.location,v.price,v.payment, h.start_rent,h.end_rent,h.createdAt 
    from vehicles v left join history h on h.id_vehicles = v.id left join category c on c.id = v.category_id
   where category_id = ? && v.brand like '%${data.brand}%' ${resultFillter} ${data.date!=='' ? `and h.start_rent = '${data.date}' or h.end_rent='${data.date}'` : ''}
   order by ${data.sort} ${data.order} LIMIT ${data.limit} OFFSET ${data.offset}`,[category_id], (error, result) => {
    if (error) reject(error);
    resolve(result);
  });
  console.log(query.sql);
});

exports.countDataSearchVehicle = (data) => new Promise((resolve, reject) => {
  var filled = ['location', 'type', 'payment_id', 'category_id', 'date'];
  var resultFillter = '';
  filled.forEach((item) => {
    if (data.filter[item]) {
      resultFillter += ` and ${item}='${data.filter[item]}'`;
    }
  });
  db.query(`select count(*) as total
    from vehicles v left join history h on h.id_vehicles = v.id left join category c on c.id = v.category_id
   where v.brand like '%${data.name}%' ${resultFillter}`, function(error, results) {
    if (error) reject(error);
    resolve(results);
  });
});
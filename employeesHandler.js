const { Pool} = require('pg');

const pool = new Pool({
  connectionString: process.env.connectionString
});

module.exports.getEmployees = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  pool.query('SELECT * FROM public."Employees" WHERE "Status" = \'A\'', (err, res) => {
    if (err) {
      callback({
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify({
          message: err
        }),
      }, null);
    }else{
      callback(null, JSON.stringify(res.rows)); 
    }
  });  
};
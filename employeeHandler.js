const { Pool} = require('pg');
const connectionString = 'postgresql://hr_vacations_user:hr_vacations_pwd@hr-vacations.chy3ncyrqtqy.us-east-2.rds.amazonaws.com:5432/hr_vacations';

const pool = new Pool({
  connectionString: connectionString,
});

module.exports.getEmployee = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  pool.query('SELECT * FROM public."Employees" WHERE "Id" = $1;', [event.employeeId], (err, res) => {
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
      callback(null, JSON.stringify(res.rows[0])); 
    }
  });  
};
const { Pool} = require('pg');

const pool = new Pool({
  connectionString: process.env.connectionString
});

module.exports.updateEmployee = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = 'UPDATE public."Employees" SET  "FirstName"=$2, "LastName"=$3, "StartDate"=$4, "Status"=$5 WHERE "Id"=$1 RETURNING *';
  const parameters = [event.Id,event.FirstName,event.LastName,event.StartDate,event.Status];
  pool.query(sql,parameters,(err, res) => {
    if (err) {
      callback(err);
    }else{
      callback(null, res.rows[0]); 
    }
  });  
};
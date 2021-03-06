const { Pool} = require('pg');

const pool = new Pool({
  connectionString: process.env.connectionString
});

module.exports.createEmployee = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = 'INSERT INTO public."Employees"("Id", "FirstName", "LastName", "StartDate", "Status") VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const parameters = [event.Id,event.FirstName,event.LastName,event.StartDate,event.Status];
  pool.query(sql,parameters,(err, res) => {
    if (err) {
      callback(err);
    }else{
      callback(null, res.rows[0]); 
    }
  });  
};
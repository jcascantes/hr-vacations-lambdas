const { Pool} = require('pg');
const connectionString = 'postgresql://hr_vacations_user:hr_vacations_pwd@hr-vacations.chy3ncyrqtqy.us-east-2.rds.amazonaws.com:5432/hr_vacations';

const pool = new Pool({
  connectionString: connectionString,
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
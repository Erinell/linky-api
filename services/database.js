const mysql = require('mysql2');

let pool;
let promisePool;
module.exports = {
  init: async function (config) {
    pool = await mysql.createPool(config);
    promisePool = pool.promise();
  },
  query: async function (sql, params) {
    try {
      const [results,] = await promisePool.query(sql, params);
      return results;
    } catch (error) {
      return error;
    }
  }
}
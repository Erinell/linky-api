const mysql = require('mysql2');
const config = require('../config');

let pool;
let promisePool;
module.exports = {
  init: async function(){
    pool = await mysql.createPool(config.db);
    promisePool = pool.promise();
  },
  query: async function(sql, params) {
    if(!pool || !promisePool) await module.exports.init();
    try {
      const [results, ] = await promisePool.query(sql, params);
      return results;
    } catch (error) {
      return error;
    }
  }
}
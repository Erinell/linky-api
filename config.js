require('dotenv').config()
const args = process.argv.slice(2);

const config = {
  db: {
    host: process.env.DATABASE_IP,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: args[0] == "test" ? process.env.DATABASE_TEST_NAME : process.env.DATABASE_NAME,
  },
  serial: {
    port: '/dev/ttyUSB0',
    options: {
      baudRate: 1200,
      dataBits: 7,
      parity: 'even'
    }
  },
  saveFrequency: 5,
  listPerPage: 100,
  serverPort: 3000
};
module.exports = config;
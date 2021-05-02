const mysql = require("mysql2/promise")
//require('dotenv').config();

const Pool = mysql.createPool({
    timezone:"+09:00",
    host: "chery-problem.clznfcoodcl1.ap-northeast-2.rds.amazonaws.com",
    user: "admin",
    password: "dirndirn",
    //database: "test",
    port: 3306
});

module.exports = Pool;
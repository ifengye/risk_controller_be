'use strict';

import mysql from 'mysql';
import config from 'config-lite';
var mysqlPool = mysql.createPool(config.mysql);
const getConnect = function (sql, callback) {
    mysqlPool.getConnection(function (err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            return;
        }
        console.log("数据库连接成功！");
        connection.query(sql, function (err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
        connection.release();//释放连接池
    });
}
module.exports =  getConnect

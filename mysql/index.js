'use strict';

import mysql from 'mysql';
import config from 'config-lite';
var mysqlPool = mysql.createPool(config.mysql);
const getConnect = function (sql) {
    // 返回一个 Promise
    return new Promise((resolve, reject) => {
        mysqlPool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        var string = JSON.stringify(result);
                        var data = JSON.parse(string)
                        resolve(data)
                    }
                    // 结束会话
                    connection.release()
                })
            }
        })
    })
}
module.exports =  getConnect

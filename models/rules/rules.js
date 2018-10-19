/**
 * Created By brand On 2017/10/16
 */
var mysql = require('../../mysql');// 获取数据库连接配置
var Rules = function () {
};
module.exports = Rules;
Rules.getRules = function (callback) {
    mysql.pool.getConnection(function (err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = 'select * from rules';
        connection.query(sql, function (err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
        connection.release();//释放连接池
    });
};

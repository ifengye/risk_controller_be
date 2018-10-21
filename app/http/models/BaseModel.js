'use strict';

import mysql from 'mysql';
import config from '../../../config/default';
import { runInThisContext } from 'vm';

/**
 * Model层基类
 * 1、实现数据库调用方法的封装
 * 2、
 */
export default class BaseModel {
    constructor(){
        this.getConnect = require('../../../mysql');// 获取数据库连接配置
        this.table = ''; // 默认数据库表，子类必须重新写表名
    }


    /**
     * 执行sql语句
     * @param {*} sql 
     * @param {*} callBack 
     */
    async execSql(sql, callBack) 
    {
        var result;
        await this.getConnect(sql).then((res) => {
            result = res;
        });
        
        return result;
    }

    async queryWithLimit(fields, conditions, orders, start, limit){
        var result;

        var sql = "select " + fields + " from " + this.table + " ";

        if (conditions != "") {
            var condition = this.getCondition(conditions);
            sql += "where " + condition + " ";
        }

        if (orders != "") {
            var order = "";
            for (var key in orders) {
                if (orders.hasOwnProperty(key)) {
                    order += key + " " + orders[key] + ",";
                }
            }
            sql += "order by " + order.substring(0, order.length - 1) + " ";
        }

        if (start !== "" && limit !== "") {
            sql += " limit " + limit + " offset " + start + " ";
        }

        sql += ";";

        await this.getConnect(sql).then((res) => {
            result = res;
        });

        return result;
        // return sql;
    }

    /**
     * 获取mysqlcondition条件
     * @param {*} conditions 
     */
    getCondition(conditions = {}){
        var condition = "";
        for (var key in conditions) {
            if (conditions.hasOwnProperty(key)) {
                var values = conditions[key];
                switch (key) {
                    case '!=':
                    case '<':
                    case '>':
                        for (var inner_key in values) {
                            if (values.hasOwnProperty(inner_key)) {
                                if (typeof values[inner_key] == "string"){
                                    values[inner_key] = "'" + values[inner_key] + "'";
                                }
                                condition += inner_key + " " + key + " " + values[inner_key] + " and ";
                            }
                        }
                        break;
                    case 'in':
                    case 'not in':
                        for (var inner_key in values) {
                            if (values.hasOwnProperty(inner_key)) {
                                if (typeof values[inner_key] == "string") {
                                    values[inner_key] = "'" + values[inner_key] + "'";
                                }
                                condition += inner_key + " " + key + "(" + values[inner_key].join(",") + ") and ";
                            }
                        }
                        break;
                    default:
                        if (typeof conditions[key] == "string") {
                            conditions[key] = "'" + conditions[inner_key] + "'";
                        }
                        condition += key + " = " + conditions[key] + " and ";
                        break;
                }
            }
        }

        return condition.substring(0, condition.length - 5);
    }

    // public function query_with_limit($field = array('*'), $condition = array(), $order = array(), $start = 0, $limit = 20, $join = array(), $group_by = array()) {... ... }

    // // 查询所有记录，非特殊情况不允许使用，建议使用query_with_limit
    // public function query_all($field = array('*'), $condition = array(), $order = array(), $join = array(), $group_by = array()) {... ... }

    // // 查询符合条件的记录总条数
    // public function query_count($condition = array(), $join = array(), $group_by = array()) {... ... }

    // // 查询符合条件的和
    // public function query_sum($condition = array(), $join = array(), $sum_column = '')

    // // 插入单条记录
    // public function insert_row($params) {... ... }

    // // 插入多条记录
    // public function insert_rows($params) {... ... }

    // // 更新一条或者多条记录
    // public function update_rows($params, $condition = array()) {... ... }

    // var select = function (tableName, topNumber, whereSql, params, orderSql, callBack) {//查询该表所有符合条件的数据并可以指定前几个
    //     getConnection(function (connection) {
    //         var ps = new mssql.PreparedStatement(connection);
    //         var sql = "select * from " + tableName + " ";
    //         if (topNumber != "") {
    //             sql = "select top(" + topNumber + ") * from " + tableName + " ";
    //         }
    //         sql += whereSql + " ";
    //         if (params != "") {
    //             for (var index in params) {
    //                 if (typeof params[index] == "number") {
    //                     ps.input(index, mssql.Int);
    //                 } else if (typeof params[index] == "string") {
    //                     ps.input(index, mssql.NVarChar);
    //                 }
    //             }
    //         }
    //         sql += orderSql;
    //         console.log(sql);
    //         ps.prepare(sql, function (err) {
    //             if (err)
    //                 console.log(err);
    //             ps.execute(params, function (err, recordset) {
    //                 callBack(err, recordset);
    //                 ps.unprepare(function (err) {
    //                     if (err)
    //                         console.log(err);
    //                 });
    //             });
    //         });
    //     });
    //     restoreDefaults();
    // };

    // var selectAll = function (tableName, callBack) {//查询该表所有数据
    //     getConnection(function (connection) {
    //         var ps = new mssql.PreparedStatement(connection);
    //         var sql = "select * from " + tableName + " ";
    //         ps.prepare(sql, function (err) {
    //             if (err)
    //                 console.log(err);
    //             ps.execute("", function (err, recordset) {
    //                 callBack(err, recordset);
    //                 ps.unprepare(function (err) {
    //                     if (err)
    //                         console.log(err);
    //                 });
    //             });
    //         });
    //     });
    //     restoreDefaults();
    // };

    // var add = function (addObj, tableName, callBack) {//添加数据
    //     getConnection(function (connection) {
    //         var ps = new mssql.PreparedStatement(connection);
    //         var sql = "insert into " + tableName + "(";
    //         if (addObj != "") {
    //             for (var index in addObj) {
    //                 if (typeof addObj[index] == "number") {
    //                     ps.input(index, mssql.Int);
    //                 } else if (typeof addObj[index] == "string") {
    //                     ps.input(index, mssql.NVarChar);
    //                 }
    //                 sql += index + ",";
    //             }
    //             sql = sql.substring(0, sql.length - 1) + ") values(";
    //             for (var index in addObj) {
    //                 if (typeof addObj[index] == "number") {
    //                     sql += addObj[index] + ",";
    //                 } else if (typeof addObj[index] == "string") {
    //                     sql += "'" + addObj[index] + "'" + ",";
    //                 }
    //             }
    //         }
    //         sql = sql.substring(0, sql.length - 1) + ")";
    //         ps.prepare(sql, function (err) {
    //             if (err)
    //                 console.log(err);
    //             ps.execute(addObj, function (err, recordset) {
    //                 callBack(err, recordset);
    //                 ps.unprepare(function (err) {
    //                     if (err)
    //                         console.log(err);
    //                 });
    //             });
    //         });
    //     });
    //     restoreDefaults();
    // };

    // var update = function (updateObj, whereObj, tableName, callBack) {//更新数据
    //     getConnection(function (connection) {
    //         var ps = new mssql.PreparedStatement(connection);
    //         var sql = "update " + tableName + " set ";
    //         if (updateObj != "") {
    //             for (var index in updateObj) {
    //                 if (typeof updateObj[index] == "number") {
    //                     ps.input(index, mssql.Int);
    //                     sql += index + "=" + updateObj[index] + ",";
    //                 } else if (typeof updateObj[index] == "string") {
    //                     ps.input(index, mssql.NVarChar);
    //                     sql += index + "=" + "'" + updateObj[index] + "'" + ",";
    //                 }
    //             }
    //         }
    //         sql = sql.substring(0, sql.length - 1) + " where ";
    //         if (whereObj != "") {
    //             for (var index in whereObj) {
    //                 if (typeof whereObj[index] == "number") {
    //                     ps.input(index, mssql.Int);
    //                     sql += index + "=" + whereObj[index] + " and ";
    //                 } else if (typeof whereObj[index] == "string") {
    //                     ps.input(index, mssql.NVarChar);
    //                     sql += index + "=" + "'" + whereObj[index] + "'" + " and ";
    //                 }
    //             }
    //         }
    //         sql = sql.substring(0, sql.length - 5);
    //         ps.prepare(sql, function (err) {
    //             if (err)
    //                 console.log(err);
    //             ps.execute(updateObj, function (err, recordset) {
    //                 callBack(err, recordset);
    //                 ps.unprepare(function (err) {
    //                     if (err)
    //                         console.log(err);
    //                 });
    //             });
    //         });
    //     });
    //     restoreDefaults();
    // };

    // var del = function (whereSql, params, tableName, callBack) {//删除数据
    //     getConnection(function (connection) {
    //         var ps = new mssql.PreparedStatement(connection);
    //         var sql = "delete from " + tableName + " ";
    //         if (params != "") {
    //             for (var index in params) {
    //                 if (typeof params[index] == "number") {
    //                     ps.input(index, mssql.Int);
    //                 } else if (typeof params[index] == "string") {
    //                     ps.input(index, mssql.NVarChar);
    //                 }
    //             }
    //         }
    //         sql += whereSql;
    //         ps.prepare(sql, function (err) {
    //             if (err)
    //                 console.log(err);
    //             ps.execute(params, function (err, recordset) {
    //                 callBack(err, recordset);
    //                 ps.unprepare(function (err) {
    //                     if (err)
    //                         console.log(err);
    //                 });
    //             });
    //         });
    //     });
    //     restoreDefaults();
    // };
}
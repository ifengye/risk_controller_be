/**
 * Created By brand On 2017/10/16
 */
var getConnect = require('../../mysql');// 获取数据库连接配置
import rulesSql from './rulesSql'
var Rules = function () {
};
module.exports = Rules;
Rules.getRules = function (callback) {
    //  查询风控规则
    getConnect(rulesSql.SelectRules, callback)
};

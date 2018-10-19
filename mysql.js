'use strict';

import mysql from 'mysql';
import config from 'config-lite';
var pool = mysql.createPool(config.mysql);
exports.pool = pool;

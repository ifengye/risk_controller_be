'use strict';

module.exports = {
	port: 8001,
	mysql: {
		host:'127.0.0.1',
		port: 3306,
		user:'root',
	  password:'e3223e569',
	  database:'riskcontrol'
	},
	session: {
		name: 'SID',
		secret: 'SID',
		cookie: {
			httpOnly: true,
		    secure:   false,
		    maxAge:   365 * 24 * 60 * 60 * 1000,
		}
	}
}


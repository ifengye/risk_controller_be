'use strict';

import BaseComponent from '../prototype/baseComponent'

class Check extends BaseComponent{
	constructor(){
		super()
		this.checkAdmin = this.checkAdmin.bind(this)
	}
	async checkAdmin(req, res, next){
		const sessionId = req.cookies.SESSION;
		if (!sessionId) {
			res.send({
				status: 0,
				type: 'ERROR_SESSION',
				message: '您还没有登录',
			})
			return
		}else{
			const admin = await this.baseCheckAdmin('SESSION=' + sessionId)
			if (!admin) {
				res.send(admin)
				return
			}
		}
		next()
	}
}

export default new Check()
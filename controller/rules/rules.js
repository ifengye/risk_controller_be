'use strict';

import RulesModel from '../../models/rules/rules'

class Rules {
	constructor(){

	}
	async getRules(req, res, next){
		try{
			RulesModel.getRules(function(err, result) {
				if (err){
            res.json(err);
        }
        if (res){
           res.json(result)
        }
			})
		}catch(err){
		}
	}
}

export default new Rules()
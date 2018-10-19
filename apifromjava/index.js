import config from 'config-lite';
const ApiFromJava = {
	//调用资管平台接口判断用户是否已登录，以及是否有权限访问该接口
	checkIsAdmin: config.domain + '/api/asset/positions/1/sub-positions/count'
}

module.exports= ApiFromJava;
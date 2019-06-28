var path=require('path');

module.exports={
	'build':{
		env:require('./pro.env.js'),
		index:path.resolve(__dirname,'../static/index.html'),
		
	},
	'dev':{
		
	}
}

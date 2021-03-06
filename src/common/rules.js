import axios from 'axios';
console.log(axios)

const validatePhone = (rule, value, callback) => {
	let patter = new RegExp("^1[0-9]{10}$"); //简单验证11位手机号
	if(!patter.test(value)) {
		return callback(new Error("请输入正确格式的手机号！"));
	} else {
		callback(); //必须有此项回调，否则验证会一直不通过
	}
};
const validateNumber = (rule, value, callback) => {
	let patter = new RegExp("^[0-9]{1,}$");
	if(!patter.test(value)) {
		return callback(new Error("请输入正确格式的手机号！"));
	} else {
		callback(); //必须有此项回调，否则验证会一直不通过
	}
};
const validateEmail = (rule, value, callback) => {
	let patter = new RegExp("^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$");
	if(!patter.test(value)) {
		return callback(new Error("请输入正确格式的手机号！"));
	} else {
		callback(); //必须有此项回调，否则验证会一直不通过
	}
};
const checkUser = (rule, value, callback) => {
	axios.post('http://192.168.0.103:8000/api/check_register', {
			user: value
		})
		.then(function(response) {
			console.log(response.data.status_code);
			if(response.data.status_code === 409) {
				return callback("手机号已被注册");
				//return callback(new Error("请输入正确格式的手机号！"));
			} else {
				callback()
				//return callback(new Error("请输入正确格式的手机号！"));
			}
		})
		.catch(function(error) {
			callback(new Error('服务异常'))
		});
};
const validatePassword = (rule, value, callback) => {
	let patter = new RegExp("^[a-zA-z0-9]{6,16}$");
	if(!patter.test(value)) {
		return callback(new Error("请输入正确格式的手机号！"));
	} else {
		callback(); //必须有此项回调，否则验证会一直不通过
	}
};
const validateName = (rule, value, callback) => {
	let patter = new RegExp("^[a-zA-z0-9]{1,128}$");
	if(!patter.test(value)) {
		return callback(new Error("请输入正确格式的手机号！"));
	} else {
		callback(); //必须有此项回调，否则验证会一直不通过
	}
};
export default {
	common: {
		phone: [{
			required: true,
			//trigger: "blur",
			message: "手机号不能为空"
		}, {
			validator: validatePhone,
			//trigger: "blur",
			message: "手机号格式错误"
		}/*, {
			validator: checkUser,
			message: "手机号已经被注册"
		}*/],
		emailcode: [{
			required: true,
			trigger: "blur",
			message: "邮箱验证码不能为空"
		}, {
			validator: validateNumber,
			trigger: "blur",
			message: "邮箱验证码格式错误"
		}],
		code: [{
			required: true,
			trigger: "blur",
			message: "验证码不能为空"
		}, {
			validator: validateNumber,
			trigger: "blur",
			message: "验证码格式错误"
		}],
		email: [{
			required: true,
			trigger: "blur",
			message: "邮箱不能为空"
		}, {
			type: 'email',
			message: '邮箱地址格式错误',
			trigger: ['blur']
		}],
		name: [{
			required: true,
			trigger: "blur",
			message: "名称不能为空"
		}, {
			validator: validateName,
			trigger: "blur",
			message: "名称由字母数字组成，"
		}],
		password: [{
			required: true,
			message: "密码不能为空"
		}, {
			validator: validatePassword,
			trigger: "blur",
			message: "密码为6-16位数字和英文组合"
		}],
		resetpass: [{
			required: true,
			message: "密码不能为空"
		}, {
			validator: validatePassword,
			trigger: "blur",
			message: "密码为6-16位数字和英文组合"
		}],
		lastpass: [{
			required: true,
			message: "密码不能为空"
		}, {
			validator: validatePassword,
			trigger: "blur",
			message: "密码为6-16位数字和英文组合"
		}]
	}
}
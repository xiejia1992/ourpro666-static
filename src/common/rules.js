const validatePhone = (rule, value, callback) => {
	let patter = new RegExp("^1[0-9]{10}$"); //简单验证11位手机号
	if(!patter.test(value)) {
		return callback(new Error("请输入正确格式的手机号！"));
	} else {
		callback(); //必须有此项回调，否则验证会一直不通过
	}
};
const validateName = (rule, value, callback) => {
	let patter = new RegExp("^[a-zA-z0-9]{1,128}$"); //简单验证11位手机号
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
			message: "手机号不能为空"
		}, {
			validator: validatePhone,
			trigger: "blur",
			message: "请输入正确的证件号"
		}],
		name: [{
			required: true,
			message: "名称不能为空"
		}, {
			validator: validateName,
			message: "名称由字母数字组成，小于128个字符"
		}],
		password: [{
			required: true,
			message: "密码不能为空"
		}, {
			validator: validateName,
			message: "密码由字母数字组成，小于128个字符"
		}]
	}
}
//*************************************判断对象类型****************************//
export const identify = (param, val) => ({
	'string': '[object String]',
	'number': '[object Number]',
	'boolean': '[object Boolean]',
	'array': '[object Array]',
	'object': '[object Object]',
	'function': '[object Function]',
	'null': '[object Null]',
	'undefined': '[object Undefined]',
	'date': '[object Date]',
	'exp': '[object RegExp]',
	'promise': '[object Promise]',
	'symbol': '[object Symbol]'
} [val] === Object.prototype.toString.call(param));
//*************************************正则验证****************************//
export const checkReg = (type, no) => {
	var pattern;
	switch (type) {
		case 'phone':
			pattern = /^1[345789]\d{9}$/;
			break;
		case 'mail':
			pattern = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
			break;
		case 'number': //数字
			pattern = /^(\d*\.)?\d+$/;
			break;
		case 'integer': //正整数
			pattern = /^[0-9]*[1-9][0-9]*$/;
			break;
	}
	return pattern && pattern.test(no) || false
}
//*************************************vue对象深度复制****************************//
export const deepCopy = (item) => {
	let Tidai = null;
	if (identify(item, 'object')) {
		let str = JSON.stringify(item);
		str = JSON.parse(str);
		Tidai = str;
	} else {
		let jsona = {};
		jsona.item = item;
		let str = JSON.stringify(jsona);
		str = JSON.parse(str);
		Tidai = str.item;
	}
	return Tidai;
}
//********************************深拷贝**************************************************//


export const sourceCopy = (source, fileds) => {
	if (identify(source, 'array') || identify(source, 'object')) {
		let data = Array.isArray(source) ? [] : {};
		for (let [filed, value] of Object.entries(source)) {
			if (Array.isArray(fileds)) {
				//根据自定义字段进行深拷贝
				fileds.includes(filed) && (data[filed] = sourceCopy(value, fileds))
			} else if (identify(fileds, 'object')) {
				//根据定义的键名做判断对深拷贝进行处理
				for (let [key, val] of Object.entries(fileds)) {
					if (key === filed) {
						if (val instanceof Function) {
							data[filed] = val(value, fileds)
						} else if (val) {
							//实行深拷贝，在不需要fileds控制
							data[filed] = sourceCopy(value)
						}
					}
				}
			} else {
				data[filed] = sourceCopy(value)
			}
		}
		return data
	} else {
		return source
	}
}
//**************************判断是否为空 为空true 不为空false********************//
export const isNull = (val, boo) => {
	//布尔值类型不属于排除的范畴直接返回
	if (identify(val, 'boolean')) return false;
	//过滤需要匹配的项
	if ([null, undefined].includes(val) || Object.is(val, NaN)) return true;
	//需要判断是否为空字符串，“”
	if (boo && val === '') return true;
	//都不成立则说明不为空
	return false
}
//***********************简易合并,把b的属性合并到a*******************************//
export const toMerge = (a, b) => {
	if (b)
		for (let idx in b) {
			a[idx] = b[idx]
		}
	return a
}
/*********************************************
 * 针对对象中levelName分类并操作
 * 删除 delete 
 * 获取 get
 * 覆盖赋值 cover
 * 合并赋值 merge
 ********************************************/
export const handleClass = (obj, levelName, hand = 'get', values) => {
	if (obj && identify(obj, 'object')) {
		let result = {}
		for (let [key, value] of Object.entries(obj)) {
			let arr = key.split('&')
			if (arr.length === 2) {
				if (arr[0] === levelName.toString()) {
					let filed = arr[1]
					if (hand === 'delete') {
						delete obj[key]
					}
					if (values) {
						if (hand === 'cover') {
							obj[key] = values[filed]
						}
						if (hand === 'merge') {
							if (isNull(values[filed])) {
								//当为空值则不需要覆盖										
							} else {
								obj[key] = values[filed]
							}
						}
					}
					result[filed] = value
				}
			}
		}
		return result
	}
}
//************************从对象中获取指定字段的类容****************************//
export const getAssigned = (values, fileds, callback) => {
	let params = {}
	if (fileds.every(filed => {
			let getFiled = filed
			let setFiled = filed
			//当为数组 ，及两个参数 第一个为提取字段 第二个为赋值字段
			if (Array.isArray(filed)) {
				getFiled = filed[0]
				setFiled = filed[1]
			}
			if (values.hasOwnProperty(getFiled)) {
				params[setFiled] = values[getFiled]
				return true
			} else {
				return false
			}
		})) {
		//提供的字段都找到了对应的值
		callback && callback(params, false)
	} else {
		//提供的字段找到了部分对应的值
		callback && callback(params, false)
	}
}
//****************************获取cookie***************************//
export const getCookie = function(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}
//****************************写cookie***************************//
export const setCookie = function(name, value, Days = 30) {
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}
//*************************************去除前后空格****************************//
export const toTrim = function(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
//*************************************去除所有空格****************************//
export const clearAllKong = function(str) {
	let cc = null;
	try {
		cc = str.replace(/\s+/g, "");
	} catch (e) {
		cc = str;
	}
	return cc;
}
//***********************sessionStorage**********************************************//
export const session = function(key, value) {
	if (value === void(0)) {
		var lsVal = sessionStorage.getItem(key);
		if (lsVal && lsVal.indexOf('autostringify-') === 0) {
			return JSON.parse(lsVal.split('autostringify-')[1]);
		} else {
			return lsVal;
		}
	} else {
		if (typeof(value) === "object" || Array.isArray(value)) {
			value = 'autostringify-' + JSON.stringify(value);
		}
		return sessionStorage.setItem(key, value);
	}
}

//****************************生成随机数********************************************//
export const getUUID = function(len) {
	len = len || 6;
	len = parseInt(len, 10);
	len = isNaN(len) ? 6 : len;
	var seed = "0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ";
	var seedLen = seed.length - 1;
	var uuid = "";
	while (len--) {
		uuid += seed[Math.round(Math.random() * seedLen)];
	}
	return uuid;
};



//***************************数字转化为中文******************************
export const numToChinese = num => {
	var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
	var chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
	var chnUnitChar = ["", "十", "百", "千"];
	var unitPos = 0;
	var strIns = '',
		chnStr = '';
	var needZero = false;

	if (num === 0) {
		return chnNumChar[0];
	}

	while (num > 0) {
		var section = num % 10000;
		if (needZero) {
			chnStr = chnNumChar[0] + chnStr;
		}
		strIns = SectionToChinese(section);
		strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
		chnStr = strIns + chnStr;
		needZero = (section < 1000) && (section > 0);
		num = Math.floor(num / 10000);
		unitPos++;
	}

	return chnStr;
}
//********************阿拉伯数字转换成大写汉字 钱****************************//
export const numToMoney = money => {
	//汉字的数字
	var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
	//基本单位
	var cnIntRadice = new Array('', '拾', '佰', '仟');
	//对应整数部分扩展单位
	var cnIntUnits = new Array('', '万', '亿', '兆');
	//对应小数部分单位
	var cnDecUnits = new Array('角', '分', '毫', '厘');
	//整数金额时后面跟的字符
	var cnInteger = '整';
	//整型完以后的单位
	var cnIntLast = '圆';
	//最大处理的数字
	var maxNum = 999999999999999.9999;
	//金额整数部分
	var integerNum;
	//金额小数部分
	var decimalNum;
	//输出的中文金额字符串
	var chineseStr = '';
	//分离金额后用的数组，预定义
	var parts;
	if (money == '') {
		return '';
	}
	money = parseFloat(money);
	if (money >= maxNum) {
		//超出最大处理数字
		return '';
	}
	if (money == 0) {
		chineseStr = cnNums[0] + cnIntLast + cnInteger;
		return chineseStr;
	}
	//转换为字符串
	money = money.toString();
	if (money.indexOf('.') == -1) {
		integerNum = money;
		decimalNum = '';
	} else {
		parts = money.split('.');
		integerNum = parts[0];
		decimalNum = parts[1].substr(0, 4);
	}
	//获取整型部分转换
	if (parseInt(integerNum, 10) > 0) {
		var zeroCount = 0;
		var IntLen = integerNum.length;
		for (var i = 0; i < IntLen; i++) {
			var n = integerNum.substr(i, 1);
			var p = IntLen - i - 1;
			var q = p / 4;
			var m = p % 4;
			if (n == '0') {
				zeroCount++;
			} else {
				if (zeroCount > 0) {
					chineseStr += cnNums[0];
				}
				//归零
				zeroCount = 0;
				chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
			}
			if (m == 0 && zeroCount < 4) {
				chineseStr += cnIntUnits[q];
			}
		}
		chineseStr += cnIntLast;
	}
	//小数部分
	if (decimalNum != '') {
		var decLen = decimalNum.length;
		for (var i = 0; i < decLen; i++) {
			var n = decimalNum.substr(i, 1);
			if (n != '0') {
				chineseStr += cnNums[Number(n)] + cnDecUnits[i];
			}
		}
	}
	if (chineseStr == '') {
		chineseStr += cnNums[0] + cnIntLast + cnInteger;
	} else if (decimalNum == '') {
		chineseStr += cnInteger;
	}
	return chineseStr;
}

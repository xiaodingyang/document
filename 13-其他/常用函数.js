export default{
    // ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
    // ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 格式化时间 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
    // ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
    dateFormat = (time, format) => {
        let dd = new Date(time);
        var o = {
          M: dd.getMonth() + 1, // 月份
          d: dd.getDate(), // 日
          h: dd.getHours(), // 小时
          H: dd.getHours(), // 小时
          m: dd.getMinutes(), // 分
          s: dd.getSeconds() // 秒
        };
        // 年，不区分大小写
        if (/(y+)/i.test(format)) {
          // RegExp这个对象会在我们调用了正则表达式的方法后, 自动将最近一次的结果保存在里面, 所以如果我们在使用正则表达式时, 有用到分组, 那么就可以直接在调用完以后直接使用RegExp.$xx来使用捕获到的分组内容
          format = format.replace(RegExp.$1, dd.getFullYear());
        }
        for (var k in o) {
          if (new RegExp(`(${k}+)`).test(format)) {
            format = format.replace(
              RegExp.$1,
              ("00" + o[k]).slice(("" + o[k]).length)
            );
          }
        }
        return format;
      },
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 获得本周起止时间 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
   getCurrentWeek = function () {
    //获取当前时间 
    var currentDate = new Date();
    //返回date是一周中的某一天 
    var week = currentDate.getDay();

    //一天的毫秒数 
    var millisecond = 1000 * 60 * 60 * 24;
    //减去的天数 
    var minusDay = week != 0 ? week - 1 : 6;
    //alert(minusDay); 
    //本周 周一 
    var monday = new Date(currentDate.getTime() - (minusDay * millisecond));
    //本周 周日 
    var sunday = new Date(monday.getTime() + (6 * millisecond));
    //返回 
    return [monday,sunday];
},
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 获得本月的起止时间 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
    getCurrentMonth = function () {
    //起止日期数组 
    var startStop = new Array();
    //获取当前时间 
    var currentDate = new Date();
    //获得当前月份0-11 
    var currentMonth = currentDate.getMonth();
    //获得当前年份4位年 
    var currentYear = currentDate.getFullYear();
    //求出本月第一天 
    var firstDay = new Date(currentYear, currentMonth, 1);


    //当为12月的时候年份需要加1 
    //月份需要更新为0 也就是下一年的第一个月 
    if (currentMonth == 11) {
        currentYear++;
        currentMonth = 0; //就为 
    } else {
        //否则只是月份增加,以便求的下一月的第一天 
        currentMonth++;
    }


    //一天的毫秒数 
    var millisecond = 1000 * 60 * 60 * 24;
    //下月的第一天 
    var nextMonthDayOne = new Date(currentYear, currentMonth, 1);
    //求出上月的最后一天 
    var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);

    //添加至数组中返回 
    startStop.push(firstDay);
    startStop.push(lastDay);
    //返回 
    return startStop;
},
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 得到本年的起止日期 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
    getCurrentYear = function () {
    //起止日期数组 
    var startStop = new Array();
    //获取当前时间 
    var currentDate = new Date();
    //获得当前年份4位年 
    var currentYear = currentDate.getFullYear();

    //本年第一天 
    var currentYearFirstDate = new Date(currentYear, 0, 1);
    //本年最后一天 
    var currentYearLastDate = new Date(currentYear, 11, 31);
    //添加至数组 
    startStop.push(currentYearFirstDate.format("yyyy-MM-dd"));
    startStop.push(currentYearLastDate.format("yyyy-MM-dd"));
    //返回 
    return startStop;
},
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 判断对象类型 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
 identify = (param, val) => ({
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
} [val] === Object.prototype.toString.call(param)),
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 正则验证 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
checkReg = (type, no) => {
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
},
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 深度克隆 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
sourceCopy = (source, fileds) => {
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
},
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 数字转换为中文 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
numToChinese = num => {
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
},
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 数组去重 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
uniq = array => {
    var temp = []; //一个新的临时数组
    for (var i = 0; i < array.length; i++) {
      if (temp.indexOf(array[i]) === -1) {
        temp.push(array[i]);
      }
    }
    return temp;
  }
}


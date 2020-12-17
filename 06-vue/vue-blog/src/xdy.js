export default{
  //* *************************************日期格式化**************************************************//
  dateFormat (time, format) {
    let dd = new Date(time)
    var o = {
      'M': dd.getMonth() + 1, // 月份
      'd': dd.getDate(), // 日
      'h': dd.getHours(), // 小时
      'H': dd.getHours(), // 小时
      'm': dd.getMinutes(), // 分
      's': dd.getSeconds() // 秒
    }
    // 年，不区分大小写
    if (/(y+)/i.test(format)) {
      // RegExp这个对象会在我们调用了正则表达式的方法后, 自动将最近一次的结果保存在里面, 所以如果我们在使用正则表达式时, 有用到分组, 那么就可以直接在调用完以后直接使用RegExp.$xx来使用捕获到的分组内容
      format = format.replace(RegExp.$1, dd.getFullYear())
    }
    for (var k in o) {
      if (new RegExp(`(${k}+)`).test(format)) {
        format = format.replace(RegExp.$1, ('00' + o[k]).slice(('' + o[k]).length))
      }
    }
    return format
  },
  //* *************************************获得本周起止时间**************************************************//
  /*
  @ format: 返回时间格式 默认返回日期对象
  */
  getCurrentWeek  (format) {
    var currentDate = new Date() // 获取当前时间
    var week = currentDate.getDay() // 返回一周中的某一天，如周五就是5
    var millisecond = 1000 * 60 * 60 * 24 // 一天的毫秒数
    var minusDay = week !== 0 ? week - 1 : 6 // 减去的天数
    var monday = new Date(currentDate.getTime() - (minusDay * millisecond)) // 本周 周一
    var sunday = new Date(monday.getTime() + (6 * millisecond)) // 本周 周日
    // 返回
    if (format) {
      return [monday, sunday].map(item => this.dateFormat(item, format))
    }
    return [monday, sunday]
  },
  //* *************************************获得本月的起止时间**************************************************//
  getCurrentMonth (format) {
    var startStop = [] // 起止日期数组
    var currentDate = new Date() // 获取当前时间
    var currentMonth = currentDate.getMonth() // 获得当前月份0-11
    var currentYear = currentDate.getFullYear() // 获得当前年份4位年
    var firstDay = new Date(currentYear, currentMonth, 1) // 求出本月第一天

    // 当为12月的时候年份需要加1 月份需要更新为0 也就是下一年的第一个月
    if (currentMonth === 11) {
      currentYear++
      currentMonth = 0 // 就为
    } else {
      // 否则只是月份增加,以便求的下一月的第一天
      currentMonth++
    }

    // 一天的毫秒数
    var millisecond = 1000 * 60 * 60 * 24
    // 下月的第一天
    var nextMonthDayOne = new Date(currentYear, currentMonth, 1)
    // 求出上月的最后一天
    var lastDay = new Date(nextMonthDayOne.getTime() - millisecond)

    // 添加至数组中返回
    startStop.push(firstDay)
    startStop.push(lastDay)
    // 返回
    if (format) {
      return startStop.map(item => this.dateFormat(item, format))
    }
    return startStop
  },
  //* *************************************得到本年的起止日期**************************************************//
  getCurrentYear (format) {
    // 起止日期数组
    var startStop = []
    // 获取当前时间
    var currentDate = new Date()
    // 获得当前年份4位年
    var currentYear = currentDate.getFullYear()

    // 本年第一天
    var currentYearFirstDate = new Date(currentYear, 0, 1)
    // 本年最后一天
    var currentYearLastDate = new Date(currentYear, 11, 31)
    // 添加至数组
    startStop.push(currentYearFirstDate.format('yyyy-MM-dd'))
    startStop.push(currentYearLastDate.format('yyyy-MM-dd'))
    // 返回
    if (format) {
      return startStop.map(item => this.dateFormat(item, format))
    }
    return startStop
  }
}

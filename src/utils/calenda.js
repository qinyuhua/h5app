import moment from 'moment';

let CalendarData = new Array(100);
const madd = new Array(12);
const tgString = "甲乙丙丁戊己庚辛壬癸";
const dzString = "子丑寅卯辰巳午未申酉戌亥";
const numString = "一二三四五六七八九十";
const numZeroString = "零一二三四五六七八九十";
const monString = "正二三四五六七八九十冬腊";
const weekString = "日一二三四五六";
const sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
let cYear,
  cMonth,
  cDay,
  TheDate;

CalendarData = new Array(0xA4B,0x5164B,0x6A5,0x6D4,0x415B5,0x2B6,0x957,0x2092F,0x497,0x60C96,
  0xD4A,0xEA5,0x50DA9,0x5AD,0x2B6,0x3126E, 0x92E,0x7192D,0xC95,0xD4A,0x61B4A,0xB55,0x56A,
  0x4155B, 0x25D,0x92D,0x2192B,0xA95,0x71695,0x6CA,0xB55,0x50AB5,0x4DA,0xA5B,0x30A57,0x52B,
  0x8152A,0xE95,0x6AA,0x615AA,0xAB5,0x4B6,0x414AE,0xA57,0x526,0x31D26,0xD95,0x70B55,0x56A,
  0x96D,0x5095D,0x4AD,0xA4D,0x41A4D,0xD25,0x81AA5,0xB54,0xB6A,0x612DA,0x95B,0x49B,0x41497,
  0xA4B,0xA164B, 0x6A5,0x6D4,0x615B4,0xAB6,0x957,0x5092F,0x497,0x64B, 0x30D4A,0xEA5,0x80D65,
  0x5AC,0xAB6,0x5126D,0x92E,0xC96,0x41A95,0xD4A,0xDA5,0x20B55,0x56A,0x7155B,0x25D,0x92D,
  0x5192B,0xA95,0xB4A,0x416AA,0xAD5,0x90AB5,0x4BA,0xA5B, 0x60A57,0x52B,0xA93,0x40E95);
madd[0] = 0;
madd[1] = 31;
madd[2] = 59;
madd[3] = 90;
madd[4] = 120;
madd[5] = 151;
madd[6] = 181;
madd[7] = 212;
madd[8] = 243;
madd[9] = 273;
madd[10] = 304;
madd[11] = 334;


/**
 * >> 有符号右移运算
 * @param m
 * @param n
 * @returns {number}
 * @constructor
 */
function GetBit(m, n) {
  return (m >> n) & 1;
}

/**
 * 判断是闰年还是平年
 * 阳历平年365天，农历平年354天或355天，极少数为353天。
 * @arguments 参数，
 */
function e2c() {
  TheDate= (arguments.length !== 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]); // 时间
  let total, m, n, k;
  let isEnd = false;
  // 年份
  let tmp = TheDate.getYear();
  if(tmp < 1900) tmp += 1900;
  total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

  if(TheDate.getYear() % 4 === 0 && TheDate.getMonth() > 1) {
    total ++;
  }
  for(m = 0;;m++) {
    k =(CalendarData[m] < 0xfff) ? 11 : 12;
    for(n = k;n >= 0;n--){
      if(total <= 29 + GetBit(CalendarData[m],n)){
        isEnd = true; break;
      }
      total = total - 29 - GetBit(CalendarData[m],n);
    }
    if(isEnd) break;
  }
  cYear = 1921 + m;
  cMonth = k - n + 1;
  cDay = total;
  if(k === 12){
    if(cMonth === Math.floor(CalendarData[m] / 0x10000) + 1){
      cMonth = 1 - cMonth;
    }
    if(cMonth > Math.floor(CalendarData[m] / 0x10000) + 1){
      cMonth--;
    }
  }
}

function GetcDateObj(){
  const tmpObj = {};
  tmpObj.yearString = tgString.charAt((cYear - 4) % 10) + dzString.charAt((cYear - 4) % 12);
  tmpObj.sx = sx.charAt((cYear - 4) % 12);
  let yearStr = '';
  let month = '';
  for (let y of (cYear + '')) {
    yearStr += numZeroString.charAt(parseInt(y, 10));
  }
  yearStr += '年';

  if(cMonth < 1){
    month += "(闰)";
    month += monString.charAt(-cMonth - 1);
  } else {
    month += monString.charAt(cMonth - 1);
  }
  tmpObj.month = `${month}月`;
  let day = '';
  day += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : (cDay === 20 ? '二十' : ((cDay < 30) ? "廿" : "三十")));

  if (cDay % 10 !== 0 || cDay === 10){
    day += numString.charAt((cDay - 1) % 10);
  }
  tmpObj.key = yearStr + tmpObj.month + day;
  if (day === '初一') {
    day = `${month}月`;
  }

  tmpObj.day = day;

  tmpObj.date = tmpObj.month + day;
  tmpObj.yldateFormat = moment(TheDate).format('YYYY年MM月DD日'); // 阳历
  tmpObj.nldateFormat = yearStr + tmpObj.month + day; // 农历

  // console.log(tmpObj);
  return tmpObj;
}

/**
 * 通过传入的年月日获取阴历时间，例如： 2020-04-26 获取相对应的阴历：二零二零年四月初四
 * @param solarYear 年份
 * @param solarMonth 月份
 * @param solarDay 日
 * @returns {string} 返回
 * @constructor
 */
export const  GetLunarDay = (solarYear,solarMonth,solarDay) => {
  // console.log(solarYear,solarMonth,solarDay);
  if(solarYear < 1921){
    return "";
  }else{
    solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
    e2c(solarYear,solarMonth,solarDay);
    return GetcDateObj();
  }
}


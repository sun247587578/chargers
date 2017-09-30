/**
 * Created by jiachenpan on 16/11/18.
 */

 export function parseTime(time, cFormat) {
   if (arguments.length === 0) {
     return null;
   }
   const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
   let date;
   if (typeof time == 'object') {
     date = time;
   } else {
     if (('' + time).length === 10) time = parseInt(time) * 1000;
     date = new Date(time);
   }
   const formatObj = {
     y: date.getFullYear(),
     m: date.getMonth() + 1,
     d: date.getDate(),
     h: date.getHours(),
     i: date.getMinutes(),
     s: date.getSeconds(),
     a: date.getDay()
   };
   const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
     let value = formatObj[key];
     if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
     if (result.length > 0 && value < 10) {
       value = '0' + value;
     }
     return value || 0;
   });
   return time_str;
 }

 export function formatTime(time, option) {
   time = +time * 1000;
   const d = new Date(time);
   const now = Date.now();

   const diff = (now - d) / 1000;

   if (diff < 30) {
     return '刚刚'
   } else if (diff < 3600) { // less 1 hour
     return Math.ceil(diff / 60) + '分钟前'
   } else if (diff < 3600 * 24) {
     return Math.ceil(diff / 3600) + '小时前'
   } else if (diff < 3600 * 24 * 2) {
     return '1天前'
   }
   if (option) {
     return parseTime(time, option)
   } else {
     return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
   }
 }


 export function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
 
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
 
  return [year, month, day].join('-');
}



export function DiffLong(difference) {
  //计算出当前时间戳的小时
  var thishours = Math.floor(difference / ( 60 * 60*1000));

  difference = difference - thishours * ( 60 * 60*1000);
  var thisMins = Math.floor(difference / ( 60*1000));

  difference = difference - thisMins * ( 60*1000);
  var thisSecs = Math.floor(difference);
  var strRet ="";
  
  if(thishours!=0){
    strRet+=thishours+'小时'+thisMins+'分钟';
  }
  return strRet;
}


export function fmtDate(fmt) {         
  var o = {         
  "M+" : this.getMonth()+1, //月份         
  "d+" : this.getDate(), //日         
  "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
  "H+" : this.getHours(), //小时         
  "m+" : this.getMinutes(), //分         
  "s+" : this.getSeconds(), //秒         
  "q+" : Math.floor((this.getMonth()+3)/3), //季度         
  "S" : this.getMilliseconds() //毫秒         
  };         
  var week = {         
  "0" : "/u65e5",         
  "1" : "/u4e00",         
  "2" : "/u4e8c",         
  "3" : "/u4e09",         
  "4" : "/u56db",         
  "5" : "/u4e94",         
  "6" : "/u516d"        
  };         
  if(/(y+)/.test(fmt)){         
      fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
  }         
  if(/(E+)/.test(fmt)){         
      fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
  }         
  for(var k in o){         
      if(new RegExp("("+ k +")").test(fmt)){         
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
      }         
  }         
  return fmt;         
}       


//自己结合项目写的 , 回显的时候用来将数据格式化为要提交的时候的数据
// obj1 是要提交的数据 obj2 是返回回来的数据,也就是要拷贝的数据
export function copeObj(obj1,obj2){
  if(typeof obj1 !== 'object' ||typeof obj2 !== 'object'){
      return
  }
  let obj =  Object.assign({} , obj2)
  let backObj = new Object
  for(var i in obj1){
      backObj[i] = obj[i]
  }
  backObj.id = obj.id
  return backObj
}
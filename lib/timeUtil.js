import moment from 'moment-timezone';

// "2024-05-31T15:35:00+09:00"; // 사용자 입력
// 2024-05-31 숫자변동가능  / 의미 : 년월일
// T 변동불가 / 의미:  이 뒤에부터는 시간(Time)값임을 알려주는 T문자
// 15:35:00 숫자변동가능 / 의미: 시분초
// +09:00 변동불가 / 의미: 앞에 들어오는 값을 모두 한국시간 기준으로 바꿔줌

const time = {
  getNow() {
    return moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
  },
  getNowDate() {
    return moment().tz('Asia/Seoul').format('YYYY-MM-DD');
  },
  getNowTime() {
    return moment().tz('Asia/Seoul').format('HH:mm:ss');
  },
  getNowYear() {
    return moment().tz('Asia/Seoul').format('YYYY');
  },
  getNowMonth() {
    return moment().tz('Asia/Seoul').format('MM');
  },
  getNowDay() {
    return moment().tz('Asia/Seoul').format('DD');
  },
  getNowHour() {
    return moment().tz('Asia/Seoul').format('HH');
  },

  changeFormat(date) {
    return moment.tz(date, "Asia/Seoul").format('YYYY-MM-DD HH:mm:ss');
  },
  changeFormatDate(date) {
    return moment().tz(date, 'Asia/Seoul').format('YYYY-MM-DD');
  },
  changeFormatTime(date) {
    return moment().tz(date, 'Asia/Seoul').format('HH:mm:ss');
  },
  changeFormatYear(date) {
    return moment().tz(date, 'Asia/Seoul').format('YYYY');
  },
  changeFormatMonth(date) {
    return moment().tz(date, 'Asia/Seoul').format('MM');
  },
  changeFormatDay(date) {
    return moment().tz(date, 'Asia/Seoul').format('DD');
  },
  changeFormatHour(date) {
    return moment().tz(date, 'Asia/Seoul').format('HH');
  },

}


// console.log(time.changeFormatDate("2024-05-31T15:35:00+09:00"));


export default time
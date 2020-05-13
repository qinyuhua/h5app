<template>
  <div class="timeBody">
    <div class="timeDiv">
      当前时间为：<span>{{moment(date).format('HH:mm:ss')}}</span>
    </div>
    <div class="timeDiv">
      当前日期为：<span>{{moment(date).format('YYYY年MM月DD日')}}</span>
    </div>
    <div class="timeDiv">
      当前阴历日期为：<span>{{moment(date).format('YYYY年MM月DD日')}}</span>
    </div>

    <div>
      <!--当前选择日期为：<span>{{currentSelectDate}}</span>-->
      当前选择日期为：<span>{{currentSelectDate.date}}</span><br />
      当前选择日期为：<span>{{currentSelectDate.calendarDate.key}}</span>
    </div>

    <div>
      <span class="month-btn" @click="handleClickLast()">上一月</span>
      <span class="month-btn" @click="handleClickNext()">下一月</span>
      <span>当前展示月份：{{moment(currentDateC).format('YYYY-MM')}}</span>
    </div>

    <div>
      <div class="week-div">
        <span v-for="item in weekString" class="week-item">{{item}}</span><br />
      </div>
      <div
          v-for="cal in calendarArr"
          class="dayDiv"
          @click="handleDate(cal)"
          :class="{
            'currentDayCss': cal.date === currentDate,
            'currentSelCss': cal.date === currentSelectDate.date,
           }"
      >
        <div class="dayDivBody">
          <span class="dayCss">{{cal.day}}</span>
          <span class="dayCalCss">{{cal.calendarDate.day}}</span>
        </div>
      </div>
    </div>
    <!--<div>-->
      <!--无日程-->
    <!--</div>-->
  </div>
</template>

<script>
  import moment from 'moment';
  import { GetLunarDay } from '@/utils/calenda';


  export default {
    data() {
      return {
        moment: moment,
        date: new Date(),
        weekString: ['一', '二', '三', '四', '五', '六', '日'],
        currentDate: moment(new Date()).format('YYYY-MM-DD'),
        currentSelectDate: {
          date: moment(new Date()).format('YYYY-MM-DD'),
          calendarDate: GetLunarDay(moment(new Date()).format('YYYY'), moment(new Date()).format('MM'), moment(new Date()).format('DD'))
        },
        // currentShowDate: {
        //   date: moment(new Date()).format('YYYY-MM-DD'),
        //   year: moment(new Date()).format('YYYY'),
        //   month: moment(new Date()).format('MM'),
        //   day: moment(new Date()).format('DD'),
        // },
        currentDateC: new Date(),
      }
    },

    computed: {
      calendarArr: function () {
        console.log('computed');
        const dateArr = [];
        const currentDate = this.currentDateC; // 当前时间
        const curYear = currentDate.getFullYear(); // 当前年份
        const curMonth = currentDate.getMonth(); // 当前月份
        const curMonthDay = new Date(curYear, curMonth + 1, 0).getDate(); // 当前月份的一个月多少天
        // console.log(curMonthDay);
        // console.log(moment(new Date(curYear, curMonth + 1, 0)).format('YYYY年MM月DD日'));
        const firstDay = new Date(curYear, curMonth, 1).getDay();
        const endDay = new Date(curYear, curMonth, curMonthDay).getDay();
        const allDay = curMonthDay + firstDay + endDay;

        const startTime = new Date(curYear, curMonth, 1) - (firstDay - 1) * 24 * 60 * 60 * 1000;
        for (let i = 0; i < allDay; i ++) {
          const dateObj = new Date(startTime + i * 24 * 60 * 60 * 1000);
          dateArr.push({
            date: moment(dateObj).format('YYYY-MM-DD'),
            year: moment(dateObj).format('YYYY'),
            month: moment(dateObj).format('MM'),
            day: dateObj.getDate(),
            calendarDate: GetLunarDay(moment(dateObj).format('YYYY'), moment(dateObj).format('MM'), dateObj.getDate())
          })
        }
        // console.log(firstDay);
        console.log(dateArr);
        return dateArr;
      },
      currentShowDate: function () {
        const current = this.currentDateC;
        const obj = {
          date: moment(current).format('YYYY-MM-DD'),
          year: moment(current).format('YYYY'),
          month: moment(current).format('MM'),
          day: moment(current).format('DD'),
        };
        console.log(obj);
        return obj;

      }
    },
    methods: {
      handleDate(obj) {
        console.log(obj);
        console.log(this.calendarArr);
        this.currentSelectDate = obj;
        if (this.currentShowDate.year !== obj.year || this.currentShowDate.month !== obj.month) {
          this.currentDateC = new Date(obj.year, parseInt(obj.month) - 1, obj.day);
        }
      },
      handleClickLast() {
        const current = this.currentDateC;
        let curYear = current.getFullYear(); // 当前年份
        let curMonth = current.getMonth(); // 当前月份
        console.log(curMonth);
        if (curMonth === 0) {
          curYear -= 1;
          curMonth = 12;
        }
        this.currentDateC = new Date(curYear, parseInt(curMonth) - 1, 1);
      },
      handleClickNext() {
        const current = this.currentDateC;
        let curYear = current.getFullYear(); // 当前年份
        let curMonth = current.getMonth(); // 当前月份
        console.log(curMonth);
        if (curMonth === 11) {
          curYear += 1;
          curMonth = -1;
        }
        this.currentDateC = new Date(curYear, parseInt(curMonth) + 1, 1);
      }
    },
    mounted() {
      // setInterval(() => {
      //   this.date = new Date();
      // }, 20);
      // console.log(1, new Date().getTime());
      console.log(GetLunarDay(2020, 4, 17));
    },

  }
</script>

<style lang="scss" scoped>
  .timeBody {
    background-color: #fff;
    min-height: 100%;
    font-size: 30px;
    color: #000;
  }
  .timeDiv {
    line-height: 50px;
  }
  .month-btn {
    display: inline-block;
    padding: 10px 10px;
    border-radius: 5px;
    border: 1px solid #8D8D8D;
    margin: 10px;
    /*cursor: pointer;*/
  }
  .week-div {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #CECECE;
    margin-bottom: 10px;
    font-size: 20px;
  }
  .week-item {
    display: inline-block;
    width: 14.2%;
    text-align: center;
  }
  .dayDiv {
    display: inline-block;
    width: 14.2%;
    height: 100px;
    text-align: center;
    border-radius: 3px;
  }
  /*.dayDiv:hover {*/
    /*background-color: #fff0f0;*/
  /*}*/
  .dayDivBody {
    padding: 15px 0;
  }
  .dayCss {
    display: block;
    font-weight: 600;
  }
  .dayCalCss {
    /*color: #8D8D8D;*/
    font-size: 25px;
  }
  .currentDayCss {
    border-bottom: 2px solid #f00;
    color: #f00 !important;
  }
  .currentSelCss {
    background-color: #ffd0d0;

  }
</style>

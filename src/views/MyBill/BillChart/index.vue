<template>
  <div class="chart-layout">
    <div class="type">
      <div
          :class="{
            'month': true,
            'active': type === 'month'
          }"
          @click="changeType('month')"
      >
        月报
      </div>
      <div
          :class="{
            'month': true,
            'active': type === 'year'
          }"
          @click="changeType('year')"
      >
        年报
      </div>
    </div>
    <div v-if="type === 'month'" class="date" @click="clickDate">
      {{moment(curDate).format('YYYY年MM月')}}
      <van-icon name="arrow-down" />
    </div>

    <van-action-sheet
        v-model="showDate"
        :closeable="false"
    >
      <van-datetime-picker
          v-model="curNowDate"
          type="year-month"
          title="选择年月日"
          :formatter="formatter"
          @cancel="cancel"
          @confirm="confirm"
          @change="changeDate"
      />
    </van-action-sheet>

    <div class="percen">
      <div
          class="alread"
          :style="{ 'width': `${allPay.payAmount / (type === 'year' ? curallMonthBud : allPay.monthBudgetAmount) * 100}%`}"
      />
    </div>
    <div class="percenVal">
      <span
          class="colorRed"
          v-if="allPay.payAmount > (type === 'year' ? curallMonthBud : allPay.monthBudgetAmount)"
      >
        已超预算
      </span>
      <span v-else>
        {{`${numToFixedTwo(allPay.payAmount / (type === 'year' ? curallMonthBud : allPay.monthBudgetAmount) * 100)}%预算已用`}}
      </span>
      <span>&yen;{{numToFixedTwoAndFormat(type === 'year' ? curallMonthBud : allPay.monthBudgetAmount)}}预算</span>
      <span
          :class="{
            'colorRed': isExceed,
          }"
      >
        {{ allPay.payAmount > (type === 'year' ? curallMonthBud : allPay.monthBudgetAmount) ? '已超' : '剩余'}}&yen;
        {{numToFixedTwoAndFormat(Math.abs((type === 'year' ? curallMonthBud : allPay.monthBudgetAmount) - allPay.payAmount))}}
      </span>
    </div>

    <div class="payinfo">
      <div class="left">
        <div>
          {{type==='month' ? `${parseInt(this.curDate.getMonth() + 1, 10)}月总支出` : `${parseInt(this.curDate.getFullYear(), 10)}年总支出`}}
        </div>
        <div class="money">
          <span>&yen;</span>
          <span class="amt">{{numToFixedTwoAndFormat(allPay.payAmount)}}</span>
        </div>
      </div>
      <div class="left">
        <div>
          {{type==='month' ? `${parseInt(this.curDate.getMonth() + 1, 10)}月总收入` : `${parseInt(this.curDate.getFullYear(), 10)}年总收入`}}
        </div>
        <div class="money">
          <span>&yen;</span>
          <span class="amt">{{numToFixedTwoAndFormat(allPay.incomeAmount)}}</span>
        </div>
      </div>
    </div>

    <div class="payinfo">
      <div class="left">
        <div>
          结余（元）
        </div>
        <div class="money">
          <span>&yen;</span>
          <span class="amt">{{numToFixedTwoAndFormat(allPay.incomeAmount - allPay.payAmount)}}</span>
        </div>
      </div>
      <div class="left">
        <div
            :class="{
              'colorRed': isExceed,
            }"
        >
          {{isExceed ? '已超预算' : '剩余预算'}}
        </div>
        <div
            :class="{
              'colorRed': isExceed,
              'money': true,
            }"
        >
          <span>&yen;</span>
          <span class="amt">{{numToFixedTwoAndFormat(Math.abs((type === 'year' ? curallMonthBud : allPay.monthBudgetAmount) - allPay.payAmount))}}</span>
        </div>
      </div>
    </div>

    <div class="lis">
      <div
          v-if="item.billType !== 'ALL' && item.payAmount !== 0"
          class="li"
          v-for="(item, index) in accountBooks"
          :key="index"
          @click="gotoInfo"
      >
        <div class="number">{{index}}</div>
        <div class="back"
             :style="{'width':
             `${(item.payAmount / allPay.payAmount * 100) < 70 ?
              (item.payAmount / allPay.payAmount * 100) + 30 : (item.payAmount / allPay.payAmount * 100)}%`}"
        />
        <div class="body">
          <div class="left">
            <div>{{item.bookName}}</div>
            <div class="count">{{item.count}}笔</div>
          </div>
          <div class="right">
            <span
                :class="{
                  'colorRed' : item.payAmount > (type === 'month' ? item.monthBudgetAmount : item.monthBudgetAmount * (new Date().getMonth() + 1))
                }"
            >
              -{{numToFixedTwoAndFormat(item.payAmount)}}
            </span>
            <img class="rightIcon" src="../../../assets/bill-image/icon-right.png" />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import moment from 'moment';
  import { addZero, numToFixedTwo, numToFixedTwoAndFormat } from '@/utils/utils';

  export default {
    data() {
      return {
        type: 'month',
        curDate: new Date(),
        curNowDate: new Date(),
        showDate: false,
        num: 0,
        curallMonthBud: 0,
        accountBooks: [],
        allPay: {},

      };
    },
    methods: {
      moment,
      numToFixedTwo,
      numToFixedTwoAndFormat,
      formatter(type, val) {
        if (type === 'year') {
          return `${val}年`;
        } else if (type === 'month') {
          return `${val}月`;
        }
        return val;
      },
      clickDate() {
        this.showDate = true;
        this.curNowDate = this.curDate;
      },
      cancel() {
        this.showDate = false;
      },
      confirm(val) {
        this.curDate = val;
        this.showDate= false;
        this.handleQueryAll();
      },
      changeType(val) {
        this.type = val;
        this.handleQueryAll();
      },
      changeDate() {
        const cur = this.curDate
        this.curDate = cur;
      },
      gotoInfo(){
        this.$router.push({
          path: '/myBill/billInfo/index',
        })
      },
      handleQueryAll() {
        let startDate = '';
        let endDate = '';
        const year = this.curDate.getFullYear();
        const month = this.curDate.getMonth() + 1;
        if (this.type === 'year') {
          const curM = new Date().getMonth() + 1;
          startDate = new Date(`${year}-01-01`);
          endDate = new Date(`${year}-${addZero(curM)}-${addZero(new Date(year, curM, 0).getDate())}`);
        } else {
          startDate = new Date(`${year}-${addZero(month)}-01`);
          endDate = new Date(`${year}-${addZero(month)}-${addZero(new Date(year, month, 0).getDate())}`);
        }

        const config = {
          url: '/billbook/findBillBooks',
          method: 'post',
          data: {
            startDate: startDate,
            endDate: endDate,
          }
        };
        this.service.request(config).then((resData) => {
          const { data } = resData;
          const allData = data.find(item => item.billType === "ALL") || {};
          this.allPay = allData;
          this.curallMonthBud = (allData.monthBudgetAmount) * (new Date().getMonth() + 1);
          this.accountBooks = data;
        })
      }
    },
    mounted() {
      this.handleQueryAll();
    },
    computed: {
      isExceed: function () {
        return this.allPay.payAmount > (this.type === 'year' ? this.curallMonthBud : this.allPay.monthBudgetAmount);
      }
    },
    watch: {
      curDate: function(val) {
        console.log('curDate', val)
      }
    }
  }
</script>

<style lang="scss" scoped>

  .chart-layout {
    .colorRed {
      color: #F34C28 !important;
    }
    font-size: 14px;
    background-color: #fff;
    min-height: 100vh;
    position: relative;
    padding-top: 10px;
    .type {
      margin: 0 30px;
      display: flex;
      height: 35px;
      line-height: 35px;
      border-radius: 20px;
      background-color: #f0f0f0;
      .month {
        width: 50%;
        text-align: center;
        color: #4a4a4a;
      }
      .active {
        color: #fff;
        border-radius: 40px;
        background-color: #6080ed;
      }
    }

    .date {
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
    }

    .percen {
      height: 5px;
      margin: 15px;
      background: linear-gradient(180deg,#FAE19C, #F7D97F);
      border-radius: 3px;
      .alread {
        height: 100%;
        background: linear-gradient(180deg,#FAC421, #F7B21B);
        border-radius: 3px;
        max-width: 100%;
      }
    }
    .percenVal {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #777777;
      margin: 0 15px;
    }
    .payinfo {
      box-sizing: border-box;
      margin: 0 15px 0 15px;
      background-color: #fff;
      border-radius: 5px;
      padding: 10px 10px 0 10px;
      display: flex;
      justify-content: flex-start;
      color: #333;
      text-align: center;
      border-bottom: 2px solid #f6f6f6;
      .left {
        width: 50%;
      }
      .money {
        font-size: 16px;
        padding: 10px 0;
      }
      .amt {
        font-size: 25px;
        font-weight: 600;
      }
    }

    .lis {
      background-color: #fff;
      padding: 15px;
      .li {
        display: flex;
        justify-content: flex-start;
        height: 50px;
        margin: 5px 0;
        position: relative;
        .number {
          z-index: 10;
          color: #000;
          width: 20px;
          display: inline-block;
          text-align: center;
          line-height: 50px;
          font-weight: 600;
          font-size: 13px;
        }
        .back {
          border-radius: 5px;
          background: linear-gradient(134deg, #e2f2ff 20%, #c7e6ff 91%);
          position: absolute;
          height: 50px;
          top: 0;
          z-index: 0;
          margin-left: 20px;
          min-width: 20%;
          max-width: 80%;
        }
        .body {
          z-index: 10;
          display: flex;
          justify-content: space-between;
          width: calc(100% - 20px);
        }
        .left {
          padding-left: 10px;
          padding-top: 10px;
          width: 20%;
          font-weight: 600;
          .count {
            font-weight: 500;
            font-size: 13px;
            color: #9b9b9b;
            padding-top: 3px;
          }
        }
        .right {
          line-height: 50px;
          font-weight: 600;
          color: #000;
          .rightIcon {
            margin-left: 5px;
            width:8px;
            height:13px;
            display: inline-block;
          }
        }
      }
    }

  }
</style>

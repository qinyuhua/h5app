<template>
  <div class="billInfo-layout">
    <div class="fab">
      <img :src="iconAdd" style="width: 40px;height:40px;"/>
    </div>

    <div
        class="header"
        :class=" `${billType}`"
    >
      <div class="month">
        <span>{{currentDateType === 'year' ? `${currentYear}年`: `${currentYear}年${currentMonth}月`}}</span>
        <van-icon name="arrow-down" />
      </div>
      <div class="header-body">
        <div class="title">
          <span>{{data.bookName}}</span>
          <span class="button" :class="currentDateType === 'year' ? 'active' : ''" @click="handleClick('year')">年</span>
          <span class="button" :class="currentDateType === 'month' ? 'active' : ''" @click="handleClick('month')">月</span>
        </div>
        <div class="percen">
          <div class="alerad" :style="{'width': `${pencelWidth}`, maxWidth: '100%'}"  />
          <div class="percenVal">
            <span>{{pencelWidth}}预算已用</span>
            <span>剩余&yen;{{numToFixedTwoAndFormat((currentDateType === 'year' ? data.monthBudgetAmount * (new Date().getMonth() +1) : data.monthBudgetAmount) - data.allAmount)}}</span>
          </div>

          <div class="all">
            <div class="amt">
              <div>{{currentDateType === 'year' ? '年度总支出' : '当月总支出'}}</div>
              <div
                  class="num"
                  :class="data.allAmount > (currentDateType === 'year' ? data.monthBudgetAmount * (new Date().getMonth() +1) : data.monthBudgetAmount) ? 'colorRed' : ''"
              >
               &yen;{{numToFixedTwoAndFormat(data.allAmount)}}
              </div>
            </div>
            <div class="amt">
              <div>{{currentDateType === 'year' ? '年度总预算' : '当月总预算'}}</div>
              <div class="num">
               &yen;{{numToFixedTwoAndFormat(currentDateType === 'year' ? data.budgetAmount : data.monthBudgetAmount)}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="lists">
      <div class="li" v-for="(item, index) in data.lists" :key="index">
        <div>
          <div class="title">{{item.billTitle}}</div>
          <div class="time">{{replaceYear(new Date(item.date), '-')}}</div>
        </div>
        <div v-if="item.type === 'pay'" class="right">
          -{{numToFixedTwoAndFormat(item.amount)}}
        </div>
        <div v-if="item.type === 'income'" class="right colorRed">
          +{{numToFixedTwoAndFormat(item.__v)}}
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import "@/styles/common.scss";
  import iconAdd from "@/assets/bill-image/icon-add.png";
  import { numToFixedTwoAndFormat, replaceYear, addZero } from '@/utils/utils';

  export default {
    data() {
      return {
        iconAdd,
        currentDateType: 'month',
        billType: 'ALL',
        curDate: new Date(),
        currentYear: new Date().getFullYear(),
        currentMonth: new Date().getMonth() + 1,
        data: {},

      }
    },

    methods: {
      numToFixedTwoAndFormat,
      replaceYear,
      handleClick(val){
        this.currentDateType = val;
      },
      handelQueryPayAmount() {
        const that = this;
        let startDate = '';
        let endDate = '';
        const year = that.currentYear;
        const month = that.currentMonth;

        if (this.currentDateType === 'year') {
          startDate = new Date(`${year}-01-01`);
          endDate = new Date(); // new Date(`${year}-12-31`);
        } else {
          startDate = new Date(`${year}-${addZero(month)}-01`);
          endDate = new Date(`${year}-${addZero(month)}-${addZero(new Date(year, month, 0).getDate())}`);
        }

        const config = {
          url: '/billList/queryPayAmount',
          method: 'post',
          data: {
            billType: that.billType,
            startDate: startDate,
            endDate: endDate,
          }
        };
        this.service.request(config).then((resData) => {
          const { data } = resData;

          that.data =  data[0] || {};
        })
      },

    },
    mounted() {

    },
    computed:  {
      pencelWidth: function() {
        const { monthBudgetAmount, allAmount } = this.data || {};
        if (monthBudgetAmount === undefined) { return ;}
        let amount = monthBudgetAmount;
        if (this.currentDateType === 'year') {
          amount = monthBudgetAmount * (new Date().getMonth() +1);
        }
        return `${parseFloat(allAmount / amount * 100).toFixed(2)}%`;
      }
    },
    watch: {
      currentDateType() {
        this.handelQueryPayAmount();
      }
    },
    created() {
      console.log(2, this.$route.query)
      const { type } = this.$route.query;
      this.billType = type;
      this.handelQueryPayAmount();
    }
  }
</script>

<style lang="scss" scoped>
  .billInfo-layout {
    font-size: 14px;
    .colorRed {
      color: #F34C28 !important;
    }
    .fab {
      position: fixed;
      bottom: 100px;
      right: 80px;
    }
    .header {
      padding:0 15px 25px 15px;
      min-height: 80px;
      //background: linear-gradient(150deg, #c4e5ff 9%, #e5f2fd 92%);
      background: url("../../../assets/bill-image/icon-billtype-ALL.png") no-repeat center;
      background-size: 100% 100%;
    }
    .clothes {
      background: url("../../../assets/bill-image/icon-billtype-clothes.png") no-repeat center;
      background-size: 100% 100%;
    }
    .cosmetices {
      background: url("../../../assets/bill-image/icon-billtype-cosmetices.png") no-repeat center;
      background-size: 100% 100%;
    }
    .food {
      background: url("../../../assets/bill-image/icon-billtype-food.png") no-repeat center;
      background-size: 100% 100%;
    }
    .home {
      background: url("../../../assets/bill-image/icon-billtype-home.png") no-repeat center;
      background-size: 100% 100%;
    }
    .medical {
      background: url("../../../assets/bill-image/icon-billtype-medical.png") no-repeat center;
      background-size: 100% 100%;
    }
    .news {
      background: url("../../../assets/bill-image/icon-billtype-news.png") no-repeat center;
      background-size: 100% 100%;
    }
    .oth {
      background: url("../../../assets/bill-image/icon-billtype-oth.png") no-repeat center;
      background-size: 100% 100%;
    }
    .traffic {
      background: url("../../../assets/bill-image/icon-billtype-traffic.png") no-repeat center;
      background-size: 100% 100%;
    }
    .All {
      background: url("../../../assets/bill-image/icon-billtype-ALL.png") no-repeat center;
      background-size: 100% 100%;
    }

    .month {
      line-height: 40px;
    }
    .header-body {
      height: 120px;
      border-radius: 10px;
      background-color: #fff;
      padding: 10px;
      .title {
        font-size: 16px;
        .button {
          padding: 4px 4px;
          background-color: #f0f0f0;
          border-radius: 2px;
          display: inline-block;
          float: right;
          right: 20px;
          color: #464646;
          font-size: 12px;
          margin: 0 5px;
        }
        .active {
          background: linear-gradient(308deg, #395cd5 9%, #6080ed 92%);
          color: #fff;
        }
      }
      .percen {
        height: 7px;
        margin: 10px 0;
        background: linear-gradient(180deg,#FAE19C, #F7D97F);
        border-radius: 3px;
        .alerad {
          height: 100%;
          background: linear-gradient(180deg,#FAC421, #F7B21B);
          border-radius: 3px;
        }
        .percenVal {
          padding-top: 5px;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #777777;
        }
        .all {
          display: flex;
          justify-content: space-between;
          padding-top: 20px;
          .amt {
            width: 50%;
            text-align: left;
          }
          .amt:first-child {
            border-right: 1px solid #eee;
          }
          .amt:last-child {
            padding-left: 10px;
          }
          .num {
            font-size: 22px;
            color: #000;
          }
        }
      }
    }

    .lists {
      background-color: #fff;
      .li {
        height: 56px;
        padding: 8px 15px 0 15px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        .right {
          font-size: 16px;
          font-weight: 600;
        }
        .title {
          font-size: 16px;
          color: #000;
        }
        .time {
          font-size: 12px;
          color: #9b9b9b;
        }
      }
    }
  }
</style>

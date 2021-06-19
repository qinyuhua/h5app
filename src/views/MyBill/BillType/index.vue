<template>
  <div class="bill-type">

<!--    <div class="eure">-->
<!--      <div class="back"></div>-->
<!--    </div>-->
    <div class='typeButton' @click="handlechangeType">
      切换展示方式
    </div>

    <div class="lists" v-if="!curShowType">
      <div
          v-for="(item,index) in accountBooks"
          :key="index"
          class="lists-body"
      >
        <img
            :src="require(`@/assets/bill-image/icon-billtype-${item.billType}.png`)"
            style='width:40px;height:40px;border-radius: 4px;'
            class="euro"
        />
        <div>{{item.bookName}}</div>
      </div>
    </div>

    <template v-if="curShowType" >
      <div
          v-for="(item,index) in accountBooks"
          :key="index"
          class="lis"

      >
        <div class="left">
          <img
              :src="require(`@/assets/bill-image/icon-billtype-${item.billType}.png`)"
              style='width:40px;height:40px;border-radius: 4px;'
          />
        </div>
        <div class="right">
          <div class="title">
            {{item.bookName}}
            <span class="desc">
            {{numToFixedTwo(numToPercentage(item.payAmount/item.budgetAmount * 100))}}%预算已用完
          </span>
            <span class="update-button">设置</span>
          </div>
          <div class="value">
            <div class="all">
              <div>总支出</div>
              <div class="money">&yen;{{numToFixedTwoAndFormat(item.payAmount)}}</div>
            </div>
            <div class="all">
              <div>总预算</div>
              <div class="money">&yen;{{numToFixedTwoAndFormat(item.budgetAmount)}}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>

</template>

<script>
  import { numToFixedTwo, numToPercentage, numToFixedTwoAndFormat } from '@/utils/utils';
export default {
  data() {
    return {
      curShowType: true,
      isOpened: false,
      currendData: {},
      curYear: new Date().getFullYear(),
      accountBooks:[]
    };
  },
  mounted() {
    this.handleQueryAll();
  },
  methods: {
    numToFixedTwo,
    numToPercentage,
    numToFixedTwoAndFormat,
    handleQueryAll() {
      const startDate = new Date(`${this.curYear}-01-01`);
      const endDate = new Date(`${this.curYear}-12-31`);
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
        console.log(1, data)
        this.accountBooks = { ...data };
      })
    },
    handlechangeType() {
      this.curShowType = !this.curShowType;
    }

  }

};
</script>

<style lang="scss" scoped>
  .bill-type {
    font-size: 14px;
    background-color: #f6f6f6;
    min-height: 100vh;
    .typeButton {
      margin: 5px;
      padding: 5px 10px;
      background-color: #0E6EB8;
      color: #fff;
      display: inline-block;
      border-radius: 3px;
    }
    /*.eure {
      width: 150px;
      height: 150px;
      margin-left: -75px;
      margin-top: -75px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform-style: preserve-3d;
      animation: spin 2.5s linear infinite;

      .back {
        background-image: url('../../../assets/bill-image/icon-billtype-ALL.png');
        width: 150px;
        height: 150px;
      }
      @keyframes spin { 0% { transform: rotateY(0deg); }100% { transform: rotateY(360deg); }}
    }*/


    .lists {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .lists-body {
        display: inline-block;
        box-sizing: border-box;
        width: 22%;
        text-align: center;
        background-color: #f6f6f6;
        border-radius: 5px;
        box-shadow: rgba(216,216,216,0.6) 0px 0px 15px 3px;
        padding: 20px 10px;
        margin: 10px 0;

      }
    }
    .lis {
      margin: 10px;
      display: flex;
      justify-content: flex-start;
      background-color: #fff;
      border-radius: 5px;
      height: 100px;
      align-content: center;
      padding: 0 5px;


      .left {
        margin: auto 0;
      }
      .right {
        padding-left: 15px;
        height: 100%;
        width: 100%;
        .title {
          font-size: 16px;
          padding: 15px 0 10px 0;
          .desc {
            font-size: 12px;
            color: #999999;
            padding-left: 40px;
          }
          .update-button {
            padding: 3px 5px;
            background-color: #f0f0f0;
            border-radius: 2px;
            display: inline-block;
            float: right;
            right: 15px;
            color: #464646;
            font-size: 12px;
          }
        }

        .value {
          display: flex;
          justify-content: space-between;
          color: #999;
          .all {
            width: 50%;
            line-height: 20px;
            .money {
              color: #000;
              font-size: 16px;
            }
          }
        }
      }

    }
  }
</style>

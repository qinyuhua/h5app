<template>
    <div class="wrap functionalEntrance layout">
        <div>每月</div>
        <input v-model="wageIncome"/>
        <div>每月基数</div>
        <input v-model="socialBase"/>
        <div>税前年薪</div>
        <input v-model="allIncome"/>
        <div>
            <span>每月社保：</span><span>{{socialInsurance}}</span>

        </div>
        <div>
            <span>年社保：</span><span>{{allsocialInsurance}}</span>
        </div>
        <div>
            <span>每月公积金：</span>
            <span>{{accumulationFund}}</span>
        </div>
        <div>
            <span>年公积金：</span>
            <span>{{allAccumulationFund}}</span>
        </div>

        <div>
            <span>累计应纳税所得额：</span>
            <span>{{taxableAmount}}</span>
        </div>
        <div>
            <span>累计个人所得税：</span>
            <span>{{taxAmount}}</span>
        </div>
        <div>
            <span>年薪税后工资：</span>
            <span>{{afterTax}}</span>
        </div>
        <div v-if="isShow">
            <div v-for="(item, index) in monthlyIncom" :key="index">
                <span>月份：{{item.income}}</span>
                <span>个税：{{item.taxRevenue}}</span>
                <span>税前：{{item.beforeIncome}}</span>
                <span>税后：{{item.afterIncome}}</span>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        wageIncome: null, // 每月工资收入
        socialBase: null, // 每月工资收入
        currentMonth: 12, // 当前月份
        taxTable: [
          { label: '不超过36000元的部分', min: 0, max: 36000, tax: 0.03, amount: 0},
          { label: '超过36000元至144000元部分', min: 36000, max: 144000, tax: 0.1, amount: 2520},
          { label: '超过144000元至300000元部分', min: 144000, max: 300000, tax: 0.2, amount: 16920},
          { label: '超过300000元至420000元部分', min: 300000, max: 420000, tax: 0.25, amount: 31920},
          { label: '超过420000元至660000元部分', min: 420000, max: 660000, tax: 0.3, amount: 52920},
          { label: '超过660000元至960000元部分', min: 660000, max: 960000, tax: 0.35, amount: 85920},
          { label: '超过960000元的部分', min: 660000, tax: 0.45, amount: 181920}
        ],
        isShow: true,
      }
    },
    computed: {
      allIncome: function () { // 所有收入
        let sum = 0;
        sum = this.wageIncome * this.currentMonth;
        return sum;
      },
      // socialBase: function () { // 社保基数，默认等于工资
      //   return this.wageIncome
      // },
      // 社保(每月)
      socialInsurance: function () {
        let amount = 0;
        // 养老保险 单位 * 10% 个人 * 8%
        // 医疗保险 单位* 6.5%  个人 * 2%
        // 工伤保险 0
        // 失业保险 个人 * 0.5%
        // amount = this.wageIncome * 0.08 + this.wageIncome * 0.02 + this.wageIncome * 0.005;
        amount = this.socialBase * (0.08 + 0.02 + 0.005);
        return parseFloat(amount).toFixed(2);
      },
      allsocialInsurance: function () { // 年 社保
        let amount = 0;
        amount = this.socialInsurance * this.currentMonth;
        return parseFloat(amount).toFixed(2);
      },
      // 公积金 ( 默认 7%)
      accumulationFund: function () {
        let amount = 0;
        amount = this.socialBase * 0.07;
        return parseFloat(amount).toFixed(2);
      },
      // 年公积金 ( 默认 7%)
      allAccumulationFund: function () {
        let amount = 0;
        amount = this.accumulationFund * this.currentMonth;
        return parseFloat(amount).toFixed(2);
      },
      // 累计应纳税所得额 = 累计收入 - 累计免税收入60000 - 累计社保个人缴纳 - 累计公积金个人缴纳 - 累计专项附加扣除
      taxableAmount: function () { // 应纳税所得额度
        let amount = 0;
        if (this.allIncome < 60000) {
          return this.allIncome;
        }
        amount  = this.allIncome - 60000 - this.allAccumulationFund - this.allsocialInsurance - 1500 * this.currentMonth;
        return parseFloat(amount).toFixed(2);
      },

      // taxAmount 累计个人所得税 = 累计应纳税所得额 * 预扣费 - 速算扣除
      taxAmount: function () { // 累计个人所得税
        let amount = 0;
        amount = this.taxableAmount * 0.03;
        let allAmount = this.taxableAmount;
        const table = this.taxTable;
        for(let i = 0; i < table.length; i += 1) {
          if (allAmount > table[i].min && allAmount <= table[i].max) {
            amount = allAmount * table[i].tax - table[i].amount;
          }
        }
        return parseFloat(amount).toFixed(2);
      },
      // 年薪税后工资： 累计收入 - 累计社保个人缴纳 - 累计公积金个人缴纳 - 累计个人所得税
      afterTax: function () { // 税后收入
        let amount = 0;

        amount = this.allIncome - this.allAccumulationFund - this.allsocialInsurance - this.taxAmount;
        return parseFloat(amount).toFixed(2);
      },

      monthlyIncom: function () {
        const arr = [];
        // amount = 工资 - 社保 - 公积金
        let amount = this.wageIncome - this.accumulationFund - this.socialInsurance;

        for (let i = 1; i< this.currentMonth + 1; i+= 1) {

          arr.push({
            income: i,
            beforeIncome: amount,
            afterIncome: this.wageIncome - (this.wageIncome - amount) * 0.03,
            taxRevenue: (this.wageIncome - amount) * 0.03,
            // sumIncome:
          })
        }

        // console.log(arr);
        return arr;
      }
    },
    methods: {

    }

  }
</script>

<style lang="scss" scoped>
    .layout {
        font-size: 27px;
    }
    .header {
        height: 300px;
        background-color: #0f7ffc;
        color: #ffffff;
        text-align: center;
        .title {
            font-size: 45px;
            font-weight: 500;
            padding-top: 70px;

        }
        .subTitle {
            padding-top: 20px;
            font-size: 30px;
        }
    }
    .btn {
        font-size: 30px;
        color: #ffffff;
        display: block;
        width: 80%;
        height: 100px;
        line-height: 100px;
        margin: 20px auto;
        background-color: #0f7ffc;
        text-align: center;
        border-radius: 50px;
    }


</style>

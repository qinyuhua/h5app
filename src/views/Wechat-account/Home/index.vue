<template>
  <div class="home">
    <div class="titleCss">
      <span class="titleBg" />
      <van-row class="titleBody">
        <van-col span="12">
          <p class="title">总放款金额</p>
          <p class="count">{{numeral(currentData.loanAmt || 0).format('0, 0.00')}}</p>
        </van-col>
        <van-col span="12">
          <p class="title">总放款笔数</p>
          <p class="count">{{numeral(currentData.loanNum || 0).format('0, 0')}}</p>
        </van-col>
        <van-col span="12">
          <p class="title">总在贷余额</p>
          <p class="count">{{numeral(currentData.loanBalance || 0).format('0, 0.00')}}</p>
        </van-col>
        <van-col span="12">
          <p class="title">总在贷笔数</p>
          <p class="count">{{numeral(currentData.loanBalanceNum || 0).format('0,0')}}</p>
        </van-col>
        <van-col span="12">
          <p class="title">当日总放款余额</p>
          <p class="countAll">{{numeral(currentData.loanAmtNow || 0).format('0, 0.00')}}</p>
        </van-col>
        <van-col span="12">
          <p class="title">当日总放款笔数</p>
          <p class="countAll">{{numeral(currentData.loanNumNow || 0).format('0,0')}}</p>
        </van-col>
      </van-row>
    </div>
    <van-search
        v-if="projectArr && projectArr.length > 0"
        v-model="productName"
        class="searchCss"
        placeholder="请输入项目名称"
        :clearable="false"
    />

    <div
        v-for="(project, index) in projectArr.filter(item => item.productName && item.productName.indexOf(productName) > -1)"
        :key="index"
        class="projectCss"
        @click="goToDetail(project.productCode)"
    >
      <div class="projectNameCss">{{ project.productName }}</div>
      <van-row class="projectBody">
        <van-col span="12">
          <p class="title">新增贷款规模</p>
          <p class="count">{{numeral(project.loanAmtNow || 0).format('0, 0.00')}}</p>
        </van-col>
        <van-col span="12">
          <p class="title">新增贷款笔数</p>
          <p class="count">{{numeral(project.loanNumNow || 0).format('0,0')}}</p>
        </van-col>
        <van-col span="12">
          <p class="title">累计贷款规模</p>
          <p class="count">{{numeral(project.loanAmt || 0).format('0, 0.00')}}</p>
        </van-col>
        <van-col span="12">
          <p class="title">累计贷款笔数</p>
          <p class="count">{{numeral(project.loanNum || 0).format('0,0')}}</p>
        </van-col>
      </van-row>
    </div>
    <div v-if="!projectArr || projectArr.length === 0" class="noDataCss">
      暂无数据
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import numeral from 'numeral';
  import { Col, Row, Search, Toast } from 'vant';

  Vue.use(Col);
  Vue.use(Row);
  Vue.use(Search);
  Vue.use(Toast);

  export default {
    name: 'Home',
    components: {
      // HelloWorld
    },
    mounted () {
      console.log(this.$data);
    },
    data () {
      return {
        numeral: numeral,
        productName: '',
        projectArr: [
          { id: 4, productName: '项目名称2', loanAmtNow: 1000, loanNumNow: 10000, loanAmt: 190328131, loanNum: 200},
        ],
        currentData: {
          loanAmt: '-', // 总放款金额
          loanNum: '-', // 总放款笔数
          loanBalance: '-', // 总在贷余额
          loanBalanceNum: '-', // 总在贷笔数
          loanAmtNow: '-', // 档期总放款金额
          loanNumNow: '-', // 当日总放款笔数
          overdueRateD1: '-', // D1 逾期率
        },
      };
    },
    methods: {
      goToDetail (code) {
        this.$router.push({
          path: '/detail',
          query: {
            proCode: code,
          }
        })
      },
    }
  }
</script>
<style lang="scss">
  .home {
    text-align: center;
    .titleCss {
      text-align: center;
      height: 382px;
      background: linear-gradient(360deg,rgba(32,167,221,1) 0%,rgba(14,110,184,1) 100%);
      border-radius: 30px;
      position: relative;
    }
    .titleBg {
      display: block;
      position: absolute;
      bottom: -33px;
      background: url("../../../assets/icon_homeTitle.png") no-repeat top;
      background-size: cover;
      width: 750px;
      height: 161px;
    }
    .titleBody {
      height: 100%;
      color: #fff;
      .van-col {
        height: 33%;
        padding-top: 40px;
      }
      .title {
        font-size: 26px;
        line-height: 39px;
      }
      .count {
        font-size: 26px;
        font-weight: 500;
        padding-top: 5px;
      }
      .countAll {
        font-size: 36px;
        font-weight: 500;
      }
    }
    .searchCss {
      height: 88px;
      line-height: 88px;
      border: 2px solid #0E6EB8;
      border-radius: 44px;
      margin: 10px 0;
      font-size: 32px;
      padding: 0;
      position: relative;
      display: block;
      .van-icon.van-icon-search {
        font-size: 40px;
        margin-left: 20px;
      }
      .van-field__body {
        height: 40px;
        line-height: 40px;
        margin-top: 20px;

      }
    }
    .van-search {
      .van-cell {
        font-size: 32px;
        padding: 0;
        line-height: 88px;
      }
    }
    .van-search__content {
      height: 100%;
      border-radius: 44px;
      margin: auto;
    }

    .projectCss {
      background-color: #fff;
      border-radius: 30px;
      height: 334px;
      text-align: center;
      margin-bottom: 10px;
      .projectNameCss {
        height: 88px;
        line-height: 88px;
        color: #545454;
        font-size: 32px;
        text-align: left;
        padding-left: 20px;
      }
      .projectBody {
        color: #383838;
        .van-col {
          height: 123px;
        }
        .title {
          font-size: 26px;
        }
        .count {
          font-size: 30px;
          font-weight: 600;
          padding-top: 5px;
        }
      }
    }
    .noDataCss {
      height: 200px;
      margin: auto;
      line-height: 200px;
      font-size: 30px;
    }
  }


</style>

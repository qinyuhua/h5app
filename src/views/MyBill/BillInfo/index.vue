<template>
  <div class="billList-layout">
    <div class="index-fab" @click="clickAdd" />
    <div class="index-fab-type" @click="gotoChart" />


    <div class='index-month' @click="isShowDate">
      {{moment(curDate).format('YYYY年MM月')}}
      <van-icon name="arrow-down" />
    </div>
    <van-action-sheet
        v-model="showDate"
    >
      <van-datetime-picker
          v-model="curDate"
          type="year-month"
          title="选择年月日"
          :formatter="formatter"
          @cancel="isShowDate"
          @confirm="clickMonth"
      />
    </van-action-sheet>

    <div class="header">
      <div class="index-payinfo">
        <div class="index-left">
          <div>{{curDate.getMonth() + 1}}月总支出</div>
          <div class="money">
            <span>&yen;</span>
            <span class="amt">{{numToFixedTwoAndFormat(totalPayAmount)}}</span>
          </div>
        </div>
        <div>
          <div>{{curDate.getMonth() + 1}}月总收入</div>
          <div class="money">
            <span>&yen;</span>
            <span class="amt">{{numToFixedTwoAndFormat(totalIncomeAmount)}}</span>
          </div>
        </div>
      </div>
      <div class="index-books" @click="gotoBillType">
        <div>全部账单</div>
        <div>
          <span>剩余{{numToFixedTwoAndFormat(totalIncomeAmount - totalPayAmount)}}元</span>
          <img src='@/assets/bill-image/icon-right.png' style='display: inline-block;width:8px;height:15px;margin-left:10px;' />
        </div>
      </div>
    </div>

    <div class="list-body" v-for="(item, index) in listDatas" :key="index">
      <div class="list-header">
        <div>{{replaceYear(new Date(item.date), '-')}} 星期{{weekArr[new Date(item.date).getDay()]}}</div>
        <div>
          支{{numToFixedTwoAndFormat(item.allPayAmount)}}
          &nbsp;&nbsp;
          收&nbsp;
          {{numToFixedTwoAndFormat(item.allIncomeAmout)}}
        </div>
      </div>
      <div class="list-li" v-for="(lItem, lIndex) in item.lists" :key="lIndex" @click="handleClickLi(lItem)">
        <div>
          <div class="title">
            {{lItem.billTitle || lItem.bookName}}
          </div>
          <div class="time">{{lItem.bookName}}</div>
        </div>
        <div
            :class="{
              'right': true,
              'income': lItem.type === 'income'
            }"
        >
          {{lItem.type === 'pay' ? '-' : '+'}}
          {{numToFixedTwoAndFormat(lItem.type === 'pay' ? lItem.amount : lItem.income)}}
        </div>
      </div>
    </div>
    <modal-add-bill
        :isShow="isShowModalAdd"
        :allBookTypes="allBookTypes"
        :curModalData="curModalData"
        :handleAddorUpdate="this.handleAddorUpdate"
        :closePop="closePop"
    />
  </div>

</template>

<script>
  import "@/styles/common.scss";
  import moment from 'moment';
  import { numToFixedTwoAndFormat, replaceYear, addZero } from '@/utils/utils';
  import ModalAddBill from '@/components/ModalAddbill';

  export default {
    data() {
      return {
        moment: moment,
        weekArr: ['日', '一', '二', '三', '四', '五', '六' ],
        showDate: false, // 是否展示日期
        curDate: new Date(), // 当前时间
        listDatas: [], // list 数据
        totalIncomeAmount: 0, // 总收入
        totalPayAmount: 0, // 总支出
        isShowModalAdd: false, // 是否展示新增或修改弹框
        allBookTypes: [], // 所有的账单类型
        curModalData: {}, // 当前弹框数据
      }
    },
    components: {
      ModalAddBill
    },
    methods: {
      numToFixedTwoAndFormat,
      replaceYear,
      formatter(type, val) {
        if (type === 'year') {
          return `${val}年`;
        } else if (type === 'month') {
          return `${val}月`;
        }
        return val;
      },
      clickAdd() {
        this.curModalData = {};
        this.isShowModalAdd = true;
      },
      closePop() {
        this.isShowModalAdd = false;
      },
      isShowDate() {
        this.showDate = !this.showDate;
      },
      clickMonth(value) {
        this.showDate = false;
        this.curDate = value;
        this.handleQueryAll();
        this.handleQueryPayAmount();
      },
      handleClickLi(record) {
        this.isShowModalAdd = true;
        this.curModalData = {...record};
      },
      handleQueryAll() {
        const year = this.curDate.getFullYear();
        const month = this.curDate.getMonth() + 1;
        const startDate = new Date(`${year}-${addZero(month)}-01`);
        const endDate = new Date(`${year}-${addZero(month)}-${addZero(new Date(year, month, 0).getDate())}`);

        const config = {
          url: '/billList/queryListGroup',
          method: 'post',
          data: {
            startDate: startDate,
            endDate: endDate,
          }
        };
        this.service.request(config).then((resData) => {
          const { data } = resData;
          this.listDatas = data;
        })
      },
      handleQueryPayAmount() {
        const year = this.curDate.getFullYear();
        const month = this.curDate.getMonth() + 1;
        const startDate = new Date(`${year}-${addZero(month)}-01`);
        const endDate = new Date(`${year}-${addZero(month)}-${addZero(new Date(year, month, 0).getDate())}`);

        const config = {
          url: '/billList/queryAllAmount',
          method: 'post',
          data: {
            startDate: startDate,
            endDate: endDate,
          }
        }
        this.service.request(config).then((resData) => {
          const { data } = resData;
          const { totalIncomeAmount, totalPayAmount} = data;
          this.totalIncomeAmount = totalIncomeAmount;
          this.totalPayAmount = totalPayAmount;
          // this.listDatas = data;
        })
      },
      handleQueryAllbookNames() {
        const config = {
          url: '/billbook/findAllBooks',
          method: 'post',
          data: {}
        };
        this.service.request(config).then((resData) => {
          const { data } = resData;
          this.allBookTypes = data;
        })
      },
      handleAddorUpdate(values) {
        const { _id } = values;
        const config = {
          url: _id ? '/billList/update' : '/billList/insert',
          method: 'post',
          data: {
            ...values,
          }
        };
        this.service.request(config).then((resData) => {
          this.isShowModalAdd = false;
          this.handleQueryAll();
          this.handleQueryPayAmount();
        })
      },
      gotoChart() {
        this.$router.push({
          path: '/myBill/billChart/index',
        })
      },
      gotoBillType() {
        this.$router.push({
          path: '/myBill/billType/index',
        })
      }
    },
    mounted() {
      this.handleQueryAll();
      this.handleQueryPayAmount();
      this.handleQueryAllbookNames();
    }
  }
</script>

<style lang="scss" scoped>

  .billList-layout {
    font-size: 14px;
    .index-fab {
      position: fixed;
      bottom: 50px;
      right: 40px;
      background: url("../../../assets/bill-image/icon-add.png") no-repeat top;
      background-size: cover;
      width: 40px;
      height: 40px;
    }
    .index-fab-type {
      position: fixed;
      bottom: 100px;
      right: 40px;
      background: url("../../../assets/bill-image/icon-bill-type.png") no-repeat top;
      background-size: cover;
      width: 40px;
      height: 40px;
    }


    .index-month {
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
    }
    .header {
      box-sizing: border-box;
      margin: 0 15px 8px 15px;
      background-color: #fff;
      border-radius: 5px;
      padding: 10px 10px 0 10px;
      .index-payinfo {
        display: flex;
        justify-content: flex-start;
        color: #333;
      }
      .index-payinfo .money {
        font-size: 16px;
        padding: 10px 0 10px 0;
      }
      .index-payinfo .amt {
        font-size: 25px;
        font-weight: 600;
      }
      .index-left {
        width: 50%;
      }
      .index-books {
        height: 40px;
        line-height: 40px;
        border-top: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #9b9b9b;
      }
    }

    .list-body {
      background-color: #fff;
      margin: 10px 15px;
      border-radius: 5px;
      .list-header {
        height: 35px;
        line-height: 35px;
        display: flex;
        justify-content: space-between;
        color: #9b9b9b;
        padding: 5px 15px;
      }
    }
  }
</style>

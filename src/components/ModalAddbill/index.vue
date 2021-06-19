<template>
  <van-popup
      class="modal-add-bill-layout"
      v-model="isShow"
      position="bottom"
      :close-on-click-overlay="false"
  >
    <div class="add-title">
      {{bookName}}
    </div>
    <div class="buttons">
      <span
        :class="{
          'add-type': true,
          'current': currentType === 'pay'
        }"
        @click="clickType('pay')"
      >
        支出
      </span>
      <span
        :class="{
          'add-type': true,
          'current': currentType === 'income'
        }"
        @click="clickType('income')"
      >
        收入
      </span>
      <span class="modal-button" @click="handleSubmit">完成</span>
      <span class="modal-button" style="padding-right: 20px" @click="closePop">取消</span>
    </div>
    <div class="add-amount">
      <span>&yen;</span>
      <van-field
          placeholder="账单金额"
          v-model="amount"
          type="number"
          default-value="curModalData.amount"
      />
    </div>
    <div v-if="!billType || billType === 'ALL'" class="add-books">
      <div
          v-for="(item, index) in allBookTypes"
          :key="index"
          :class="{
            'book-button': true,
            'active': item.billType === currBillType
          }"
          @click="clickbillType(item.billType)"
      >
        {{item.bookName}}
      </div>
    </div>

    <div class="add-remark">
      <van-field
          class="input"
          v-model="billTitle"
          placeholder="添加备注"

      />
      <div class="remark-button" @click="clickDate">{{moment(curDate).format('YYYY-MM-DD')}}</div>
    </div>

    <van-calendar
        v-model="showDate"
        :min-date="minDate"
        :default-date="curDate"
        :show-confirm="false"
        @select="handleClickDate"
    />

  </van-popup>
</template>

<script>
  import moment from 'moment';
  export default {
    props: {
      isShow: {
        type: Boolean
      },
      billType: {
        type: String
      },
      allBookTypes: {
        type: Array,
        default: function() {
          return [];
        }
      },
      bookName: {
        type: String,
        default: function() {
          return undefined;
        }
      },
      curModalData: {
        type: Object,
        default: function() {
          return {};
        }
      },
      handleAddorUpdate: {
        type: Function,
      },
      closePop: {
        type: Function,
      }
    },
    data() {
      return {
        showDate: false, // 显示日期
        currentType: 'pay',
        amount: undefined,
        currBillType: 'ALL',
        billTitle: undefined,
        curDate: new Date(),
        minDate: new Date(1990, 1, 1)
      }
    },
    watch: {
      curModalData: function(val) {

        this.amount = val.amount ? (val.amount / 100).toFixed(2) : undefined;
        this.currBillType = val.billType || 'ALL';
        this.billTitle = val.billTitle || undefined;
        this.curDate = val.date ? new Date(val.date) : new Date();
      }
    },
    methods: {
      moment,
      clickType(type) {
        this.currentType = type;
      },
      clickbillType(type) {
        this.currBillType = type;
      },
      clickDate() {
        this.showDate = true;
      },
      handleClickDate(value) {
        this.curDate = value;
        this.showDate = false;
      },
      handleSubmit() {
        // console.log(moment(this.curDate).format('YYYY-MM-DD HH:mm:ss')); return;
        const value = {
          _id: this.curModalData._id,
          amount: parseFloat(this.amount) * 100,
          billTitle: this.billTitle,
          billType: this.currBillType,
          type: this.currentType,
          date: moment(this.curDate).format('YYYY-MM-DD'),
          time: new Date(),
        };

        this.handleAddorUpdate(value);
      }
    },
    mounted() {

    }
  };
</script>

<style lang="scss" scoped>
  .modal-add-bill-layout {
    padding: 15px 15px;
    .add-title {
      font-size: 18px;
      margin: 6px 0 10px 0;
    }
    .buttons {
      margin: 10px 0;
      color: #4a4a4a;
      .add-type {
        padding: 4px 13px;
        border-radius: 2px;
        background-color: #f0f0f0;
        margin-right: 10px;
      }
      .current {
        background-color: #C4DDED;
        color: #6080ed;
      }
      .modal-button {
        float: right;
        color: #6080ed;
      }
    }
    .add-amount {
      display: flex;
      justify-content: flex-start;
      font-size: 30px;
      //font-weight: 600;
      margin: 25px 0 15px 0;
      border-bottom: 1px solid #eee;
      padding-bottom: 5px;
    }

    .add-books {
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 10px;
      align-content: space-around;
      .book-button {
        width: 70px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 2px;
        background-color: #f0f0f0;
        margin: 5px;
      }
      .active {
        background-color: #c4e5ff;
        color: #6080ed;
      }
    }
    .add-remark {
      display: flex;
      justify-content: flex-start;
      color: #9b9b9b;
      margin-bottom: 30px;
      .input {
        background-color: #f0f0f0;
        padding: 5px;
        border-radius: 2px;
        width: 60%;
      }
      .remark-button {
        margin-left: 10px;
        padding: 0 5px;
        background-color: #f0f0f0;
        right: 10px;
        font-size: 12px;
        border-radius: 2px;
        height: 30px;
        line-height: 30px;
      }
    }
  }
</style>

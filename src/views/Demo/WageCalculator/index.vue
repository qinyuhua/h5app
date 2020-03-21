<template>
    <div class="wrap functionalEntrance">
        <div class="header">
            <div class="title">欢迎使用工资个税计算器</div>
            <div class="subTitle">快速精准计算税前税后金额</div>
        </div>
        <div class="bodyDiv">
            <div class="divCss">
                <span class="title">个税新政立即算</span>
                <span class="remark">专项附加扣除准确知，纳税基数更精确</span>
            </div>
            <div class="divCss">
                <span class="title">年薪个税快速算</span>
                <span class="remark">输入税前月薪，年薪税后明细一键获取</span>
            </div>
            <div class="divCss">
                <span class="title">其他所得税自动算</span>
                <span class="remark">多类税种灵活选，支持更多计算需求</span>
            </div>
        </div>
        <div>
            <span class="btn" @click="gotoOpen">立即体验</span>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      gotoOpen() {
        this.$router.push({
          path: '/demo/wage/calculator'
        })
      }
    }

  }
</script>

<style lang="scss" scoped>
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
    .bodyDiv {
        font-size:30px;
        .divCss {
            padding: 10px 0 10px 20px;
        }
        .title {
            font-size: 30px;
            font-weight: 600;
            padding-top: 30px;
            display: block;
        }
        .remark {
            font-size: 28px;
            color: #888;
        }
    }
    .btn {
        font-size: 40px;
        color: #ffffff;
        display: block;
        width: 80%;
        height: 100px;
        line-height: 100px;
        margin: 70px auto 20px auto;
        background-color: #0f7ffc;
        text-align: center;
        border-radius: 50px;
    }


</style>

<template>
  <div class="home-layout">
    <div class='home-lis'>
      <div class='home-li' @click="handleGotoBill()">
        <img src="@/assets/bill-image/icon-bill.png" style="width:90px; height:100px;"   />
        <span>消费</span>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    methods: {
      handleGotoBill() {
        this.$router.push({
          path: '/myBill/listBill/index',
        })
      },
    }
  }
</script>

<style lang="scss" scoped>

  .home-layout {
    .home-lis {
      display: flex;
      justify-content: flex-start;
      padding: 30px;

      .home-li {
        width: 25%;
        text-align: center;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: rgba(216,216,216,0.6) 0px 0px 30px 5px;
        padding: 20px;
        color: #999999;
      }
    }
  }
</style>

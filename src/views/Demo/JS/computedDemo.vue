<template>
  <div>
    <input type="button" @click="changeA" value="数据加一"/>
    <p>a的值为： {{a}}</p>
    <p>aDouble的值为： {{aDouble}}</p>
    <p>aPlus的值为： {{aPlus}}</p>

    <div class='wrap'>
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        a: 1,
      }
    },
    computed: {
      aDouble: function () {
        return this.a * 2;
      },
      aPlus: {
        get: function () {
          return this.a + 1;
        },
        set: function (v) {
          this.a = v - 1;
        }
      }
    },
    methods:{
      changeA () {
        this.a += 1;
      }
    }
  };
</script>
<style lang="scss" scoped>
  .wrap {
    width: 200px;
    border: 1px solid #333;
  }
  .wrap:after {
    content: 'after伪元素';
    display: block;
    clear: both;
  }
  .left {
    float: left;
    background: blue;
    height: 100px;
    width: 100px;
  }
  .right {
    float: left;
    background: red;
    height: 50px;
    width: 100px;
  }
</style>

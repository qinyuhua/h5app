<template>
    <div class="wrap functionalEntrance">
        <div class="header">
            项目汇总
        </div>
        <div class="demoBody">
            <div class="demoDiv" @click="goToDemo()">
                <div class="title">项目一</div>
            </div>
            <div class="demoDiv" @click="goToCmsWeb()">
                <div class="title">香溢贷</div>
            </div>
            <div class="demoDiv" @click="goToStudyDemo()">
                <div class="title">Vue 知识点学习</div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
      methods: {
        goToDemo() {
          this.$router.push({
            path: '/demo/js',
            query: {
              name: '项目一',
            }
          })
        },
        goToCmsWeb() {
          this.$router.push({
            path: '/cms-web/home',
          })
        },
        goToStudyDemo() { // 跳转学习页面
          this.$router.push({
            path: '/demo/study',
          })
        }
      }
    }
</script>

<style lang="scss" scoped>

    .header {
        font-size: 40px;
        margin: 0 auto;
        color: #2e384d;
        font-weight: 700;
        max-width: 60%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
        line-height: 90px;
    }
    .demoBody {
        padding: 0 20px;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .demoDiv {
        width: 100px;
        height: 100px;
        background-color: #D7F0BC;
        border-radius: 10px;
        margin: 10px 10px;
        .title {
            text-align: center;
            font-size: 30px;
            margin: auto;
        }
        .img {
            width: 45px;
            height: 45px;
            margin: 10px auto;
            position: relative;
            display: block;
        }
    }
</style>

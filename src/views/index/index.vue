<template>
    <div class="wrap functionalEntrance">
        <div class="header">
            项目汇总
        </div>
        <div class="demoBody">
            <div class="demoDiv">
                <!--<img class="img" />-->
                <div class="title">项目一</div>
            </div>
            <!-- <div class="demoDiv">
                <div class="title">项目二</div>
            </div>
            <div class="demoDiv">
                <div class="title">项目三</div>
            </div>
            <div class="demoDiv">
                <div class="title">项目四</div>
            </div>
            <div class="demoDiv">
                <div class="title">项目五</div>
            </div> -->
        </div>
    </div>

</template>

<script>
    export default {

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
            font-size: 22px;
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

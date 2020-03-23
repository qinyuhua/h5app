<template>
    <div class="wrap functionalEntrance studyBody">
        <van-collapse v-model="activeNames">
            <van-collapse-item title="Vue 和 React 的区别" name="1">
                Vue 是 mmvm 框架，
            </van-collapse-item>
            <van-collapse-item title="标题2" name="2">内容2</van-collapse-item>
            <van-collapse-item title="标题3" name="3" disabled>内容3</van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
import Vue from 'vue';
import { Collapse, CollapseItem } from 'vant';

Vue.use(Collapse).use(CollapseItem);

  export default {
    data() {
      return {
        activeNames: ['1']
      }
    },
    methods: {
    }

  }
</script>

<style lang="scss" scoped>
    .studyBody {
        font-size: 20px;
    }
</style>

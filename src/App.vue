<template>
  <div id="app">
    <transition name="slide">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="slide">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Icon } from 'vant';
  Vue.use(Icon);
export default {
  name: 'app',
}
</script>

<style>
#app {
  margin: 0 auto;
  max-width: 750px;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.van-dialog__message {
  line-height: 30px !important;
}
</style>

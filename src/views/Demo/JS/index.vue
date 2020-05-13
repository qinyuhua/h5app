<template>
  <div class="wrap functionalEntrance">
    <h3>测试DEMO</h3>
    <div>指令</div>
    <div v-if="seen">是否显示{{seen}}</div>
    <span>{{ message }}</span>
    <input type="text" v-model="message" />
    <input type="text" v-model="nameInput"/>
    <input type="button" @click="change" value="更新数据"/>
    <input type="button" v-on:click="destroy" value="销毁"/>
    <input type="button" v-on:click="changeSeen" value="隐藏"/><br/>
    <div id="example">
      <p>Original: {{message}}</p>
      <p>Original: {{reversedMessage}}</p>
    </div>

    <input type="button" v-on:click="gotoWage" value="计算器"/>
    <br />
    <br />
    <br />
    <ComputedDemo />
  </div>
</template>

<script>

  import { Base64 } from 'js-base64';

  import ComputedDemo from './computedDemo.vue';

  export default {
    data() {
      return {
        message: 'initName',
        // reversedMessage: 'initName',
        nameInput: 'name',
        seen: true,
      }
    },
    components: {
      ComputedDemo,
    },
    beforeCreate () {
      // todo 组件实例刚被创建，组件属性计算之前，如 data 属性等
      // console.log('beforeCreate================');
      // console.log('this.$el', this.$el)
      // console.log('this.message', this.message)
    },
    computed: {
      reversedMessage: function () {
        return this.message.split('').reverse().join('')
      }
    },
    created () {
      // todo 组件实例创建完成，属性已绑定，但DOM还未生成，$el 属性还不存在
      // console.log('create================');
      // console.log('this.$data', this.$data);
      // console.log('this.$el', this.$el)
      // console.log('this.message', this.message)

    },
    beforeMount (){
      // todo beforeMount 模板编译/挂载之前
      // console.log('beforeMount================');
      // console.log('this.$data', this.$data);
      // console.log('this.$el', this.$el)
      // console.log('this.message', this.message)
    },
    mounted () {
      // todo mounted 模板编译/挂载之后
      this.setCookie('token', '2');
    },

    beforeUpdate () {
      // todo beforeUpdate
      // console.log('beforeUpdate================');
      // console.log('this.$data', this.$data);
      // console.log('this.$el', this.$el)
      // console.log('this.message', this.message)
    },
    updated () {
      // console.log('updated================');
      // console.log('this.$data', this.$data);
      // console.log('this.$el', this.$el)
      // console.log('this.message', this.message)
    },
    // activated () {
    //   // console.log('activated');
    // },
    // deactivated () {
    //   console.log('activated');
    // },
    // beforeDestroy () {
    //   console.log('beforeDestroy');
    // },
    // destroyed () {
    //   console.log('destroyed');
    // },
    methods: {
      change() {
        // console.log('change=-=============')
        this.message = 'Datura is me';
      },
      destroy() {
        this.$destroy();
      },
      changeSeen() {
        this.seen = !this.seen;
      },

      gotoWage() {
        this.$router.push({
          path: '/demo/wage',
        })
      },
      setCookie(name, value, time){
        const times = time || 30 * 30 * 48;
        const d = new Date();
        d.setTime(d.getTime() + (times * 60 * 1000));
        document.cookie = `${name}=${Base64.encode(value)};expires=${d.toGMTString()};path=/`;
      },
      getCookie(name) {
        const ca = document.cookie.split('; '); // ca格式例如["name=xiaoming", "age=25"]
        let str;
        for (let i = 0; i < ca.length; i += 1) {
          if (name === 'token') {
            if (ca[i].startsWith('token=')) {
              const c = ca[i].split('token=');
              str = Base64.decode(c[1]);
              return str;
            }
          }
          const c = ca[i].split('='); // c格式例如["name", "xiaoming"]
          if (c[0] === name) {
            str = Base64.decode(c[1]);
            return str;
          }
        }
        return str;
      },


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

</style>

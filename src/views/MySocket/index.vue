<template>
  <div class="home-layout">
    <div class="button" @click="getConnect">进行连接</div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        ws: undefined,
        sendFun: undefined,
      }
    },
    methods: {
      getConnect() {
        // const config = {
        //   url: '/websocket/connect',
        //   method: 'get',
        //   data: {
        //   }
        // };
        // this.service.request(config).then((resData) => {
        //   const { data } = resData;
        //   this.listDatas = data;
        // })
        if ('WebSocket' in window) {
          console.log('你的浏览器支持webSocket！', this.ws);
          if (this.ws !== undefined && this.ws !== 'undefined' && this.ws.readyState !== 3) {
            console.log('销毁或关闭close', this.ws);
            if (this.ws.readyState === 1) {
              this.ws.send('客户端销毁socket');
            }

            this.ws.close();
            delete this.ws;
          }

          // const ws = new WebSocket('http://10.1.70.160:3000/blog/websocket');
          // Uncaught DOMException: Failed to construct 'WebSocket':
          // The URL's scheme must be either 'ws' or 'wss'. 'http' is not allowed.
          // 意思是要使用 ws或wss协议，不能使用 http， 原因在 js 中没有写协议导致，
          this.ws = new WebSocket('ws://10.0.70.65:3131/websocket/connect');
          // console.log(this.ws);

          this.ws.onopen = () => {
            console.log('连接服务器成功');
            this.ws.send('连接服务器成功');
          };

          this.ws.onmessage = evt => {
            const receivedMsg = evt.data;
            console.log('客户端接受信息', receivedMsg);
            if (!this.sendFun) {
              clearInterval(this.sendFun);
            }
            this.sendFun = setInterval(() => {
              this.ws.send(`客户端发送信息+${new Date().getTime()}`);
            }, 1000)
            return receivedMsg;
          };

          this.ws.onclose = function() {
            console.log('连接关闭...');
          };
        } else {
          alert('您的浏览器不支持WebScoket');
        }

      },
    }
  }
</script>

<style lang="scss" scoped>

  .home-layout {
    .button {
      margin: 20px;
      height: 30px;
      line-height: 30px;
      background-color: #0f7fff;
      color: #fff;
      width: 100px;
      text-align: center;
      font-size: 14px;
      border-radius: 3px;
    }
  }
</style>

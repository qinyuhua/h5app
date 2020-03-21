<template>
  <div class="wrap functionalEntrance">
    <div class="projectDiv">
      <div class="title">
        <span class="numCss">1</span>
        <span class="textCss">项目利息收益（元）</span>
      </div>
      <table class="tableCss" border="0" cellpadding="0" cellspacing="0">
        <thead>
        <tr>
          <td>统计周期</td>
          <td>项目应收利息</td>
          <td>实际收取金额</td>
          <td>收取率</td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>开始至当前</td>
          <td>1111.00</td>
          <td>1111.00</td>
          <td>1111.00</td>
        </tr>
        <tr>
          <td>开始至结束</td>
          <td>1111.00</td>
          <td>1111.00</td>
          <td>1111.00</td>
        </tr>
        </tbody>
      </table>
      <div id="categoryIdBar" />
    </div>
    <div class="dashLine" />
    <div class="projectDiv">
      <div class="title">
        <span class="numCss">2</span>
        <span class="textCss">项目服务成本（元）</span>
      </div>
      <div id="categoryIdLine"></div>
    </div>
    <div class="dashLine" />
    <div class="projectDiv">
      <div class="title">
        <span class="numCss">3</span>
        <span class="textCss">项目毛利润（元）</span>
      </div>
      <table class="tableCss" border="0" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <td>统计周期</td>
            <td>项目应收利息</td>
            <td>实际收取金额</td>
            <td>收取率</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>开始至当前</td>
            <td>1111.00</td>
            <td>1111.00</td>
            <td>1111.00</td>
          </tr>
          <tr>
            <td>开始至结束</td>
            <td>1111.00</td>
            <td>1111.00</td>
            <td>1111.00</td>
          </tr>
        </tbody>
      </table>
      <div id="categoryIdBar2" />
    </div>

  </div>
</template>

<script>
  import echarts from 'echarts';
  export default {
    data() {
      return {
        message: 'lineDemo',
        // reversedMessage: 'initName',
        nameInput: 'name',
        seen: true,
        tableData: [
          {

          }
        ],
      }
    },
    mounted () {
      // todo mounted 模板编译/挂载之后
      // console.log('mounted================');
      this.handleCarvasBar({ id: 'categoryIdBar', title: '微聚项目实收利息（24%）'});
      this.handleCarvasBar({ id: 'categoryIdBar2', title: '项目实收毛利润'});
      this.handleCarvasLine({ id: 'categoryIdLine', title: '项目服务成本'});
    },
    methods: {
      handleCarvasBar (params) {
        const { id, title }  = params;
        const dom = document.getElementById(id);
        let myChart = echarts.init(dom);


        const option = {
          color: ['#0E6EB8'],
          title: {
            text: title,
            left: 'center',
          },
          grid: {
              top: 40,
              bottom: 30,
            left: 70,
          },
          tooltip: {

          },
          xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
            axisLine: {
              lineStyle: {
                color: '#E4E4E4'
              }
            },
            // boundaryGap: true,
            axisTick: {
              show: false,
              alignWithLabel: true,
            },
            axisLabel: {
              color: '#8D8D8D',
            }
          },
          yAxis: {
            type: 'value',
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#E4E4E4',

              }
            },
            axisLabel: {
              color: '#8D8D8D',
              formatter: (value) => {
                return '￥'+value;
              }
            },
          },
          dataZoom: {
            type: 'slider',
          },
          series: [
            {
              type: 'bar',
              data: [-100, -2000, 1123, 4112, 6642, -5311, 412, 312, -3213],

              barMaxWidth: 32,
            }
          ]
        };



        if(myChart) {
          myChart.setOption(option);
        }


      },
      handleCarvasLine (params) {
        const { id, title }  = params;
        const dom = document.getElementById(id);
        let myChart = echarts.init(dom);

        const option = {
          color: ['#0E6EB8', '#E69C2A', '#00D3CA'],
          title: {
            text: '项目服务成本',
            left: 'center',
            // top: 20,
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            top:30,
            left: 10,
            itemWidth: 12,
            itemHeight: 12,
            data: ['微聚分润（13%）', '小贷通道（0.2%）', '项目资金成本(10%)'],
            icon: 'circle',
            itemGap: 2,
            textStyle: {
              padding: 0
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            // top: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            // boundaryGap: false,
            data: ['7月', '8月', '9月', '10月', '11月', '12月', '1月'],
            axisLine: {
              lineStyle: {
                color: '#E4E4E4'
              }
            },
            // boundaryGap: true,
            axisTick: {
              show: false,
              alignWithLabel: true,
            },
            axisLabel: {
              color: '#8D8D8D',
            }
          },
          yAxis: {
            type: 'value',
            title: '金额（元）',
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#E4E4E4',
              }
            },
            axisLabel: {
              color: '#8D8D8D',
              formatter: (value) => {
                return '￥'+value;
              }
            },
            axisTick: {
              inside: true,
            }
          },
          dataZoom: {
            type: 'slider',
          },
          series: [
            {
              name: '微聚分润（13%）',
              type: 'line',
              data: [-120, 132, 101, 134, 90, 230, -210]
            },
            {
              name: '小贷通道（0.2%）',
              type: 'line',
              data: [220, 182, 191, 234, -290, 330, 310]
            },
            {
              name: '项目资金成本(10%)',
              type: 'line',
              data: [150, 232, -201, 154, 190, 330, 410]
            }
          ]
        };

        if(myChart) {
          myChart.setOption(option);
        }
      },

    }

  }
</script>

<style lang="scss" scoped>
  #categoryIdBar {
    height: 579px;
    margin-top: 20px;
  }

  #categoryIdBar2 {
    height: 820px;
    margin-top: 20px;
  }
  #categoryIdLine {
    height: 680px;
    margin-top: 20px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 auto;
    text-align: center;
    border: 1px solid #979797;
  }
  table td, table th {
    border: 1px solid #979797;

  }

  .dashLine {
    border-bottom: 2px dashed #979797;
  }
  .projectDiv {
    padding: 40px 25px 0 25px;
    .title {
      .numCss {
        display: inline-block;
        width: 30px;
        height: 30px;
        background-color: #0E6EB8;
        border-radius: 15px;
        line-height: 30px;
        font-size: 20px;
        text-align: center;
        color: #fff;
        margin-right: 5px;
      }
      .textCss {
        color: #383838;
        font-size: 30px;
        line-height: 42px;
      }
    }

    .tableCss {
      font-size: 20px;
      color: #383838;
      margin-top: 10px;
      td {
        text-align: center;
        display: -moz-box;
        width: 25%;
      }
      thead {
        td {
          height:60px;
          line-height: 60px;
          color: #0E6EB8;
        }
      }
      tbody {
        td {
          height: 50px;
          line-height: 50px;
        }
      }
    }
  }

</style>

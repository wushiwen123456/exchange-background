<template>
  <div class="container">
    <el-row style="height:30px">
      <el-col :span="24">
        <scroll-inline :data-list="list"></scroll-inline>
      </el-col>
    </el-row>
    <el-carousel indicator-position="none" :autoplay="false" height="220px" style="margin-top:15px">
      <el-carousel-item v-for="(item1,index1) in list1" :key="index1">
        <el-row :gutter="30" style="margin-top:15px">
          <el-col
            :span="8"
            v-for="(item2,index2) in item1"
            :key="item2.id"
            style="margin-bottom:15px"
          >
            <el-card class="my-cary" @click.stop.native="handleClickItem2(item2,index2)">
              <div class="coin-info">
                <div class="coin-img">
                  <img :src="item2.url" />
                </div>
                <div class="coin-info-m">
                  <h3 class="info-title mb-8">{{item2.coin}} / USDT</h3>
                  <span class="info-text mb-8">
                    <span class="mr15">
                      <i class="el-icon-bottom low-price"></i>
                      <span>{{item2.low}}</span>
                    </span>
                    <span>
                      <span>{{item2.high}}</span>
                      <i class="el-icon-top high-price"></i>
                    </span>
                  </span>
                </div>
                <div class="coin-info-r">
                  <h3 class="info-title mb-8">${{item2.price}}</h3>
                  <span
                    :class="[isTop(item2.percent_change) ? 'high-price' : 'low-price']"
                    class="info-text mb-8"
                  >
                    <span>{{item2.percent_change}} %</span>
                    <i :class="[isTop(item2.percent_change) ? 'el-icon-top' : 'el-icon-bottom']"></i>
                  </span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel>
    <el-row class="welcome-e">
      <el-col :span="24">
        <el-card>
          <div slot="header">
            <span class="card-title">交易统计</span>
          </div>
          <div class="e-main">
            <div class="e-left">
              <div class="e-item">
                <span>交易币种</span>
                <b>BTC</b>
              </div>
              <div class="e-item">
                <span>价格涨幅</span>
                <b>
                  0
                  <span title="24小时统计">
                    <i class="iconfont icon-tubiaoshangshengqushi"></i>
                  </span>
                </b>
              </div>
            </div>
            <div class="eachart-box">
              <v-chart :options="options" />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
var time = null
import { getHomeDate, dealsRecord } from '@/api'
import ScrollInline from '@/components/ScrollInline'
import echarts from 'echarts'
export default {
  components: {
    ScrollInline,
  },
  data() {
    return {
      list: [],
      options: {
        backgroundColor: '#ffffff',
        title: {
          show: false,
          text: '哎呦,不错哦',
          textStyle: {
            color: '#454545',
            fontSize: 20,
          },
          top: '0',
          left: 'left',
        },
        legend: {
          type: 'plain',
          right: '2%',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(253,160,65,0)',
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(0, 0, 0,.4)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(253,160,65,0)',
                  },
                ],
                global: false,
              },
            },
          },
        },
        grid: {
          top: '13%',
          left: '5%',
          right: '2%',
          bottom: '10%',
          // containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              show: false,
            },
            splitArea: {
              // show: true,
              color: '#f00',
              lineStyle: {
                color: '#f00',
              },
            },
            axisLabel: {
              color: '#454545',
            },
            splitLine: {
              show: false,
            },
            boundaryGap: true,
            axisTick: {
              show: false,
            },
            data: ['8月1日', '8月2日', '8月3日', '8月4日', '8月5日', '8月6日'],
          },
        ],

        yAxis: [
          {
            type: 'value',
            min: 0,
            // max: 140,
            splitNumber: 4,
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(0,0,0,0.1)',
              },
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              margin: 20,
              textStyle: {
                color: '#454545',
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: '注册总量',
            type: 'line',
            smooth: true, //是否平滑
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: '#F9A041',
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5,
              },
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#F9A041',
              },
            },

            itemStyle: {
              color: '#F9A041',
              shadowColor: 'rgba(0, 0, 0, .3)',
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2,
            },
            tooltip: {
              show: true,
            },
            data: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14],
          },
        ],
      },
      curryIndex1: 0,
      curryIndex2: 0,
    }
  },
  computed: {
    isTop() {
      return (per) => {
        return per * 1 >= 0
      }
    },
    list1() {
      return this.list.length == 0 ? [] : this.handleSetList1(this.list)
    },
  },
  watch: {
    currentItem(val) {
      this.handleClickItem2(val)
    },
  },
  created() {
    this.getHomeDate()
    time = setInterval(() => {
      this.getHomeDate()
    }, 10000)
  },

  methods: {
    getHomeDate() {
      getHomeDate().then((res) => {
        if (res.code == 200) {
          let list = res.data
          list = list.map((item) => {
            return {
              ...item,
              url: require(`@/assets/img/coin-icon/${item.coin}.png`),
            }
          })
          this.list = list
        }
      })
    },
    handleSetList1(list) {
      const arr = []
      for (let i = 0; i < this.list.length; i += 6) {
        arr.push(list.slice(i, i + 6))
      }
      return arr
    },
    // 点击顶部的card触发
    handleClickItem2(item) {
      console.log('开始请求图表')
    },
  },
}
</script>

<style scoped>
.welcome {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 40px;
  height: 50vh;
}
.welcome h2 {
  font-size: 40px;
}
.my-cary {
  cursor: pointer;
}
.my-cary:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.coin-info {
  display: flex;
}
.coin-img {
  flex: 0.2;
}
.coin-img img {
  width: 44px;
  height: 44px;
}
.coin-info-m {
  flex: 0.4;
}
.mb-8 {
  margin-bottom: 8px;
}
.mr15 {
  margin-right: 15px;
}
.info-title {
  color: #454545;
  font-size: 21px;
  font-weight: 400;
}
.info-text {
  color: #6c757d;
  font-size: 14px;
}
.low-price {
  color: #dc3545;
}
.high-price {
  color: #28a745;
}
.coin-info-r {
  flex: 0.4;
  text-align: right;
}

.echarts {
  width: 100%;
  height: 100%;
}
.card-title {
  font-size: 16px;
  font-weight: 700;
  color: #454545;
}
.e-main {
  display: flex;
}
.e-left {
  padding-left: 10px;
  padding-right: 10px;
  flex: 0.15;
}
.e-item {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  text-align: left;
  padding: 40px 40px 0px 40px;
  font-size: 14px;
  color: #454545;
}
.e-item b {
  font-size: 24px;
  line-height: 2;
  color: #454545;
  font-weight: 400;
}
.e-item b i {
  font-size: 24px;
}
.e-item b .icon-tubiaoxiajiangqushi {
  color: #f25043;
}
.e-item b .icon-tubiaoshangshengqushi {
  color: rgb(103, 194, 58);
}
.eachart-box {
  height: 350px;
  flex: 0.85;
}
</style>
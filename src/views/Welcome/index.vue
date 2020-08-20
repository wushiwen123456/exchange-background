<template>
  <scroll-container
    height="89vh"
    v-loading="loading"
    element-loading-text="正在搜集币种信息..."
    element-loading-spinner="el-icon-loading"
  >
    <el-scrollbar style="height:100%" wrap-class="default-scrollbar__wrap">
      <div class="container">
        <el-row style="height:30px">
          <el-col :span="24">
            <scroll-inline :data-list="list"></scroll-inline>
          </el-col>
        </el-row>
        <el-carousel
          indicator-position="none"
          :autoplay="false"
          height="220px"
          style="margin-top:15px"
        >
          <el-carousel-item v-for="(item1,index1) in list1" :key="index1">
            <el-row :gutter="30" style="margin-top:15px">
              <el-col
                :span="8"
                v-for="(item2,index2) in item1"
                :key="item2.id"
                style="margin-bottom:15px"
              >
                <el-card class="my-cary" @click.stop.native="handleClickItem2(index1,index2)">
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
                        <i
                          :class="[isTop(item2.percent_change) ? 'el-icon-top' : 'el-icon-bottom']"
                        ></i>
                      </span>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
        <el-row class="welcome-e" :gutter="30">
          <el-col :span="24">
            <el-card>
              <div>
                <span class="card-title">成交量统计</span>
              </div>
              <div class="e-main">
                <div class="e-left">
                  <div class="e-item">
                    <span>交易币种</span>
                    <b>
                      <img :src="currentItem.url" class="current-img" />
                      {{currentItem.coin}}
                    </b>
                  </div>
                  <div class="e-item">
                    <span>价格涨幅</span>
                    <b>
                      {{currentItem.percent_change}}%
                      <span title="24小时统计">
                        <i
                          class="iconfont"
                          :class="[isCurrentUp(currentItem) ? 'icon-tubiaoshangshengqushi' : 'icon-tubiaoxiajiangqushi']"
                        ></i>
                      </span>
                    </b>
                  </div>
                </div>
                <div class="eachart-box">
                  <e-charts v-if="hasKData" ref="chart" />
                  <div v-else class="noKData">
                    <i class="el-icon-warning" style="margin-right:5px;margin-top:2px"></i>
                    暂无相关数据
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" style="margin-top:15px">
            <el-card :body-style="{paddingTop:0}">
              <div slot="header">
                <span class="card-title">交易历史</span>
              </div>
              <scroll-container height="360px">
                <el-scrollbar style="height:100%" wrap-class="default-scrollbar__wrap">
                  <div class="wel-table">
                    <div class="table-title">
                      <div>价格($)</div>
                      <div>数量</div>
                      <div style="text-align:right">日期</div>
                    </div>
                    <div class="wel-main">
                      <div class="wei-item" v-for="item in orderList" :key="item.id">
                        <div :class="[item.type == 0 ? 'buy-color' : 'sell-color']">{{item.price}}</div>
                        <div>
                          <img :src="Coin(item.pair)" class="order-coin" />
                          <span>{{item.num}}</span>
                        </div>
                        <div style="text-align:right">{{item.update_at | capitalizeTime}}</div>
                      </div>
                    </div>
                  </div>
                </el-scrollbar>
              </scroll-container>
            </el-card>
          </el-col>
          <el-col :span="16" style="margin-top:15px">
            <el-card :body-style="{paddingTop:0}">
              <div slot="header">
                <span class="card-title">正在进行</span>
              </div>
              <scroll-container height="360px">
                <el-scrollbar style="height:100%" wrap-class="default-scrollbar__wrap">
                  <div class="wel-table">
                    <div class="table-title">
                      <div class="t-data">日期</div>
                      <div class="t-type">种类</div>
                      <div class="t-number">数量</div>
                      <div class="t-remain">剩余数量</div>
                      <div class="t-price">价格</div>
                      <div class="t-usd">USD</div>
                      <div class="t-fee">手续费(%)</div>
                      <div class="t-cancel">取消</div>
                    </div>
                    <div class="wel-main">
                      <div class="wei-item" v-for="item in orderActive" :key="item.id">
                        <div class="t-data">{{item.update_at | capitalizeTime}}</div>
                        <div class="t-type">{{item.type == 0 ? 'Buy' : 'Sell'}}</div>
                        <div class="t-number">
                          <img :src="Coin(item.pair)" class="order-coin" />
                          <span>{{item.num}}</span>
                        </div>
                        <div class="t-remain">
                          <img :src="Coin(item.pair)" class="order-coin" />
                          <span>{{item.num}}</span>
                        </div>
                        <div class="t-price">{{item.price}}</div>
                        <div class="t-usd">{{item.price}}</div>
                        <div class="t-fee">{{item.fee | capitalizeFee}}</div>
                        <div class="t-cancel">
                          <span @click="cancelOrder(item.id)" class="btn-cancel btn-sm">取消</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-scrollbar>
              </scroll-container>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="13" style="margin-top:15px">
            <el-card :body-style="{paddingTop:0}">
              <div slot="header">
                <span class="card-title">买单</span>
              </div>
              <scroll-container height="360px">
                <el-scrollbar style="height:100%" wrap-class="default-scrollbar__wrap">
                  <div class="wel-table">
                    <div class="table-title">
                      <div>单价</div>
                      <div>数量</div>
                      <div style="text-align:right">总价</div>
                    </div>
                    <div class="wel-main">
                      <div class="wei-item" v-for="item in buyOrder" :key="item.id">
                        <div>{{item.price}}</div>
                        <div>
                          <img :src="Coin(item.pair)" class="order-coin" />
                          <span>{{item.num}}</span>
                        </div>
                        <div style="text-align:right">$ {{item.total}}</div>
                      </div>
                    </div>
                  </div>
                </el-scrollbar>
              </scroll-container>
            </el-card>
          </el-col>
          <el-col :span="11" style="margin-top:15px">
            <el-card :body-style="{paddingTop:0}">
              <div slot="header">
                <span class="card-title">卖单</span>
              </div>
              <scroll-container height="360px">
                <el-scrollbar style="height:100%" wrap-class="default-scrollbar__wrap">
                  <div class="wel-table">
                    <div class="table-title">
                      <div>单价</div>
                      <div>数量</div>
                      <div style="text-align:right">总价</div>
                    </div>
                    <div class="wel-main">
                      <div class="wei-item" v-for="item in sellOrder" :key="item.id">
                        <div>{{item.price}}</div>
                        <div>
                          <img :src="Coin(item.pair)" class="order-coin" />
                          <span>{{item.num}}</span>
                        </div>
                        <div style="text-align:right">$ {{item.total}}</div>
                      </div>
                    </div>
                  </div>
                </el-scrollbar>
              </scroll-container>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-scrollbar>
  </scroll-container>
</template>

<script>
var time = null
var timestamp = 10
import { getHomeDate, dealsRecord, platformOrderList, refuseOrder } from '@/api'
import { formatDate } from '@/utils/formatDate'
import ScrollInline from '@/components/ScrollInline'
import ECharts from '@/components/ECharts'
import ScrollContainer from '@/components/ScrollContainer'

export default {
  filters: {
    capitalizeFee(str) {
      return isNaN(str * 1) ? str : (str * 1).toFixed(4)
    },
  },
  components: {
    ScrollInline,
    ECharts,
    ScrollContainer,
  },
  data() {
    return {
      list: [],
      options: {
        backgroundColor: '#ffffff',
        legend: {
          type: 'plain',
          right: '2%',
        },
        tooltip: {
          trigger: 'axis',
          show: false,
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
            name: '成交量',
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
              show: false,
            },
            data: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14],
          },
        ],
      },
      currentIndex1: 0,
      currentIndex2: 0,
      loading: true,
      hasKData: true,
      orderList: [],
      orderActive: [],
      buyOrder: [],
      sellOrder: [],
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
    currentItem() {
      return this.list1.length
        ? this.list1[this.currentIndex1][this.currentIndex2]
        : ''
    },
    isCurrentUp() {
      return (item) => {
        return item.percent_change * 1 >= 0
      }
    },
    Coin() {
      return (coin) => {
        coin = coin.toUpperCase()
        return require(`@/assets/img/coin-icon/${coin}.png`)
      }
    },
  },
  watch: {
    currentItem(val) {
      if (val) {
        this.getChartData(val)
      }
    },
  },
  created() {
    this.getHomeDate()
    time = setInterval(() => {
      timestamp--
      if (timestamp == 0) {
        this.getHomeDate()
        timestamp = 10
      }
    }, 1000)
    this.getHistoryOrder()
    this.getActiveOrder()
    this.getSellOrder()
    this.getBuyOrder()
  },
  beforeDestroy() {
    clearInterval(time)
  },
  methods: {
    // 获取历史订单
    getHistoryOrder() {
      const data = {
        email: '',
        endTime: '',
        is_deal_type: 0,
        limit: 100,
        page: 1,
        pair: '',
        startTime: '',
        status: 1,
        type: -1,
      }
      platformOrderList(data).then((res) => {
        if (res.code == 200) {
          this.orderList = res.data.data
        }
      })
    },
    // 获取当前订单
    getActiveOrder() {
      const data = {
        email: '',
        endTime: '',
        is_deal_type: 0,
        limit: 100,
        page: 1,
        pair: '',
        startTime: '',
        status: 0,
        type: -1,
      }
      platformOrderList(data).then((res) => {
        if (res.code == 200) {
          this.orderActive = res.data.data
        }
      })
    },
    // 获取买订单
    getBuyOrder() {
      const data = {
        email: '',
        endTime: '',
        is_deal_type: 0,
        limit: 100,
        page: 1,
        pair: '',
        startTime: '',
        status: -1,
        type: 0,
      }
      platformOrderList(data).then((res) => {
        if (res.code == 200) {
          this.buyOrder = res.data.data
        }
      })
    },
    // 获取卖订单
    getSellOrder() {
      const data = {
        email: '',
        endTime: '',
        is_deal_type: 0,
        limit: 100,
        page: 1,
        pair: '',
        startTime: '',
        status: -1,
        type: 1,
      }
      platformOrderList(data).then((res) => {
        if (res.code == 200) {
          this.sellOrder = res.data.data
        }
      })
    },
    // 取消订单
    cancelOrder(id) {
      this.$confirm('是否取消订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          refuseOrder(id).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: res.msg,
              })
              this.getActiveOrder()
            }
          })
        })
        .catch((err) => err)
    },
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
          this.loading = false
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
    handleClickItem2(i1, i2) {
      this.currentIndex1 = i1
      this.currentIndex2 = i2
      timestamp = 10
    },
    getChartData(item = { coin: 'BTC' }) {
      const now_Date = Math.floor(new Date().getTime() / 1000)
      const old_Date = now_Date - 86400
      const data = {
        instrument_id: item.coin.toLowerCase() + '-USD',
        start: new Date(old_Date * 1000),
        end: new Date(),
        granularity: 7200,
      }
      dealsRecord(data).then((res) => {
        if (res.code == 200) {
          if (!(res.data instanceof Array)) {
            this.hasKData = false
            return
          }
          this.hasKData = true
          let list = res.data.reverse()
          const XData = [],
            YData = []
          list.forEach((item) => {
            XData.push(formatDate(new Date(item[0]), 'dd日 hh:mm'))
            YData.push(item[5])
          })
          this.options.series[0].data = YData
          this.options.xAxis[0].data = XData
          this.$nextTick(() => {
            this.$refs.chart.setOptions(this.options)
          })
        }
      })
    },
  },
}
</script>

<style scoped>
.container {
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
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
.current-img {
  width: 20px;
  height: 20px;
  vertical-align: -2px;
}
.noKData {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
}
.table-title {
  color: #607d8b;
  height: 50px;
  line-height: 50px;
  display: flex;
  font-size: 14px;
  font-weight: 700;
  border-top: 1px solid #eee;
}
.table-title > div {
  flex: 1;
}
.wel-table {
  padding-right: 10px;
}
.wei-item {
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  color: #607d8b;
}
.wei-item > div {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.buy-color {
  color: #28a745;
}
.sell-color {
  color: #dc3545;
}
.order-coin {
  width: 15px;
  height: 15px;
  background-color: #fff;
  vertical-align: -3px;
  margin-right: 5px;
}
.t-data {
  flex: 0.2 !important;
}
.t-type {
  flex: 0.1 !important;
}
.t-number {
  flex: 0.17 !important;
}
.t-remain {
  flex: 0.17 !important;
}
.t-price {
  flex: 0.1 !important;
}
.t-usd {
  flex: 0.12 !important;
}
.t-fee {
  flex: 0.12 !important;
}
.t-cancel {
  flex: 0.08 !important;
  text-align: right;
}
.btn-cancel {
  color: #ef5350;
  vertical-align: 1px;
  user-select: none;
  border: 1px solid;
  background-color: transparent;
  border-color: #ef5350;
  box-shadow: 0 2px 2px 0 rgba(239, 83, 80, 0.14),
    0 3px 1px -2px rgba(239, 83, 80, 0.2), 0 1px 5px 0 rgba(239, 83, 80, 0.12);
  cursor: pointer;
  transition: all 0.2s;
}
.btn-sm {
  padding: 5px 12px;
  font-size: 12px;
  border-radius: 5px;
}
.btn-cancel:hover {
  background: #ef5350;
  border-color: #ef5350;
  color: #fff;
  box-shadow: 0 14px 26px -12px rgba(239, 83, 80, 0.42),
    0 4px 23px 0 rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(239, 83, 80, 0.2);
}
</style>
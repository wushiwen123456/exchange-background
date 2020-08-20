<template>
  <div
    class="scroll-con"
    ref="father"
    :style="{height:height + 'px'}"
    v-show="dataList.length !== 0"
  >
    <div class="scroll-box" ref="son" :style="{left:left + 'px'}">
      <div
        v-for="item in 3"
        :key="item"
        class="scroll-item"
        @mouseenter="handleMouseenter"
        @mouseleave="handleStartSwiper"
      >
        <span class="scroll-t" v-for="item in dataList" :key="item.id">
          <img :src="item.url" class="icon-img" />
          {{item.coin}}
          <span>${{item.price}}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
var time = null
export default {
  name: 'ScrollInline',
  props: {
    dataList: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      height: 0,
      left: 0,
      width: 0,
      firstQuery: true,
    }
  },
  computed: {
    setStatus() {
      return this.dataList.length !== 0 && this.$refs.son
    },
  },
  watch: {
    dataList(val) {
      if (val.length > 0) {
        this.handleSwiperInit()
      }
    },
    setStatus(val) {
      if (val) {
        this.$nextTick(() => {
          this.height = val.offsetHeight
        })
      }
    },
  },
  methods: {
    handleSwiperInit() {
      if (!this.firstQuery) return
      this.firstQuery = false
      clearInterval(time)
      time = null
      this.$nextTick(() => {
        this.width = this.$refs.son.offsetWidth
        this.left = (this.width / 3) * -1
        this.handleStartSwiper()
      })
    },
    handleStartSwiper() {
      time = setInterval(() => {
        this.left -= 1
        if (Math.abs(this.left) > (this.width / 3) * 2) {
          this.left = 0
        }
      }, 15)
    },
    handleMouseenter() {
      clearInterval(time)
    },
  },
  beforeDestroy() {
    clearInterval(time)
  },
}
</script>

<style scope>
.scroll-con {
  position: relative;
  overflow: hidden;
}
.scroll-box {
  position: absolute;
  left: 0;
  top: 0;
  height: 30px;
  display: flex;
  white-space: nowrap;
}
.scroll-box .scroll-item {
  flex: 1;
}
.scroll-box .scroll-item:nth-child(1) {
  /* background-color: green; */
}
.scroll-box .scroll-item:nth-child(2) {
  /* background-color: red; */
}
.scroll-box .scroll-item:nth-child(3) {
  /* background-color: green; */
}
.scroll-t {
  margin-right: 15px;
  color: #607d8b;
  font-size: 14px;
}
.icon-img {
  width: 15px;
  height: 15px;
  vertical-align: -3px;
  background-color: #fff;
  border-radius: 50%;
}
</style>
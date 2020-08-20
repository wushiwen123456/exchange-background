<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" top="6vh">
      <scroll-container v-loading="loading">
        <el-scrollbar style="height:100%" wrap-class="default-scrollbar__wrap">
          <el-table :data="list">
            <el-table-column type="index" width="50" label="#" />
            <el-table-column property="name" label="账户" min-width="120">
              <template slot-scope="scope">
                <div class="text-cut">{{scope.row.email}}</div>
              </template>
            </el-table-column>
            <el-table-column property="coin" label="币种" min-width="90">
              <template slot-scope="scope">
                <div class="text-cut">{{scope.row.pair | capitalizeUpperCase}}</div>
              </template>
            </el-table-column>
            <el-table-column property="v-btc" label="可用" min-width="100">
              <template slot-scope="scope">
                <div class="text-cut">{{scope.row.available}}</div>
              </template>
            </el-table-column>
            <el-table-column property="v-btc" label="冻结" min-width="100">
              <template slot-scope="scope">
                <div class="text-cut">{{scope.row.freeze}}</div>
              </template>
            </el-table-column>
            <el-table-column property="v-eth" label="折合比特币" min-width="100">
              <template slot-scope="scope">
                <div class="text-cut">{{scope.row.v_btc}}</div>
              </template>
            </el-table-column>
            <el-table-column property="v-eth" label="折合USDT" min-width="100">
              <template slot-scope="scope">
                <div class="text-cut">{{scope.row.v_usdt}}</div>
              </template>
            </el-table-column>
            <el-table-column property="v-eth" label="操作" min-width="150">
              <template slot-scope="scope">
                <el-button @click="handleWater(scope.row)" type="text">查看流水</el-button>
                <el-button
                  @click="handleFreeze(scope.row.id)"
                  icon="el-icon-lock"
                  type="warning"
                  size="mini"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="total">
            <span style="margin-right:20px">总计：</span>
            <span>{{total.btc}} BTC≈ {{total.usdt}} USD</span>
          </div>
        </el-scrollbar>
      </scroll-container>
    </el-dialog>
  </div>
</template>

<script>
import ScrollContainer from '@/components/ScrollContainer'
export default {
  filters: {
    capitalizeUpperCase(val) {
      return val.toUpperCase()
    },
  },
  components: {
    ScrollContainer,
  },
  data() {
    return {
      list: [
        {
          id: 1,
          email: '1131634405@qq.com',
          pair: 'btc',
          available: '1.12299300',
          freeze: '0.00000000',
          v_btc: '0.00390000',
          v_usdt: '43.92273600',
        },
        {
          id: 2,
          email: '1131634405@qq.com',
          pair: 'eth',
          available: '1.12299300',
          freeze: '0.00000000',
          v_btc: '0.00000000',
          v_usdt: '0.00000000',
        },
        {
          id: 3,
          email: '1131634405@qq.com',
          pair: 'usdt',
          available: '1.12299300',
          freeze: '0.00000000',
          v_btc: '0.00009971',
          v_usdt: '1.12299300',
        },
      ],
      dialogVisible: false,
      loading: true,
      total: {
        btc: '0.00399840',
        usdt: '45.62975400',
      },
      name: '',
    }
  },
  computed: {
    title() {
      return this.name + '用户的资产'
    },
  },
  methods: {
    open(id, name) {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 500)
      this.name = name
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
    handleFreeze() {},
    handleWater(row) {
      const email = row.email
      const pair = row.pair
      this.$router.push({
        path: '/assetWater',
        query: {
          email,
          pair,
        },
      })
    },
  },
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 15px;
}
.el-tag {
  margin-right: 15px;
}
.total {
  line-height: 45px;
  padding: 0 7px;
  background-color: #f5f7fa;
}
</style>
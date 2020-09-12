<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" top="6vh" width="70%">
      <scroll-container v-loading="loading">
        <el-scrollbar style="height:100%" wrap-class="default-scrollbar__wrap">
          <el-table :data="list">
            <el-table-column type="index" width="50" label="#" />
            <el-table-column property="name" label="地址" min-width="250">
              <template slot-scope="scope">
                <div>{{scope.row.address}}</div>
              </template>
            </el-table-column>
            <el-table-column property="coin" label="币种" min-width="90">
              <template slot-scope="scope">
                <div class="text-cut">{{scope.row.pair | capitalizeUpperCase}}</div>
              </template>
            </el-table-column>
            <el-table-column property="v-btc" label="可用" min-width="110">
              <template slot-scope="scope">
                <div class="edit-assets">
                  <div v-if="scope.row.avaiType" class="a-editing">
                    <i
                      class="el-icon-circle-plus-outline"
                      :class="{currentEdit : editStatus == 'plus' }"
                      @click="editStatus='plus'"
                    ></i>
                    <el-input
                      size="mini"
                      placeholder="增加/减少"
                      class="edit-input"
                      v-model="avaiNum"
                      @keydown.native="handleAvaiSubmit($event,scope.row)"
                    ></el-input>
                    <i
                      class="el-icon-remove-outline"
                      :class="{currentEdit : editStatus == 'minus'}"
                      @click="editStatus='minus'"
                    ></i>
                  </div>
                  <div v-else class="edit-assets-detail">
                    <div class="text-cut">{{scope.row.available}}</div>
                    <i v-if="isRight == 1" class="el-icon-edit" @click="handleAvaiClick(scope.row)"></i>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column property="v-btc" label="冻结" min-width="110">
              <template slot-scope="scope">
                <div class="edit-assets">
                  <div v-if="scope.row.freeType" class="a-editing">
                    <i
                      class="el-icon-circle-plus-outline"
                      :class="{currentEdit : editStatusFree == 'plus' }"
                      @click="editStatusFree='plus'"
                    ></i>
                    <el-input
                      size="mini"
                      placeholder="增加/减少"
                      class="edit-input"
                      v-model="freeNum"
                      @keydown.native="handleFreeSubmit($event,scope.row)"
                    ></el-input>
                    <i
                      class="el-icon-remove-outline"
                      :class="{currentEdit : editStatusFree == 'minus'}"
                      @click="editStatusFree='minus'"
                    ></i>
                  </div>
                  <div v-else class="edit-assets-detail">
                    <div class="text-cut">{{scope.row.freeze}}</div>
                    <i v-if="isRight == 1" class="el-icon-edit" @click="handleFreeClick(scope.row)"></i>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column property="v-eth" label="折合比特币" min-width="110">
              <template slot-scope="scope">
                <div class="text-cut">{{scope.row.v_btc}}</div>
              </template>
            </el-table-column>
            <el-table-column property="v-eth" label="折合USDT" min-width="110">
              <template slot-scope="scope">
                <div class="text-cut">{{scope.row.v_usdt}}</div>
              </template>
            </el-table-column>
            <el-table-column property="v-eth" label="操作" min-width="80">
              <template slot-scope="scope">
                <el-button @click="handleWater(scope.row)" type="text">查看流水</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </scroll-container>
      <div class="total" slot="footer">
        <span style="margin-right:20px">总计：</span>
        <span>{{total.btc}} BTC≈ {{total.usdt}} USD</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserAssets, userAssetsChange } from '@/api'
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
      list: [],
      dialogVisible: false,
      loading: true,
      total: {
        btc: '0.00399840',
        usdt: '45.62975400',
      },
      name: '',
      assetsEditTitle: '',
      editStatus: 'plus',
      avaiNum: '',
      freeNum: '',
      editStatusFree: 'plus',
      userId: '',
      email: '',
    }
  },
  computed: {
    ...mapGetters(['isRight']),
    title() {
      return this.email + ' 用户的资产'
    },
  },
  methods: {
    open(id, name) {
      this.name = name
      this.dialogVisible = true
      // 请求用户资产
      this.getUserAssets(id)
    },
    getUserAssets(id) {
      this.userId = id
      this.loading = true
      getUserAssets({ id }).then((res) => {
        this.loading = false
        if (res.code == 200) {
          const list = res.data.data
          list.map((item) => {
            item.email = res.data.email
            return item
          })
          const total = {
            btc: res.data.valuation_btc,
            usdt: res.data.valuation_usdt,
          }
          this.email = res.data.email
          this.list = list
          this.total = total
        }
      })
    },
    close() {
      this.dialogVisible = false
    },
    handleFreeze(row) {
      this.assetsEditTitle = row.pair.toUpperCase()
      this.innerVisible = true
    },
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
    handleAvaiClick(row) {
      this.list.forEach((item) => {
        this.$set(item, 'avaiType', false)
      })
      this.$set(row, 'avaiType', true)
    },
    handleFreeClick(row) {
      this.list.forEach((item) => {
        this.$set(item, 'freeType', false)
      })
      this.$set(row, 'freeType', true)
    },
    handleAvaiSubmit(e, row) {
      if (e.keyCode == '13') {
        if (isNaN(this.avaiNum)) {
          return this.$message({
            message: '请输入合法数字',
            type: 'error',
          })
        }
        const data = {
          id: row.id,
          price:
            this.editStatus == 'plus' ? this.avaiNum * 1 : this.avaiNum * -1,
          type: 0,
        }
        this.loading = true
        userAssetsChange(data).then((res) => {
          this.loading = false
          if (res.code == 200) {
            this.getUserAssets(this.userId)
          }
        })
      }
    },
    handleFreeSubmit(e, row) {
      if (e.keyCode == '13') {
        if (isNaN(this.freeNum)) {
          return this.$message({
            message: '请输入合法数字',
            type: 'error',
          })
        }
        const data = {
          id: row.id,
          price:
            this.editStatusFree == 'plus'
              ? this.freeNum * 1
              : this.freeNum * -1,
          type: 1,
        }
        this.loading = true
        userAssetsChange(data).then((res) => {
          this.loading = false
          if (res.code == 200) {
            this.getUserAssets(this.userId)
          }
        })
      }
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
  text-align-last: left;
}
.edit-assets .edit-assets-detail {
  display: flex;
  align-items: center;
}
.edit-assets .el-icon-edit {
  margin-left: 7px;
  cursor: pointer;
}
.edit-input {
  width: 100px;
  margin: 0 5px;
}
.a-editing {
  cursor: pointer;
}
.currentEdit {
  color: #409eff;
}
</style>
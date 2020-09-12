<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="logo-con">
        <img class="logo" src="~@/assets/logo.png" @click="homeClick" />
        <span style="font-weight:blod">管 理 系 统</span>
      </div>
      <el-button @click="logout" type="info">退出</el-button>
    </el-header>
    <!-- 页面主题区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <el-scrollbar>
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <!-- 侧边栏菜单 -->
          <el-menu
            background-color="#1E2735"
            text-color="#fff"
            active-text-color="#409eff"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            :default-active="activePath"
            router
          >
            <!-- 一级菜单区 -->
            <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
              <!-- 一级菜单模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i :class="['iconfont',item.icon]"></i>
                <!-- 文本 -->
                <span>{{item.authName}}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                :index="subItem.path"
                v-for="subItem in item.children"
                :key="subItem.id"
              >
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <!-- 文本 -->
                  <span>{{subItem.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      isCollapse: false,
      activePath: '',
      menuList: []
    }
  },
  computed: {
    ...mapGetters(['isUserRouter']),
    route() {
      return this.$route
    },
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
    if (this.isUserRouter) {
      this.handleSetMenus(this.isUserRouter)
    }
  },
  watch: {
    route(value) {
      const path = value.path
      this.saveNavState(path)
    },
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    logout() {
      this.$store.commit('logOut')
      this.$router.push('/')
    },
    homeClick() {
      this.$router.push('/home')
    },
    // 根据数据创建菜单
    handleSetMenus(rules) {
      let rulesArr = []
      if (rules.length) {
        if (rules[0].children) rulesArr = rules[0].children
      }
      rulesArr = rulesArr.sort(this.handleSortRule('cid'))
      this.menuList = this.handleParent(rulesArr)
    },
    handleParent(rulesArr) {
      const arr = []
      rulesArr.forEach((item) => {
        if (!item.parentsName) return
        if (arr.some((li) => li.authName == item.parentsName)) {
          this.handleAddChildren(item, arr)
        } else {
          const children = []
          children.push({
            id: item.cid,
            authName: item.authName,
            path: item.path,
          })
          arr.push({
            id: item.pid,
            authName: item.parentsName,
            path: item.parentsPath,
            children,
            icon: item.icon,
          })
        }
      })
      return arr
    },
    // 有父路径情况下就添加到父路径的children中
    handleAddChildren(item, arr) {
      const aItem = arr.find((it) => it.authName == item.parentsName)
      if (aItem) {
        aItem.children.push({
          id: item.cid,
          authName: item.authName,
          path: item.path,
        })
      }
    },
    handleSortRule(prop) {
      return (a, b) => {
        return a[prop] * 1 - b[prop] * 1
      }
    },
  },
}
</script>

<style scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #1e2735;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
}
.logo-con {
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}
.logo {
  height: 40px;
  margin: 0 15px;
}
.el-aside {
  background-color: #1e2735;
}
.el-main {
  background-color: #eaedf1;
}
.el-menu {
  border-right: 0;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.iconfont {
  margin-right: 10px;
}
</style>
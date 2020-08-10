<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="logo-con">
        <img class="logo" src="~@/assets/logo.png" />
        <span style="font-weight:blod">SAFEEX后台管理系统</span>
      </div>
      <el-button type="info">退出</el-button>
    </el-header>
    <!-- 页面主题区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单 -->
        <el-menu
          background-color="#333744"
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
              <i :class="iconObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      activePath: "",
      menuList: [
        {
          id: 10000,
          authName: "用户管理",
          path: "users",
          children: [
            {
              id: 10001,
              authName: "用户管理",
              path: "users",
            },
          ],
        },
        {
          id: 20000,
          authName: "商品管理",
          path: "product",
          children: [
            {
              id: 20001,
              authName: "用户管理",
              path: "users2",
            },
          ],
        },
        {
          id: 30000,
          authName: "礼品管理",
          path: "gift",
          children: [],
        },
        {
          id: 40000,
          authName: "规格管理",
          path: "norms",
          children: [],
        },
        {
          id: 50000,
          authName: "运费管理",
          path: "post",
          children: [],
        },
        {
          id: 60000,
          authName: "订单管理",
          path: "order",
          children: [],
        },
        {
          id: 70000,
          authName: "线上商家管理",
          path: "onlineStore",
          children: [],
        },
        {
          id: 80000,
          authName: "广告管理",
          path: "ad",
          children: [],
        },
        {
          id: 90000,
          authName: "进出明细",
          path: "inout",
          children: [],
        },
        {
          id: 100000,
          authName: "财务管理",
          path: "affairs",
          children: [],
        },
      ],
      iconObj: {
        "10000": "iconfont icon-group_fill",
        "20000": "iconfont icon-shangpin",
        "30000": "iconfont icon-liping",
        "40000": "iconfont icon-guige",
        "50000": "iconfont icon-banyunfei",
        "60000": "iconfont icon-dingdan",
        "70000": "iconfont icon-store",
        "80000": "iconfont icon-guanggao",
        "90000": "iconfont icon-RectangleCopy",
        "100000": "iconfont icon-caiwu",
      },
    };
  },
  created() {
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
  },
};
</script>

<style scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
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
}
.logo {
  width: 40px;
  height: 40px;
  margin-right: 15px;
}
.el-aside {
  background-color: #333744;
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
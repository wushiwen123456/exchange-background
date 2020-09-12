import { request } from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

// 用户列表
export function userList(data) {
  return request({
    url: '/adminUser/userlist',
    method: 'get',
    params: data
  })
}

// 冻结用户
export function freezeUser(data) {
  return request({
    url: 'adminUser/user_freeze',
    method: 'get',
    params: data
  })
}

// 认证通过
export function aPress(data) {
  return request({
    url: '/AdminUser/pass',
    method: 'post',
    data
  })
}

// 认证信息
export function aInfo(data) {
  return request({
    url: '/adminUser/look',
    method: 'post',
    data
  })
}

// 所有币种
export function currencys() {
  return request({
    url: 'home/currencys',
    method: 'get'
  })
}

// 请求路由列表
export function getUserMenus() {
  return request({
    url: '/adminUser/adminRoute',
    method: 'post'
  })
}

// 所有币种列表(有分页)
export function agencyList(data) {
  return request({
    url: '/admin/agency_list',
    method: 'post',
    data
  })
}

// 添加/修改代币
export function agencyEdit(data) {
  return request({
    url: '/adminUser/agency_edit',
    method: 'post',
    data
  })
}

// 文章列表
export function articList(data) {
  return request({
    url: '/admin/articleList',
    method: 'get',
    params: data
  })
}

// 协议列表
export function agreementList(data) {
  return request({
    url: '/admin/official_list',
    method: 'GET',
    params: data
  })
}

// 协议编辑
export function agreementEdit(data) {
  return request({
    url: '/admin/edit_official',
    method: 'POST',
    data
  })
}

export function agreementDetail(data) {
  return request({
    url: '/admin/lock_official',
    method: 'GET',
    params: data
  })
}

// 修改文章列表置顶
export function changeArticIsTop(data) {
  return request({
    url: '/admin/articleTop',
    method: 'post',
    data
  })
}

// 文章编辑添加
export function operaArtic(data) {
  return request({
    url: 'admin/articleOperation',
    method: 'post',
    data
  })
}

// 文章详情
export function articDetail(data) {
  return request({
    url: '/admin/Article_details',
    method: 'get',
    params: data
  })
}

// 文章删除
export function articRemove(data) {
  return request({
    url: '/admin/Article_del',
    method: 'get',
    params: data
  })
}

/**
 * 机器人相关
 *
 */
// 机器人订单
export function robotOrder(data) {
  return request({
    url: '/adminUser/robot_order',
    method: 'post',
    data
  })
}

// 开启/关闭机器人
export function opeaaRobot(data) {
  return request({
    url: '/adminUser/robot_operation',
    method: 'get',
    params: data
  })
}

// 保存配置
export function setRobotConfig(data) {
  return request({
    url: '/adminUser/robot_config',
    method: 'post',
    data
  })
}

// 获取配置
export function getRobotConfig() {
  return request({
    url: '/adminUser/one_config',
    method: 'get'
  })
}

/**
 * 资产管理
 */
// 资产列表
export function getAssetsList(data) {
  return request({
    url: '/adminUser/order_lsit',
    method: 'POST',
    data
  })
}
// 通过/拒绝
export function AssetsOpera(data) {
  return request({
    url: '/adminUser/pass_order',
    method: 'get',
    params: data
  })
}
// 用户资产
export function getUserAssets(data) {
  return request({
    url: '/adminUser/user_assets',
    method: 'post',
    data
  })
}

/**
 *
 * 交易管理
 */
// 交易记录（市价/限价）
export function platformOrderList(data) {
  return request({
    url: '/adminUser/deal_list',
    method: 'POST',
    data
  })
}

/**
 *
 * 成员管理
 *
 */
// 成员列表
export function memberList(data) {
  return request({
    url: '/adminUser/agency_list',
    method: 'POST',
    data
  })
}

// 代币列表（未绑定代理/绑定代理）
export function noCoin(data) {
  return request({
    url: '/admin/may_coin',
    method: 'GET',
    params: data
  })
}

// 添加代理
export function addAgency(data) {
  return request({
    url: 'adminUser/add_agency',
    method: 'POST',
    data
  })
}

/**
 * 员工管理
 */
// 员工列表
export function staffList(data) {
  return request({
    url: '/adminUser/staff_list',
    method: 'get',
    params: data
  })
}

/**
 * 归集管理
 *
 */
// 归集列表
export function collectionList(data) {
  return request({
    url: '/adminUser/mass_list',
    method: 'get',
    params: data
  })
}

// 归集修改
export function collectionEdit(data) {
  return request({
    url: '/adminUser/mass_edit',
    method: 'POST',
    data
  })
}

/**
 * 交易列表
 */
// 交易列表删除
export function removeOrder(data) {
  return request({
    url: '/adminUser/del_deal',
    method: 'GET',
    params: data
  })
}

// 交易审核通过
export function passOrder(data) {
  return request({
    url: '/adminUser/deal_pass',
    method: 'get',
    params: data
  })
}

// 交易拒绝
export function refuseOrder(data) {
  return request({
    url: '/adminUser/deal_refuse',
    method: 'get',
    params: data
  })
}

// 判断账号是否可用
export function hasEmail(data) {
  return request({
    url: '/adminUser/is_email',
    method: 'get',
    params: data
  })
}

/**
 * 首页
 */
// 获取首页数据
export function getHomeDate() {
  return request({
    url: 'home/index',
    method: 'get'
  })
}

// 获取近期交易记录
export function dealsRecord(data) {
  return request({
    url: 'home/k_line',
    method: 'get',
    params: data
  })
}

// 修改用户资产
export function userAssetsChange(data) {
  return request({
    url: '/adminUser/assetEdit',
    method: 'post',
    data
  })
}

// 模糊查询，根据关键字获取用户
export function getUserByQuery(data) {
  return request({
    url: 'adminUser/dimUser',
    method: 'get',
    params: data
  })
}

// 修改用户邀请
export function setUserInvite(data) {
  return request({
    url: 'adminUser/editUserInviter',
    method: 'get',
    params: data
  })
}

// 所有币种列表
export function getAllagencyList(data) {
  return request({
    url: '/adminUser/randNumList',
    method: 'get',
    params: data
  })
}

// 所有币种列表编辑
export function editAllGencyList(data) {
  return request({
    url: '/adminUser/editRandList',
    method: 'get',
    params: data
  })
}

// 获取最小提笔金额
export function getMinWithdraw(){
  return request({
    url:'adminUser/GetSettingConfig',
    method:'get'  
  })
}

// 保存最小金额
export function setMinWithdraw(data){
  return request({
    url:'adminUser/updateSettingConfig',
    method:'get',
    params:data
  })
}

// 获取轮播图
export function getBanner(data){
  return request({
    url:'adminUser/getBanner',
    method:'get',
    params:data
  })
}

// 保存轮播图
export function setBanner(data){
  return request({
    url:'adminUser/updataBanner',
    method:'post',
    data
  })
}

// banner删除
export function delBanner(data){
  return request({
    url:'adminUser/delBanner',
    method:'get',
    params:data
  })
}
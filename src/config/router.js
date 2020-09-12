const allRouters = [
  {
    path: '/home',
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        authName: '',
        cid: '',
        parentsPath: '',
        parentsName: '',
        pid: '',
        icon: ''
      },
      {
        path: '/userList',
        name: 'Users',
        authName: '会员列表',
        cid: '10001',
        parentsPath: 'users',
        parentsName: '会员管理',
        pid: '10000',
        icon: 'icon-group_fill'
      },
      {
        path: '/assetWater',
        name: 'AssetWater',
        authName: '资产管理',
        cid: '20001',
        parentsPath: 'product',
        parentsName: '资产列表',
        pid: '20000',
        icon: 'icon-caiwu'
      },
      {
        path: '/mtr',
        name: 'Mtr',
        authName: '市价交易记录',
        cid: '30001',
        parentsPath: 'gift',
        parentsName: '交易管理',
        pid: '30000',
        icon: 'icon-jiaoyisuo'
      },
      {
        path: '/ptr',
        name: 'Ptr',
        authName: '限价交易记录',
        cid: '30002',
        parentsPath: 'gift',
        parentsName: '交易管理',
        pid: '30000',
        icon: 'icon-jiaoyisuo'
      },
      // {
      //   path: '/userPermissList',
      //   name: 'UserPermissList',
      //   authName: '角色列表',
      //   cid: '60001',
      //   parentsPath: 'norms',
      //   parentsName: '权限管理',
      //   pid: '60000',
      //   icon: 'icon-quanxian'
      // },
      // {
      //   path: '/permissList',
      //   name: 'PermissList',
      //   authName: '权限列表',
      //   cid: '60002',
      //   parentsPath: 'norms',
      //   parentsName: '权限管理',
      //   pid: '60000',
      //   icon: 'icon-quanxian'
      // },
      {
        path: '/agentList',
        name: 'AgentList',
        authName: '成员列表',
        cid: '40001',
        parentsPath: 'agent',
        parentsName: '成员管理',
        pid: '40000',
        icon: 'icon--Manager'
      },
      {
        path: '/staffList',
        name: 'StaffList',
        authName: '员工列表',
        cid: '50001',
        parentsPath: 'staff',
        parentsName: '员工管理',
        pid: '50000',
        icon: 'icon-yuangong'
      },
      {
        path: '/collectionList',
        name: 'CollectionList',
        authName: '归集设置',
        cid: '70001',
        parentsPath: 'collection',
        parentsName: '归集管理',
        pid: '70000',
        icon: 'icon-xitong'
      },
      {
        path: '/coinList',
        name: 'CoinList',
        authName: '币种列表',
        cid: '80001',
        parentsPath: 'coin',
        parentsName: '币种管理',
        pid: '80000',
        icon: 'icon-btc'
      },
      {
        path: '/articList',
        name: 'ArticList',
        authName: '文章列表',
        cid: '90001',
        parentsPath: 'officialEdit',
        parentsName: '文案管理',
        pid: '90000',
        icon: 'icon-16'
      },
      {
        path: '/agreementList',
        name: 'AgreementList',
        authName: '协议列表',
        cid: '90002',
        parentsPath: 'officialEdit',
        parentsName: '文案管理',
        pid: '90000',
        icon: 'icon-16'
      },
      {
        path: '/robotOrder',
        name: 'RobotOrder',
        authName: '机器人订单',
        cid: '100001',
        parentsPath: 'robot',
        parentsName: '交易机器人',
        pid: '100000',
        icon: 'icon-robot'
      },
      {
        path: '/robotManager',
        name: 'RobotManager',
        authName: '机器人配置',
        cid: '100002',
        parentsPath: 'robot',
        parentsName: '交易机器人',
        pid: '100000',
        icon: 'icon-robot'
      }
    ]
  }
]

const permission1 = [
  {
    path: '/home',
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        authName: '',
        cid: '',
        parentsPath: '',
        parentsName: '',
        pid: '',
        icon: ''
      },
      {
        path: '/userList',
        name: 'Users',
        authName: '会员列表',
        cid: '10001',
        parentsPath: 'users',
        parentsName: '会员管理',
        pid: '10000',
        icon: 'icon-group_fill'
      },
      {
        path: '/assetWater',
        name: 'AssetWater',
        authName: '资产管理',
        cid: '20001',
        parentsPath: 'product',
        parentsName: '资产列表',
        pid: '20000',
        icon: 'icon-caiwu'
      },
      // {
      //   path: '/mtr',
      //   name: 'Mtr',
      //   authName: '市价交易记录',
      //   cid: '30001',
      //   parentsPath: 'gift',
      //   parentsName: '交易管理',
      //   pid: '30000',
      //   icon: 'icon-jiaoyisuo'
      // },
      {
        path: '/ptr',
        name: 'Ptr',
        authName: '限价交易记录',
        cid: '30002',
        parentsPath: 'gift',
        parentsName: '交易管理',
        pid: '30000',
        icon: 'icon-jiaoyisuo'
      },
      // {
      //   path: '/userPermissList',
      //   name: 'UserPermissList',
      //   authName: '角色列表',
      //   cid: '60001',
      //   parentsPath: 'norms',
      //   parentsName: '权限管理',
      //   pid: '60000',
      //   icon: 'icon-quanxian'
      // },
      // {
      //   path: '/permissList',
      //   name: 'PermissList',
      //   authName: '权限列表',
      //   cid: '60002',
      //   parentsPath: 'norms',
      //   parentsName: '权限管理',
      //   pid: '60000',
      //   icon: 'icon-quanxian'
      // },
      {
        path: '/agentList',
        name: 'AgentList',
        authName: '成员列表',
        cid: '40001',
        parentsPath: 'agent',
        parentsName: '成员管理',
        pid: '40000',
        icon: 'icon--Manager'
      },
      // {
      //   path: '/staffList',
      //   name: 'StaffList',
      //   authName: '员工列表',
      //   cid: '50001',
      //   parentsPath: 'staff',
      //   parentsName: '员工管理',
      //   pid: '50000',
      //   icon: 'icon-yuangong'
      // },
      {
        path: '/collectionList',
        name: 'CollectionList',
        authName: '归集设置',
        cid: '70001',
        parentsPath: 'collection',
        parentsName: '归集管理',
        pid: '70000',
        icon: 'icon-xitong'
      },
      {
        path: '/coinList',
        name: 'CoinList',
        authName: '代币列表',
        cid: '80001',
        parentsPath: 'coin',
        parentsName: '币种管理',
        pid: '80000',
        icon: 'icon-btc'
      },
      {
        path: '/allCoinList',
        name: 'AllCoinList',
        authName: '币种列表',
        cid: '80002',
        parentsPath: 'coin',
        parentsName: '币种管理',
        pid: '80000',
        icon: 'icon-btc'
      },
      {
        path: '/articList',
        name: 'ArticList',
        authName: '文章列表',
        cid: '90001',
        parentsPath: 'officialEdit',
        parentsName: '文案管理',
        pid: '90000',
        icon: 'icon-16'
      },
      {
        path: '/agreementList',
        name: 'AgreementList',
        authName: '协议列表',
        cid: '90002',
        parentsPath: 'officialEdit',
        parentsName: '文案管理',
        pid: '90000',
        icon: 'icon-16'
      },
      {
        path: '/homeConfig',
        name: 'HomeConfig',
        authName: '首页设置',
        cid: '100001',
        parentsPath: 'homeConfig',
        parentsName: '首页管理',
        pid: '100000',
        icon: 'icon-homepageselected'
      },
      {
        path: '/otherConfig',
        name: 'OtherConfig',
        authName: '其他',
        cid: '110001',
        parentsPath: 'otherConfig',
        parentsName: '其他设置',
        pid: '110000',
        icon: 'icon-shezhi'
      }
      // {
      //   path: '/robotOrder',
      //   name: 'RobotOrder',
      //   authName: '机器人订单',
      //   cid: '100001',
      //   parentsPath: 'robot',
      //   parentsName: '交易机器人',
      //   pid: '100000',
      //   icon: 'icon-robot'
      // },
      // {
      //   path: '/robotManager',
      //   name: 'RobotManager',
      //   authName: '机器人配置',
      //   cid: '100002',
      //   parentsPath: 'robot',
      //   parentsName: '交易机器人',
      //   pid: '100000',
      //   icon: 'icon-robot'
      // }
    ]
  }
]

const permission2 = [
  {
    path: '/home',
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        authName: '',
        cid: '',
        parentsPath: '',
        parentsName: '',
        pid: '',
        icon: ''
      },
      {
        path: '/userList',
        name: 'Users',
        authName: '会员列表',
        cid: '10001',
        parentsPath: 'users',
        parentsName: '会员管理',
        pid: '10000',
        icon: 'icon-group_fill'
      },
      {
        path: '/assetWater',
        name: 'AssetWater',
        authName: '资产管理',
        cid: '20001',
        parentsPath: 'product',
        parentsName: '资产列表',
        pid: '20000',
        icon: 'icon-caiwu'
      },
      // {
      //   path: '/mtr',
      //   name: 'Mtr',
      //   authName: '市价交易记录',
      //   cid: '30001',
      //   parentsPath: 'gift',
      //   parentsName: '交易管理',
      //   pid: '30000',
      //   icon: 'icon-jiaoyisuo'
      // },
      {
        path: '/ptr',
        name: 'Ptr',
        authName: '限价交易记录',
        cid: '30002',
        parentsPath: 'gift',
        parentsName: '交易管理',
        pid: '30000',
        icon: 'icon-jiaoyisuo'
      },
      {
        path: '/staffList',
        name: 'StaffList',
        authName: '员工列表',
        cid: '50001',
        parentsPath: 'staff',
        parentsName: '员工管理',
        pid: '50000',
        icon: 'icon-yuangong'
      },

      {
        path: '/robotOrder',
        name: 'RobotOrder',
        authName: '机器人订单',
        cid: '100001',
        parentsPath: 'robot',
        parentsName: '交易机器人',
        pid: '100000',
        icon: 'icon-robot'
      },
      {
        path: '/robotManager',
        name: 'RobotManager',
        authName: '机器人配置',
        cid: '100002',
        parentsPath: 'robot',
        parentsName: '交易机器人',
        pid: '100000',
        icon: 'icon-robot'
      }
      // {
      //   path: '/permissList',
      //   name: 'PermissList',
      //   authName: '权限列表',
      //   cid: '60002',
      //   parentsPath: 'norms',
      //   parentsName: '权限管理',
      //   pid: '60000',
      //   icon: 'icon-quanxian'
      // },
      // {
      //   path: '/agentList',
      //   name: 'AgentList',
      //   authName: '成员列表',
      //   cid: '40001',
      //   parentsPath: 'agent',
      //   parentsName: '成员管理',
      //   pid: '40000',
      //   icon: 'icon--Manager'
      // },
      // {
      //   path: '/collectionList',
      //   name: 'CollectionList',
      //   authName: '归集设置',
      //   cid: '70001',
      //   parentsPath: 'collection',
      //   parentsName: '归集管理',
      //   pid: '70000',
      //   icon: 'icon-xitong'
      // },
      // {
      //   path: '/coinList',
      //   name: 'CoinList',
      //   authName: '币种列表',
      //   cid: '80001',
      //   parentsPath: 'coin',
      //   parentsName: '币种管理',
      //   pid: '80000',
      //   icon: 'icon-btc'
      // },
      // {
      //   path: '/articList',
      //   name: 'ArticList',
      //   authName: '文章列表',
      //   cid: '90001',
      //   parentsPath: 'officialEdit',
      //   parentsName: '文案管理',
      //   pid: '90000',
      //   icon: 'icon-16'
      // },
      // {
      //   path: '/agreementList',
      //   name: 'AgreementList',
      //   authName: '协议列表',
      //   cid: '90002',
      //   parentsPath: 'officialEdit',
      //   parentsName: '文案管理',
      //   pid: '90000',
      //   icon: 'icon-16'
      // },
      // {
      //   path: '/userPermissList',
      //   name: 'UserPermissList',
      //   authName: '角色列表',
      //   cid: '60001',
      //   parentsPath: 'norms',
      //   parentsName: '权限管理',
      //   pid: '60000',
      //   icon: 'icon-quanxian'
      // },
    ]
  }
]

export { allRouters, permission1, permission2 }

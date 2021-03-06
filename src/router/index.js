import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式

import Login from '@/views/system/login.vue'; // 登录页面
import Framework from '@/components/framework.vue'; // 主框架
import Dashboard from '@/views/system/dashboard.vue'; // 系统首页
import ChlStatus from '@/views/system/chlStatus.vue'; // // 通道状态
import QueueStatus from '@/views/system/queueStatus.vue'; // 队列状态
import TelConfig from '@/views/system/telConfig.vue'; // 电文配置
import SendLog from '@/views/system/sendLog.vue'; // 系统发送日志
import RecvLog from '@/views/system/recvLog.vue'; // 系统接收日志
import RecvData from '@/views/system/recvData.vue'; // 接收总表数据
import MqLog from '@/views/system/mqLog.vue'; // 后端MQ日志
import SocketLog from '@/views/system/socketLog.vue'; // 后端SOCKET日志
import User from '@/views/system/user.vue'; // 用户管理(授权,增加,修改密码等)
import Dict from '@/views/system/dict.vue'; // 字典管理
import Syscode from '@/views/system/syscode.vue'; // 系统编码管理
import tempUse from '@/views/demo/tempUse.vue'; // 示例

Vue.use(Router);

// 路由配置
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'framework',
      redirect: '/dashboard',
      component: Framework,
      children: [
        {path: '/dashboard', name: 'dashboard', component: Dashboard},
        {path: '/chlStatus', name: 'chlStatus', component: ChlStatus},
        {path: '/queueStatus', name: 'queueStatus', component: QueueStatus},
        {path: '/telConfig', name: 'telConfig', component: TelConfig},
        {path: '/sendLog', name: 'sendLog', component: SendLog},
        {path: '/recvLog', name: 'recvLog', component: RecvLog},
        {path: '/recvData', name: 'recvData', component: RecvData},
        {path: '/mqLog', name: 'mqLog', component: MqLog},
        {path: '/socketLog', name: 'socketLog', component: SocketLog},
        {path: '/user', name: 'user', component: User},
        {path: '/dict', name: 'dict', component: Dict},
        {path: '/syscode', name: 'syscode', component: Syscode}
      ]
    },
    {path: '/login', name: 'login', component: Login},
    {path: '/tempUse', name: 'tempUse', component: tempUse}
  ]
});

router.beforeEach((to, from, next) => {
  NProgress.start(); // 开始进度条
  if (to.path === '/login') {
    next();
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

export default router;

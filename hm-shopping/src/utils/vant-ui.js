// 按需导入
import Vue from 'vue'
import { Checkbox, Dialog, ActionSheet, Rate, Icon, Toast, Tabbar, TabbarItem, NavBar, Search, Swipe, SwipeItem, Grid, GridItem } from 'vant';
Vue.use(Checkbox)
Vue.use(Dialog)
Vue.use(ActionSheet)
Vue.use(Rate)
Vue.use(Icon)
Vue.use(GridItem)
Vue.use(Grid);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Search);
Vue.use(Toast)
Vue.use(NavBar)
Vue.use(Tabbar);
Vue.use(TabbarItem);
//Toast.setDefaultOptions({ duration: 20000 }); // 提示弹窗显示时间
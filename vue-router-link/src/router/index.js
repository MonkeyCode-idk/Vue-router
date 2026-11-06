import My from "@/views/My.vue";
import Friend from "@/views/Friend.vue";
import Find from "@/views/Find.vue";

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/My', component: My },
        { path: '/Friend', component: Friend },
        { path: '/Find', component: Find },
    ]
})

export default router
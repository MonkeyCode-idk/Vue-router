<template>
    <div>
        <div class="footer_wrap">
            <router-link to="/find">发现音乐</router-link>
            <router-link to="/my">我的音乐</router-link>
            <router-link to="/friend">朋友</router-link>
            <!-- 
            1.router-link-active 模糊匹配（用的多）
                        to="/my" 可以匹配 /my /my/a /my/b ...
            -->
            <!-- 
            2.router-link-active-active 精确匹配
                        to="/my" 仅可以匹配 /my 
            -->
        </div>
        <div class="top">
            <!-- 路由出口 -> 匹配的组件所展示的位置 -->
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
body {
    margin: 0;
    padding: 0;
}

.footer_wrap {
    position: relative;
    left: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    text-align: center;
    background-color: #333;
    color: #ccc;
}

.footer_wrap a {
    flex: 1;
    text-decoration: none;
    padding: 20px 0;
    line-height: 20px;
    background-color: #333;
    color: #ccc;
    border: 1px solid black;
}

.footer_wrap a:hover {
    background-color: #555;
}

/* 
router: link active 模糊匹配
to="/find" => 地址栏/find   /find/one   /find/two
*/

/* 
router: link exact active;精确匹配
to="/find"  => 地址栏   /find
 */
/* .footer_wrap a.router-link-exact-active {
    background-color: skyblue;
} */
.footer_wrap a.active {
    background-color: skyblue;
}
</style>
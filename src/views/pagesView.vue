<template>
    <div class="pages-view">
        <el-container>
            <el-header>
                <div class="menu-header">
                    <div><img src="../css/zxlogo.png" style="height:30px;margin-top: 15px;" /></div>
                    <div class="menu-header-right">
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                            1106305522@qq.com <i class="el-icon-arrow-down"></i>
                          </span>
                            <el-dropdown-menu class="" slot="dropdown">
                                <router-link :to="{ path: '/pages/user' }">
                                    <el-dropdown-item>
                                        个人信息
                                    </el-dropdown-item>
                                </router-link>
                                <el-dropdown-item divided style="color: #F56C6C;">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </el-header>
            <el-container>
                <el-aside style="width:66px">
                    <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="true">
                        <el-menu-item index="1">
                            <i class="el-icon-menu"></i>
                            <span slot="title">导航二</span>
                        </el-menu-item>
                        <el-menu-item index="2" disabled>
                            <i class="el-icon-document"></i>
                            <span slot="title">导航三</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main style="height: 1000px;background: #F2F6FC;">
                        <router-view></router-view>
                    </el-main>
                    <el-footer></el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import HomeView from './homeView.vue';
    export default {
        name: 'pages-view',

        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        computed: {
            ...mapState({
                nav: state => state.nav
            })
        },
        mounted() {
            this.getUsers();
        },
        methods: {
            getUsers() {
                console.log(this.$ajax)
                this.$ajax.get('/api/users')
                    .then(function(response) {
                        console.log(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    
    .el-menu-vertical-demo {
        border: none;
    }
    
    .el-main {
        padding: 0px;
    }
    
    .el-aside {
        border-right: 1px solid #e6e6e6;
    }
    
    .el-header {
        padding-right: 0px;
        border-bottom: 1px solid #e6e6e6;
    }
    
    .el-header .menu-header {
        line-height: 60px;
        position: relative;
    }
    
    .el-header .menu-header:before {
        content: "";
        display: flex;
        clear: both;
    }
    
    .el-header .menu-header div {
        float: left;
    }
    
    body {
        margin: 0px;
    }
    
    .menu-header-right {
        position: absolute;
        right: 0px;
        top: 0px;
    }
    
    .quickadd {
        padding: 0px 20px;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        border-left: 1px solid #e6e6e6;
        height: 100%;
    }
    
    .menu-header-right {
        margin-right: 20px;
        width: 180px;
        text-align: center;
    }
    
    .el-dropdown-link {
        color: #409EFF;
    }
    
    .el-dropdown-menu {
        width: 180px;
        text-align: center;
    }
</style>
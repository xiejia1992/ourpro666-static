<template>
    <div class="banner">
        <el-container>
            <el-header>
                <el-menu>
                    <el-menu-item >
                        123
                    </el-menu-item>
                     <el-menu-item justify="end">
                        456
                    </el-menu-item>
                </el-menu>
            </el-header>
            <el-container>
                <el-aside>
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
                    <el-main>
                    </el-main>
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>
            
        </el-container>

            
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: 'banner',
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
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>
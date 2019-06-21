<template>
    <div class="user-view" style="margin:0 auto;">
        <div style="background: #fff;padding:20px">账号中心</div>
        <div>
            <el-tabs v-model="activeName" style="margin: 15px;background: #fff;padding:20px;width: 70%;margin:15px auto;">
                <el-tab-pane label="用户资料" name="first">
                    <el-form label-width="20%" style="width:100%">
                        <el-form-item label="用户头像：">
                            <el-col :span="12" style="height: 100px;width: 100px;">
                                <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-image>
                            </el-col>
                            <el-col :span="6">
                                <el-button type="primary" style="width:100%" plain>更改</el-button>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="邮箱地址：">
                            <el-col :span="20">
                                <el-input placeholder="邮箱地址"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="手机号：">
                            <el-col :span="20">
                                <el-input placeholder="手机号码"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="网址：">
                            <el-col :span="20">
                                <el-input placeholder="网址"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item>
                            <el-col :span="24">
                                <el-col :span="20">
                                    <el-button type="primary" style="width:100%">保存</el-button>
                                </el-col>
                            </el-col>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="账号密码" name="second">
                    <el-form label-width="20%" style="width:100%">
                        <el-form-item label="旧密码：">
                            <el-col :span="20">
                                <el-input placeholder="旧密码"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="新密码：">
                            <el-col :span="20">
                                <el-input placeholder="新密码"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="确认新密码：">
                            <el-col :span="20">
                                <el-input placeholder="确认新密码"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item>
                            <el-col :span="20">
                                <el-button type="primary" style="width:100%">保存</el-button>
                            </el-col>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'user-view',
        components: {},
        data() {
            return {
                activeName: 'first'
            }
        },
    }
</script>

<style scoped>
    .el-image__inner {
        border-radius: 50px;
        height: 100%
    }
    
    .el-input__inner {
        width: auto;
    }
</style>
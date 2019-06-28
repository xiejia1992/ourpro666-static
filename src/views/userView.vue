<template>
    <div class="user-view" style="margin:0 auto;">
        <div style="background: #fff;padding:20px">账号中心</div>
        <div>
            <el-tabs v-model="activeName" style="margin: 15px;background: #fff;padding:20px;width: 70%;margin:15px auto;">
                <el-tab-pane label="用户资料" name="first">
                    <el-form label-width="30%" style="width:100%" :model="ruleForm" :rules="$rules.common" ref="ruleForm">
                        <el-col :span="20">
                            <el-form-item label="用户头像：">
                                <el-col :span="12" style="height: 100px;width: 100px;">
                                    <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-image>
                                </el-col>
                                <el-col :span="6">
                                    <el-button type="primary" style="width:100%" plain>更改</el-button>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="20">
                            <el-form-item label="邮箱地址：" prop="email">
                                <el-input v-model="ruleForm.email" placeholder="邮箱地址"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号：" prop="phone">
                                <el-input v-model="ruleForm.phone" placeholder="手机号码"></el-input>
                            </el-form-item>
                            <el-form-item label="网址：">
                                <el-input placeholder="网址"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-col :span="24">
                                    <el-col :span="20">
                                        <el-button type="primary" @click="userInfo('ruleForm')" style="width:100%">保存</el-button>
                                    </el-col>
                                </el-col>
                            </el-form-item>
                        </el-col>

                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="账号密码" name="second">
                    <el-form label-width="30%" style="width:100%" :model="passForm" :rules="$rules.common" ref="passForm">
                        <el-col :span="20" prop="password">
                            <el-form-item label="旧密码：" prop="lastpass">
                                <el-input v-model="passForm.lastpass" placeholder="旧密码"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码：" prop="password">
                                <el-input v-model="passForm.password" placeholder="新密码"></el-input>
                            </el-form-item>
                            <el-form-item label="确认新密码：" prop="resetpass">
                                <el-input v-model="passForm.resetpass" placeholder="确认新密码"></el-input>
                            </el-form-item>
                            <el-form-item prop="resetpass">
                                <el-button @click="checkPass('passForm')" type="primary" style="width:100%">保存</el-button>
                            </el-form-item>
                        </el-col>
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
                activeName: 'first',
                ruleForm: {
                    email: '',
                    phone: ''
                },
                passForm: {
                    lastpass:'',
                    password: '',
                    resetpass: '',
                }
            }
        },
        methods: {
            userInfo: function(formName) {
                var _this = this;
                var sendJudgeError = '';
                _this.$refs[formName].validateField(['email', 'phone'], (emailError) => {
                    if(emailError != '') {
                        sendJudgeError = sendJudgeError + emailError;
                    }
                });
            },
            checkPass:function(formName){
                 var _this = this;
                var sendJudgeError = '';
                _this.$refs[formName].validateField(['password', 'restpass','lastpass'], (emailError) => {
                    if(emailError != '') {
                        sendJudgeError = sendJudgeError + emailError;
                    }
                });
                if(sendJudgeError){
                     if(this.$data.passForm.password != this.$data.passForm.resetpass) {
                        var formCheckPass = (rule, value, callback) => {
                            return callback("密码不一致");
                        };
                        this.$refs.ruleForm.rules.resetpass.push({
                            validator: formCheckPass,
                            message: "密码不一致"
                        });
                        _this.$refs[formName].validateField(['resetpass'], (resetError) => {
                            sendJudgeError = sendJudgeError + resetError;
                        });
                        if(sendJudgeError == ''){
                            _this.$ajax.post('', {
                            })
                            .then(function(response) {
                                if(response.data.status_code == '200') {
                                     alert('abc')
                                } else if(response.data.status_code == '409'){
                                    alert('abc')
                                }
                            })
                            .catch(function(error) {
                                _this.changeLogin({
                                    Authorization: ''
                                });
                            });
                        }
                    }
                }
            }
        }
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
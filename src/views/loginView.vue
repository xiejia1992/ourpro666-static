<template>
    <div class="loginView">
        <div class="form-area">
            <el-form :model="ruleForm" :rules="$rules.common" ref="ruleForm" class="demo-ruleForm">
                <el-form-item>
                    <div class="form-area-title">登录</div>
                </el-form-item>
                <el-form-item v-show="placeradio==='0'" style="position: relative;" prop="email">
                    <el-input v-model="ruleForm.email" placeholder="使用邮箱登录"></el-input>
                    <span class="change" @click="userchange()">使用手机号登录</span>
                </el-form-item>
                <el-form-item v-show="placeradio==='1'" style="position: relative;" prop="phone">
                    <el-input v-model="ruleForm.phone" placeholder="使用手机号登录"></el-input>
                    <span class="change" @click="userchange()">使用邮箱登录</span>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="ruleForm.password" placeholder="密码为6-16位数字和英文组合"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-col :span="24">
                        <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%">登录</el-button>
                    </el-col>
                </el-form-item>
                <el-form-item style="text-align: right;">
                    <router-link :to="{ name: 'ForgetView' }">忘记密码 | </router-link>
                    <router-link :to="{ name: 'RegisterView' }">新用户登录</router-link>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    console.log(mapMutations)
    export default {
        name: "loginView",
        data() {
            return {
                placeradio: '0',
                ruleForm: {
                    email: '',
                    password: '',
                    phone: ''
                },
            };
        },
        methods: {
            userchange: function() {
                this.$refs['ruleForm'].resetFields();
                if(this.$data.placeradio === '0') {
                    this.$data.placeradio = '1';
                } else {
                    this.$data.placeradio = '0';
                }
            },
            ...mapMutations(['changeLogin']),
            submitForm(formName) {
                var _this = this;
                var sendJudgeError = '';
                if(_this.$data.placeradio == '0') {
                    _this.$refs[formName].validateField(['email', 'password'], (emailError) => {
                        if(emailError != '') {
                            sendJudgeError = sendJudgeError + emailError;
                        }
                    });
                } else {
                    _this.$refs[formName].validateField(['phone', 'password'], (phoneError) => {
                        if(phoneError != '') {
                            sendJudgeError = sendJudgeError + phoneError;
                        }
                    });
                }
                if(sendJudgeError == '') {
                    if(_this.$data.placeradio == '0') {
                        var userName = _this.$data.ruleForm.email;
                    } else {
                        var userName = _this.$data.ruleForm.phone;
                    }
                    var password = _this.$data.ruleForm.password;
                    _this.$ajax.post('http://192.168.0.102:8000/api/login', {
                            user: userName,
                            password: password
                        })
                        .then(function(response) {
                            if(response.data.status_code == '200') {
                                _this.changeLogin({
                                    Authorization: response.data.message
                                });
                                _this.$router.push('/');
                            } else {
                                _this.changeLogin({
                                    Authorization: ''
                                });
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
                            _this.changeLogin({
                                Authorization: ''
                            });
                        });
                }
            }
        }
    }
</script>

<style scoped>
    a:-webkit-any-link {
        font-size: 12px;
    }
</style>
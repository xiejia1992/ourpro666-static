<template>
    <div class="loginView">
        <div class="form-area">
            <el-form :model="ruleForm" :rules="$rules.common" ref="ruleForm" class="demo-ruleForm">
                <el-form-item>
                    <div class="form-area-title">免费注册</div>
                </el-form-item>
                <el-form-item v-show="placeradio==='0'" style="position: relative;" prop="email">
                    <el-input v-model="ruleForm.email" placeholder="使用邮箱注册"></el-input>
                    <span class="change" @click="userchange()">使用手机号注册</span>
                </el-form-item>
                <el-form-item v-show="placeradio==='1'" style="position: relative;" prop="phone">
                    <el-input v-model="ruleForm.phone" placeholder="使用手机号注册"></el-input>
                    <span class="change" @click="userchange()">使用邮箱注册</span>
                </el-form-item>
                <el-form-item>
                    <div class="namecode" @click="check('ruleForm')">请点击按钮进行验证</div>
                </el-form-item>
                <el-form-item v-show="placeradio==='0'" style="position: relative;" prop="emailcode">
                    <el-input v-model="ruleForm.emailcode" placeholder="请输入邮箱验证码"></el-input>
                    <span class="change" @click="userchange()">获取邮箱验证码</span>
                </el-form-item>
                <el-form-item v-show="placeradio==='1'" style="position: relative;" prop="code">
                    <el-input v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
                    <span class="change" @click="userchange()">获取短信验证码</span>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" placeholder="密码为6-16位数字和英文组合"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-col :span="24">
                        <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%;">注册</el-button>
                    </el-col>
                </el-form-item>
                <el-form-item class="minLineHeight" style="border-bottom: 1px solid #DCDFE6;font-size: 12px;">
                    点击注册，表示您已同意
                </el-form-item>
                <el-form-item class="minLineHeight">
                    <router-link :to="{ name: 'LoginView' }">已有账号？点击立即登录</router-link>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script>
    // import axios from 'axios';
    //import Vue from 'Vue';
    import { mapMutations } from 'vuex';
    export default {
        name: "registerView",
        data() {
            return {
                placeradio: '0',
                ruleForm: {
                    email: '',
                    phone: '',
                    code: '',
                    emailcode: '',
                    password: ''
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
            check: function(formName) {
                var formName = formName;
                var _this = this;
                var dataSend = {};
                var dataSendError = '';
                if(this.$data.placeradio == '0') {
                    this.$refs[formName].validateField('email', (emailError) => {
                        if(emailError != '') {
                            dataSendError = dataSendError + emailError;
                        } else {
                            dataSend['user'] = _this.$data.ruleForm.email;
                        }
                    });
                } else {
                    this.$refs[formName].validateField('phone', (phoneError) => {
                        if(phoneError != '') {
                            dataSendError = dataSendError + phoneError;
                        } else {
                            dataSend['user'] = _this.$data.ruleForm.phone;
                        }
                        dataSendError = dataSendError + phoneError;
                    });
                }
                if(dataSendError == '') {
                    _this.$ajax.post('http://192.168.0.103:8000/check_register', dataSend)
                        .then(function(response) {
                            alert('200')
                            if(response.data.status_code == '200') {
                                /* _this.changeLogin({
                                     Authorization: response.data.message
                                 });
                                 _this.$router.push('/');*/
                            } else {
                                /* _this.changeLogin({
                                     Authorization: ''
                                 });*/
                            }
                        })
                        .catch(function(error) {
                            /*console.log(error);
                            _this.changeLogin({
                                Authorization: ''
                            });*/
                        });
                }
            },
            ...mapMutations(['changeLogin']),
            submitForm(formName) {
                var _this = this;
                var sendJudgeError = '';
                if(_this.$data.placeradio == '0') {
                    _this.$refs[formName].validateField(['email', 'emailcode', 'password'], (emailError) => {
                        console.log(emailError)
                        if(emailError != '') {
                            sendJudgeError = sendJudgeError + emailError;
                        }
                    });
                } else {
                    _this.$refs[formName].validateField(['phone', 'code', 'password'], (phoneError) => {
                        if(phoneError != '') {
                            sendJudgeError = sendJudgeError + phoneError;
                        }
                    });
                }
                console.log(phoneErrorCode + emailErrorCode);
                if(sendJudgeError === '') {
                    var dataSend = {};
                    if(_this.$data.placeradio == '0') {
                        dataSend['user'] = _this.$data.ruleForm.email;
                        dataSend['identifying_code'] = _this.$data.ruleForm.emailcode;
                        dataSend['password'] = _this.$data.ruleForm.password;
                    } else {
                        dataSend['user'] = _this.$data.ruleForm.phone;
                        dataSend['identifying_code'] = _this.$data.ruleForm.code;
                        dataSend['password'] = _this.$data.ruleForm.password;
                    }
                    console.log(dataSend)
                    _this.$ajax.post('http://192.168.0.103:8000/register', dataSend)
                        .then(function(response) {
                            if(response.data.status_code == '200') {
                                _this.$router.push('/login');
                            } else {}
                        })
                        .catch(function(error) {
                            console.log(error);
                            _this.changeLogin({
                                Authorization: ''
                            });
                        });
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }

        }
    }
</script>
<style>

</style>
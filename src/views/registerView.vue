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
                    <div v-show="changeinterval.settime===0" class="namecode" @click="check('ruleForm')">请点击按钮进行验证</div>
                    <div v-show="changeinterval.settime===1" class="successcode">已发送</div>
                </el-form-item>
                <el-form-item v-show="placeradio==='0'" style="position: relative;" prop="emailcode">
                    <el-input v-model="ruleForm.emailcode" placeholder="请输入邮箱验证码"></el-input>
                    <span v-show="changeinterval.settime===1" class="change timeColor"></span>
                </el-form-item>
                <el-form-item v-show="placeradio==='1'" style="position: relative;" prop="code">
                    <el-input v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
                    <span v-show="changeinterval.settime===1" class="change timeColor"></span>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="ruleForm.password" placeholder="密码为6-16位数字和英文组合"></el-input>
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
                changeinterval: {
                    setvaltime: 180,
                    timer: '',
                    settime: 0
                },
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
            //清空
            cleartime: function() {
                clearInterval(this.$data.changeinterval.timer);
                this.$data.changeinterval.timer = '';
                this.$data.changeinterval.setvaltime = 180;
                this.$data.changeinterval.settime = 0;
            },
            //修改时间
            changetime: function() {
                this.$data.changeinterval.setvaltime--;
                if(this.$data.changeinterval.setvaltime > 0) {
                    if(this.$data.placeradio == '0') {
                        $('.timeColor').text(this.$data.changeinterval.setvaltime + ' 秒');
                    } else {
                        $('.timeColor').text(this.$data.changeinterval.setvaltime + ' 秒');
                    }
                } else {
                    this.cleartime();
                }
            },
            userchange: function() {
                this.$refs['ruleForm'].resetFields();
                if(this.$data.placeradio === '0') {
                    this.$data.placeradio = '1';
                } else {
                    this.$data.placeradio = '0';
                }
            },
            check: function(formName) {
                var _this = this;
                var formName = formName;
                var dataSend = {};
                var dataSendError = '';
                 var checkUser='';
                 var checkEmailUser='';
                if(this.$data.placeradio == '0') {
                    console.log(this.$refs.ruleForm.rules.email)
                    checkEmailUser = (rule, value, callback) => {
                        this.$ajax.post('http://192.168.0.102:8000/api/check_register', {
                                user: value
                            })
                            .then(function(response) {
                                console.log(response.data.status_code);
                                
                                if(response.data.status_code === 409) {
                                    console.log('409')
                                    callback(new Error("邮箱已被注册"));
                                } else if(response.data.status_code === 200) {
                                    console.log('200')
                                    _this.$data.changeinterval.settime = 1;
                                    _this.$data.changeinterval.setvaltime = 180;
                                    if(_this.$data.changeinterval.timer == '') {
                                        _this.$data.changeinterval.timer = setInterval(_this.changetime, 1000);
                                    }
                                    callback();
                                } else {
                                    callback();
                                }
                            })
                            .catch(function(error) {
                                console.log('a')
                                callback(new Error('服务异常'));
                                _this.changeLogin({
                                    Authorization: ''
                                });
                            });

                    };
                    this.$refs.ruleForm.rules.email.push({
                        validator: checkEmailUser,
                    });
                    this.$refs[formName].validateField('email', (emailError) => {
                        if(emailError != '') {
                            _this.changeLogin({
                                Authorization: ''
                            });
                        } else {
                            console.log('成功')
                        }
                    });
                        this.$refs.ruleForm.rules.email = this.$refs.ruleForm.rules.email.slice(0, 2);
                    
                    console.log(this.$refs.ruleForm.rules.email)
                    
                } else {
                    checkUser = (rule, value, callback) => {
                        this.$ajax.post('http://192.168.0.102:8000/api/check_register', {
                                user: value
                            })
                            .then(function(response) {
                                if(response.data.status_code === 409) {
                                    callback(new Error("手机号已被注册"));
                                } else if(response.data.status_code === 200) {
                                    _this.$data.changeinterval.settime = 1;
                                    _this.$data.changeinterval.setvaltime = 180;
                                    if(_this.$data.changeinterval.timer == '') {
                                        _this.$data.changeinterval.timer = setInterval(_this.changetime, 1000);
                                    }
                                    callback();
                                } else {
                                    callback();
                                }
                            })
                            .catch(function(error) {
                                callback(new Error('服务异常'));
                                _this.changeLogin({
                                    Authorization: ''
                                });
                            });

                        console.log(this.$refs.ruleForm.rules.phone);
                    };
                    this.$refs.ruleForm.rules.phone.push({
                        validator: checkUser,
                    });
                    this.$refs[formName].validateField('phone', (phoneError) => {
                        if(phoneError != '') {
                            this.changeLogin({
                                Authorization: ''
                            });
                        } else {
                            console.log('成功')
                        }
                    });
                    this.$refs.ruleForm.rules.phone = this.$refs.ruleForm.rules.phone.slice(0, 2);
                }
            },
            ...mapMutations(['changeLogin']),
            submitForm(formName) {
                var _this = this;
                var sendJudgeError = '';
                if(_this.$data.placeradio == '0') {
                    _this.$refs[formName].validateField(['email', 'emailcode', 'password'], (emailError) => {
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
                    _this.$ajax.post('http://192.168.0.102:8000/api/register', dataSend)
                        .then(function(response) {
                            if(response.data.status_code == '200') {
                                _this.$router.push('/login');
                            } else {}
                        })
                        .catch(function(error) {
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
<style scoped>
    .timeColor {
        color: #c2c4cb;
        font-size: inherit;
    }
    
    .form-area {}
    
    .successcode {
        -webkit-appearance: none;
        background-color: #FFF;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #67C23A;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #67C23A;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
        -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        width: 100%;
        background: #f7f9fa;
        cursor: pointer;
    }
</style>
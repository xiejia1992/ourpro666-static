<template>
    <div class="forgetView">
        <div class="form-area">
            <el-form :model="ruleForm" :rules="$rules.common" ref="ruleForm" class="demo-ruleForm">
                <el-form-item>
                    <div class="form-area-title">重置密码</div>
                </el-form-item>
                <el-form-item v-show="placeradio==='0'" style="position: relative;" prop="email">
                    <el-input v-model="ruleForm.email" placeholder="输入注册的邮箱" @keyup.native="setPass('ruleForm')"></el-input>
                    <span class="change" @click="userchange()">使用手机号重置</span>
                </el-form-item>
                <el-form-item v-show="placeradio==='1'" style="position: relative;" prop="phone">
                    <el-input v-model="ruleForm.phone" placeholder="输入注册的手机号" @keyup.native="setPass('ruleForm')"></el-input>
                    <span class="change" @click="userchange()">使用邮箱重置</span>
                </el-form-item>
                <el-form-item v-show="placeradio==='0'" style="position: relative;" prop="emailcode">
                    <el-input v-model="ruleForm.emailcode" placeholder="输入邮箱验证码" @keyup.native="setPass('ruleForm')"></el-input>
                    <span class="change getemailcode" @click="getcode('ruleForm')" ref="emailcode" style="font-size: 14px;">获取邮箱验证码</span>
                </el-form-item>
                <el-form-item v-show="placeradio==='1'" style="position: relative;" prop="code">
                    <el-input v-model="ruleForm.code" placeholder="输入手机号验证码" @keyup.native="setPass('ruleForm')"></el-input>
                    <span class="change getephonecode" @click="getcode('ruleForm')" ref="code" style="font-size: 14px;">获取手机号验证码</span>
                </el-form-item>
                <div v-show="timeshow">
                    <el-form-item prop="password">
                        <el-input type="password" v-model="ruleForm.password" placeholder="新密码为6-16位数字和英文组合"></el-input>
                    </el-form-item>
                    <el-form-item prop="resetpass">
                        <el-input type="password" v-model="ruleForm.resetpass" placeholder="再次输入"></el-input>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-col :span="24">
                        <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%">验证</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex';
    export default {
        name: "forgetView",
        data() {
            return {
                timeshow: false,
                changeinterval: {
                    setvaltime: 180,
                    timer: ''
                },
                placeradio: '0',
                ruleForm: {
                    email: '',
                    password: '',
                    password: '',
                    phone: '',
                    code: '',
                    resetpass: '',
                },
            };
        },
        methods: {
            //清空
            cleartime: function() {
                clearInterval(this.$data.changeinterval.timer);
                this.$data.changeinterval.timer = '';
                this.$data.changeinterval.setvaltime = 180;
                if(this.$data.placeradio == '0') {
                    $('.getemailcode').css({
                        'color': '#409EFF'
                    }).text('获取邮箱验证码');
                } else {
                    $('.getephonecode').css({
                        'color': '#409EFF'
                    }).text('获取手机号验证码');
                }
            },
            setPass: function(formName) {
                var _this = this;
                var sendJudgeError = '';
                if(_this.$data.placeradio == '0') {
                    _this.$refs[formName].validateField(['email', 'emailcode'], (emailError) => {
                        if(emailError != '') {
                            sendJudgeError = sendJudgeError + emailError;
                        }
                    });
                } else {
                    _this.$refs[formName].validateField(['phone', 'code'], (phoneError) => {
                        if(phoneError != '') {
                            sendJudgeError = sendJudgeError + phoneError;
                        }
                    });
                }
                if(sendJudgeError == '') {
                    _this.$data.timeshow = true;
                } else {
                    _this.$data.timeshow = false;
                }
            },
            //修改时间
            changetime: function() {
                this.$data.changeinterval.setvaltime--;
                if(this.$data.changeinterval.setvaltime > 0) {
                    if(this.$data.placeradio == '0') {
                        $('.getemailcode').css({
                            'color': '#ccc'
                        }).text(this.$data.changeinterval.setvaltime + ' 秒');
                    } else {
                        $('.getephonecode').css({
                            'color': '#ccc'
                        }).text(this.$data.changeinterval.setvaltime + ' 秒');
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
            getcode: function(formName) {
                var _this = this;
                var sendJudgeError = '';
                if(_this.$data.placeradio == '0') {
                    _this.$refs[formName].validateField(['email'], (emailError) => {
                        if(emailError != '') {
                            sendJudgeError = sendJudgeError + emailError;
                        }
                    });
                } else {
                    _this.$refs[formName].validateField(['phone'], (phoneError) => {
                        if(phoneError != '') {
                            sendJudgeError = sendJudgeError + phoneError;
                        }
                    });
                }
                if(sendJudgeError == '') {
                    if(_this.$data.placeradio == '0') {
                        var userName = _this.$data.ruleForm.email;
                        var checkUser = (rule, value, callback) => {
                            _this.$ajax.post('http://192.168.0.102:8000/api/forget_password', {
                                    user: value
                                })
                                .then(function(response) {
                                    if(response.data.status_code === 404) {
                                        callback(new Error("邮箱不存在"));
                                    } else if(response.data.status_code === 200) {
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
                        };
                        this.$refs.ruleForm.rules.email.push({
                            validator: checkUser,
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
                        _this.$refs.ruleForm.rules.email = _this.$refs.ruleForm.rules.email.slice(0, 2);
                        this.$data.changeinterval.timer = setInterval(this.changetime, 1000);

                    } else {
                        var userName = _this.$data.ruleForm.phone;
                        var checkUser = (rule, value, callback) => {
                            _this.$ajax.post('http://192.168.0.102:8000/api/forget_password', {
                                    user: value
                                })
                                .then(function(response) {
                                    if(response.data.status_code === 404) {
                                        return callback("手机号不存在");
                                    } else if(response.data.status_code === 200) {
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
                }
            },
            ...mapMutations(['changeLogin']),
            submitForm(formName) {
                var _this = this;
                var sendJudgeError = '';
                if(_this.$data.placeradio == '0') {
                    _this.$refs[formName].validateField(['email', 'emailcode', 'password', 'resetpass'], (emailError) => {
                        if(emailError != '') {
                            sendJudgeError = sendJudgeError + emailError;
                        }
                    });
                } else {
                    _this.$refs[formName].validateField(['phone', 'code', 'password', 'resetpass'], (phoneError) => {
                        if(phoneError != '') {
                            sendJudgeError = sendJudgeError + phoneError;
                        }
                    });
                }
                if(sendJudgeError == '') {
                    if(this.$data.ruleForm.password != this.$data.ruleForm.resetpass) {
                        var checkpass = (rule, value, callback) => {
                            return callback("密码不一致");
                        };
                        this.$refs.ruleForm.rules.resetpass.push({
                            validator: checkpass,
                            message: "密码不一致"
                        });
                        _this.$refs[formName].validateField(['resetpass'], (resetError) => {
                            sendJudgeError = sendJudgeError + resetError;
                        });
                        this.$refs.ruleForm.rules.resetpass = this.$refs.ruleForm.rules.resetpass.slice(0, 2);
                    }
                    if(sendJudgeError == '') {
                        var codeNum = '';
                        var userName = '';
                        if(_this.$data.placeradio == '0') {
                            userName = _this.$data.ruleForm.email;
                            codeNum = _this.$data.ruleForm.emailcode;
                        } else {
                            userName = _this.$data.ruleForm.phone;
                            codeNum = _this.$data.ruleForm.code;
                        }
                        _this.$ajax.post('http://192.168.0.102:8000/api/reset_password', {
                                user: userName,
                                identifying_code: codeNum,
                                new_password: _this.$data.ruleForm.password
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
</script>

<style scoped>
    .forgetView {
        width: 400px;
        margin: 0px auto;
        text-align: center;
    }
</style>
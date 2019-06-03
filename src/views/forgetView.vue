<template>
    <div class="forgetView">
        <div class="form-area">
            <el-form :model="ruleForm" :rules="$rules.common" ref="ruleForm" class="demo-ruleForm">
                <el-form-item>
                    <div class="form-area-title">重置密码</div>
                </el-form-item>
                <el-form-item v-show="placeradio==='0'" style="position: relative;" prop="email">
                    <el-input v-model="ruleForm.email" placeholder="输入注册的邮箱"></el-input>
                    <span class="change" @click="userchange()">使用手机号重置</span>
                </el-form-item>
                <el-form-item v-show="placeradio==='1'" style="position: relative;" prop="phone">
                    <el-input v-model="ruleForm.phone" placeholder="输入注册的手机号"></el-input>
                    <span class="change" @click="userchange()">使用邮箱重置</span>
                </el-form-item>
                <el-form-item v-show="placeradio==='0'" style="position: relative;" prop="emailcode">
                    <el-input v-model="ruleForm.emailcode" placeholder="输入邮箱验证码"></el-input>
                    <span class="change getemailcode" @click="getcode('ruleForm')" ref="emailcode" style="font-size: 14px;">获取邮箱验证码</span>
                </el-form-item>
                <el-form-item v-show="placeradio==='1'" style="position: relative;" prop="code">
                    <el-input v-model="ruleForm.code" placeholder="输入手机号验证码"></el-input>
                    <span class="change getephonecode" @click="getcode('ruleForm')" ref="code" style="font-size: 14px;">获取手机号验证码</span>
                </el-form-item>
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
                changeinterval: {
                    setvaltime: 10,
                    timer: ''
                },
                placeradio: '0',
                ruleForm: {
                    email: '',
                    password: '',
                    phone: ''
                },
            };
        },
        methods: {
            //清空
            cleartime: function() {
                clearInterval(this.$data.changeinterval.timer);
                this.$data.changeinterval.timer = '';
                this.$data.changeinterval.setvaltime = 10;
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
                    } else {
                        var userName = _this.$data.ruleForm.phone;
                    }
                    _this.$ajax.post('http://192.168.0.103:8000/login', {
                            user: userName,
                        })
                        .then(function(response) {
                            if(response.data.status_code == '200') {
                                if(this.$data.changeinterval.timer == '') {
                                    this.$data.changeinterval.timer = setInterval(this.changetime, 1000);
                                }
                            } else {

                            }
                        })
                        .catch(function(error) {
                            console.log(error);

                        });
                }
            },
            ...mapMutations(['changeLogin']),
            submitForm(formName) {
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
                    var codeNum = '';
                    var userName = '';
                    if(_this.$data.placeradio == '0') {
                        userName = _this.$data.ruleForm.email;
                        codeNum = _this.$data.ruleForm.emailcode;
                    } else {
                        userName = _this.$data.ruleForm.phone;
                        codeNum = _this.$data.ruleForm.code;
                    }
                    _this.$ajax.post('http://192.168.0.103:8000/login', {
                            user: userName,
                            code: codeNum
                        })
                        .then(function(response) {
                            if(response.data.status_code == '200') {
                                this.$router.push({
                                    name: 'ResetpassView',
                                    params: {
                                        query: userName
                                    }
                                })
                            } else {

                            }
                        })
                        .catch(function(error) {

                        });
                }
            }
        }
    }
</script>

<style>
    .form-area {
        height: 300px;
    }
    
    .forgetView {
        width: 400px;
        margin: 0px auto;
        text-align: center;
    }
</style>
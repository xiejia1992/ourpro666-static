<template>
    <div class="resetpassView">
        <div class="form-area">
            <el-form :model="ruleForm" :rules="$rules.common" ref="ruleForm" class="demo-ruleForm">
                <el-form-item>
                    <div class="form-area-title">重置密码</div>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" placeholder="新密码为6-16位数字和英文组合"></el-input>
                </el-form-item>
                <el-form-item prop="resetpass">
                    <el-input v-model="ruleForm.resetpass" placeholder="再次输入"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-col :span="24">
                        <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%;">重置密码</el-button>
                    </el-col>
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
        name: "resetpassView",
        data() {
            return {
                ruleForm: {
                    resetpass: '',
                    password: ''
                },
            };
        },
        methods: {
            ...mapMutations(['changeLogin']),
            submitForm(formName) {
                var _this = this;
                var sendJudgeError = '';
                var dataSend = {};
                _this.$refs[formName].validateField(['resetpass', 'password'], (emailError) => {
                    if(emailError != '') {
                        sendJudgeError = sendJudgeError + emailError;
                    }
                });
                if(sendJudgeError == '') {
                    if(this.$data.ruleForm.resetpass === this.$data.ruleForm.password) {
                        dataSend['name'] = this.$route.params.query;
                        dataSend['password'] = this.$data.ruleForm.password;
                        _this.$ajax.post('http://192.168.0.103:8000/register', dataSend)
                            .then(function(response) {
                                if(response.data.status_code == '200') {
                                    _this.$router.push('/');
                                } else {}
                            })
                            .catch(function(error) {
                                _this.changeLogin({
                                    Authorization: ''
                                });
                            });
                    } else {
                        console.log('b')

                        alert('两次不一致')
                    }
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style>
    .resetpassView {
        width: 400px;
        margin: 0px auto;
        text-align: center;
    }
</style>
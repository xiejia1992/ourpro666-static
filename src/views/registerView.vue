<template>
    <div class="resgisterView">
        <el-form :model="ruleForm" :rules="$rules.common" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    // import axios from 'axios';
    //import Vue from 'Vue';
    localStorage.setItem('Authorization', '');
    import { mapMutations } from 'vuex';
    console.log(mapMutations)
    export default {
        name: "resgisterView",
        data() {
            return {
                ruleForm: {
                    name: '',
                    password: '',
                    phone: ''
                },
            };
        },
        methods: {
            ...mapMutations(['changeLogin']),
            submitForm(formName) {
                var _this = this;
                _this.$refs[formName].validate((valid) => {
                    console.log(valid)
                    if(valid) {
                        var userName = _this.$data.ruleForm.name;
                        var password = _this.$data.ruleForm.password;
                        _this.$ajax.post('http://192.168.0.102:8000/register', {
                                username: userName,
                                password: password
                            })
                            .then(function(response) {
                                if(response.data.status_code == '200') {
                                    _this.$router.push('/login');
                                }
                            })
                            .catch(function(error) {
                                _this.changeLogin({
                                    Authorization: ''
                                });
                            });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
    /*export default {
        name: "loginView",
        data() {
            return {
                ruleForm: {
                    name:'',
                    user: '',
                    password: '',
                    validate: false
                },
                rules:{
                    name:[
                        {required:true,message:'输入用户名称',trigger:'change'},
                        {max:128,message:'小于128个字符',trigger:'change'},
                    ],
                    
                }
            }
        },
        methods: {
            submitForm() {
                this.$refs['ruleForm'].validate((valid) => {
                  if (valid) {
                    alert('submit!');
                  } else {
                    console.log('error submit!!');
                    return false;
                  }
                });
              }
            validateForm(Scope) {
                //this.$data.info.validate=true;
                this.$validator.validateAll('form-1').then(valid => {
                    console.log(valid)
                    if(valid) {
                        var userName = this.$data.info.user;
                        var password = this.$data.info.password;
                        // do stuff if not valid.
                        this.$ajax.post('http://192.168.0.103:8000/login', {
                                username: userName,
                                password: password
                            })
                            .then(function(response) {
                                console.log(response);
                            })
                            .catch(function(error) {
                                console.log(error);
                            });
                    }
                });
            }
        },
        watch: {
            loginDialogVisible(val) {
                val && this.initLoginDialog()
            }
        }
    }*/
</script>

<style>
    .errorSpan {
        display: block;
        color: #f56c6c;
        font-size: 14px;
        padding-left: 14px;
        margin-top: 4px;
    }
    
    .el-button,
    .el-input {
        margin-top: 6px;
    }
</style>
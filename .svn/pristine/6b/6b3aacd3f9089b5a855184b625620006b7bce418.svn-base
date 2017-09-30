<template>
    <div>
        <el-row>
            <el-col :span="24" style="padding-left:82px">
                <el-form :model="search" :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-date-picker v-model="search.createTime" type="date" placeholder="选择日报时间" @change="sfomartData">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="readData" icon="search">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="日报名称"  placeholder="请输入日报名称">
                        <el-input v-model="form.journalTitle"></el-input>
                    </el-form-item>
                    <el-form-item label="接收人">
                        <el-select v-model="form.sysJournalSenderIds" filterable multiple  placeholder="请选择接收人" style="width:100%">
                            <el-option v-for="item in userList" :label="item.userName" :key="item.value" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <div >
                        <vue-editor v-model="form.journalContent"></vue-editor>
                        <!-- <vue-editor v-model="content" ></vue-editor> -->
                    </div>
                    <el-form-item style="margin-top:20px">
                        <el-button type="primary" @click="onSubmit">发送</el-button>
                        <el-button @click="saveData()">保存</el-button>
                    </el-form-item>

                </el-form>
            </el-col>

        </el-row>

        <el-row style="margin-top:20px">

            <el-col :span="24">
                <ul class="cbp_tmtimeline" style="padding:0">
                    <li v-for="item in dailyList">
                        <div class="cbp_tmicon">
                            <b>{{item.num}}号</b>
                        </div>
                        <div class="cbp_tmlabel">
                            <div class="daily-con">
                                <div>
                                    <a class="text-primary">{{item.journalTitle}}</a>
                                </div>
                                <div style="margin-bottom:10px">
                                    <p v-html="item.journalContent"></p>
                                </div>

                                <a class="reply_icon mr-10 f-r">
                                    <!-- <el-button type="text">补交</el-button> -->
                                </a>
                                <div class="daily-time">
                                    <small>{{item.createTime}}</small>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
import { getDailyList , updataDaily , getUserInfo } from "@/api/oa"
export default {
    components: {
        VueEditor
    },
    data() {
        return {
            content: '<p></p>',
            customToolbar: [
                ['bold', 'italic', 'underline' , 'strike'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [ 'code-block' , 'blockquote'],
                [{'font' : 'picker'}]
            ],
            placeholder:'请输入日报内容',
            search: {
                // pageNum: 1,
                // pageSize: 10,
                createTime:null,
            },
            form: {
                flag: 0,
                isread: 0,
                sysJournalSenderIds: [],
                journalTitle: '',
                journalContent: ''
            },
            formcus: {
                flag: 0,
                isread: 0,
                sysJournalSenderIds: [],
                journalTitle: '',
                journalContent: ''
            },
            userList:[],
            dailyList:[],
        }
    },
    methods: {
        sfomartData(va) {
            this.search.createTime = va;
        },
        onSubmit() {
            
            let str = '';
            this.form.sysJournalSenderIds.forEach((v,i)=>{
                str += v + ","
            })
            this.form.sysJournalSenderIds = str.substring(str.Length, str.length - 1)
            console.log(this.form)
            this.$confirm('确定要发布吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                updataDaily(this.form).then(res => {
                    if (res.httpCode == 200) {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                        // this.$router.push({path: '/OA/daily/myDaily'});
                        this.readData();
                        this.form = Object.assign({},this.formcus)
                    } else {
                        this.$message({
                            type: 'info',
                            message: '操作失败'
                        });
                    }
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: '操作失败'
                    });
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        saveData(){
            this.$message.error('暂未开放此功能');
        },
        readData() {
            this.fullscreenLoading = true;
            console.log(this.search);
            getDailyList(this.search).then(response => {
                console.log(response)
                if(response.httpCode == 200){
                    response.data.forEach((v,i)=>{
                        v.num = v.createTime.substr ( 8 , 2 )
                        // console.log(typeof v.createTime)
                    })
                    this.dailyList = response.data;

                    console.log(this.dailyList)
                    this.fullscreenLoading = false;
                }else{
                    this.$message.error(response.msg);
                }
                
            }).catch(error => {
                console.log(error)
                this.$message.error(error.msg);
                this.fullscreenLoading = false;
            })
        },
        readUser(){
            getUserInfo().then(response => {
                console.log(response)
                if(response.httpCode == 200){
                    this.userList = response.data;
                    console.log(this.dailyList)
                }else{
                    this.$message.error(response.msg);
                }
            }).catch(error => {
                console.log(error)
                this.$message.error(error.msg);
            })
        }
    },
    mounted() {
        this.readData();
        this.readUser();
    }
}
</script>
<style lang="scss" scoped>
h3 {
    margin-top: 0px;
}

</style>

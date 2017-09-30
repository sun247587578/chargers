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
        </el-row>

        <el-row style="margin-top:20px">

            <el-col :span="24">
                <ul class="cbp_tmtimeline" style="padding:0" v-if="dailyList.length>0">
                    <li  v-for="item in dailyList" >
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
                                    <br>
                                    <small>{{item.sendUserName}}</small>
                                </div>
                            </div>
                        </div>
                    </li>
                    <!-- <li v-else>
                        
                        <div class="cbp_tmlabel">
                            <div class="daily-con">
                                <div>
                                    <a class="text-primary"></a>
                                </div>
                                <div style="margin-bottom:10px">
                                    <p>暂无数据</p>
                                </div>

                                <a class="reply_icon mr-10 f-r">
                                   <el-button type="text">补交</el-button> 
                                </a>
                                <div class="daily-time">
                                </div>
                            </div>
                        </div>
                    </li> -->
                </ul>
                <div v-else class="noData">
                    暂无数据
                </div>

            </el-col>
            <el-col :span="24">
                <div class="block" style="padding-left:70px">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 100]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </el-col>

        </el-row>
    </div>
</template>
<script>
import { unReadDaily } from "@/api/oa"
export default {
    data() {
        return {
            search: {
                pageNum: 1,
                pageSize: 10,
                createTime: null,
            },
            dailyList: [],
            total: 0,
        }
    },
    methods: {
        sfomartData(va) {
            this.search.createTime = va;
        },
        handleSizeChange(val) {
            this.search.pageSize = val
            this.readData()
        },

        handleCurrentChange(val) {
            this.search.pageNum = val
            this.readData()
        },
        readData() {
            this.fullscreenLoading = true;
            unReadDaily(this.search).then(response => {
                console.log(response)
                if (response.httpCode == 200) {
                    if (response.data.length < 0) {
                        response.data.forEach((v, i) => {
                            v.num = v.createTime.substr(8, 2)
                            // console.log(typeof v.createTime)
                        })
                        this.dailyList = response.data;
                        this.total = response.total;
                    }
                    console.log(this.dailyList.length)
                    this.fullscreenLoading = false;
                } else {
                    this.$message.error(response.msg);
                }

            }).catch(error => {
                console.log(error)
                this.$message.error(error.msg);
                this.fullscreenLoading = false;
            })
        },
    },
    mounted() {
        this.readData();
    }
}
</script>
<style lang="scss" scoped>
h3 {
    margin-top: 0px;
}
.noData{
    padding-left: 80px;
    line-height:60px
}
</style>

<template>
    <div id="announcement">
        <el-row v-if="detailIO">
            <el-col :span="24">
                <el-form :model="search" :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-date-picker v-model="search.startTime" format="yyyy-MM-dd" type="datetime" @change="sfomartData" placeholder="选择开始时间">
                        </el-date-picker>
                        <el-date-picker v-model="search.endTime" type="datetime" placeholder="选择结束时间" @change="sfomartData1">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="搜索标题 内容" v-model="search.announceName"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="readData" icon="search">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <el-table :data="AnnouncementList" :fit="true" :resizable="true" v-loading="fullscreenLoading" element-loading-text="拼命加载中" border style="width: 100%">
                    <el-table-column type="index" label="序号" width="120">
                    </el-table-column>
                    <el-table-column prop="announceName" label="标题" min-width="300">
                    </el-table-column>
                    <el-table-column prop="announceDesc" label="内容" min-width="400">
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建日期" min-width="300">
                    </el-table-column>

                    <el-table-column prop="announceValidate" label="有效日期" min-width="300">
                    </el-table-column>
                    <el-table-column prop="allowRangeName" label="查看范围" min-width="300">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="120">
                        <template scope="scope">
                            <el-button @click="lookDetil(scope.$index)" type="text" size="small">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 100]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div> -->
            </el-col>
        </el-row>
        <div v-else>
            <div class="wrap effect box-center">
                <h2 class="stitle">公 告</h2>
                <div>
                    <h4>
                        {{detaildata.announceDesc}}
                    </h4>
                </div>
                <p class="author" v-if="detaildata.createUserName">发布人 : {{detaildata.createUserName}}</p>
                <p class="author" style="bottom:20px">{{detaildata.createTime}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { getAnnouncementList } from "@/api/oa"

export default {
    data() {
        return {
            AnnouncementList: [],
            detaildata: {},
            search: {
                // pageNum: 1,
                // pageSize: 10,
                endTime: null,
                startTime: null,
                announceName: null,
            },
            radio2: 3,
            total: 0,
            detailIO: true,
            fullscreenLoading: true
        }
    },
    methods: {
        goBack() {
            this.detailIO = true;
            this.readData()
        },
        sfomartData(va) {
            this.search.startTime = va;
        },
        compile(index){
            console.log(index)
            this.detaildata = this.AnnouncementList[index];
            this.detailIO = false
        },
        sfomartData1(va) {
            this.search.endTime = va;
        },
        stateFormat(row, column) {
            let state = row[column.property];
            switch (state) {
                case 0:
                    return "未审核";
                case 1:
                    return "已审核";
                default:
                    return "不合格";
            }
        },
        lookDetil(index) {
            console.log(index)
            this.detaildata = this.AnnouncementList[index];
            this.detailIO = false
        },
        compile(index){
            console.log(index)
            this.detaildata = this.AnnouncementList[index];
            this.detailIO = false
        },
        handleSizeChange(val) {
            this.search.pageSize = val
            this.readData()
        },

        handleCurrentChange(val) {
            this.search.pageNum = val
            this.readData()
        },
        searchData() {
            console.log(this.search)
            this.readData()
        },
        readData() {
            this.fullscreenLoading = true;
            console.log(this.search);
            getAnnouncementList(this.search).then(response => {
                this.AnnouncementList = response.data
                console.log(response.data)
                this.total = response.total // 总条数
                this.fullscreenLoading = false;
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

<style lang="scss">
#announcement{
    .box-center {
        width: 1000px;
        margin: 0 auto;
        position: relative;
        .stitle {
            font-family: "楷体";
            font-size: 30px;
            text-align: center;
        }
        h4{
            font-family: "楷体";
            font-size: 22px;
            text-indent:2em;
            line-height: 40px;
        }
        .author{
            font-family: "楷体";
            font-size: 16px;
            position: absolute;
            right: 40px;
            bottom:60px;
        }
    }
    .cell {
        white-space: nowrap !important;
    }
}

</style>

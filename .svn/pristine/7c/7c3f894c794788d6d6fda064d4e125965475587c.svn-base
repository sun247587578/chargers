<template>
    <div>
        <div class="wrap effect box-center">
            <h2 class="stitle">
                <div style="float:left">
                    <el-date-picker v-model="search.createTime" type="month" placeholder="选择日期">
                    </el-date-picker>
                </div>
                2017年9月 日报统计
            </h2>
            
            <table class="table table-bordered" style="margin-top:10px" v-loading="fullscreenLoading" element-loading-text="拼命加载中">
                <thead>
                    <tr>
                        <th>姓名</th>
                        <th v-for="i in 31">{{i}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>zi</td>
                        <td v-for="i in 31">{{i}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 100]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            search: {
                // pageNum: 1,
                // pageSize: 10,
                createTime:null,
            },
            total:10,
            
        }
    },
    methods:{
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
    },
    mounted(){
        
    }
}
</script>
<style lang="scss" scoped>
.stitle {
    font-family: "楷体";
    font-size: 30px;
    text-align: center;
}
</style>

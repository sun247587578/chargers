<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" :model="search" class="demo-form-inline">
                    <el-form-item>
                        <el-select v-model="search.processId" filterable placeholder="工序" @change="getLineNameList">
                            <el-option v-for="item in processList" :key="item.id" :label="item.processName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                    <el-select v-model="search.line" filterable placeholder="线号">
                      <el-option v-for="item in lineList" :key="item.id" :label="item.lineName" :value="item.lineName"></el-option>
                    </el-select>
                  </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="search" @click="readData">查询</el-button>
                        <el-button type="success" icon="upload2" @click="exportExcel">导出</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <el-table ref="multipleTable" :data="listData" v-loading="fullscreenLoading" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column label="过程名称" >
                        <template scope="scope">{{ scope.row.spcProcess.processName }}</template>
                    </el-table-column>
                    <el-table-column prop="encoding" label="二维码编号" >
                    </el-table-column>
                    <!-- <el-table-column prop="line" label="二维码编号" >
                    </el-table-column> -->
                    <el-table-column prop="number" label="二维码标识" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <!-- <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div> -->
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { readProcessList , getQRCodeList , readLineNameList } from "@/api/spc"
import { webUrl } from "@/api/constURL"
export default {
    data() {
        return {
            fullscreenLoading: false,
            listData: [],
            search: {
                processId: '',
                line:'',
                pageNum: 1,
                pageSize: 200,
            },
            multipleSelection: [],
            processList:[],
            lineList:[],
            total: 0,
            detailIO: false,
            
        }
    },
    methods: {
        lookSelect(){
            console.log(this.multipleSelection)
        },
        getLineNameList(){
            readLineNameList({processId:this.search.processId}).then(response => {
                this.lineList = response.data
                console.log(response.data)
            }).catch(error => {
            })
        },
        readData() {
            if(!this.search.processId){
                this.$message({
                    message: '请选择一个工序'
                })
                return 
            }
            if(!this.search.line){
                this.$message({
                    message: '请选择一个线号'
                })
                return 
            }
            this.fullscreenLoading = true;
            getQRCodeList(this.search).then(response => {
                this.listData = response.data
                console.log(response.data)
                this.total = response.total // 总条数
                this.fullscreenLoading = false;
            }).catch(error => {
                this.$notify({
                    title: '提示',
                    content: '数据加载出错！！',
                    type: 'error'
                })
                this.fullscreenLoading = false;
            })
        },
        exportExcel(){
            let codeIds = '';
            this.multipleSelection.forEach((val,key)=>{
                codeIds += val.id + 'm';
            })
            codeIds = codeIds.substring(0, codeIds.length-1);
            console.log(codeIds);
			let api = 'charger-SPC-Web/app/spcControlCode/get/twoDimensionalCode?'
			let url = webUrl
			let exportUrl = `${url}${api}codeIds=${codeIds}`
			console.log(exportUrl)
			window.location = exportUrl
			

		},
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSizeChange(val) {
            this.search.pageSize = val
            this.readData()
        },
        handleCurrentChange(val) {
            this.search.pageNum = val
            this.readData()
        },
        getProcessList(){
            readProcessList({}).then(response => {
                console.log(response.data)
                this.processList = response.data
            }).catch(error => {
                this.$notify({
                    title: '提示',
                    content: '数据加载出错！！',
                    type: 'error'
                })
                this.fullscreenLoading = false;
            })
        }
    },
    mounted() {
        // this.readData();
        this.getProcessList()
    }
}
</script>
<style lang="scss" scoped>
.tableOcc {
    tr {
        td {
            line-height: 52px;
            text-align: right;
        }
    }
}
</style>
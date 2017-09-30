<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" :model="search" class="demo-form-inline">
                    <el-form-item label="">
                        <el-date-picker type="datetime" v-model="search.createTime" placeholder="委托日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="">
                        <el-input v-model="search.batchNumber" placeholder="委托批次"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="searchData" icon="search">搜索</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24" v-loading="fullscreenLoading" element-loading-text="拼命加载中">
                <div style="width:100%;overflow:auto">
                    <table class="table table-bordered" style="margin-top:10px">
                        <thead>
                            <tr>
                                <th style="min-width:150px">日期</th>
                                <th style="min-width:150px">班别</th>
                                <th style="min-width:150px">送样时间</th>
                                <th style="min-width:200px">委托批号</th>
                                <th style="min-width:150px">规格</th>
                                <th style="min-width:150px">钢种</th>
                                <th style="min-width:150px">炉号</th>
                                <th style="min-width:150px">编号/轮号</th>
                                <th style="min-width:150px">样品号</th>
                                <th style="min-width:150px">机台号</th>
                                <th style="min-width:150px">下盘时间</th>
                                <th v-for="a in gaugeHead" style="min-width:180px">{{a.title}}{{a.unit}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(a,index) in beadList">
                                <td>{{a.testTime}}</td>
                                <td>{{a.classesName}}</td>
                                <td>{{a.sampleCreateTime?a.sampleCreateTime:''}}</td>
                                <td>{{a.batchNumber}}</td>
                                <td>{{a.specName}}</td>
                                <td></td>
                                <td></td>
                                <td>{{a.number? a.number:"-"}} / {{a.spool}}</td>
                                <td>{{a.sampleNumber}}</td>
                                <td></td>
                                <td></td>
                                <td v-for="c in a.models">
                                    <div v-if="c">
                                        <span :style="{color: c.qualified == 1? 'red' : ''}">
                                            {{c ? c.srdValue:''}}
                                        </span>
                                    </div>

                                    <!-- {{c}} -->

                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 100]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>

        <!-- <el-table :data="beadList" border style="width: 100%">
                <el-table-column fixed prop="footwallTime" label="日期" width="150">
                </el-table-column>
                <el-table-column prop="classesName" label="班别" min-width="200">
                </el-table-column>
                <el-table-column prop="footwallTime" label="送样时间" min-width="200">
                </el-table-column>
                <el-table-column prop="batchNumber" label="委托批号" min-width="200">
                </el-table-column>
                <el-table-column prop="specName" label="规格" min-width="200">
                </el-table-column>
                <el-table-column prop="furnaceNumber" label="炉号" min-width="200">
                </el-table-column>
                <el-table-column prop="spool" label="编号/轮号" min-width="200">
                </el-table-column>
                <el-table-column prop="sampleNumber" label="样品号" min-width="200">
                </el-table-column>
                <el-table-column prop="sampleNumber" label="机台号" min-width="200">
                </el-table-column>
                <el-table-column prop="footwallTime" label="下盘时间" min-width="200">
                </el-table-column>
                <el-table-column prop="zip" label="直径(mm)" min-width="200">
                </el-table-column>
                <el-table-column prop="zip" label="不圆度(mm)" min-width="200">
                </el-table-column>
                <el-table-column prop="zip" label="破断力Fm(N)" min-width="200">
                </el-table-column>
                <el-table-column prop="zip" label="断裂总伸长率A(%)" min-width="200">
                </el-table-column>
                <el-table-column prop="zip" label="抗拉强度Rm(Mpa)" min-width="200">
                </el-table-column>
                <el-table-column prop="zip" label="屈强比(%)" min-width="200">
                </el-table-column>
                <el-table-column prop="zip" label="平直度(mm/3m)" min-width="200">
                </el-table-column>
                <el-table-column prop="zip" label="扭转(次/360°/100d)" min-width="200">
                </el-table-column>
                <el-table-column prop="zip" label="断口类型" min-width="200">
                </el-table-column>
                <el-table-column prop="zip" label="线密度" min-width="200">
                </el-table-column>
                <el-table-column prop="zip" label="镀层重量(g/kg)" min-width="200">
                </el-table-column>
                <el-table-column prop="zip" label="镀层厚度(μm)" min-width="200">
                </el-table-column>
                <el-table-column prop="zip" label="镀层组分Cu(%)" min-width="200">
                </el-table-column>
                <el-table-column prop="zip" label="镀层组分Sn(%)" min-width="200">
                </el-table-column>
                <el-table-column prop="zip" label="古马隆(g/kg)" min-width="200">
                </el-table-column>
                <el-table-column prop="zip" label="物检员" min-width="200">
                </el-table-column>
                <el-table-column prop="zip" label="化验员" min-width="200">
                </el-table-column>
                <el-table-column prop="zip" label="备注" min-width="200">
                </el-table-column>
                <el-table-column prop="zip" label="抽出力" min-width="200">
                </el-table-column>
                <el-table-column prop="zip" label="附胶率" min-width="200">
                </el-table-column>
              </el-table> -->

    </div>
</template>
<script>


import { readLabQualifiedList } from "@/api/lab"

export default {
    props: ['state'],
    data() {
        return {
            fullscreenLoading: false,
            beadList: [],
            gaugeHead: [],
            search: {
                state: 1,//1合格，2不合格
                pageNum: 1,
                pageSize: 10,
                productId: 1,//产品id
                batchNumber: '',
                createTime: '',
            },
            total: 0,
            fullscreenLoading: true,

        }
    },
    methods: {
        getUrl() {
            // console.log(this.$route.name)

            let sname = this.$route.name;
            if (sname == '胎圈合格表') {
                this.search.productId = 1
            } else {
                this.search.productId = 2
            }
            console.log(this.search)
            this.readData()
        },

        cons() {
            console.log(this.beadList)
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
            this.readData()
        },
        readData() {
            this.search.state = this.state
            readLabQualifiedList(this.search).then(response => {
                let resArr = response.data.pager.records;
                resArr.forEach((val, index) => {
                    val.models.forEach((v, i) => {
                        if (!v) {
                            v = new Object();
                            v.qualified = 0,
                                v.srdValue = '-'
                        }

                    })
                })
                this.beadList = resArr
                console.log(this.beadList)
                this.gaugeHead = response.data.projects

                this.total = Number(response.data.pager.total) // 总条数
                this.fullscreenLoading = false;
            }).catch(error => {
                this.fullscreenLoading = false;
            })
        },
    },
    mounted() {
        // this.getUrl();
        this.readData();
        // console.log(this.state)
    }
}
</script>
<style lang="scss" scoped>

</style>

<template>
    <div>
        <div id="dvData">
            <h3 style="text-align:center">{{sname}}检测报告</h3>
            <table class="table table-bordered tab8 stable" style="position:table-layout">
                <tr>
                    <td>记录编号</td>
                    <td></td>
                    <td>客户代码</td>
                    <td>{{sdata.stru}}</td>
                    <td>样品来源</td>
                    <td>客户送样</td>
                    <td>NO:</td>
                    <td></td>
                </tr>
                <tr>
                    <td>委托部门</td>
                    <td>{{sdata.submitUnit}}</td>

                    <td>送样日期</td>
                    <td>{{sdata.createTime}}</td>
                    <td>委托批号</td>
                    <td>{{sdata.batchNumber}}</td>
                    <td>样品数量</td>
                    <td>{{sdata.samples.length}}</td>
                </tr>
                <tr>
                    <td>样品外观</td>
                    <td>正常</td>
                    <td>检测部门</td>
                    <td></td>
                    <td>环境条件</td>
                    <td colspan="3"></td>

                </tr>
                <tr>
                    <td>检测项目</td>
                    <td colspan="7" style="text-align:left">
                        <span v-for="b in sdata.labSubmitProjects">{{b.value}} </span>
                    </td>
                </tr>
                <tr>
                    <td>检测依据</td>
                    <td colspan="7"></td>
                </tr>
                <!-- <tr>
                    <td>规格</td>
                    <td>{{sdetail.spec}}</td>
                    
                    <td>下盘时间</td>
                    <td colspan="3"></td>
                </tr> -->
            </table>

            <table class="stable table table-bordered" style="margin:10px 0 0 0" v-if="sdata.samples">
                <thead>
                    <tr>
                        <th>规格</th>
                        <th>钢种</th>
                        <th>炉号</th>
                        <th v-for="item in sdata.samples[0].details">{{item.type}}</th>
                        <th  v-for="v in sdata.labSubmitProjectWrites" v-if="v.title != '直径最小值'">{{v.title }}<br>{{v.unit}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in sdata.samples">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td v-for="a in item.details">{{a.value}}</td>
                        <td v-for="a in item.projects" v-if="a.title != '直径最小值'">
                            <template v-if="a.values[0]">
                                    <el-popover
                                        placement="top"
                                        trigger="hover"
                                        width="160">
                                        <p>
                                            <template v-if="a.values.length > 2" v-for="(e,ind) in a.values">
                                                <template v-if="ind>0">
                                                    {{ "第"+ind+"次"+ e.value }}
                                                </template>
                                            </template>
                                            <template v-else>
                                                {{'--'}}
                                            </template>
                                        </p>
                                        
                                        <el-button slot="reference" type="text" size="small" :style="{color: a.values[0].red== 1? 'red' : ''}">{{a.values[0]? a.values[0].value : a.values[0]}}</el-button>
                                    </el-popover>
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="stable table table-bordered" style="margin-top:-1px">
                <tr>
                    <td style="width:12.5%">备注</td>
                    <td></td>
                </tr>
            </table>
            <table class="stable table table-bordered tab8" style="margin-top:10px">
                <tr>
                    <td>班别</td>
                    <td>{{sdata.classes}}</td>
                    <td>物检员</td>
                    <td>{{sdata.physicalUser}}</td>
                    <td>化验员</td>
                    <td>{{sdata.chemistryUser}}</td>
                    <td>审核</td>
                    <td>{{sdata.verifyUser}}</td>
                </tr>
                <tr>
                    <td>检验时间</td>
                    <td colspan="3">{{ sdata.verifyTimes }}</td>
                    <td>审核时间</td>
                    <td colspan="3"></td>
                </tr>
            </table>
        </div>
        <div style="text-align:center;margin-top:20px">
            <!-- <button class="btn btn-primary" @click.stop.prevent="conso">查看</button> -->
            <el-button type="warning" v-if="state == 2" @click="AuditVerify(2)">打回</el-button>
            <el-button type="success" v-if="state == 1" @click="AuditVerify(1)">审核</el-button>
            <el-button type="success" v-if="state == 3" @click="Receive(2)">接收</el-button>
            <el-button type="primary" @click.stop.prevent="printCont">打印</el-button>
            <el-button type="primary" :plain="true" @click.stop.prevent="goBack">返回</el-button>
        </div>
    </div>
</template>
<script>

import { LabAuditVerify, LabReceive } from "@/api/lab"

export default {
    name: "reportCard",
    props: ['sid', 'sdata', 'sdetail', 'state', 'sname'],
    data() {
        return {
            list: []
        }
    },
    methods: {
        goBack() {
            this.$emit('goBack')
        },
        conso() {
            console.log(this.sdata)
        },
        printCont() {
            let newWindow = window.open("_blank");

            var stylecss = `
            *{
                font-family:宋体
            }
            h3{
                margin-top: 20px;
                margin-bottom: 10px;
            }
                .table-bordered {
                    border: 1px solid #ddd;
                }
                .stable{
                    width:100%;
                    border-collapse: collapse;
                    border-spacing: 0;
                }
                .stable tr td{
                    text-align:center;
                    border: 1px solid #ddd;
                    line-height:34px;
                }
                .stable tr th{
                    text-align:center;
                    border: 1px solid #ddd;
                    line-height:34px;
                }
                .tab8 tr td {
                    width:12.5%;
                }
            `
            // <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/zui/1.7.0/css/zui.min.css'>
            var headstr = "<html><head><title></title><style>" + stylecss + "</style></head><body><div style='width:1400px'>";
            var footstr = "</div></body>";

            var printData = document.getElementById("dvData").innerHTML;
            // document.body.innerHTML = headstr+printData+footstr;  
            newWindow.document.write(headstr + printData + footstr);
            newWindow.print();
            // window.print();  
            // window.location.reload();
            newWindow.close();
            // document.body.innerHTML = oldstr;  
            return false;
        },
        AuditVerify(num) {
            console.log(this.sid)
            this.$confirm('确定要执行吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // deleteBaseProcduct(obj).then(res => {
                //     if (res.httpCode == 200) {
                //         this.$message({
                //             type: 'success',
                //             message: '删除成功!'
                //         });
                //         that.readData()
                //     } else {
                //         this.$message({
                //             type: 'info',
                //             message: '删除失败'
                //         });
                //     }

                // }).catch(err => {
                //     this.$message({
                //         type: 'info',
                //         message: '删除失败'
                //     });
                // })
                LabAuditVerify({ id: this.sid, verifyState: num + '' }).then(res => {
                    if (res.httpCode == 200) {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                        this.$emit('goBack')
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
        Receive(num) {
            // LabReceive({"submitState":num,id:this.sid})
            this.$confirm('确定要执行吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                LabReceive({ id: this.sid, submitState: num + '' }).then(res => {
                    if (res.httpCode == 200) {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                        this.$emit('goBack')
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
        }
    },
    mounted(){
        // this.sdata.labSubmitProjectWrites.splice(12,2)
        this.sdata.labSubmitProjectWrites.forEach((v,i)=>{
            if(v.title == '直径最大值'){
                console.log(i)
                this.sdata.labSubmitProjectWrites.splice(i,1)
                this.sdata.samples.forEach((val,ind)=>{
                    val.projects.splice(i,1)
                })
            }
        });
        console.log(this.sdata)
        // this.sdata.samples.forEach((v,i)=>{
        //     console.log(v.projects)
        // })
    }

}
</script>
<style lang="scss" scoped>
.table {
    margin-bottom: -1px;
}

.stable {
    width: 100%;
    tr {
        td,
        th {
            text-align: center;
        }
    }
}

.tab8 {
    tr td {
        width: 12.5%
    }
}

.box {
    width: 400px;

    .top {
        text-align: center;
    }

    .left {
        float: left;
        width: 60px;
    }

    .right {
        float: right;
        width: 60px;
    }

    .bottom {
        clear: both;
        text-align: center;
    }

    .item {
        margin: 4px;
    }

    .left .el-tooltip__popper,
    .right .el-tooltip__popper {
        padding: 8px 10px;
    }
}
</style>

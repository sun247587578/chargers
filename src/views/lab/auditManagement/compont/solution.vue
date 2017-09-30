<template>
    <div>
        <div id="dvData">
            <div class="clearfix">
                <p class="pull-left">记录编号 :
                    <span class="text-primary bold">{{sdata.main.reportNumber}}</span>
                </p>
                <p class="pull-right" style="margin-right:20px">NO :
                    <span class="text-primary bold">{{sdata.main.reportNo}}</span>
                </p>
            </div>
            <hr>
            <ul class="intro clearfix">
                <li>委托部门 :
                    <span class="text-red">{{sdata.main.entrustDept}}</span>
                </li>
                <li>检测项目 :
                    <span class="text-red">{{sdata.main.detectProject}}</span>
                </li>
                <li>检测部门 :
                    <span class="text-red">{{sdata.main.detectDept}}</span>
                </li>
                <li>样品数量 :
                    <span class="text-red">{{sdata.main.simpleNum == null? '0' : sdata.main.simpleNum}}</span>
                </li>
                <li>环境条件 :
                    <span class="text-red">{{sdata.main.condition}}</span>
                </li>
                <li>检测依据 :
                    <span class="text-red">{{sdata.main.detectGist}}</span>
                </li>
            </ul>
            <table class="stable table table-bordered" style="margin-top:10px">
                <thead>
                    <tr>
                        <th colspan="2" style="text-align:center"> 取样信息 </th>
                        <th colspan="" style="text-align:center"> 碱洗槽 </th>
                        <th colspan="2" style="text-align:center"> 碱洗槽1 </th>
                        <th colspan="3" style="text-align:center"> 碱洗槽2 </th>
                        <th colspan="3" style="text-align:center"> 盐酸槽 </th>
                        <th colspan="4" style="text-align:center"> 硫酸A槽 </th>
                        <th colspan="4" style="text-align:center"> 硫酸通B槽 </th>
                        <th colspan="" style="text-align:center"> 弱碱槽 </th>
                    </tr>
                    <tr>
                        <th>日期时间</th>
                        <th>胎圈线</th>

                        <th>NaOH</th>
                        <th>H
                            <sub>2</sub>SO
                            <sub>4</sub>
                        </th>
                        <th>Fe
                            <sup>2+</sup>
                        </th>
                        <th>H
                            <sub>2</sub>SO
                            <sub>4</sub>
                        </th>
                        <th>Fe
                            <sup>3+</sup>
                        </th>
                        <th>Fe
                            <sup>2+</sup>
                        </th>
                        <th>HCI</th>
                        <th>Fe
                            <sup>2+</sup>
                        </th>
                        <th>Fe
                            <sup>3+</sup>
                        </th>
                        <!-- <th>母液 Cu
                            <sup>2+</sup>
                        </th> -->
                        <th> Cu
                            <sup>2+</sup>
                        </th>
                        <th>H
                            <sub>2</sub>SO
                            <sub>4</sub>
                        </th>
                        <th>Fe
                            <sup>2+</sup>
                        </th>
                        <th>SnSO
                            <sub>4</sub>
                        </th>
                        <th> Cu
                            <sup>2+</sup>
                        </th>
                        <th>H
                            <sub>2</sub>SO
                            <sub>4</sub>
                        </th>
                        <th>Fe
                            <sup>2+</sup>
                        </th>
                        <th>SnSO
                            <sub>4</sub>
                        </th>
                        <th>NaOH</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in sdata.record">
                        <td>{{item.date}}</td>
                        <td>{{item.bead}}</td>
                        <td>{{item.v1}}</td>
                        <td>{{item.v2}}</td>
                        <td>{{item.v3}}</td>
                        <td>{{item.v4}}</td>
                        <td>{{item.v5}}</td>
                        <td>{{item.v6}}</td>
                        <td>{{item.v7}}</td>
                        <td>{{item.v8}}</td>
                        <td>{{item.v9}}</td>
                        <td>{{item.v10}}</td>
                        <td>{{item.v11}}</td>
                        <!-- <td>{{item.v12}}</td> -->
                        <td>{{item.v13}}</td>
                        <td>{{item.v14}}</td>
                        <td>{{item.v15}}</td>
                        <td>{{item.v16}}</td>
                        <td>{{item.v17}}</td>
                        <td>{{item.v18}}</td>
                        <td>{{item.v19}}</td>
                    </tr>
                </tbody>

            </table>
            <div class="remark hl-primary">
                <ul class="intro clearfix ">
                    <li class="text-ellipsis">备注 : {{sdata.main.remark}}</li>
                    <li class="text-ellipsis">{{sdata.main.remarkOne}}</li>
                    <li class="text-ellipsis">{{sdata.main.remarkTwo}}</li>
                    <li class="text-ellipsis">{{sdata.main.remarkThree}}</li>
                </ul>

            </div>
        </div>
        <div style="text-align:center;margin-top:20px">
            <el-button type="warning" v-if="state == 2" @click="AuditVerify(2)">打回</el-button>
            <el-button type="success" v-if="state == 1" @click="AuditVerify(1)">审核</el-button>
            <el-button type="primary" @click.stop.prevent="printCont">打印</el-button>
            <el-button type="primary" :plain="true" @click.stop.prevent="goBack">返回</el-button>

            <!-- <button class="btn btn-primary" @click.stop.prevent="conso">查看</button> -->

        </div>
        <!-- <div class="remark hl-special">
                <ul class="intro clearfix">
                    <li class="colorccc">班别 : {{sdata.main.remark}}</li>
                    <li class="colorccc">检测人 : {{sdata.main.remarkOne}}</li>
                    <li class="colorccc">检测晶期 : {{sdata.main.remarkTwo}}</li>
                    <li class="colorccc">审核人 : {{sdata.main.remarkThree}}</li>
                    <li class="colorccc">报告日期 : {{sdata.main.remarkThree}}</li>
                </ul>
            </div> -->
    </div>
</template>
<script>
export default {
    props: ['sdata', 'state'],
    methods: {
        goBack() {
            this.$emit('goBack')
        },
        printCont() {
            let newWindow = window.open("_blank");

            var stylecss = `
            *{
                font-family:宋体
            }
            .clearfix:before, .clearfix:after {
                display: table;
                line-height: 0;
                content: "";
                clear: both;
            }
            ul, ol {
    list-style: none;
}
ol, ul {
    margin-top: 0;
    margin-bottom: 10px;
}
ol, ul {
    padding-left: 20px;
}
.intro .colorccc {
        color: #bbb;
    }
.intro li {
        float: left;
        width: 220px;
        color: #666;
    }

.remark {
    line-height: 60px; // background: #efefef;
}
            .bold {
                font-weight: bold;
            }
            .text-primary {
                color: #3280fc;
            }
            .pull-left {
    float: left!important;
}
.pull-right {
    float: right!important;
}
.text-danger, .text-red {
    color: #ea644a;
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

        }
    }

}
</script>
<style lang="scss" scoped>
.bold {
    font-weight: bold
}

.intro {
    li {
        float: left;
        width: 200px;
        color: #666;
    }
    .colorccc {
        color: #bbb;
    }
}

.remark {
    line-height: 60px; // background: #efefef;
}
</style>

<template>
    <div>
        <div class="wrap effect box-center">
            <h2 class="stitle">公 告</h2>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="公告名称">
                    <el-input v-model="form.announceName"></el-input>
                </el-form-item>
                <el-form-item label="公告内容">
                    <el-input type="textarea" v-model="form.announceDesc"></el-input>
                </el-form-item>
                <el-form-item label="查看范围">
                    <el-row>
                        <el-col :span="4">
                            <el-radio-group v-model="form.allowRange">
                                <el-radio label="0">全公司</el-radio>
                                <el-radio label="1">部门</el-radio>
                            </el-radio-group>
                        </el-col>

                        <el-col :span="20">
                            <!-- <template v-if="form.allowRange=='1' "> -->
                                <el-select v-model="announceDept" multiple filterable placeholder="请选择" style="width:100%" v-show="form.allowRange=='1' ">
                                    <el-option v-for="item in deptList" :key="item.id" :label="item.deptName" :value="item.id">
                                    </el-option>
                                </el-select>
                            <!--</template>-->
                        </el-col>
                    </el-row>

                </el-form-item>

                <el-form-item label="有效期限">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.announceValidate" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <!-- <el-form-item label="附件">
                        <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或
                                <em>点击上传</em>
                            </div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item> -->
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">发布</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { getDeptInfo, updataAnnouncement } from "@/api/oa"
import { formatDate } from "@/utils/index"

export default {
    data() {
        return {
            deptList: [],
            form: {
                announceName: '',
                announceValidate: '',
                allowRange: 0,
                announceDesc: '',
                attachementName: "",
                attachementPath: "",
                enable: 0,
                isTop: 0
            },
            announceDept: null,
        }
    },
    methods: {
        onSubmit() {
            if (this.form.announceValidate) {
                this.form.announceValidate = formatDate(this.form.announceValidate);
            }

            if (this.form.allowRange == 1) {
                let str = new String();
                this.announceDept.forEach((v, i) => {
                    str += v + ','
                })
                this.form.allowRange = str.substring(str.Length, str.length - 1)
            }
            console.log(this.form);
            this.$confirm('确定要发布吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                updataAnnouncement(this.form).then(res => {
                    if (res.httpCode == 200) {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                        this.$router.push({path: '/OA/announcement/companyAnnouncement'});
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
        readData() {
            getDeptInfo().then(response => {
                this.deptList = response.data
                console.log(response.data)
            }).catch(error => {
                console.log(error)
                this.$message.error(error.msg);
            })
        },
    },
    mounted() {
        this.readData()
    }

}
</script>
<style lang="scss" scoped>
.box-center {
    width: 1000px;
    margin: 0 auto;
    .stitle {
        font-family: "楷体";
        font-size: 30px;
        text-align: center;
        
    }
}
</style>

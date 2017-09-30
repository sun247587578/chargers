<template>
  <div>
    <el-row :gutter="20" style="margin-right:0px">
      <el-col :span="6">
        <el-tree :data="positionObj" label="positionObj.positionTitle" id="stree" style="overflow:auto" node-key="id" :props="defaultProps" @node-click="nodeClick"></el-tree>
      </el-col>
      <el-col :span="18" style="border:1px solid #ccc;padding:0">
        <div>
          <p class="title" style="padding:10px">职位管理</p>
        </div>
        <div style="padding-right:15px;padding-top:15px;width:700px">

          <el-form ref="positionForm" :model="positionForm" label-width="80px">
            <el-form-item label="职位名称">
              <el-input v-model="positionForm.positionTitle"></el-input>
            </el-form-item>
            <el-form-item label="职位编号">
              <el-input v-model="positionForm.positionNo"></el-input>
            </el-form-item>
            <el-form-item label="所属部门">
              <el-select v-model="positionForm.deptId" filterable placeholder="请选择活动区域" @change="filterPosition">
                <el-option label="无" value="0"></el-option>
                <el-option v-for="item in deptInfo" :key="item.id" :label="item.deptName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上级职位">
              <el-select v-model="positionForm.parentId" filterable placeholder="请选择活动区域">
                <el-option label="无" value="0"></el-option>
                <el-option v-for="item in positionInfo" :key="item.id" :label="item.positionTitle" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            

            <el-form-item label="备注">
              <el-input type="textarea" v-model="positionForm.remark"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">确认</el-button>
              <el-button v-if="this.positionForm.id" type="warning" @click.native.prevent="deleteData">删除</el-button>
              <el-button @click="resetForm()">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>

    </el-row>

  </div>
</template>

<script>
let id = 1000;
import { updatePosition, readsysPosition, getPositionInfo, getDeptInfo , deletePosition } from "@/api/oa"

export default {
  data() {
    return {
      isNew: true, // 用户信息是编辑模式还是增加模式
      positionObj: [],
      deptInfo: [],
      positionInfo: [],
      positionForm: {
        positionTitle: '',//职位名称
        positionNo: '',//部门编号
        deptId: '',//部门ID
        parentId: '',//父级ID
        remark: ""//备注
      },
      positionFormcus: {
        positionTitle: '',//职位名称
        positionNo: '',//部门编号
        deptId: '',//部门ID
        parentId: '',//父级ID
        remark: ""//备注
      },
      defaultProps: {
        children: 'children',
        label: 'positionTitle'
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    nodeClick(a, b, c) {
      // console.log(a)
      let newObj = new Object();
      $.extend(true, newObj, a);
      newObj.deptId = newObj.deptId.toString();
      console.log(newObj)
      this.positionForm = newObj
    },
    readTreeList() {
      readsysPosition().then(response => {
        this.positionObj = response.data
      }).catch(error => {
      })
    },
    filterPosition(){
      getPositionInfo({deptId : this.positionForm.deptId}).then(response => {
        this.positionInfo = response.data;
      }).catch(error => {
      })
    },
    deleteData() {
      // deleteDept
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePosition({ id: this.positionForm.id }).then(res => {
          if (res.httpCode == 200) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            // this.$router.push({path: '/OA/daily/myDaily'});
            this.readTreeList();
            // this.getPosition();
            this.positionForm = Object.assign({}, this.positionFormcus)
            console.log(this.deptForm)
          } else {
            this.$message({
              type: 'info',
              message: res.msg
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
    onSubmit() {
      console.log(this.positionForm)
      updatePosition(this.positionForm).then(res => {
        console.log(res)
        switch (res.httpCode) {
          case 200:
            this.$notify.success({
              title: '提示',
              message: '添加成功'
            });
            this.positionForm = Object.assign({}, this.positionFormcus)
            this.readTreeList();
            // this.getPosition();


            break;

          default:

            this.$message({
              message: res.msg,
              type: 'warning'
            });
            console.log(this.$refs.form)
            break;
        }
      }).catch(error => {
        console.log(error)
      })

    },

    //获取职位相关信息list
    getPosition() {
      getPositionInfo().then(response => {
        this.positionInfo = response.data;
      }).catch(error => {
      })
    },
    //获取部门相关信息list
    getDept() {
      getDeptInfo().then(response => {
        this.deptInfo = response.data
      }).catch(error => {
      })
    },
    resetForm(formName) {
      this.positionForm = Object.assign({}, this.positionFormcus)
    }
  },
  mounted() {
    var stree = document.getElementById('stree');
    let checkImg = this.$refs.checkImg;
    let clHeight = $(window).height();
    stree.style.height = clHeight - 80 + 'px';
    //checkImg.style.height=clHeight-80+'px';
    this.readTreeList();
    this.getDept();
    // this.getPosition();
  },
};
</script>

<style  lang="scss" scoped>
.title {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  font-weight: 800;
}

.el-select {
  width: 100%;
}
</style>
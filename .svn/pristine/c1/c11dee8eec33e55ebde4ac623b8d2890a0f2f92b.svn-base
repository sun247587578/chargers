<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-tree :data="deptList" ref="checkImg" id="stree" :render-content="renderContent" :props="defaultProps" node-key="id" highlight-current :indent="10" @node-click="testClick"></el-tree>
      </el-col>
      <el-col :span="16" :offset="2">
      </el-col>
  
    </el-row>
  </div>
</template>

<script>
import { readDeptList } from "@/api/oa"
let id = 10000
export default {
  data () {
    return {
      form: {
        companyContract: '',
        phone: '',
        fax: '',
        email: '',
        zipCode: '',
        industry: '',
        website: '',
        address: '',
        remark: ''
      },
      imageUrl: '',
      defaultProps: {
        children: 'children',
        label: 'deptName'
      },
      deptList: [],
      switch: false
    }

  },
  mounted () {
    var stree = document.getElementById('stree');
    let checkImg = this.$refs.checkImg;
    let clHeight = document.body.clientHeight;
    stree.style.height = clHeight - 80 + 'px';
    this.readTreeList()
  },
  methods: {
    testClick (item, node, obj) {

      

    },
    save () {
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    append (store, data) {
      store.append({ id: id++, label: 'testtest', children: [] }, data);
    },
    deleteRow (index, rows) {
      rows.splice(index, 1);
    },
    remove (store, data) {
      store.remove(data);
    },
    readTreeList () {
      readDeptList().then(response => {
        let result = response.data
        this.deptList = result
      }).catch(error => {
      })
    },
    renderContent (h, { node, data, store }) {
      return (
        <span class="">
          <span>
            <span>{node.label}</span>
          </span>
            <span class="wrapper custom-node" style="float: right; margin-right: 10px;display:none">
            <el-button  size="small" on-click={ () => this.append(store, data) } icon="edit"></el-button>
            <el-button  size="small" icon="plus"></el-button>
            <el-button  size="small" on-click={ () => this.remove(store, data) } icon="delete2"></el-button>
           </span>
        </span>
        );
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.el-button+.el-button {
    margin-left: 2px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<template>
  <div @click="s_stopPropagation">
    <el-col :span="24">
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="search.productName" placeholder="产品名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="search.productNo" placeholder="产品编号"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="search.enable" placeholder="状态">
            <el-option label="可用" value="1"></el-option>
            <el-option label="不可用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search_date" icon="search">搜索</el-button>
          <el-button type="success" @click="addProduct" icon="plus">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>序号</th>
            <th>产品名称</th>
            <th>产品编码</th>
            <th>状态</th>
            <th>创建人</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item , index) in productList" @click="rightSideShow( index , item.id )">
            <td>{{index + 1}}</td>
            <td>{{item.productName}}</td>
            <td>{{item.productNo}}</td>
            <td v-if="item.enable== '1'">启用</td>
            <td v-if="item.enable== '0'">停用</td>
            <td>{{item.createBy}}</td>
            <td>{{item.createTime}}</td>
            <td @click="s_stopPropagation">
              <el-button type="primary" icon="edit" @click="compileProduct(item.id,index)" size="small"></el-button>
              <el-button type="primary" icon="delete" @click="removeProduct(item.id,index)" size="small"></el-button>
            </td>
          </tr>

        </tbody>
      </table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 100]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-col>
<!-- 新增产品 -->
    <el-dialog title="产品" :visible.sync="dialogFormVisible">
      <el-form :model="productform">
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="productform.productName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品编码" :label-width="formLabelWidth">
          <el-input v-model="productform.productNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否可用" :label-width="formLabelWidth">
          <el-switch v-model="productform.enable" on-text="" off-text="" on-value="1" off-value="0">
          </el-switch>
        </el-form-item>
        <el-form-item label="产品排序" :label-width="formLabelWidth">
          <el-input v-model="productform.sort" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="productSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增规格 -->
    <el-dialog title="规格型号" :visible.sync="specFormVisible">
      <el-form :model="specform">
        <!-- <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="specform.productId" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <span>{{productform.productName}}</span>
        </el-form-item>
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="specform.specName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品编码" :label-width="formLabelWidth">
          <el-input v-model="specform.specNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否可用" :label-width="formLabelWidth">
          <el-switch v-model="specform.enable" on-text="" off-text="" on-value="1" off-value="0">
          </el-switch>
        </el-form-item>
        <el-form-item label="产品排序" :label-width="formLabelWidth">
          <el-input v-model="specform.sort" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="specFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="specSubmit">确 定</el-button>
      </div>
    </el-dialog>


    <!-- 侧滑部分 -->
    <div class="right-side" v-bind:class="{ 'right-side-show': isSide}">
      <p class="p-title">{{productform.productName}}产品详情</p>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">

          <ul class="list-group" style="padding:20px">
            <li class="list-group-item" style="margin-bottom:10px">
              创建人 : {{productform.createBy}}
            </li>
            <li class="list-group-item">
              产品名称 : {{productform.productName}}
            </li>
            <li class="list-group-item">
              产品编码 : {{productform.productNo}}
            </li>
            <li class="list-group-item">
              状态 : {{productform.enable == 0 ? "停用" : "启用"}}
            </li>
            <li class="list-group-item">
              产品排序 : {{ productform.sort}}
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="规格型号" name="second">
          <div style="padding-left:20px">
            <el-form :inline="true" :model="specSearch" class="demo-form-inline">
              <el-form-item label="产品规格名称">
                <el-input v-model="specSearch.specName" size="small" placeholder="产品规格名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchSpecDate" icon="search" size="small">搜索</el-button>
                <el-button type="success" @click="addSpec" icon="plus" size="small">新增</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div>
            <el-table :data="specificationsList" highlight-current-row border style="width: 100%">
              <el-table-column type="index" prop="index" label="序号" width="80">
              </el-table-column>
              <el-table-column prop="specName" label="产品规格名称" sortable width="180">
              </el-table-column>
              <el-table-column prop="specNo" label="产品规格代码" sortable width="180">
              </el-table-column>
              <el-table-column prop="enable" label="状态" :formatter="stateFormat" width="180">
              </el-table-column>
              <el-table-column label="操作" fixed="right" width="180">
                <template scope="scope">
                  <el-button @click.native.prevent="compileSpec(scope.$index, specificationsList)" type="text" size="small">
                    编辑
                  </el-button>
                  <el-button @click.native.prevent="deleteSpec(specificationsList[scope.$index].id)" type="text" size="small">
                    移除
                  </el-button>
                </template>
              </el-table-column>

            </el-table>
            <div class="block">
              <el-pagination @size-change="specSizeChange" @current-change="specCurrentChange" :current-page="specSearch.pageNum" :page-sizes="[10, 20, 30, 100]" :page-size="specSearch.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="specTotal">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { readBaseProcductList, readBaseProcductDetail, addBaseProcduct, editBaseProcduct, deleteBaseProcduct , readBaseSpecificationsList , addBaseSpec , deleteBaseSpec} from "@/api/base"
function productformcus() {
  // 添加的时候的构造函数
    this.id = '',
    this.productName = '',
    this.enable = '',
    this.productNo = '',
    this.sort = ''
}
function specformcus(pid) {
  // 添加的时候的构造函数
        this.productId=pid,
        this.specName= '',
        this.enable='',
        this.specNo='',
        this.sort=''
}

export default {
  data() {
    return {
      productList: [],
      search: {
        pageNum: 1,
        pageSize: 10,
        keyword: null,
        productName: '',
        enable: '',
        productNo: '',
        sort: ''
      },
      total: 0,
      specSearch: {
        pageNum: 1,
        pageSize: 10,
        specName:'',
        productId: '',
      },
      specTotal: 0,
      
      specificationsList: [{}],
      dialogFormVisible: false,
      specFormVisible: false,
      productform: {
        id: '',
        productName: '',
        enable: '',
        productNo: '',
        sort: ''
      },
      specform: {
        productId: '',
        specName: '',
        enable: '',
        specNo: '',
        sort: ''
      },

      formLabelWidth: '120px',
      value1: true,
      isSide: false, //控制侧滑框   
      activeName: 'first'
    }
  },
  methods: {
    
    productSubmit() {

      addBaseProcduct(this.productform).then(res => {
        if (res.httpCode == 200) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
          this.readData();
        } else {
          this.$message({
            type: 'info',
            message: '添加失败'
          });
        }
        this.dialogFormVisible = false;
      }).catch(err => {
        this.$message({
          type: 'info',
          message: '添加失败'
        });
        this.dialogFormVisible = false;
      })
    },
    specSubmit() {
      addBaseSpec(this.specform).then(res => {
        if (res.httpCode == 200) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
          this.readSpecificationsData();
        } else {
          this.$message({
            type: 'info',
            message: '添加失败'
          });
        }
        this.specFormVisible = false;
      }).catch(err => {
        this.$message({
          type: 'info',
          message: '添加失败'
        });
        this.specFormVisible = false;
      })
    },

    addProduct() {
      this.dialogFormVisible = true;
      this.productform = new productformcus();
    },
    //编辑产品
    compileProduct(sid, index) {
      let obj = new Object();
      obj.id = sid;
      this.productform = this.productList[index];
      this.dialogFormVisible = true;
    },
    compileSpec(ind , arr){
      this.specform=arr[ind];
      this.specFormVisible = true;
    },
    // 删除产品
    removeProduct(sid) {
      let that = this;
      let obj = new Object();
      obj.id = sid;
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBaseProcduct(obj).then(res => {
          if (res.httpCode == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            that.readData()
          } else {
            this.$message({
              type: 'info',
              message: '删除失败'
            });
          }
        }).catch(err => {
          this.$message({
            type: 'info',
            message: '删除失败'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    deleteSpec(sid) {
      let that = this;
      let obj = new Object();
      obj.id = sid;
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((e) => {
        deleteBaseSpec(obj).then(res => {
          if (res.httpCode == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            that.readSpecificationsData()
          } else {
            this.$message({
              type: 'info',
              message: '删除失败'
            });
          }
        }).catch(err => {
          this.$message({
            type: 'info',
            message: '删除失败'
          });
        })
        window.event ? window.event.cancelBubble = true : e.stopPropagation()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
      });
    },
    //弹出框划出
    rightSideShow(index, productid , e) {
      this.isSide = true;
      this.productform = this.productList[index];
      this.specSearch.productId = productid; 
      this.specform.productId = productid; 
      this.readSpecificationsData()
      window.event ? window.event.cancelBubble = true : e.stopPropagation();
    },
    //弹出框隐藏
    rightSideHide() {
      this.isSide = false;
    },
    search_date() {
      //查询
      this.readData()
    },
    searchSpecDate(){
      this.readSpecificationsData()
    },
    stateFormat(row, column) {
          let state = row[column.property];
          if(state == '1'){
            return '启用'
          }
          return '停用';
    },
    addSpec(){
      this.specform = new specformcus(this.specform.productId);
      this.specFormVisible=true;
    },
    s_stopPropagation(e) {//阻止默认事件
      window.event ? window.event.cancelBubble = true : e.stopPropagation();
    },
    //分页条数改变的时候重新加载数据
    handleSizeChange(val) {
      this.search.pageSize = val
      this.readData()
    },
    //点击第几页
    handleCurrentChange(val) {
      this.search.pageNum = val
      this.readData()
    },
    //分页条数改变的时候重新加载数据
    specSizeChange(val) {
      this.specSearch.pageSize = val
      this.readSpecificationsData()
    },
    //点击第几页
    specCurrentChange(val) {
      this.specSearch.pageNum = val
      this.readSpecificationsData()
    },
    //准备产品数据
    readData() {
      this.fullscreenLoading = true;
      readBaseProcductList(this.search).then(response => {
        this.productList = response.data
        this.total = response.total // 总条数
        this.fullscreenLoading = false;
      }).catch(error => {
        this.$message({
          type: 'info',
          message: '数据加载失败'
        });
        this.fullscreenLoading = false;
      })
    },
    //准备规格数据
    readSpecificationsData() {
      this.fullscreenLoading = true;
      readBaseSpecificationsList(this.specSearch).then(response => {
        this.specificationsList = response.data
        this.specTotal = response.total // 总条数
        this.fullscreenLoading = false;
      }).catch(error => {
        this.$message({
          type: 'info',
          message: '数据加载失败'
        });
        this.fullscreenLoading = false;
      })
    },
  },
  mounted() {
    var that = this;
    $('.right-side').css('height', $(window).height() - 90 + 'px');
    $(window).resize(function() {
      $('.right-side').css('height', $(window).height() - 90 + 'px');
    });
    $(document).on('click', function() {
      that.rightSideHide()
    });
    this.readData();
  }

}
</script>

<style lang="scss" scoped>
table {
  tr {
    cursor: pointer;
    &:hover {
      background: #ebf2f9;
    }
  }
}

.right-side {
  .p-title {
    padding-left: 20px;
    font-size: 20px;
    color: #999;
    line-height: 30px;
    text-align: center;
  }
}
</style>

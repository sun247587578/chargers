<template>
  <div>
    <el-row v-if="compileIO">
      <el-col :span="24">
        <div class="panel panel-info">
          <div class="panel-heading">

            <el-date-picker v-model="search.assignDate" type="date" placeholder="选择日期" @change="noCompile">
            </el-date-picker>
            <span class="panel-stitle">排班表</span>
            <!-- <button @click="cons">查看</button> -->
          </div>
          <div class="panel-body" v-loading="fullscreenLoading" element-loading-text="拼命加载中">
            <!-- <table class="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th></th>
                          </tr>
                        </thead>
                      </table> -->
            <el-table :data="schRegions" style="width: 100%">
              <el-table-column type="expand">
                <template scope="props">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>退房数</th>
                        <th>续住房数</th>
                        <th>需做空房数</th>
                        <th>空房数</th>
                        <th>当值员工</th>
                        <th>当值主管</th>
                        <th>班次</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="props.row.schAllots" v-for="a in props.row.schAllots">
                        <td>{{ a.checkNumber }}</td>
                        <td>{{ a.continueHouseNumber }}</td>
                        <td>{{ a.roomNeedNumber }}</td>
                        <td>{{ a.roomNumber }}</td>
                        <td>{{a.staffName}}</td>
                        <td>{{a.supervisorName}}</td>
                        <td>{{a.flightName}}</td>
                      </tr>
                    </tbody>
                  </table>
                </template>
              </el-table-column>
              <el-table-column label="区域" prop="regionName" width="200">
              </el-table-column>
              <el-table-column label="总房间数" prop="sumHouses">
              </el-table-column>
              <!-- <el-table-column label="排班状况" prop="schAllots" :formatter="stateFormat">
              </el-table-column> -->
              <el-table-column prop="tag" label="标签"  :filters="[{ text: '已排班', value: '已排班' }, { text: '暂未排班', value: '暂未排班' }]" :filter-method="filterTag" filter-placement="bottom-end">
                <template scope="scope">
                  <el-tag :type="scope.row.tag === '已排班' ? 'primary' : 'success'" close-transition>{{scope.row.tag}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template scope="scope">
                  <!-- <el-button  type="text" size="small">查看</el-button> -->
                  <el-button type="text" size="small" @click="compile(scope.$index , schRegions)" v-if="noCompileIO">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
    <div v-else>
      <!-- <transition name="bounce">
            <p v-if="!compileIO">Look at me!</p>
          </transition> -->
      <!-- <el-form :inline="true"  class="demo-form-inline">
            <el-form-item label="审批人">
              <el-input placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-select  placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form> -->
      <div class="wrap effect">
        <h2 style="text-align:center">
          <span>{{schRegionsDetial.regionName}}</span>
          <span>{{compileTime}}排班表</span>
        </h2>
        <!-- <el-form :inline="true"  class="demo-form-inline">
              <el-form-item label="退房数">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="续住房数">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="需做空房数">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="空房数">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-select  placeholder="活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form> -->
        <table class="table table-bordered">
          <thead>
            <tr>
              <th style="width:8%">退房数</th>
              <th style="width:8%">续住房数</th>
              <th style="width:8%">需做空房数</th>
              <th style="width:8%">空房数</th>
              <th style="width:20%">当值员工</th>
              <th style="width:10%">当值主管</th>
              <th style="width:10%">班次</th>
              <th style="width:5%">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item , index) in allotList">
              <td>
                <el-input v-model="item.checkNumber" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.continueHouseNumber" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.roomNeedNumber" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.roomNumber" placeholder=""></el-input>
              </td>
              <td>
                  <!-- 客房服务员 , 客房资深服务员 , 主管 -->
                <!-- <el-select v-model="item.staff" multiple filterable  placeholder="请选择">
                  <el-option v-for="c in waiterLists" :key="c.id" :label="c.userName"  :value="'#'+c.id+'#'">
                  </el-option>
                </el-select> -->
                  <multiselect :options="waiterLists" v-model="item.staff" :multiple="true" :preserve-search="true" :searchable="true" :close-on-select="false" :show-labels="false" placeholder="请选择当值员工"  label="userName"  track-by="id">
                </multiselect>
              </td>
              <td>
                <!-- <el-select v-model="item.supervisor" placeholder="请选择">
                  <el-option v-for="c in waiterLists" v-if="c.position == '主管'  || c.position == '客房主管'  || c.position == '客房领班'" :key="c.id" :label="c.userName" :value="c.id">
                  </el-option>
                </el-select> -->
                <multiselect :options="supervisors" v-model="item.supervisor"  :searchable="true" :close-on-select="false" :show-labels="false" placeholder="请选择主管"  label="userName"  track-by="id">
                </multiselect>
              </td>
              <td>
                <!-- <el-select v-model="item.flightId" placeholder="请选择">

                  <el-option v-for="c in flightLists" :label="c.flightName"   :key="c.createTime" :value="c.id">

                  </el-option>
                </el-select> -->
                <multiselect :options="flightLists" v-model="item.flightId"  :searchable="false" :close-on-select="false" :show-labels="false" placeholder="请选择班次"  label="flightName"  track-by="id">
                </multiselect>
                <!-- <v-select  :options='flightLists' :label="flightName"></v-select> -->
              </td>
              <td>
                <el-button type="text" @click="removeSelf(index)">删除</el-button>
              </td>
            </tr>
          </tbody>
        </table>
        <h2 style="text-align:center">
          <el-button type="text" @click="newListChildren">添加一行</el-button>
        </h2>
        <p style="text-align:center">
          <el-button type="primary" @click="submitForm">确认</el-button>
          <el-button @click="compileIO = true">返回</el-button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>



import { readAllotData, regionUpdate, readFlight } from "@/api/wk"
import { getUserInfo } from "@/api/oa"
import { formatDate } from "@/utils/index"
import Multiselect from 'vue-multiselect'
export default {
  components: { Multiselect },
  data() {
    return {
      fullscreenLoading:true,
      noCompileIO: true,//是不是可以编辑
      userLists: [],//原来的用户数据
      waiterLists: [],//根据条件筛选完的 , 客房服务员呀 
      supervisors:[],//主管什么的
      flightLists: [], // 班次的列表
      schRegionsDetial: [], //编辑的时候对饮的区域的详情内容
      allotList: [ //编辑的时候的数组 , 
        {
          checkNumber: null,
          continueHouseNumber: null,
          roomNeedNumber: null,
          roomNumber: null,
          staff: null,
          supervisor: null,
          flightId: null
        }
      ],
      listChildcus: { //放一个空对象 , 用来assign
        checkNumber: null,
        continueHouseNumber: null,
        roomNeedNumber: null,
        roomNumber: null,
        staff: null,
        supervisor: null,
        flightId: null
      },
      compileIO: true, //控制编辑和列表的开关
      search: {//查询日期
        assignDate: null,
      },
      schRegions: [], //主页列表的数据
      compileTime: null, //编辑的时候要显示的时间 , 因为assignDate是个时间戳
    }
  },
  methods: {
    // 判断是否小于当前时间 , 从而显示编辑按钮 , 小于当前时间不显示
    noCompile() {
      let nowTime = new Date();
      if (this.search.assignDate < nowTime - 10000) {
        this.noCompileIO = false
      } else {
        this.noCompileIO = true
      }
      this.readData()
    },
    // 表格过滤器
    stateFormat(row, column) {
      let state = row[column.property];
    },
    //显示的标签
    filterTag(value, row) {
        return row.tag === value;
      },
      //编辑的时候调用的函数
    compile(index, schRegions) {
      // console.log(this.schRegions[index])
      var newObj = new Object();
      $.extend( true, newObj, this.schRegions[index] );
      // this.schRegionsDetial = Object.assign({}, this.schRegions[index])
      this.schRegionsDetial = newObj
      console.log(this.schRegionsDetial)
      if(this.schRegionsDetial.tag == '已排班'){
        //如果是已经排过班的话就把数据附上去 ,
        
        this.schRegionsDetial.schAllots.forEach((v,i)=>{
          

          this.flightLists.forEach((val,ind)=>{
            if(v.flightId == val.id){
              v.flightId = val;
            }
          })
          this.supervisors.forEach((val , ind)=>{
            if(v.supervisor == val.id){
              v.supervisor = val;
            }
          })
        //   v.staff = this.schRegions[index].schAllots[i].staff
        //  console.log(v.staff)
          // if( typeof v.staff == 'string'){
            v.staff = v.staff.replace(/#/g,'')
            v.staff = v.staff.split(",");
          // }
          
          let arr = new Array()
          
          v.staff.forEach((val,ind)=>{
            this.waiterLists.forEach((zhi , num)=>{
              if(val == zhi.id){
                arr.push(zhi)
              }
            })
          })
          v.staff = arr
        }) 
        this.allotList = this.schRegionsDetial.schAllots;
      }else{
        this.allotList = new Array();
        let objobj = Object.assign({},this.listChildcus)
        this.allotList.push(objobj)
      }
      this.compileTime = formatDate(this.search.assignDate);
      this.compileIO = false;
    },
    submitForm() {
      for (var value of this.allotList) {
        if(value.checkNumber && value.flightId && value.staff && value.supervisor && value.roomNumber){
          
        }else{
          return false
        }
      }
      
      let submitData = this.allotList.concat()
      submitData.forEach((v, i) => {
        v.regionId = this.schRegionsDetial.id;
        v.assignDate = this.compileTime;
        // let str = ''
        // v.staff.forEach((val, ind)=>{
        //   str += val +","
        // })
        // v.staff = str
        v.flightId = v.flightId.id
        v.supervisor = v.supervisor.id;
        let str = '';
        v.staff.forEach((val , ind )=>{
          str+="#"+ val.id + '#,' 
        })
        v.staff = str.slice(0,str.length-1)
      })
      
      console.log(submitData)
      
      
      regionUpdate(submitData).then(res => {
        console.log(res)
        if (res.httpCode == 200) {
          this.$message({
            type: 'success',
            message: '成功!'
          });
          this.readData();
          this.compileIO = true;
        } else {
          this.$message({
            type: 'info',
            message: res.msg
          });
          this.compileIO = true;
        }
        
      }).catch(err => {
        this.$message({
          type: 'info',
          message: '网络不稳定 操作失败'
        });
        this.compileIO = true;
      })
    },
    //获取当前时间
    getNowData() {
      this.search.assignDate = new Date();
      this.compileTime = formatDate(this.search.assignDate);
    },
    cons() {
      this.search.assignDate = new Date();
    },
    //添加一行
    newListChildren() {
      // this.allotList.push(Object.assign({}, this.listChildcus))
      let sarr = Object.assign({}, this.listChildcus)
      this.allotList.push(sarr)
    },
    removeSelf(index) {
      this.allotList.splice(index, 1)
    },
    readData() {
      readAllotData(formatDate(this.search.assignDate)).then(response => {
        this.schRegions = response.schRegions
        //这里对后台的数据添加点东西 , 为了方便DOM的操作
        this.schRegions.forEach((v,i)=>{

          if(v.schAllots){
            v.tag = "已排班"
            // let staffAllName = null;
            // let flightAllName = null;
            // let supervisorAllName = null;
            // for(i in v.schAllots){
            //   staffAllName+=v.schAllots[i].staffName?v.schAllots[i].staffName:'';
            //   supervisorAllName+=v.schAllots[i].supervisorName?v.schAllots[i].supervisorName:'';
            // }
            // v.staffAllName = staffAllName
            // v.supervisorAllName = supervisorAllName
          }else{
            v.tag = "暂未排班"
          }
        })
        console.log(this.schRegions)
        this.fullscreenLoading = false;
      }).catch(error => {
        this.$message.error(error.msg);
        this.fullscreenLoading = false;
      });
      readFlight().then(response => {
        
        this.flightLists = response.flights;
      }).catch(error => {
        this.$message.error(error.msg);
        this.fullscreenLoading = false;
      });
    },
    getUserList(){
      getUserInfo().then(response => {
        this.userLists = response.data;
        this.waiterLists=[];
        this.userLists.forEach((c, i) => {
          if (c.position == '客房资深服务员' || c.position == '客房服务员'  || c.position == '客房领班') {
            // c.id = "#" + c.id + "#";
            this.waiterLists.push(c);
          }
          //supervisors
          if (c.position ==  '主管' || c.position == '客房主管'  || c.position == '客房领班') {
            this.supervisors.push(c);
          }
        });
      }).catch(error => {
        this.$message.error(error.msg);
        this.fullscreenLoading = false;
      });
    }
  },
  mounted() {
    // this.readData();
    // sessionStorage.setItem("user", "孙靖");
    this.getUserList();
    setTimeout(() => {
      this.getNowData()
    }, 100)
  }
}
</script>
<style lang="scss" scoped>
.el-input__icon+.el-input__inner {
  padding-right: 35px;
  background: transparent;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.bounce-enter-active {
  animation: bounce-in .5s;
}

.bounce-leave-active {
  animation: bounce-in .5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}


.el-select {
  width: 100%;
}
</style>

<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="3" v-for=" item in checkingLists" :key="item.id">
        <el-card :body-style="{ padding: '0px' }">
          <div style="text-align: center;padding: 8px">
            <h4>{{item.cwName}}</h4>
            <div class="bottom clearfix" style="text-align: center">
              <time class="time"></time>
              <el-tooltip class="item" effect="light" content="删除" placement="top">
                <el-button :plain="true" type="danger" icon="delete" @click="deletePlus(item.id)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="light" content="编辑" placement="top">
                <el-button :plain="true" type="primary" icon="edit" @click="editPlus(item.id)"></el-button>
              </el-tooltip>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card :body-style="{ padding: '0px' }">
          <div style="text-align: center;padding: 8px">
            <h4>添加新方案</h4>
            <div class="bottom clearfix" style="text-align: center">
              <time class="time"></time>
              <el-tooltip class="item" effect="light" content="添加" placement="top">
                <el-button :plain="true" type="primary" icon="plus" @click="addPlus"></el-button>
              </el-tooltip>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 对话框 -->
    <el-dialog :title="title" :visible.sync="isDialog" ref="plusDialog" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="plus" label-position="right" :inline="true">
        <el-row>
          <el-col :span="8">
            <el-form-item label="方案名称：">
              <el-input v-model="plus.cwName" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="选择对象：">
              <el-select v-model="plus.cwObject" clearable :multiple="true" placeholder="请选择部门" :disabled="selectAll">
                <el-option v-for="item in depts" :key="item.id" :value="item.id" :label="item.deptName">
                </el-option>
              </el-select>
              <!--               
                                          <Multiselect v-model="plus.cwObject" :options="depts" track-by="id" label="deptName" style="z-index:9999; min-width:250px;" :multiple="true" SelectLabel=" " :allow-empty="true"></Multiselect> 
                                        -->
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-checkbox v-model="selectAll">全体员工</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="签到范围：">
              <el-select v-model="plus.cwRange" placeholder="选择">
                <el-option v-for="item in rang" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="工作日：">
              <el-checkbox-group v-model="plus.slockWeek">
                <el-checkbox v-for="item in week" :label="item" :key="item"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="查询地址：">
              <el-input v-model="plus.cwAddressName" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="查询经纬度：">
              <el-input v-model="plus.cwAddressLngLat" auto-complete="off" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div>
          <div class="m-part">
            <mapDrag @drag="dragMap" v-if="showMap" :lat="dragData.lat" :lng="dragData.lng" class="mapbox"></mapDrag>
            <ul class="info">
              <li>
                <span>经度：</span>{{ dragData.lng }}</li>
              <li>
                <span>纬度：</span>{{ dragData.lat }}</li>
              <li>
                <span>地址：</span>{{ dragData.address }}</li>
              <li>
                <span>最近的路口：</span>{{ dragData.nearestJunction }}</li>
              <li>
                <span>最近的路：</span>{{ dragData.nearestRoad }}</li>
              <li>
                <span>最近的POI：</span>{{ dragData.nearestPOI }}</li>
            </ul>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelPlus" type="danger">取 消</el-button>
        <el-button type="success" @click="savePlus">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { readCheckingList, getDepts, getUserAndDept, deleteCheckingPlus, updateCheckingPlus } from '@/api/checking'
import Multiselect from 'vue-multiselect'
import mapDrag from '@/components/mapDrag'

export default {
  components: {
    Multiselect,
    mapDrag
  },
  data () {
    return {
      dragData: {
        lng: null,
        lat: null,
        address: null,
        nearestJunction: null,
        nearestRoad: null,
        nearestPOI: null
      },
      showMap: false,
      week: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      rang: [100, 150, 200, 250, 300, 350, 400, 450, 500],
      depts: [],
      checkingLists: [],
      plus: {
        createBy: 0,
        createTime: null,
        createTimeStr: '',
        cwAddressLngLat: '',
        cwAddressName: '',
        cwName: '',
        cwObject: [],
        cwRange: '100',
        enable: 0,
        id: 0,
        keyword: '',
        remark: '',
        slockWeek: [],
        tenantId: null,
        updateBy: 0,
        updateTime: null
      },
      isDialog: false, // 是否显示对话框
      title: '编辑方案',
      selectAll: false,
      markers: []
    }
  },
  watch: {
    dragData: {
      handler: function (val, oldval) {
        console.log(val.name)
      },
      deep: true//对象内部的属性监听，也叫深度监听  
    },
    'dragData.address': function (val, oldval) {
      this.plus.cwAddressName = val
    },
    'dragData.lng': function (val, oldval) {
      this.plus.cwAddressLngLat = val + ',' + this.dragData.lat
    },
    'dragData.lat': function (val, oldval) {
      this.plus.cwAddressLngLat = this.dragData.lng + ',' + val
    }
  },
  mounted () {
    this.readList()
    this.readDept()
    let dom = this.$refs.plusDialog.$el
    let dialog = dom.querySelector('.el-dialog--small')
    dialog.style.minWidth = '1000px'
  },
  methods: {
    dragMap (data) {
      console.log(data)
      this.dragData = {
        lng: data.position.lng,
        lat: data.position.lat,
        address: data.address,
        nearestJunction: data.nearestJunction,
        nearestRoad: data.nearestRoad,
        nearestPOI: data.nearestPOI
      }
    },
    addPlus () {
      let obj = {
        createBy: 0,
        createTime: null,
        createTimeStr: '',
        cwAddressLngLat: '',
        cwAddressName: '',
        cwName: '',
        cwObject: [],
        cwRange: '100',
        enable: 0,
        id: null,
        keyword: '',
        remark: '',
        slockWeek: [],
        tenantId: null,
        updateBy: 0,
        updateTime: null
      }
      this.plus = Object.assign({}, obj)
      this.title = '添加方案'
      this.showMap = true
      this.isDialog = true;
    },
    editPlus (id) {
      // 注意使用对象的深拷贝
      this.title = '编辑方案'
      let obj = this.checkingLists.find(item => item.id == id)
      let objPlus = {}
      objPlus = Object.assign({}, obj)  // 合并成新的对象，以免修改到原来的内容
      if (Array.isArray(objPlus.cwObject)) {
        this.selectAll = false
        objPlus.cwObject = objPlus.cwObject.split(',')
      } else {
        if (objPlus.cwObject == '0000') {
          this.selectAll = true
          objPlus.cwObject = []
        } else {
          this.selectAll = false
        }
      }

      objPlus.slockWeek = objPlus.slockWeek.split(',')
      let address = objPlus.cwAddressLngLat.split(',')
      if (address.length == 2) {
        this.dragData.lng = address[0]
        this.dragData.lat = address[1]
        // this.$store.state.user.lng = address[0]
        // this.$store.state.user.lat = address[1]
        // console.dir(window)
        // let lnglatXY = new window.AMap.LngLat(address[0], address[1])
        // var marker = new window.Amap.Marker({
        //   position: lnglatXY
        // })
        window.sessionStorage.setItem('lng', address[0])
        window.sessionStorage.setItem('lat', address[1])

      } else {
        this.dragData.lng = null
        this.dragData.lat = null
      }
      this.showMap = true;
      console.dir(this.dragData)

      this.plus = objPlus
      this.isDialog = true
    },
    deletePlus (id) {
      let params = {
        id
      }
      deleteCheckingPlus(params).then(response => {
        this.readList()
      }).catch(error = {

      })


    },
    savePlus () {
      // 为了更新或者添加内容，对数组进行反序列化
      let obj = Object.assign({}, this.plus)

      if (Array.isArray(obj.cwObject)) {
        obj.cwObject = obj.cwObject.join(',')
      }
      if (Array.isArray(obj.slockWeek)) {
        obj.slockWeek = obj.slockWeek.join(',')
      }
      // 对选择所有全体员工的时候进行处理
      if (this.selectAll) {
        obj.cwObject = '0000'
      }
      // 添加或者编辑内容
      updateCheckingPlus(obj).then(response => {
        this.isDialog = false
        window.AMap = null
        this.showMap = false
        this.readList()
      }).catch(error => {
        console.error(error)
        window.AMap = null
        this.showMap = false
        this.isDialog = false
      })

    },
    cancelPlus () {
      let obj = {
        createBy: 0,
        createTime: null,
        createTimeStr: '',
        cwAddressLngLat: '',
        cwAddressName: '',
        cwName: '',
        cwObject: [],
        cwRange: '100',
        enable: 0,
        id: null,
        keyword: '',
        remark: '',
        slockWeek: [],
        tenantId: null,
        updateBy: 0,
        updateTime: null
      }
      this.plus = Object.assign({}, obj)
      window.AMap = null
      this.showMap = false
      this.isDialog = false
    },
    readList () {
      readCheckingList().then(response => {
        this.checkingLists = response.data
      }).catch(error => {
        console.error(error)
      })
    },
    readDept () {
      getDepts().then(response => {
        this.depts = response.data
      }).catch(error => {

      })
    }
  }
}
</script>
<style lang="scss" scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.m-part {
  margin-bottom: 10px;
}

.m-part::after {
  content: '';
  display: block;
  clear: both;
}

.m-part .title {
  font-size: 30px;
  line-height: 60px;
  margin-bottom: 10px;
  color: #333;
}

.m-part .mapbox {
  width: 600px;
  height: 400px;
  margin-bottom: 20px;
  float: left;
}

.m-part .info {
  margin: 0;
  padding: 0;
  list-style: none;
  line-height: 30px;
  margin-left: 620px;
}

.m-part .info span {
  display: block;
  color: #999;
}

.m-part ol {
  line-height: 40px;
  margin-left: 0;
  padding-left: 0;
}

.m-part pre {
  padding: 10px 20px;
  line-height: 30px;
  border-radius: 3px;
  box-shadow: 0 0 15px rgba(0, 0, 0, .5);
}
</style>

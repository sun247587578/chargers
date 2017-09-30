<template>
	<div>
		<el-row>
			<el-col :span="24">
				<el-form :model="search" :inline="true" class="demo-form-inline">
					<el-form-item>
						<el-date-picker v-model="search.startTime" format="yyyy-MM-dd" type="date" @change="sfomartData" placeholder="选择开始时间">
						</el-date-picker>
						<el-date-picker v-model="search.endTime" type="date" placeholder="选择结束时间" @change="sfomartData1">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-select v-model="search.deptIds" multiple filterable placeholder="部门">
							<el-option v-for="item in deptList" :key="item.id"   :label="item.deptName" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-select v-model="search.userIds" multiple filterable placeholder="员工">
							<el-option v-for="item in userList" :key="item.id"   :label="item.userName" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-radio-group v-model="search.order">
							<el-radio-button label="1">升序</el-radio-button>
							<el-radio-button label="0">降序</el-radio-button>
						</el-radio-group>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" icon="search" @click="readData">查询</el-button>
						<el-button type="warning" icon="delete2" @click="clearSearch">清空</el-button>
						<el-button type="success" icon="upload2" @click="exportExcel">导出</el-button>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col :span="24">
				<el-table :data="listData" v-loading="fullscreenLoading" element-loading-text="拼命加载中" border style="width: 120%">
					<!-- <el-table-column type="index" label="序号" min-width="120"></el-table-column> -->
					<!-- <el-table-column prop="createTime" label="公司" min-width="200"></el-table-column> -->
					<el-table-column prop="userName" label="姓名"> </el-table-column>
					<el-table-column prop="deptName" label="部门"> </el-table-column>
					<el-table-column prop="num" label="考核次数"> </el-table-column>
					<el-table-column prop="score" label="平均分"></el-table-column>
					<!-- <el-table-column prop="cardtype" label="证件类别" min-width="120"></el-table-column>
						<el-table-column prop="cardclass" label="证件大类" min-width="120"></el-table-column>
						<el-table-column prop="state" label="证件状态" min-width="120"></el-table-column>
						<el-table-column prop="receivedate" label="授予日期" min-width="300" :formatter="stateFormat1"></el-table-column>
						<el-table-column prop="headdate" label="有效期" min-width="300" :formatter="stateFormat1"></el-table-column>
						<el-table-column prop="fzjg" label="发证机关" min-width="300"></el-table-column>
						<el-table-column prop="ifcheck" label="是否要复检" :formatter="stateFormat" min-width="120"></el-table-column>
						<el-table-column prop="nestcheck" label="上次复检日" min-width="300" :formatter="stateFormat1"></el-table-column>
						<el-table-column prop="lastcheck" label="下次复检日" min-width="300" :formatter="stateFormat1"></el-table-column>
						<el-table-column prop="checkperson" label="保管人" min-width="120"></el-table-column>
						<el-table-column prop="savedate" label="保管日期" min-width="300" :formatter="stateFormat1"></el-table-column> -->
					<el-table-column prop="remark" label="备注"></el-table-column>
					<el-table-column label="操作">
						<template scope="scope">
							<el-button type="text" @click.native.prevent="lookDetil( scope.$index)" size="small">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>
			</el-col>
		</el-row>
		<el-dialog :title="detailUserName" :visible.sync="dialogTableVisible">
			<el-table :data="detailData">
				<el-table-column property="createName" label="考核人姓名" width="150"></el-table-column>
				<el-table-column property="planName" label="考核计划"></el-table-column>
				<el-table-column property="createTime" label="考核时间"></el-table-column>
				<el-table-column property="assessScore" label="分数"></el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>
<script>
import { getUserInfo, getDeptInfo, getAssessStatisticList , getAssessStatisticDetail } from "@/api/oa"
import { webUrl } from "@/api/constURL"
export default {
	data() {
		return {
			fullscreenLoading: false,
			dialogTableVisible:false,
			deptList: [],
			userList: [],
			userListcus: [],
			listData: [],
			detailUserName:'',
			search: {
				deptIds: null,
				userIds: null,
				pageNum: 1,
				pageSize: 10,
				endTime: '',
				startTime: '',
				order: 1,
			},
			detailData:[],
			// "startTime":"2017-09-12 18:54:47","endTime":"2019-09-12 18:54:47","order":"0","userId":"2","deptId":"2"
			total: 0,
		}
	},
	methods: {
		sfomartData(va) {
			this.search.startTime = va;
		},
		clearSearch() {
			this.search.deptIds = [];
			this.search.userIds = [];
			this.search.endTime = null;
			this.search.startTime = null;
		},
		compile(index) {
			console.log(index)
			this.detaildata = this.AnnouncementList[index];
			this.detailIO = false
		},
		sfomartData1(va) {
			this.search.endTime = va;
		},
		stateFormat(row, column) {
			let state = row[column.property];
			switch (state) {
				case 0:
					return "未审核";
				case 1:
					return "已审核";
				default:
					return "不合格";
			}
		},
		exportXls () {
			var users = this.recordList.users
			var depts = this.recordList.depts
			var dates = this.recordList.sdate

			let obj = {
				users,
				depts,
				dates
			}

			if (dates === undefined) { // 没有指定月份
				var today = new Date()
				let year = today.getFullYear()
				let month = today.getMonth() + 1
				if (month < 10) {
				month = "0" + month
				}
				obj.dates = year + '-' + month + '-01'  // 把日期型转换为数字型
			} else {  // 指定月份
				if (dates instanceof Date) {
				var today = obj.dates
				let year = today.getFullYear()
				let month = today.getMonth() + 1
				if (month < 10) {
					month = "0" + month
				}
				obj.dates = year + '-' + month + '-01'  // 把日期型转换为数字型
				} else { // 选择日期查询后数据类型会改变成字符串，所以做特殊处理
				obj.dates = dates + '-01'
				}
			}

			// 拼接接口
			let url = webUrl
			let api = '/charger-SCH-Web/viewAttendanceRecord/read/export?'
			let exportUrl = `${url}${api}users=${obj.users}&depts=${obj.depts}&dates=${obj.dates}&order=${this.search.order}`
			window.location = exportUrl
			
		},
		exportExcel(){
			let deptIds = this.search.deptIds.join('-')
			let userIds = this.search.userIds.join('-')
			let obj = {
				deptIds,
				userIds,
			}
			let start = this.search.startTime
			let end = this.search.endTime
			let api = 'api/commAssessRecord/read/export?'
			let url = webUrl
			let exportUrl = `${url}${api}startTime=${start}&endTime=${end}&userIds=${obj.userIds}&deptIds=${obj.deptIds}`
			console.log(exportUrl)
			window.location = exportUrl
			

		},
		lookDetil(index) {
			// {"startTime":"2017-09-12 18:54:47","endTime":"2019-09-12 18:54:47","userId":"2"}
			let sid = this.listData[index].id;
			this.detailUserName = this.listData[index].userName;
			let obj = new Object();
			obj.startTime = this.search.startTime
			obj.endTime = this.search.endTime
			obj.userId = sid;
			console.log(obj)
			getAssessStatisticDetail(obj).then(response => {
				console.log(response.data)
				this.detailData = response.data;
				this.dialogTableVisible = true;
			}).catch(error => {
				this.$notify({
					title: '提示',
					content: '数据加载出错！！',
					type: 'error'
				})
			})
		},
		getUserDeptList() {
			getUserInfo().then(response => {
				console.log(response)
				this.userList = response.data
				this.userListcus = response.data
			}).catch(error => {

			})
			getDeptInfo().then(response => {
				this.deptList = response.data
			}).catch(error => {

			})
		},

		handleSizeChange(val) {
			this.search.pageSize = val
			this.readData()
		},
		handleCurrentChange(val) {
			this.search.pageNum = val
			this.readData()
		},
		readData() {
			this.fullscreenLoading = true;
			getAssessStatisticList(this.search).then(response => {
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
	},
	mounted() {
		this.getUserDeptList();
		this.readData()
	}
}
</script>
<style lang="scss" scoped>

</style>



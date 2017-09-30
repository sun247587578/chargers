<template>
	<div style="padding-top:10px">
		<el-row :gutter="5" style="margin-right:0px">
			<el-col :span="4">
				<el-tree :data="deptList" style="overflow:auto" ref="checkImg" id="stree" :props="defaultProps" node-key="id" @node-click="nodeClick"></el-tree>
			</el-col>
			<el-col :span="20">
				<div class="toolbar">
					<el-row>
						<el-col :span="8">
							<el-input style="display:line-block;width: 160px;" placeholder="值可以是账号,用户名,电话" icon="search" v-model="search.keyword" :on-icon-click="handleIconClick" @click.enter="handleIconClick">
							</el-input>
						</el-col>
						<el-col :span="6" :offset="10">
						</el-col>
					</el-row>
				</div>
				<el-table :data="userList" border v-loading="loadTableDate" style="width: 100%">
					<el-table-column prop="userName" label="员工">
					</el-table-column>
					<el-table-column prop="account" label="账号" min-width="120">
					</el-table-column>
					<el-table-column prop="deptName" label="主属部门" min-width="120">
					</el-table-column>
					<el-table-column prop="otherDeptName" label="附属部门">
					</el-table-column>
					<el-table-column prop="position" label="职务" min-width="200">
					</el-table-column>
					<el-table-column prop="phone" label="手机" min-width="120">
					</el-table-column>
					<el-table-column fixed="right" label="操作" min-width="100">
						<template scope="scope">
							<el-button type="text" size="small" @click="allocation(scope.$index,scope.row)">分配权限</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[15, 25, 50, 100]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</el-col>

		</el-row>
		<el-dialog title="提示" :visible.sync="dialogVisible">

			<div style="margin:0 auto">
				<el-tree :data="menuTree" show-checkbox node-key="id" ref="tree" highlight-current :props="defaultProps2">
				</el-tree>
			</div>

			<span slot="footer" class="dialog-footer">
				
				<el-button @click="resetChecked">清空</el-button>
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitSetMenu">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
let id = 1000;

import { readDeptList, readUserList, getMenuTree ,setUserMenu} from "@/api/oa"


function treeToArr(obj,menuArr){
	obj.forEach((val,key)=>{
		if(val.children.length>0){
			treeToArr(val.children,menuArr)
		}else{
			if(val.checked == 'checked'){
				menuArr.push(val)
			}	
		}
	});
	return menuArr
}

export default {
	name: 'UserDepartment',
	data() {
		return {
			loadTableDate: false,
			dialogVisible: false,
			search: {
				pageNum: 1,
				pageSize: 15,
				keyword: null,
				enable: 1,
				deptId: null,
				deptIdKey: null,
			},
			userInfo: {  // 绑定表单的用户信息
			},

			total: 0,
			userList: [], // 用户列表
			defaultProps: {
				children: 'children',
				label: 'deptName'
			},
			defaultProps2: {
				children: 'children',
				label: 'menuName'
			},
			deptList: [],
			menuTree: [],
			sUserId: null,
			yetUserMenu:[],
		}
	},

	methods: {
		getCheckedNodes() {
			console.log(this.$refs.tree.getCheckedNodes());
		},
		submitSetMenu() {
			let arr = this.$refs.tree.getCheckedNodes();
			if(arr.length<1){
				this.$alert('如果用户没有一个菜单是无法进入本系统的', '系统提示', {
					type: 'warning'
				})
				return false;
			}
			let str = '';
			arr.forEach((val,key)=>{
				str+=val.id+','
			});
			let menuIds = str.substring(0, str.length-1)
			setUserMenu({selectUserId:this.sUserId,menuIds}).then(response => {
				console.log(response)
				switch (response.httpCode) {
					case 409:
						this.$message({
							message: response.msg,
							type: 'warning'
						});
						break;
					case 200:
						this.$message({
							message: '成功',
							type: 'success'
						});
						this.dialogVisible = false
						break;
					default:
						this.dialogUserInfo = false
						break;
				}
			}).catch(error => {
				this.loadTableDate = false
			})
		},
		getCheckedKeys() {
			console.log(this.$refs.tree.getCheckedKeys());
		},
		setChecked() {
			this.$refs.tree.setCheckedNodes(this.yetUserMenu);
			// this.$refs.tree.setCheckedNodes([
			// 	{
			// 		checked: "checked",
			// 		children: Array(0),
			// 		createDate: 1502690483000,
			// 		enable: 1,
			// 		enabled: "Y",
			// 		id: "56",
			// 		menuName: "公司公告",
			// 		menuOrder: 0,
			// 		menuUrl: "companyAnnouncement",
			// 		modelId: 4,
			// 		modelName: "基础OA",
			// 		parentId: "55",
			// 	},{
			// 		checked: "checked",
			// 		children: Array(0),
			// 		createDate: 1502360660000,
			// 		enable: 1,
			// 		enabled: "Y",
			// 		id: "73",
			// 		menuName: "考核计划列表",
			// 		menuOrder: 5,
			// 		menuUrl: "assessPlanList",
			// 		modelId: 4,
			// 		modelName: "基础OA",
			// 		parentId: "72",
			// 	}
			// ]);
		},
		setCheckedKeys() {
			this.$refs.tree.setCheckedKeys([39]);
		},
		resetChecked() {
			this.$refs.tree.setCheckedKeys([]);
		},
		
		allocation(index) {
			// this.userInfo = Object.assign({}, this.userList[index]);
			this.sUserId = this.userList[index].id;

			getMenuTree({ selectUserId: this.sUserId }).then(response => {
				if(response.httpCode == 200){
					this.menuTree = response.data;
					let menuArr=[];
					this.yetUserMenu = treeToArr(response.data,menuArr);
					console.log(this.yetUserMenu)
					this.dialogVisible = true;
					setTimeout(()=>{
						this.$refs.tree.setCheckedNodes(this.yetUserMenu);
					},100)
				}else{
					this.$message({
							message: response.msg,
							type: 'success'
						});
				}
				
				
				
			}).catch(error => {
				this.loadTableDate = false
			})
		},
		handleIconClick() {
			this.search.deptIdKey = '';
			this.readData()
		},

		handleSizeChange(val) {
			this.search.pageSize = val
			this.readData()
		},

		handleCurrentChange(val) {
			this.search.pageNum = val
			this.readData()
		},
		handleClose(done) {
			// this.$confirm('确认关闭？')
			// 	.then(_ => {
			// 		done();
			// 	})
			// 	.catch(_ => {});
		},
		readData() {
			this.loadTableDate = true
			readUserList(this.search).then(response => {
				console.log(response)
				this.userList = response.data
				this.total = response.total // 总条数
				this.loadTableDate = false
			}).catch(error => {
				this.$notify({
					title: '提示',
					content: '数据加载出错！！',
					type: 'error'
				})
				this.loadTableDate = false
			})
		},

		nodeClick(item, node) {
			this.search.deptIdKey = item.id
			if (this.keyword === null) {
			} else {
				this.search.keyword = this.keyword
			}
			this.readData();
		},


		readTreeList() {
			readDeptList().then(response => {
				console.log(response)
				let result = response.data
				this.deptList = result
			}).catch(error => {
			})
		},
	},
	mounted() {
		var stree = document.getElementById('stree');
		let checkImg = this.$refs.checkImg;
		let clHeight = $(window).height()
		stree.style.height = clHeight - 80 + 'px';
		//checkImg.style.height=clHeight-80+'px';
		console.log(clHeight)
		this.readTreeList();
		this.readData()

	}
};
</script>

<style>
.baseInfo {
	marin-bottom: 20px
}

.toolbar {
	margin-bottom: 10px;
}

.el-table .cell,
.el-table th>div {
	padding-left: 5px;
	padding-right: 5px;
}
</style>
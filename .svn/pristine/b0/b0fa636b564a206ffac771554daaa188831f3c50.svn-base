import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout';


/* 布局*/
import MainLayout from '../views/layout/MainLayout'

/* login */
const Login = _import('login/index');
const Register = _import('register/index');

/* dashboard */
const dashboard = _import('dashboard/index');

/* error page */
const Err404 = _import('404');
const Test = _import('test');

// 首页
const Index = _import('index');


// 实验楼
const Lab = _import('tech/lab')


// OA管理
// 0a-用户管理
const OaUserManagementCompany = _import('oa/userManagement/company')
const OaUserManagementRoleManagement = _import('oa/userManagement/roleManagement')
const OaUserManagementUserDepartment = _import('oa/userManagement/userDepartment')
const OaUserManagementAuthorityManagement = _import('oa/userManagement/authorityManagement')
const OaUserManagementPositionManagement = _import('oa/userManagement/position_management')
const OaUserManagementDeptManagement = _import('oa/userManagement/dept_management')
//OA - 公告
const OaCompanyAnnouncement = _import('oa/announcement/company_announcement')
const OaReleaseAnnouncement = _import('oa/announcement/release_announcement')
const OaMyAnnouncement = _import('oa/announcement/my_announcement')
//OA - 日报
const OaDailyMyDaily = _import('oa/daily/my_daily')
const OaDailyOthersDaily = _import('oa/daily/others_daily')
const OaDailyStatisticsDaily = _import('oa/daily/statistics_daily')
const OaDailyUnreadDaily = _import('oa/daily/unread_daily')
const OaDailyWaitSendDaily = _import('oa/daily/wait_send_daily')
//OA - 绩效考核
const OaPerformanceKpiClassify = _import('oa/performance/kpi_classify')
const OaPerformanceKpiList = _import('oa/performance/kpi_list')
const OaPerformanceTemplateList = _import('oa/performance/template_list')
//OA - 考核计划
const OaAssessPlanList = _import('oa/assessPlan/assess_plan_list')
const OaAssessStatistic = _import('oa/assessPlan/assess_statistic')
//OA - 任务
const OaTaskManagementMyTask = _import('oa/taskManagement/my_task')
const OaTaskManagementDoneTask = _import('oa/taskManagement/done_task')
const OaTaskManagementMyCreateTask = _import('oa/taskManagement/my_create_task')
const OaTaskManagementAllTask = _import('oa/taskManagement/all_task')

// PLM管理
const BaseClientMyClient = _import('base/client/my_client')
const BaseClientGroup = _import('base/group/group')
const BaseClientMyCreateClient = _import('base/client/my_create_client')
const BaseProductProductList = _import('base/product/product_list')
const BaseProductProductIntroduce = _import('base/product/product_introduce')
const BaseNeedNeedList = _import('base/need/need_list')
const BaseNeedStandard = _import('base/need/standard')


// LAB实验室
const LabEntrustReceive= _import('lab/entrust/receive')
const LabEntrustYetReceive= _import('lab/entrust/yet_receive')
const LabEntrustRepulse= _import('lab/entrust/repulse')
// -----
const LabCheckoutInspectionList = _import('lab/checkout/inspection_list')
// ------
const LabAuditManagementWaitAudit = _import('lab/auditManagement/wait_audit')
const LabAuditManagementYetAudit = _import('lab/auditManagement/yet_audit')
const LabAuditManagementProcess = _import('lab/auditManagement/process')
const LabAuditManagementsolutionYetAudit = _import('lab/auditManagement/solution_yet_audit')
// -----------合格表
const LabQualifiedBeadInspectionResult = _import('lab/qualified/bead_inspectionResult')
const LabQualifiedCordInspectionResult = _import('lab/qualified/cord_inspectionResult')
const LabQualifiedSolutionInspectionResult = _import('lab/qualified/solution_inspectionResult')

//--------------不合格
const LabNoQualifiedBeadDisqualification = _import('lab/noQualified/bead_disqualification')
const LabNoQualifiedCordDisqualification = _import('lab/noQualified/cord_disqualification')
const LabNoQualifiedSolutionDisqualification = _import('lab/noQualified/solution_disqualification')

// 排班管理
const WKworkforceManagement = _import('wk/workforce/workforce_management')
const WKclassSetting = _import('wk/workforce/class_setting')
const WKareaSetting = _import('wk/workforce/area_setting')
// 考勤管理
const WKCheckingStatistics = _import('wk/checking/statistics')
const WKCheckingRecord = _import('wk/checking/record')
const WKaddAttendance = _import('wk/checking/add_attendance')


// SPC
const SPCQRCodeList = _import('spc/QRCode/QR_code_list')
const SPCProjectConfigurationInspectionProjectList = _import('spc/projectConfiguration/inspection_project_list')
const SPCProjectConfigurationSpecificationSample = _import('spc/projectConfiguration/specification_sample')

// HR
const HREmployeeDetails = _import('hr/employee/employee_details')

const HRBasicDormitory = _import('hr/basic/dormitory')
const HRBasicOccupationalInjury = _import('hr/basic/occupational_injury')
const HRBasicPhysicalExamination = _import('hr/basic/physical_examination')
const HRBasicSalary = _import('hr/basic/salary')
const HRBasicWelfare = _import('hr/basic/welfare')
const HRBasicTrain = _import('hr/basic/train')
const HRBasicProfessionalrRanks  = _import('hr/basic/professionalr_ranks')
const HRBasicCertificate  = _import('hr/basic/certificate')
const HRBasicPartTimeJob  = _import('hr/basic/part_time_job')
const HRBasicTransferMove  = _import('hr/basic/transfer_move')
const HRBasicLeave  = _import('hr/basic/leave')
const HRBasicWorkExperience  = _import('hr/basic/work_experience')
const HRBasicSocialRelationships  = _import('hr/basic/social_relationships')
const HRBasicStudyExperience  = _import('hr/basic/study_experience')
const HRBasicSkill  = _import('hr/basic/skill')
const HRBasicReward  = _import('hr/basic/reward')
const HRBasicPunishment  = _import('hr/basic/punishment')

const HRProbationProbationList  = _import('hr/probation/probation_list')
const HRProbationDelayRecord  = _import('hr/probation/delay_record')
const HRProbationRegularWorkerApply  = _import('hr/probation/regular_worker_apply')

const HRDimissionDimissionApply  = _import('hr/dimission/dimission_apply')
const HRDimissionStayDimission  = _import('hr/dimission/stay_dimission')
const HRDimissionDimissionPerson  = _import('hr/dimission/dimission_person')
const HRDimissionDimissionStatistics  = _import('hr/dimission/dimission_statistics')


Vue.use(Router);

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will not redirct in the levelbar
 * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
 * meta : `{ role: ['admin'] }`  will control the page role
 **/
export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  { path: '/404', component: Err404, hidden: true },
  { path: '/test', component: Test, hidden: true },
  { path: '/register', component: Register, hidden: true },
  {
    path: '/',
    component: Index,
    name: 'Home',
    hidden: true,
    children: [{ path: 'dashboard', component: dashboard }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: '/OA',
    component: Layout,
    redirect: '/OA/userManagement',
    name: '基础OA',
    icon: 'zujian',
    children: [
      {
        path: 'userManagement',
        component: MainLayout,
        name: '用户管理',
        icon: 'zonghe',
        redirect: '/OA/userManagement/company',
        children: [
          { path: 'company', component: OaUserManagementCompany, name: '企业信息', icon: 'zonghe' },
          { path: 'roleManagement', component: OaUserManagementRoleManagement, name: '角色管理', icon: 'zonghe' },
          { path: 'userDepartment', component: OaUserManagementUserDepartment, name: '用户管理', icon: 'zonghe' },
          { path: 'authorityManagement', component: OaUserManagementAuthorityManagement, name: '权限管理', icon: 'zonghe' },
          { path: 'positioManagement', component: OaUserManagementPositionManagement, name: '职位管理', icon: 'zonghe' },
          { path: 'deptManagement', component: OaUserManagementDeptManagement, name: '部门管理', icon: 'zonghe' }
        ]
      },
      {
        path: 'announcement',
        component: MainLayout,
        name: '公告',
        icon: 'zonghe',
        redirect: '/OA/announcement/companyAnnouncement',
        children: [
          { path: 'companyAnnouncement', component: OaCompanyAnnouncement, name: '公司公告', icon: 'zonghe' },
          { path: 'releaseAnnouncement', component: OaReleaseAnnouncement, name: '发布公告', icon: 'zonghe' },
          { path: 'myAnnouncement', component: OaMyAnnouncement, name: '我的公告', icon: 'zonghe' }
        ]
      },
      {
        path: 'daily',
        component: MainLayout,
        name: '日报',
        icon: 'zonghe',
        redirect: '/OA/daily/myDaily',
        children: [
          { path: 'myDaily', component: OaDailyMyDaily, name: '我的日报', icon: 'zonghe' },
          { path: 'waitSendDaily', component: OaDailyWaitSendDaily, name: '待发送日报', icon: 'zonghe' },
          { path: 'othersDaily', component: OaDailyOthersDaily, name: '他人日报', icon: 'zonghe' },
          { path: 'unreadDaily', component: OaDailyUnreadDaily, name: '未读日报', icon: 'zonghe' },
          { path: 'statisticsDaily', component: OaDailyStatisticsDaily, name: '日报统计', icon: 'zonghe' }
        ]
      },
      {
        path: 'performance',
        component: MainLayout,
        name: '绩效考核管理',
        icon: 'zonghe',
        redirect: '/OA/performance/kpiClassify',
        children: [
          { path: 'kpiClassify', component: OaPerformanceKpiClassify, name: '指标分类', icon: 'zonghe' },
          { path: 'kpiList', component: OaPerformanceKpiList, name: '指标库列表', icon: 'zonghe' },
          { path: 'templateList', component: OaPerformanceTemplateList, name: '模板库', icon: 'zonghe' }
        ]
      },
      {
        path: 'assessPlan',
        component: MainLayout,
        name: '考核计划管理',
        icon: 'zonghe',
        redirect: '/OA/assessPlan/assessPlanList',
        children: [
          { path: 'assessPlanList', component: OaAssessPlanList, name: '考核计划列表', icon: 'zonghe' },
          { path: 'assessStatistic', component: OaAssessStatistic, name: '考核统计', icon: 'zonghe' }
        ]
      },
      {
        path: 'taskManagement',
        component: MainLayout,
        name: '任务管理',
        icon: 'zonghe',
        redirect: '/OA/taskManagement/myTask',
        children: [
          { path: 'myTask', component: OaTaskManagementMyTask, name: '我的任务', icon: 'zonghe' },
          { path: 'doneTask', component: OaTaskManagementDoneTask, name: '已完成任务', icon: 'zonghe' },
          { path: 'myCreateTask', component: OaTaskManagementMyCreateTask, name: '我创建的任务', icon: 'zonghe' },
          { path: 'allTask', component: OaTaskManagementMyTask, name: '所有任务', icon: 'zonghe' }
        ]
      }
    ]
  },
  {
    path: '/WK',
    component: Layout,
    redirect: '/WK/workforce',
    name: '考勤',
    icon: 'zujian',
    children: [
      {
        path: 'workforce',
        component: MainLayout,
        name: '排班管理',
        icon: 'zonghe',
        redirect: '/WK/workforce/workforceManagement',
        children: [
          { path: 'workforceManagement', component: WKworkforceManagement, name: '排班', icon: 'zonghe' },
          { path: 'classSetting', component: WKclassSetting, name: '班次设置', icon: 'zonghe' },
          { path: 'areaSetting', component: WKareaSetting, name: '区域设置', icon: 'zonghe' }
        ]
      },
      {
        path: 'checking',
        component: MainLayout,
        name: '考勤管理',
        icon: 'zonghe',
        redirect: '/WK/checking/statistics',
        children: [
          { path: 'statistics', component: WKCheckingStatistics, name: '考勤统计', icon: 'zonghe' },
          { path: 'record', component: WKCheckingRecord, name: '考勤记录', icon: 'zonghe' },
          { path: 'addAttendance', component: WKaddAttendance, name: '添加考勤', icon: 'zonghe' }
        ]
      }
    ]
  },
  {
    path: '/SPC',
    component: Layout,
    redirect: '/SPC/QRCode',
    name: 'SPC',
    icon: 'zujian',
    children: [
      {
        path: 'QRCode',
        component: MainLayout,
        name: '二维码',
        icon: 'zonghe',
        redirect: '/SPC/QRCode/QRCodeList',
        children: [
          { path: 'QRCodeList', component: SPCQRCodeList, name: '二维码列表', icon: 'zonghe' }
        ]
      },
      {
        path: 'projectConfiguration',
        component: MainLayout,
        name: '检验项配置',
        icon: 'zonghe',
        redirect: '/SPC/projectConfiguration/inspectionProjectList',
        children: [
          { path: 'inspectionProjectList', component: SPCProjectConfigurationInspectionProjectList, name: '检验项', icon: 'zonghe' },
          { path: 'specificationSample', component: SPCProjectConfigurationSpecificationSample, name: '规格样品', icon: 'zonghe' }
        ]
      }
    ]
  },
  {
    path: '/BASE',
    component: Layout,
    redirect: '/BASE/client',
    name: '项目管理',
    icon: 'zujian',
    children: [
      {
        path: 'client',
        component: MainLayout,
        name: '客户管理',
        icon: 'zonghe',
        redirect: '/BASE/client/myClient',
        children: [
          { path: 'myClient', component: BaseClientMyClient, name: '我的客户', icon: 'zonghe' },
          { path: 'myCreatClient', component: BaseClientMyCreateClient, name: '我创建的客户', icon: 'zonghe' },
          { path: 'clientGroup', component: BaseClientGroup, name: '客户群管理', icon: 'zonghe' }
        ]
      },
      {
        path: 'product',
        component: MainLayout,
        name: '产品管理',
        icon: 'zonghe',
        redirect: '/BASE/product/productList',
        children: [
          { path: 'productList', component: BaseProductProductList, name: '产品列表', icon: 'zonghe' },
          { path: 'productIntroduce', component: BaseProductProductIntroduce, name: '产品介绍', icon: 'zonghe' }
        ]
      },
      {
        path: 'need',
        component: MainLayout,
        name: '需求申请',
        icon: 'zonghe',
        redirect: '/BASE/need/needList',
        children: [
          { path: 'needList', component: BaseNeedNeedList, name: '需求列表', icon: 'zonghe' },
          { path: 'standard', component: BaseNeedStandard, name: '标准匹配', icon: 'zonghe' }
        ]
      }
    ]
  },
  {
    path: '/LAB',
    component: Layout,
    redirect: '/LAB/entrust',
    name: '实验室',
    icon: 'zujian',
    children: [
      {
        path: 'entrust',
        component: MainLayout,
        name: '委托单',
        icon: 'zonghe',
        redirect: '/LAB/entrust/receive',
        children: [
          { path: 'receive', component: LabEntrustReceive, name: '待接收委托单', icon: 'zonghe' },
          { path: 'yetReceive', component: LabCheckoutInspectionList, name: '已接收委托单', icon: 'zonghe'},
          { path: 'repulse', component: LabEntrustRepulse, name: '已打回委托单', icon: 'zonghe' }
        ]
      },
      {
        path: 'checkout',
        component: MainLayout,
        name: '检验管理',
        icon: 'zonghe',
        redirect: '/LAB/checkout/inspectionList',
        children: [
          { path: 'inspectionList', component: LabCheckoutInspectionList, name: '检验列表', icon: 'zonghe' }
        ]
      },
      {
        path: 'auditManagement',
        component: MainLayout,
        name: '审核管理',
        icon: 'zonghe',
        redirect: '/LAB/auditManagement/waitAudit',
        children: [
          { path: 'waitAudit', component: LabAuditManagementWaitAudit, name: '产品待审', icon: 'zonghe' },
          { path: 'process', component: LabAuditManagementProcess, name: '溶液待审', icon: 'zonghe' },
          { path: 'yetAudit', component: LabAuditManagementYetAudit, name: '产品已审', icon: 'zonghe' },
          { path: 'solutionYetAudit', component: LabAuditManagementsolutionYetAudit, name: '溶液已审', icon: 'zonghe' }
        ]
      },
      {
        path: 'qualified',
        component: MainLayout,
        name: '合格表',
        icon: 'zonghe',
        redirect: '/LAB/qualified/beadInspectionResult',
        children: [
          { path: 'beadInspectionResult', component: LabQualifiedBeadInspectionResult, name: '胎圈合格表', icon: 'zonghe' },
          { path: 'cordInspectionResult', component: LabQualifiedCordInspectionResult, name: '帘线合格表', icon: 'zonghe' },
          { path: 'solutionInspectionResult', component: LabQualifiedSolutionInspectionResult, name: '溶液合格表', icon: 'zonghe' }
        ]
      },
      {
        path: 'noQualified',
        component: MainLayout,
        name: '不合格',
        icon: 'zonghe',
        redirect: '/LAB/noQualified/beadDisqualification',
        children: [
          { path: 'beadDisqualification', component: LabNoQualifiedBeadDisqualification, name: '胎圈不合格', icon: 'zonghe' },
          // { path: 'beadDisqualification', component: LabQualifiedBeadInspectionResult, name: '胎圈不合格', icon: 'zonghe' },
          { path: 'cordDisqualification', component: LabNoQualifiedCordDisqualification, name: '帘线不合格', icon: 'zonghe' },
          { path: 'solutionDisqualification', component: LabNoQualifiedSolutionDisqualification, name: '溶液不合格', icon: 'zonghe' }
        ]
      }
    ]
  },
  {
    path: '/HR',
    component: Layout,
    redirect: '/HR/employee',
    name: 'HR管理',
    icon: 'zujian',
    children: [
      {
        path: 'employee',
        component: MainLayout,
        name: '员工资料',
        icon: 'zonghe',
        redirect: '/HR/employee/employeeDetails',
        children: [
          { path: 'employeeDetails', component: HREmployeeDetails, name: '员工详情', icon: 'zonghe' }
        ]
      },
      {
        path: 'basic',
        component: MainLayout,
        name: '基础管理',
        icon: 'zonghe',
        redirect: '/HR/basic/dormitory',
        children: [
          { path: 'dormitory', component: HRBasicDormitory, name: '宿舍管理', icon: 'zonghe' },
          { path: 'occupationalInjury', component: HRBasicOccupationalInjury, name: '工伤管理', icon: 'zonghe' },
          { path: 'physicalExamination', component: HRBasicPhysicalExamination, name: '体检管理', icon: 'zonghe' },
          { path: 'salary', component: HRBasicSalary, name: '工资管理', icon: 'zonghe' },
          { path: 'welfare', component: HRBasicWelfare, name: '福利管理', icon: 'zonghe' },
          { path: 'train', component: HRBasicTrain, name: '培训管理', icon: 'zonghe' },
          { path: 'professionalrRanks', component: HRBasicProfessionalrRanks, name: '职称管理', icon: 'zonghe' },
          { path: 'certificate', component: HRBasicCertificate, name: '证件管理', icon: 'zonghe' },
          { path: 'partTimeJob', component: HRBasicPartTimeJob, name: '兼职名称', icon: 'zonghe' },
          { path: 'transferMove', component: HRBasicTransferMove, name: '岗位调动', icon: 'zonghe' },
          { path: 'leave', component: HRBasicLeave, name: '请假管理', icon: 'zonghe' },
          { path: 'workExperience', component: HRBasicWorkExperience, name: '工作经历', icon: 'zonghe' },
          { path: 'socialRelationships', component: HRBasicSocialRelationships, name: '社会关系', icon: 'zonghe' },
          { path: 'studyExperience', component: HRBasicStudyExperience, name: '学习经历', icon: 'zonghe' },
          { path: 'skill', component: HRBasicSkill, name: '技能管理', icon: 'zonghe' },
          { path: 'reward', component: HRBasicReward, name: '奖励', icon: 'zonghe' },
          { path: 'punishment', component: HRBasicPunishment, name: '惩罚', icon: 'zonghe' }
        ]
      },
      {
        path: 'probation',
        component: MainLayout,
        name: '员工试用管理',
        icon: 'zonghe',
        redirect: '/HR/probation/probationList',
        children: [
          { path: 'probationList', component: HRProbationProbationList, name: '试用员工列表', icon: 'zonghe' },
          { path: 'delayRecord', component: HRProbationDelayRecord, name: '延期记录', icon: 'zonghe' },
          { path: 'regularWorkerApply', component: HRProbationRegularWorkerApply, name: '转正申请', icon: 'zonghe' }
        ]
      },
      {
        path: 'dimission',
        component: MainLayout,
        name: '离职管理',
        icon: 'zonghe',
        redirect: '/HR/dimission/dimissionApply',
        children: [
          { path: 'dimissionApply', component: HRDimissionDimissionApply, name: '离职申请', icon: 'zonghe' },
          { path: 'stayDimission', component: HRDimissionStayDimission, name: '待离职人员', icon: 'zonghe' },
          { path: 'dimissionPerson', component: HRDimissionDimissionPerson, name: '离职人员', icon: 'zonghe' },
          { path: 'dimissionStatistics', component: HRDimissionDimissionStatistics, name: '离职统计', icon: 'zonghe' }
        ]
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];

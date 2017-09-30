import fetch from '@/utils/fetch'

/**
 * 获取宿舍分页列表信息
 */
export function readDormitoryList(data) {

    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-HR-Web/hrSysHotel/read/list',
        method: 'put',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

/**
 * 获取工伤分页列表信息
 */
export function readInjuryList(data) {
    
    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-HR-Web/hrSysInjury/read/list',
        method: 'put',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 修改奖励信息
 */
export function updataInjury(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysInjury',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 删除奖励信息
 */
export function deleteInjury(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysInjury',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

// charger-HR-Web/hrSysSociety/read/list
/**
 * 获取社会关系分页列表信息
 */
export function readSocietyList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysSociety/read/list',
        method: 'put',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

// charger-HR-Web/hrSysSociety 
/**
 * 添加社会关系信息
 */
export function updataSocietyList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysSociety',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
// charger-HR-Web/hrSysSociety 
/**
 * 删除社会关系信息
 */
export function deleteSocietyList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysSociety',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

//hrSysSkill/read/list
/**
 * 获取技能分页列表信息
 */
export function readSkillList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysSkill/read/list',
        method: 'put',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

// charger-HR-Web/hrSysSkill 
/**
 * 添加技能信息
 */
export function updataSkill(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysSkill',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
// charger-HR-Web/hrSysSociety 
/**
 * 删除技能信息
 */
export function deleteSkill(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysSkill',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

//hrSysWarefall/read/list
/**
 * 获取技能分页列表信息
 */
export function readWarefallList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysWarefall/read/list',
        method: 'put',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

// charger-HR-Web/hrSysSkill 
/**
 * 添加技能信息
 */
export function updataWarefall(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysWarefall',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
// charger-HR-Web/hrSysSociety 
/**
 * 删除技能信息
 */
export function deleteWarefall(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysWarefall',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}


//  /charger-HR-Web/hrSysCard/read/list
/**
 * 证件管理分页列表信息
 */
export function readCertificateList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysCard/read/list',
        method: 'put',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 添加证件信息
 */
export function updataCertificate(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysCard',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 删除证件信息
 */
export function deleteCertificate(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysWarefall',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}


/**
 * 岗位调动分页列表信息
 */
export function readTransferMoveList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysChangepost/read/list',
        method: 'put',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 添加岗位调动信息
 */
export function updataTransferMove(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysChangepost',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 删除岗位调动信息
 */
export function deleteTransferMove(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysChangepost',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}


/**
 * 体检分页列表信息
 */
export function readPhysicalList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysCheck/read/list',
        method: 'put',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 修改体检信息
 */
export function updataPhysical(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysCheck',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 删除体检信息
 */
export function deletePhysical(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysCheck',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}


/**
 * 工作经历分页列表信息
 */
export function readWorkExperienceList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysExperience/read/list',
        method: 'put',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 修改工作经历信息
 */
export function updataWorkExperience(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysExperience',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 删除工作经历信息
 */
export function deleteWorkExperience(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysExperience',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

/**
 * 奖励分页列表信息
 */
export function readRewardList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysHortation/read/list',
        method: 'put',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 修改奖励信息
 */
export function updataReward(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysHortation',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 删除奖励信息
 */
export function deleteReward(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysHortation',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}


/**
 * 惩罚分页列表信息
 */
export function readPunishmentList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysPunish/read/list',
        method: 'put',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 修改惩罚信息
 */
export function updataPunishment(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysPunish',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 删除惩罚信息
 */
export function deletePunishment(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysPunish',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

/**
 * 请假分页列表信息
 */
export function readLeaveList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysLeave/read/list',
        method: 'put',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 修改请假信息
 */
export function updataLeave(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysLeave',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 删除请假信息
 */
export function deleteLeave(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysLeave',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}



/**
 * 兼职分页列表信息
 */
export function readPartTimeJobList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysPluralize/read/list',
        method: 'put',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 修改兼职信息
 */
export function updataPartTimeJob(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysPluralize',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 删除兼职信息
 */
export function deletePartTimeJob(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysPluralize',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}


/**
 * 职称分页列表信息
 */
export function readProfessionalrRanksList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysProfessiontitle/read/list',
        method: 'put',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 修改职称信息
 */
export function updataProfessionalrRanks(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysProfessiontitle',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 删除职称信息
 */
export function deleteProfessionalrRanks(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysProfessiontitle',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}


/**
 * 工资分页列表信息
 */
export function readSalaryList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysSalary/read/list',
        method: 'put',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 修改工资信息
 */
export function updataSalary(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysSalary',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 删除工资信息
 */
export function deleteSalary(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysSalary',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}



/**
 * 学习经历分页列表信息
 */
export function readStudyexperienceList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysStudyexperience/read/list',
        method: 'put',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 修改学习经历
 */
export function updataStudyexperience(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysStudyexperience',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 删除学习经历
 */
export function deleteStudyexperience(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysStudyexperience',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}



/**
 * 学习经历分页列表信息
 */
export function readTranList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysTrainrecord/read/list',
        method: 'put',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 修改学习经历
 */
export function updataTran(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysTrainrecord',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 删除学习经历
 */
export function deleteTran(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysTrainrecord',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

// hrUserDetail 


/**
 * 员工的特别详细的信息
 */
export function getUserDetail(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrUserDetail/read/detail',
        method: 'put',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

/**
 * 保存员工的特别详细的信息
 */
export function updataUserDetail(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrUserDetail',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

// hrSysProbation/readst
/**
 * 试用期员工分页列表
 */
export function readProbationList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysProbation/read/list',
        method: 'put',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

/**
 * 修改试用期员工
 */
export function updataProbation(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysProbation/update',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 删除试用期员工
 */
export function deleteProbation(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysProbation',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}


/**
 * 添加延期
 */
export function updataDelayRecord(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysExtension',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 延期分页列表
 */
export function readDelayRecordList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysExtension/read/list',
        method: 'put',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

// hrSysTransapply


/**
 * 转正申请分页列表信息
 */
export function readRegularWorkerList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysTransapply/read/list',
        method: 'put',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 修改转正申请
 */
export function updataRegularWorker(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysTransapply',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 删除转正申请
 */
export function deleteRegularWorker(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrSysTransapply',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}


/**
 * 离职申请分页列表信息
 */
export function readDimissionApplyList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrDimission/read/dimissionList',
        method: 'put',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 待离职申请分页列表信息
 */
export function readStayDimissionList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrDimission/read/stayDimission',
        method: 'put',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 已离职申请分页列表信息
 */
export function readYetDimissionList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrDimission/read/dimission',
        method: 'put',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 修改离职申请
 */
export function updataDimissionApply(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrDimission',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 删除离职申请
 */
export function deleteDimissionApply(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: 'charger-HR-Web/hrDimission',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
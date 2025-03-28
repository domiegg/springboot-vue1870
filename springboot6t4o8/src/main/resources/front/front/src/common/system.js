export function isAuth(tableName, key) {
  let role = localStorage.getItem("UserTableName");
  let menus = [{"backMenu":[{"child":[{"appFrontIcon":"cuIcon-present","buttons":["新增","查看","修改","删除"],"menu":"患者","menuJump":"列表","tableName":"huanzhe"}],"menu":"患者管理"},{"child":[{"appFrontIcon":"cuIcon-camera","buttons":["新增","查看","修改","删除"],"menu":"医生","menuJump":"列表","tableName":"yisheng"}],"menu":"医生管理"},{"child":[{"appFrontIcon":"cuIcon-cardboard","buttons":["新增","查看","修改","删除"],"menu":"科室","menuJump":"列表","tableName":"keshi"}],"menu":"科室管理"},{"child":[{"appFrontIcon":"cuIcon-shop","buttons":["新增","查看","修改","删除"],"menu":"出诊医生","menuJump":"列表","tableName":"chuzhenyisheng"}],"menu":"出诊医生管理"},{"child":[{"appFrontIcon":"cuIcon-news","buttons":["查看","修改","删除"],"menu":"预约挂号","menuJump":"列表","tableName":"yuyueguahao"}],"menu":"预约挂号管理"},{"child":[{"appFrontIcon":"cuIcon-list","buttons":["查看","修改","删除"],"menu":"预约取消","menuJump":"列表","tableName":"yuyuequxiao"}],"menu":"预约取消管理"},{"child":[{"appFrontIcon":"cuIcon-paint","buttons":["查看","修改","删除"],"menu":"病历信息","menuJump":"列表","tableName":"binglixinxi"}],"menu":"病历信息管理"},{"child":[{"appFrontIcon":"cuIcon-vipcard","buttons":["新增","查看","修改","删除"],"menu":"药品信息","menuJump":"列表","tableName":"yaopinxinxi"}],"menu":"药品信息管理"},{"child":[{"appFrontIcon":"cuIcon-attentionfavor","buttons":["查看","修改","删除"],"menu":"处方开具","menuJump":"列表","tableName":"chufangkaiju"}],"menu":"处方开具管理"},{"child":[{"appFrontIcon":"cuIcon-qrcode","buttons":["查看","修改","回复","删除"],"menu":"留言板管理","tableName":"messages"}],"menu":"留言板管理"},{"child":[{"appFrontIcon":"cuIcon-clothes","buttons":["新增","查看","修改","删除"],"menu":"轮播图管理","tableName":"config"},{"appFrontIcon":"cuIcon-news","buttons":["新增","查看","修改","删除"],"menu":"公告信息","tableName":"news"}],"menu":"系统管理"}],"frontMenu":[{"child":[{"appFrontIcon":"cuIcon-keyboard","buttons":["查看","预约挂号"],"menu":"出诊医生列表","menuJump":"列表","tableName":"chuzhenyisheng"}],"menu":"出诊医生模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"否","hasFrontRegister":"否","roleName":"管理员","tableName":"users"},{"backMenu":[{"child":[{"appFrontIcon":"cuIcon-news","buttons":["查看","支付","预约取消"],"menu":"预约挂号","menuJump":"列表","tableName":"yuyueguahao"}],"menu":"预约挂号管理"},{"child":[{"appFrontIcon":"cuIcon-list","buttons":["查看"],"menu":"预约取消","menuJump":"列表","tableName":"yuyuequxiao"}],"menu":"预约取消管理"},{"child":[{"appFrontIcon":"cuIcon-paint","buttons":["查看"],"menu":"病历信息","menuJump":"列表","tableName":"binglixinxi"}],"menu":"病历信息管理"},{"child":[{"appFrontIcon":"cuIcon-attentionfavor","buttons":["查看","支付"],"menu":"处方开具","menuJump":"列表","tableName":"chufangkaiju"}],"menu":"处方开具管理"}],"frontMenu":[{"child":[{"appFrontIcon":"cuIcon-keyboard","buttons":["查看","预约挂号"],"menu":"出诊医生列表","menuJump":"列表","tableName":"chuzhenyisheng"}],"menu":"出诊医生模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"是","hasFrontRegister":"是","roleName":"患者","tableName":"huanzhe"},{"backMenu":[{"child":[{"appFrontIcon":"cuIcon-shop","buttons":["查看"],"menu":"出诊医生","menuJump":"列表","tableName":"chuzhenyisheng"}],"menu":"出诊医生管理"},{"child":[{"appFrontIcon":"cuIcon-news","buttons":["查看","审核","病历信息"],"menu":"预约挂号","menuJump":"列表","tableName":"yuyueguahao"}],"menu":"预约挂号管理"},{"child":[{"appFrontIcon":"cuIcon-list","buttons":["查看","审核"],"menu":"预约取消","menuJump":"列表","tableName":"yuyuequxiao"}],"menu":"预约取消管理"},{"child":[{"appFrontIcon":"cuIcon-paint","buttons":["查看","修改","删除"],"menu":"病历信息","menuJump":"列表","tableName":"binglixinxi"}],"menu":"病历信息管理"},{"child":[{"appFrontIcon":"cuIcon-vipcard","buttons":["查看","处方开具"],"menu":"药品信息","menuJump":"列表","tableName":"yaopinxinxi"}],"menu":"药品信息管理"},{"child":[{"appFrontIcon":"cuIcon-attentionfavor","buttons":["查看","修改","删除"],"menu":"处方开具","menuJump":"列表","tableName":"chufangkaiju"}],"menu":"处方开具管理"}],"frontMenu":[{"child":[{"appFrontIcon":"cuIcon-keyboard","buttons":["查看","预约挂号"],"menu":"出诊医生列表","menuJump":"列表","tableName":"chuzhenyisheng"}],"menu":"出诊医生模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"否","hasFrontRegister":"否","roleName":"医生","tableName":"yisheng"}];
  for(let i=0;i<menus.length;i++){
    if(menus[i].tableName==role){
      for(let j=0;j<menus[i].frontMenu.length;j++){
          for(let k=0;k<menus[i].frontMenu[j].child.length;k++){
            if(tableName==menus[i].frontMenu[j].child[k].tableName){
              let buttons = menus[i].frontMenu[j].child[k].buttons.join(',');
              return buttons.indexOf(key) !== -1 || false
            }
          }
      }
    }
  }
  return false;
}

/**
 *  * 获取当前时间（yyyy-MM-dd hh:mm:ss）
 *   */
export function getCurDateTime() {
    let currentTime = new Date(),
    year = currentTime.getFullYear(),
    month = currentTime.getMonth() + 1 < 10 ? '0' + (currentTime.getMonth() + 1) : currentTime.getMonth() + 1,
    day = currentTime.getDate() < 10 ? '0' + currentTime.getDate() : currentTime.getDate(),
    hour = currentTime.getHours(),
    minute = currentTime.getMinutes(),
    second = currentTime.getSeconds();
    return year + "-" + month + "-" + day + " " +hour +":" +minute+":"+second;
}

/**
 *  * 获取当前日期（yyyy-MM-dd）
 *   */
export function getCurDate() {
    let currentTime = new Date(),
    year = currentTime.getFullYear(),
    month = currentTime.getMonth() + 1 < 10 ? '0' + (currentTime.getMonth() + 1) : currentTime.getMonth() + 1,
    day = currentTime.getDate() < 10 ? '0' + currentTime.getDate() : currentTime.getDate();
    return year + "-" + month + "-" + day;
}

const base = {
    get() {
        return {
            url : "http://localhost:8080/springboot6t4o8/",
            name: "springboot6t4o8",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/springboot6t4o8/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "基于协同过滤算法的私人诊所管理系统"
        } 
    }
}
export default base

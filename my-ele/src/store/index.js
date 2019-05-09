import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);
import VuePersist from 'vuex-persist'
const vuexLocal = new VuePersist({
    storage: window.localStorage
})
const state={
    adminInfo:{
        login:false
    }
}
const mutations={
    saveAdminInfo(state,adminInfo){
        state.adminInfo=adminInfo
    },
    getAdminInfo(state){
        return state.adminInfo
    },
    singout(state){
        state.adminInfo.login=false
        return state.adminInfo
    }
}
const actions={
    // async getAdminData({commit}){
    //     try{
    //         const res=await getAdminInfo()
    //         if(res.status===1){
    //             commit('saveAdminInfo',res.data);
    //         }else{
    //             throw new Error(res.type)
    //         }
    //     }
    // }
}
export default new vuex.Store({
    plugins: [vuexLocal.plugin],
    state,
    actions,
    mutations,
    getters: {}
})
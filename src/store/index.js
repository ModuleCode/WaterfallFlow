import { defineStore } from "pinia";
//定义容器
//参数一:id必须唯一
export const useStore = defineStore('main', {
    state: () => {
        return {
            column: 2,
            gap: 3,
            //是否实时更新
            realTime:false,
            menuopenfs:"rtl",
            
        }
    },
    getters: {},
    actions: {}

})





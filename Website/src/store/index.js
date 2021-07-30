import { createStore } from 'vuex'

export default createStore({
    state: {
        user: null
    },
    mutations: {
        setUser(state, userData){
            state.user = userData;
        }
    },
    getters: {
        authenticated(state){
            return !!state.user;
        }
    },
    actions: {

    },
    modules: {
        
    }
})
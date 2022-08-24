import { createStore } from 'vuex'
import { login } from '../apis/user.api'
const store = createStore({
  state: {
    token: '',
  },
  getters: {
    token: state => state.token || localStorage.getItem('token')
  },
  mutations: {
    SET_TOKEN (state, token) {
        localStorage.setItem('token', token)
        state.token = token
      },
      LOGOUT () {
        localStorage.removeItem('token')
       
      }
  },
  actions: {
    async loginAction ({ commit }, loginParams: LoginForm) {
        try {
          const { token, user } = await login(loginParams)
          const { permissionDrops, ...userInfo } = user
          commit('SET_TOKEN', token)
          commit('SET_USERINFO', userInfo)
          commit('SET_PERMISSION', permissionDrops)
        } catch (error) {
          throw error
        }
      }
  },
})

export default store
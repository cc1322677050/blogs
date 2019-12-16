import { login, logout, getInfo } from '@/api/users'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user= {
  state: {
    token: getToken,
    userId:'',
    name: '',
    avatar:"",
    email:"",
    registrationTime:"",
    birthday:"",
    age:"",
    telephoneNumber:"",
    nickname:"",
    roles:[]
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERID: (state, USERID) => {
      state.userId = USERID
    },
    SET_NAME: (state, username) => {
      state.username = username
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_Email: (state, email) => {
      state.email=email
    },
    SET_RegistrationTime:(state,registrationTime)=>{
      state.registrationTime=registrationTime
    },
    SET_Birthday:(state,birthday)=>{
      state.birthday=birthday
    },
    SET_Age:(state,age)=>{
      state.age=age
    },
    SET_TelephoneNumber:(state,telephoneNumber)=>{
      state.telephoneNumber=telephoneNumber
    },
    SET_Nickname:(state,nickname)=>{
      state.nickname=nickname
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    // 登录
    Login({commit}, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data;
          const tokenStr = data.tokenHead + data.token
          setToken(tokenStr)
          commit('SET_TOKEN', tokenStr)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data;
          commit('SET_USERID', data.userId);
          commit('SET_NAME', data.userName);
          commit('SET_Email',data.userEmail);
          commit('SET_AVATAR', data.userProfilePhoto);
          commit('SET_RegistrationTime',data.userRegistrationTime);
          commit('SET_Birthday',data.userBirthday);
          commit('SET_Age',data.userAge);
          commit('SET_TelephoneNumber',data.userTelephoneNumber);
          commit('SET_Nickname',data.userNickname);
          commit('SET_ROLES', data.roles);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}
export default user

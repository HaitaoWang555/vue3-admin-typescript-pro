import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { Commit } from 'vuex'

export interface IUser {
  token: string
  name: string
  avatar: string
}

const getDefaultState = (): IUser => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state: IUser): void => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state: IUser, token: string): void => {
    state.token = token
  },
  SET_NAME: (state: IUser, name: string): void => {
    state.name = name
  },
  SET_AVATAR: (state: IUser, avatar: string): void => {
    state.avatar = avatar
  },
}

const actions = {
  // user login
  login(
    { commit }: { commit: Commit },
    userInfo: API.LoginParams
  ): Promise<unknown> {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response.data
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve(null)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({
    commit,
    state,
  }: {
    commit: Commit
    state: IUser
  }): Promise<unknown> {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response.data

          if (!data) {
            return reject(new Error('Verification failed, please Login again.'))
          }

          const { name, avatar } = data

          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit }: { commit: Commit }): Promise<unknown> {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          removeToken() // must remove  token  first
          resetRouter()
          commit('RESET_STATE')
          resolve(null)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }: { commit: Commit }): Promise<unknown> {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve(null)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

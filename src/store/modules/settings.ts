import defaultSettings from '@/settings'
import { Commit } from 'vuex'

export interface ISettings {
  showSettings?: boolean
  fixedHeader?: boolean
  sidebarLogo?: boolean
}
export interface IData {
  key: 'showSettings' | 'fixedHeader' | 'sidebarLogo'
  value: boolean
}

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = (): ISettings => {
  return {
    showSettings: showSettings,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo,
  }
}

const mutations = {
  CHANGE_SETTING: (state: ISettings, { key, value }: IData): void => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
}

const actions = {
  changeSetting({ commit }: { commit: Commit }, data: IData): void {
    commit('CHANGE_SETTING', data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

import Store from 'store'
import { Commit } from 'vuex'

export type TSidebar = {
  opened?: boolean
  withoutAnimation?: boolean
}

export interface IApp {
  sidebar: TSidebar
  device: string
}

const state = (): IApp => {
  return {
    sidebar: {
      opened: Store.get('sidebarStatus') ? !!+Store.get('sidebarStatus') : true,
      withoutAnimation: false,
    },
    device: 'desktop',
  }
}

const mutations = {
  TOGGLE_SIDEBAR: (state: IApp): void => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Store.set('sidebarStatus', 1)
    } else {
      Store.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state: IApp, withoutAnimation: boolean): void => {
    Store.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state: IApp, device: string): void => {
    state.device = device
  },
}

const actions = {
  toggleSideBar({ commit }: { commit: Commit }): void {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar(
    { commit }: { commit: Commit },
    { withoutAnimation }: TSidebar
  ): void {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }: { commit: Commit }, device: string): void {
    commit('TOGGLE_DEVICE', device)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

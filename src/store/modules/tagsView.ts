import { RouteLocationNormalizedLoaded } from 'vue-router'
import { Commit, Dispatch } from 'vuex'

export type ITagsView = {
  visitedViews: RouteLocationNormalizedLoaded[]
  cachedViews: string[]
}

const state = (): ITagsView => {
  return {
    visitedViews: [],
    cachedViews: [],
  }
}

const mutations = {
  ADD_VISITED_VIEW: (
    state: ITagsView,
    view: RouteLocationNormalizedLoaded
  ): void => {
    if (state.visitedViews.some((v) => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta?.title || 'no-name',
      })
    )
  },
  ADD_CACHED_VIEW: (
    state: ITagsView,
    view: RouteLocationNormalizedLoaded
  ): void => {
    if (state.cachedViews.includes(view.name as string)) return
    if (!view.meta?.noCache) {
      state.cachedViews.push(view.name as string)
    }
  },

  DEL_VISITED_VIEW: (
    state: ITagsView,
    view: RouteLocationNormalizedLoaded
  ): void => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  DEL_CACHED_VIEW: (
    state: ITagsView,
    view: RouteLocationNormalizedLoaded
  ): void => {
    const index = state.cachedViews.indexOf(view.name as string)
    index > -1 && state.cachedViews.splice(index, 1)
  },

  DEL_OTHERS_VISITED_VIEWS: (
    state: ITagsView,
    view: RouteLocationNormalizedLoaded
  ): void => {
    state.visitedViews = state.visitedViews.filter((v) => {
      return v.meta?.affix || v.path === view.path
    })
  },
  DEL_OTHERS_CACHED_VIEWS: (
    state: ITagsView,
    view: RouteLocationNormalizedLoaded
  ): void => {
    const index = state.cachedViews.indexOf(view.name as string)
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = []
    }
  },

  DEL_ALL_VISITED_VIEWS: (state: ITagsView): void => {
    // keep affix tags
    const affixTags = state.visitedViews.filter((tag) => tag.meta?.affix)
    state.visitedViews = affixTags
  },
  DEL_ALL_CACHED_VIEWS: (state: ITagsView): void => {
    state.cachedViews = []
  },

  UPDATE_VISITED_VIEW: (
    state: ITagsView,
    view: RouteLocationNormalizedLoaded
  ): void => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  },
}

const actions = {
  addView(
    { dispatch }: { dispatch: Dispatch },
    view: RouteLocationNormalizedLoaded
  ): void {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView(
    { commit }: { commit: Commit },
    view: RouteLocationNormalizedLoaded
  ): void {
    commit('ADD_VISITED_VIEW', view)
  },
  addCachedView(
    { commit }: { commit: Commit },
    view: RouteLocationNormalizedLoaded
  ): void {
    commit('ADD_CACHED_VIEW', view)
  },

  delView(
    { dispatch, state }: { dispatch: Dispatch; state: ITagsView },
    view: RouteLocationNormalizedLoaded
  ): Promise<ITagsView> {
    return new Promise((resolve) => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
      })
    })
  },
  delVisitedView(
    { commit, state }: { commit: Commit; state: ITagsView },
    view: RouteLocationNormalizedLoaded
  ): Promise<RouteLocationNormalizedLoaded[]> {
    return new Promise((resolve) => {
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  delCachedView(
    { commit, state }: { commit: Commit; state: ITagsView },
    view: RouteLocationNormalizedLoaded
  ): Promise<string[]> {
    return new Promise((resolve) => {
      commit('DEL_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  },

  delOthersViews(
    { dispatch, state }: { dispatch: Dispatch; state: ITagsView },
    view: RouteLocationNormalizedLoaded
  ): Promise<ITagsView> {
    return new Promise((resolve) => {
      dispatch('delOthersVisitedViews', view)
      dispatch('delOthersCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
      })
    })
  },
  delOthersVisitedViews(
    { commit, state }: { commit: Commit; state: ITagsView },
    view: RouteLocationNormalizedLoaded
  ): Promise<RouteLocationNormalizedLoaded[]> {
    return new Promise((resolve) => {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },
  delOthersCachedViews(
    { commit, state }: { commit: Commit; state: ITagsView },
    view: RouteLocationNormalizedLoaded
  ): Promise<string[]> {
    return new Promise((resolve) => {
      commit('DEL_OTHERS_CACHED_VIEWS', view)
      resolve([...state.cachedViews])
    })
  },

  delAllViews(
    { dispatch, state }: { dispatch: Dispatch; state: ITagsView },
    view: RouteLocationNormalizedLoaded
  ): Promise<ITagsView> {
    return new Promise((resolve) => {
      dispatch('delAllVisitedViews', view)
      dispatch('delAllCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
      })
    })
  },
  delAllVisitedViews({
    commit,
    state,
  }: {
    commit: Commit
    state: ITagsView
  }): Promise<RouteLocationNormalizedLoaded[]> {
    return new Promise((resolve) => {
      commit('DEL_ALL_VISITED_VIEWS')
      resolve([...state.visitedViews])
    })
  },
  delAllCachedViews({
    commit,
    state,
  }: {
    commit: Commit
    state: ITagsView
  }): Promise<string[]> {
    return new Promise((resolve) => {
      commit('DEL_ALL_CACHED_VIEWS')
      resolve([...state.cachedViews])
    })
  },

  updateVisitedView(
    { commit }: { commit: Commit },
    view: RouteLocationNormalizedLoaded
  ): void {
    commit('UPDATE_VISITED_VIEW', view)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

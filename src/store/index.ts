import { createStore } from 'vuex'

import getters, { State } from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import tagsView from './modules/tagsView'
import permission from './modules/permission'

const store = createStore<State>({
  modules: {
    app,
    settings,
    tagsView,
    permission,
    user,
  },
  getters,
})

export default store

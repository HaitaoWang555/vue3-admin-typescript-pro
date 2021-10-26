import { createStore } from 'vuex'

import getters from './getters'
import app, { IApp } from './modules/app'
import settings, { ISettings } from './modules/settings'
import user, { IUser } from './modules/user'

export type State = { app: IApp; user: IUser; settings: ISettings }

const store = createStore({
  modules: {
    app,
    settings,
    user,
  },
  getters,
})

export default store

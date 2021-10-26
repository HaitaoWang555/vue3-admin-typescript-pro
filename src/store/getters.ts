import { GetterTree } from 'vuex'
import { IApp, TSidebar } from './modules/app'
import { IUser } from './modules/user'

export type State = { app: IApp; user: IUser }

const getters: GetterTree<State, State> = {
  sidebar: (state: { app: IApp }): TSidebar => state.app.sidebar,
  device: (state: { app: IApp }): string => state.app.device,
  token: (state: { user: IUser }): string => state.user.token,
  avatar: (state: { user: IUser }): string => state.user.avatar,
  name: (state: { user: IUser }): string => state.user.name,
}

export default getters

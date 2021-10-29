import { GetterTree } from 'vuex'
import { IApp, TSidebar } from './modules/app'
import { IUser } from './modules/user'
import { ITagsView } from './modules/tagsView'
import { IPermission } from './modules/permission'
import { ISettings } from './modules/settings'

export type State = {
  app: IApp
  user: IUser
  tagsView: ITagsView
  permission: IPermission
  settings: ISettings
}

const getters: GetterTree<State, State> = {
  sidebar: (state: State): TSidebar => state.app.sidebar,
  device: (state: State): string => state.app.device,
  token: (state: State): string => state.user.token,
  visitedViews: (state: State) => state.tagsView.visitedViews,
  cachedViews: (state: State) => state.tagsView.cachedViews,
  avatar: (state: State): string => state.user.avatar,
  permission_routes: (state: State) => state.permission.routes,
  name: (state: State): string => state.user.name,
}

export default getters

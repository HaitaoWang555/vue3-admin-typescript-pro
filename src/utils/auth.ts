import Store from 'store'

const TokenKey = 'Admin-Token'

export function getToken(): string {
  return Store.get(TokenKey)
}

export function setToken(token: string): string {
  return Store.set(TokenKey, token)
}

export function removeToken(): void {
  return Store.remove(TokenKey)
}

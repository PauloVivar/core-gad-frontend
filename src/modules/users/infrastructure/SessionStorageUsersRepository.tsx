import { User } from '../domain/User'

export function createSessionStorageUsersRepository() {
  return {
    save,
    saveToken
  }
}

async function save(isAuth: boolean, isAdmin: boolean, user: User) {
  sessionStorage.setItem(
    'login',
    JSON.stringify({
      isAuth,
      isAdmin,
      user
    })
  )
}

async function saveToken(token: string) {
  sessionStorage.setItem('token', `Bearer ${token}`)
}

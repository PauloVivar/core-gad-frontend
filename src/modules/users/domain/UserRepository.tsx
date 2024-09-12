import { User } from './User'

export interface UserRepository {
  // findAll: () => Promise<any>
  // findAllPages: (page: number) => Promise<any>
  // save: (user: any) => Promise<any>
  // update: (user: any) => Promise<any>
  // remove: (userId: any) => Promise<any>
  // register: (user: any) => Promise<any>
  get: (id: string) => Promise<User>
}

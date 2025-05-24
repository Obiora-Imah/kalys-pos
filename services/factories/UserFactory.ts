import User, { IUser } from '../../domain/user'

export function createUserFactory(data: Partial<IUser>) {
  const user = new User(data)
  return user.save()
}

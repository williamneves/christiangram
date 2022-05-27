import { atom } from 'recoil'

export const userDbState = atom( {
  key: 'userDbState',
  default: null,
} )

export const loadingUserState = atom( {
  key: 'loadingUserState',
  default: true,
} )
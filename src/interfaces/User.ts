export interface User {
  $key?: string,
  stories?: {[key: string]: boolean},
  friends?: {[key: string]: boolean},
  friend_requests?: {[key: string]: boolean},
  publicName?: string
}

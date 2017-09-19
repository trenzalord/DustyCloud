export interface User {
  $key?: string,
  stories?: {[key: string]: boolean},
  friends?: {[key: string]: boolean},
  friend_requests?: {[key: string]: boolean},
  publicName?: string,
  reactions?: {[key:string]: string},
  stories_seen_physically?: {[key: string]: boolean},
  stories_seen_other?: {[key: string]: boolean}
}

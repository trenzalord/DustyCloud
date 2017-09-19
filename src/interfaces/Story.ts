export interface Story {
  $key?: string,
  uid?: string,
  title: string,
  description: string,
  eventDate: string,
  createdDate: string,
  updatedDate?: string,
  category?: string
  reactions?: {[key: string]: string},
  seen_physically?: {[key: string]: boolean},
  seen_other?: {[key: string]: boolean}
}

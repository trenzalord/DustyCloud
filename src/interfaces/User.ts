export interface User {
  $key?: string,
  stories?: {[key: string]: boolean},
  publicName?: string
}

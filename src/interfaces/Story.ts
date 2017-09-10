export interface Story {
  $key?: string,
  uid?: string,
  title: string,
  description: string,
  eventDate: string,
  createdDate: string,
  updatedDate?: string,
  category?: string
}

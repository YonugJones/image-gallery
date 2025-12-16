// Define the attributes of each image
export type PixabayImage = {
  id: number
  webformatURL: string
  largeImageURL: string
  user: string
  views: number
  downloads: number
  likes: number
  tags: string
}

// Define the attributes of the API response
export type PixabayResponse = {
  total: number
  totalHits: number
  hits: PixabayImage[]
}

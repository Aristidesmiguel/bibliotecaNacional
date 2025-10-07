export interface Book {
     id: string,
      volumeInfo: {
        title: string,
        authors: [],
    publishedDate: number,
        description: string,
        categories: [],
        averageRating: number,
        imageLinks: {
          thumbnail: string
        }
      }
}
    
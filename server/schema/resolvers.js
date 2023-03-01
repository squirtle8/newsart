const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  }
]

export const resolvers = {
  Query: {
    books: () => books,
  },
};
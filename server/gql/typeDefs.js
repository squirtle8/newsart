export const typeDefs = `#graphql
  type Article {
    title: String
    desc: String
    link: String
    image: String
  }
  type Query {
    news: [Article]
    keyword(word: String): [Article]
  }
`;
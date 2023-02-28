export const typeDefs = `#graphql
  type Article {
    title: String!,
    date: String!
    body: String!
  }

  type Query {
    articles: [Article]
  }

  query GetArticles {
    articles {
      title
      date
    }
  }
}
`;
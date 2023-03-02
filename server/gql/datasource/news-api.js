import { RESTDataSource } from '@apollo/datasource-rest';

const API_KEY = '7db942c7e3474c9989030d0aacfbc143';

export default class NewsAPI extends RESTDataSource {
  baseURL = 'https://newsapi.org/v2/';

  async getTopHeadlines() {
    return this.get(`top-headlines?sources=bbc-news&apiKey=${API_KEY}`);
  }

  // async getArticlesByKeywords(keyword) {
    // return this.get(`everything?q=${keyword}&apiKey=${API_KEY}`);
  // }

  // async getArticlesByCategory(category) {

  // }

  
}
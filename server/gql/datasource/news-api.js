import { RESTDataSource } from '@apollo/datasource-rest';
import * as dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.NEWS_API_KEY;

export default class NewsAPI extends RESTDataSource {
  baseURL = 'https://newsapi.org/v2/';

  async getTopHeadlines() {
    return this.get(`top-headlines?country=us&apiKey=${API_KEY}`);
  }

  async getByKeyword(keyword) {
    console.log("in function getByKeyword", keyword);
    return this.get(`everything?q=${keyword}&apiKey=${API_KEY}`);
  }

  // async getArticlesByCategory(category) {

  // }

  
}
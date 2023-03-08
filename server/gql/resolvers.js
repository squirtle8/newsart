
import * as dotenv from 'dotenv';
dotenv.config();
// import openai npm library here
import { Configuration, OpenAIApi } from 'openai';

const API_KEY = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey: API_KEY
});
const openai = new OpenAIApi(configuration);

const helperFunc = async (resultsObj) => {
  const articles = [];
  // iterate through results obj to extract articles
  resultsObj.articles.forEach(article => {
    // extract title, desc, link from each article
    const temp = {
      title: article.title,
      desc: article.description,
      link: article.url,
      image:  async function () {
        const response = await openai.createImage({
          prompt: article.description ? article.description : article.title,
          n: 1,
          size: "256x256"
        })
        console.log("response", response);
        return response.data.data[0].url;
      }
    }
    articles.push(temp);
  });
  return articles;
}

// defines functionality of each Query type
export const resolvers = {
  Query: {
    news: async (parent, args, { dataSources }) => {
      // invoke getTopHeadlines() using gql server context / dataSources
      const resultsObj = await dataSources.newsAPI.getTopHeadlines();
      return helperFunc(resultsObj);
      // // iterate through results obj to extract articles
      // resultsObj.articles.forEach(article => {
      //   // extract title, desc, link from each article
      //   const temp = {
      //     title: article.title,
      //     desc: article.description,
      //     link: article.url,
      //     image:  async function () {
      //       const response = await openai.createImage({
      //         prompt: article.description ? article.description : article.title,
      //         n: 1,
      //         size: "256x256"
      //       })
      //       console.log("response", response);
      //       return response.data.data[0].url;
      //     }
      //   }
      //   articles.push(temp);
      // });
      // return articles;
    },
    keyword: async (parent, {word}, { dataSources }) => {
      console.log("word in resolver -->", word);
      const resultsObj = await dataSources.newsAPI.getByKeyword(word);
      return await helperFunc(resultsObj);
    } 
  },
};
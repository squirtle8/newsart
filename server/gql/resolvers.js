
// import openai npm library here
import { Configuration, OpenAIApi } from 'openai';


const API_KEY = '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'

const configuration = new Configuration({
  apiKey: API_KEY
});
const openai = new OpenAIApi(configuration);

// defines functionality of each Query type
export const resolvers = {
  Query: {
    news: async (parent, args, { dataSources }) => {
      // confirm results to news Query
      const articles = [];

      // invoke getTopHeadlines() using gql server context / dataSources
      const resultsObj = await dataSources.newsAPI.getTopHeadlines();
      
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
            return response.data.data[0].url;
          }
        }
        articles.push(temp);
      });
      return articles;
    }, 
  },
};
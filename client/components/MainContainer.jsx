import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import Post from './Post.jsx';

const GET_TOP_HEADLINES = gql`
query GetTopHeadlines {
  news {
    title
    desc
    link
    image
  }
}
`;

const MainContainer = ({ onNewsSelected }) => {
  // const [cards, setCards] = useState([]);

  const { loading, error, data } = useQuery(GET_TOP_HEADLINES, { errorPolicy: "all" });

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error : {error.message}</p>
  if (error) console.log(JSON.stringify(error, null, 2));
  console.log(data.news);
  // setCards(data.news);

  // useEffect(() => {
  //   getTopHeadlines();
  // }, []); 

  const defaultImage = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fcharlesmalave&psig=AOvVaw3HNt1ApOv0LQhIDqp2gqlf&ust=1678042775431000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCOj58M76wv0CFQAAAAAdAAAAABAE';

  return (
    <>
      {data.news.map((props,i) => (
        props.image ? <Post key={i} image={props.image} link={props.link}/> : <Post key={i} image={defaultImage} link={props.link} />
      ))}
    </>
  );
}

export default MainContainer;

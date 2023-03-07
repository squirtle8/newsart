import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import {Grid } from '@mui/material';

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

  const defaultImage = 'https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg';
  
  return (
    <>
      <Grid container spacing={1}>
        {/* {data.news.slice(0,9).map((props,i) => (
          props.image ? <Post key={i} image={props.image} link={props.link}/> : <Post key={i} image={defaultImage} link={props.link} />
        ))} */}
          <Grid container item spacing={3}>
            {data.news.slice(0,3).map((props,i) => (
              props.image ? <Post key={i} image={props.image} link={props.link}/> : <Post key={i} image={defaultImage} link={props.link} />
              ))}
          </Grid>
          <Grid container item spacing={3}>
            {data.news.slice(3,6).map((props,i) => (
              props.image ? <Post key={i} image={props.image} link={props.link}/> : <Post key={i} image={defaultImage} link={props.link} />
              ))}
          </Grid>
          <Grid container item spacing={3}>
            {data.news.slice(6,9).map((props,i) => (
              props.image ? <Post key={i} image={props.image} link={props.link}/> : <Post key={i} image={defaultImage} link={props.link} />
              ))}
          </Grid>
        
      </Grid>
    </>
  );
}

export default MainContainer;

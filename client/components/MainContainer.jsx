import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import {Grid } from '@mui/material';

import Post from './Post.jsx';
import img from '../../assets/default.png';

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

const GET_BY_KEYWORD = (keyword) => (
  gql`
  query GetByKeyword {
    keyword(word: ${keyword}) {
      title
      desc
      link
      image
    }
  }
`
);

const MainContainer = ({ searchText, cards, setCards }) => {

  let qry;
  if (searchText === '') qry = GET_TOP_HEADLINES;
  else qry =  GET_BY_KEYWORD('"' + searchText + '"');
  console.log("qry", qry);
  const { loading, error, data } =  useQuery(qry, { errorPolicy: "all" });

  //Resolve a promise here
  if (loading) return <p>Loading...</p>;
  if (error) console.log("in main container", JSON.stringify(error, null, 2));
  console.log('data.news in mc --> ', data.news);
  // setCards(data.news);

  const defaultImage = 'https://illustoon.com/photo/thum/7431.png';
  
  return (
    <>
      <Grid container spacing={1} padding={10}>
        {/* {data.news.slice(0,9).map((props,i) => (
          props.image ? <Post key={i} image={props.image} link={props.link}/> : <Post key={i} image={defaultImage} link={props.link} />
        ))} */}
          <Grid container item spacing={3} padding={10}>
            {data.news.slice(0,3).map((props,i) => (
              props.image ? <Post key={i} image={props.image} link={props.link}/> : <Post key={i} image={defaultImage} link={props.link} />
              ))}
          </Grid>
          <Grid container item spacing={3} padding={10}>
            {data.news.slice(3,6).map((props,i) => (
              props.image ? <Post key={i} image={props.image} link={props.link}/> : <Post key={i} image={defaultImage} link={props.link} />
              ))}
          </Grid>
          <Grid container item spacing={3} padding={10}>
            {data.news.slice(6,9).map((props,i) => (
              props.image ? <Post key={i} image={props.image} link={props.link}/> : <Post key={i} image={defaultImage} link={props.link} />
              ))}
          </Grid>
        
      </Grid>
    </>
  );
}

export default MainContainer;

import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import Card from './Card.jsx';

export default MainContainer = () => {
  const [cards, setCards] = useState([]);

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

  const { loading, error, data } = useQuery(GET_TOP_HEADLINES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>

  setCards(data.news);
  // useEffect(() => {
  //   getTopHeadlines();
  // }, []);

  console.log(cards);

  return (
    <>
      {cards.map(props => (
        <Card key={i} props={props} />
      ))}
    </>
  );
}
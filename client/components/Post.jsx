import React,{useState, useEffect} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";

const Post = (props) => {
  const { image, link} = props;
  const [active, setActive] = useState('false')
  const handleClick = () =>{
    setActive(!active)
  }

  console.log(image);
  return (
    <div>
      <Card sx={{ maxWidth: 300, paddingRight:5}}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="200"
          image= {image}
          onClick = {()=> window.open(link)}
        />
        {/* <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent> */}
        <CardActions style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <IconButton aria-label="add to favorites" onClick={handleClick}>
            <FavoriteIcon style={{fill: active ? "gray" : "red" }}/>
          </IconButton>
          {/* <Button size="small">Share</Button> */}
          <Button size="small">Comments</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Post;
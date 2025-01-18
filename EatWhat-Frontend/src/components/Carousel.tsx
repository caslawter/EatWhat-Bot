import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

const ImageSlideShow = (props:any):JSX.Element=>{
    
    const urlList = props.urlList;
    console.log(urlList);
    
    return (
        <Carousel>
            {
                urlList.map( (url:any, i:number) => <ImageSlide key={i} url={url.flagContentUri} /> )
            }
        </Carousel>
    )
}

const ImageSlide = (props:any) =>
{
    const {url, key} = props
    console.log("url ==> ", url);
    return (
        <Paper key={key}>
           <img src={url} alt="" />
        </Paper>
    )
}

export default ImageSlideShow;
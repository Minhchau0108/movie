import React,{useState} from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Card, Badge} from "react-bootstrap"
import { Link } from "react-router-dom";

const CarouselMulti = (props) => {

    const [isShown, setIsShown] = useState(false);
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    return (
        <>
            <Carousel
              containerClass="container-fluid"
              responsive={responsive}
              slidesToSlide={2}
                >
                {props.movies && props.movies.map(m => (
                  <>
                    <Card style={{ width: '18rem' }} key={m.id} className={`${isShown && `opacity`}`} >
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${m.backdrop_path}`}
                    onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(false)}/>
                    {isShown && (
                    <div className="toggle">
                     <Badge pill variant="warning">Rating: {m.vote_average}</Badge>
                    </div>)}
                    <Card.Footer>
                      <Card.Title><Link to={`/movies/${m.id}`} key={m.id}>{m.title}</Link></Card.Title>
                    </Card.Footer>
                  </Card>
                  </>
                ))}
            </Carousel>    
        </>
    )
}

export default CarouselMulti

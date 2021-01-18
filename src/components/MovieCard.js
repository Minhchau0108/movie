import React,{useState} from 'react'
import {Card,Badge} from "react-bootstrap"
import { Link } from "react-router-dom";
import { ImStarFull } from "react-icons/im";
import { IconContext } from "react-icons";
const MovieCard = (props) => {
    const [isShown, setIsShown] = useState(false);

    let genre = [];
    props.genres.forEach(x =>{
        props.movies.genre_ids.forEach(id =>{
            if(id === x.id){
                genre.push(x.name);
            }
        }     
        )
    })
    return (
        <div>
        <Card style={{ width: '18rem'}} className={`my-4 movie-card ${isShown && `opacity`}`} bg="light">
            <div className="containerImg">
                <div className="Img">
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${props.movies.poster_path}`}
                    onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(false)}
                    />
                </div>
            </div>
            {isShown && (
                    <div className="toggle">
                        {genre && genre.map(g => (
                            <Badge pill variant="success" className="mx-2" key={g}>{g}</Badge>
                        ))}
                    </div>)}
            <Card.Body>
            <Card.Title><Link to={`/movies/${props.movies.id}`} key={props.movies.id}>{props.movies.title}</Link></Card.Title>
            <Card.Text>
                <IconContext.Provider value={{ color: "red", size: "1.5em", className: "react-icons"}}>
                    <div>
                    <ImStarFull/><span className="m-2">{props.movies.vote_average}</span>
                    </div>
                </IconContext.Provider>
            </Card.Text>
            </Card.Body>
        </Card>
        </div>
      
    )
}

export default MovieCard

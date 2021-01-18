import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Badge} from "react-bootstrap"


const GenreCheckBox = (props) => {
    return (
        <div className="box">
            <Button variant="outline-warning" type="submit" value={0} onClick={props.handleClickGenre} className="m-2 btn-radius py-1">
                   View all
                </Button>
            {props.genresList.map(g => g.count > 0 && (
                <Button variant="outline-warning" type="submit" key={g.id} value={g.id} onClick={props.handleClickGenre} className="m-2 btn-radius py-1">
                    {g.name}<Badge pill variant="warning" className="ml-1" >{g.count}</Badge>
                </Button> 
            ))}
        </div>
    )
}

export default GenreCheckBox

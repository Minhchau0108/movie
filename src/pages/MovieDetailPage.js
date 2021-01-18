import React,{useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import { Container } from 'react-bootstrap';
import MovieDetail from '../components/MovieDetail';
import CarouselMulti from '../components/CarouselMulti'
import ModalReviews from '../components/ModalReviews';
import NavBar from '../components/NavBar'
import ReactPlayer from 'react-player/youtube'

const API_KEY=process.env.REACT_APP_TMDB_API_KEY;
const API_URL=process.env.REACT_APP_TMDB_API_URL;

const MovieDetailPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});
    const [hasError, setHasError] = useState(false);
    const [recommendMovies, setRecommendMovies] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [reviews,setReviews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [ids, setIds] = useState([]);

    useEffect(() => {
        if(!id) {
            return;
        }
        async function fetchData() {
          setLoading(true);
          try {
            const url = `${API_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setMovie(data);
          } catch (error) {
            setHasError(true);
          }
          setLoading(false);
        };
        fetchData();
      }, [id]);

    useEffect(() => {
      if(!id) {
          return;
      }
      async function fetchIds() {
        try {
          const url = `${API_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;
          const response = await fetch(url);
          const data = await response.json();
          setIds(data.results)
        } catch (error) {
          setHasError(true);
        }
      };
      fetchIds();
    }, [id]);

      useEffect(() => {
        if(!id) {
            return;
        }
        async function fetchRecommendMovie() {
            const url = `${API_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`;
            const response = await fetch(url);
            const data = await response.json();
            setRecommendMovies(data.results)
        };
        fetchRecommendMovie();
      }, [id]);

      useEffect(() => {
        if(!id) {
            return;
        }
        async function fetchSimilarMovie() {
            const url = `${API_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`;
            const response = await fetch(url);
            const data = await response.json();
            setSimilarMovies(data.results)
        };
        fetchSimilarMovie();
      }, [id]);

      useEffect(() => {
        if(!id) {
            return;
        }
        async function fetchReviews() {
            const url = `${API_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`;
            const response = await fetch(url);
            const data = await response.json();
            setReviews(data.results)
        };
        fetchReviews();
      }, [id]);

    const handleReview=()=>{
      setShowModal(true)
    }


    return (
        <div className="detailPage">
            <NavBar/>
            <Container className="mt-5">
                {!loading && <MovieDetail 
                path={movie.backdrop_path} 
                title={movie.title} 
                date={movie.release_date} 
                vote={movie.vote_average}
                overview={movie.overview}
                genres={movie.genres}
                clicked={handleReview}/>}
            </Container>
            <ModalReviews show={showModal} onHide={() => setShowModal(false)} reviews={reviews}/>

            {ids.length > 0 && (
              <Container>
              <ReactPlayer url={`https://www.youtube.com/watch?v=${ids[0].key}`} width='100%'/>
              </Container>
            )}

            {recommendMovies.length > 0 && (
              <>
                <h3 className="text-warning text-left m-5">Recommend Movies</h3>
                <CarouselMulti movies={recommendMovies}/>
              </>)}

            {recommendMovies.length > 0 && (
              <>
                <h3 className="text-warning text-left m-5">Similar Movies</h3>
                <CarouselMulti movies={similarMovies}/>
            </>)}
        </div>
    )
}

export default MovieDetailPage

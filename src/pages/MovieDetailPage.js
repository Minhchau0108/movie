import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import MovieDetail from "../components/MovieDetail";
import CarouselMulti from "../components/CarouselMulti";
import ModalReviews from "../components/ModalReviews";
import NavBar from "../components/NavBar";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_URL = process.env.REACT_APP_TMDB_API_URL;

const MovieDetailPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [hasError, setHasError] = useState(false);
  const [recommendMovies, setRecommendMovies] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [ids, setIds] = useState([]);
  const [show, setShow] = useState(false);
  const [key, setKey] = useState("");

  useEffect(() => {
    if (!id) {
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
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!id) {
      return;
    }
    async function fetchIds() {
      try {
        const url = `${API_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;
        const response = await fetch(url);
        const data = await response.json();
        setIds(data.results);
        console.log(data.results);
        const video = data.results[Math.floor(Math.random() * ids.length)];

        setKey(video.key);
      } catch (error) {
        setHasError(true);
      }
    }
    fetchIds();
  }, []);

  useEffect(() => {
    if (!id) {
      return;
    }
    async function fetchRecommendMovie() {
      const url = `${API_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`;
      const response = await fetch(url);
      const data = await response.json();
      setRecommendMovies(data.results);
    }
    fetchRecommendMovie();
  }, [id]);

  useEffect(() => {
    if (!id) {
      return;
    }
    async function fetchSimilarMovie() {
      const url = `${API_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`;
      const response = await fetch(url);
      const data = await response.json();
      setSimilarMovies(data.results);
    }
    fetchSimilarMovie();
  }, [id]);

  useEffect(() => {
    if (!id) {
      return;
    }
    async function fetchReviews() {
      const url = `${API_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`;
      const response = await fetch(url);
      const data = await response.json();
      setReviews(data.results);
    }
    fetchReviews();
  }, [id]);

  const handleReview = () => {
    setShowModal(true);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="detailPage">
      <NavBar />
      <Container className="mt-5">
        {!loading && (
          <MovieDetail
            path={movie.backdrop_path}
            title={movie.title}
            date={movie.release_date}
            vote={movie.vote_average}
            overview={movie.overview}
            genres={movie.genres}
            clicked={handleReview}
            handleClose={handleClose}
            handleShow={handleShow}
            show={show}
            youtubeKey={key}
          />
        )}
      </Container>
      <ModalReviews
        show={showModal}
        onHide={() => setShowModal(false)}
        reviews={reviews}
      />

      {recommendMovies.length > 0 && (
        <>
          <h3 className="text-warning text-left m-5">Recommend Movies</h3>
          <CarouselMulti movies={recommendMovies} />
        </>
      )}

      {recommendMovies.length > 0 && (
        <>
          <h3 className="text-warning text-left m-5">Similar Movies</h3>
          <CarouselMulti movies={similarMovies} />
        </>
      )}
    </div>
  );
};

export default MovieDetailPage;

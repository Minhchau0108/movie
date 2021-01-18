import React, {useState, useEffect} from 'react'
import CarouselMovie from '../components/CarouselMovie';
import PublicNavbar from '../components/PublicNavbar'
import MovieCard from '../components/MovieCard'
import {CardDeck, Row, Col, Container} from "react-bootstrap";
import PaginationBar from '../components/PaginationBar';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import GenreCheckBox from '../components/GenreCheckBox'


const API_KEY=process.env.REACT_APP_TMDB_API_KEY;
const API_URL=process.env.REACT_APP_TMDB_API_URL;

const MovieListPage = ({type}) => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [filterTerm, setFilterTerm] = useState('');
    const [latestMovies, setLatestMovies] = useState([]);
    const [totalResults, setTotalResults]= useState(1);
    const [pageNum, setPageNum] = useState(1);
    const [ratingRange, setRatingRange] = useState({min: 0,max: 10})
    const [yearRange, setYearRange] = useState({min: 1997,max: 2021})
    const [genresList, setGenresList] = useState([]);
    const [hasGenresList, setHasGenresList] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState(0);
    const [sortType, setSortType] = useState('mostToLeastPopular');


    useEffect(()=>{
        async function fetchGenresList() {
            const url = `${API_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
            const response = await fetch(url);
            const data = await response.json();
            setGenresList(data.genres)
            setHasGenresList(true)
          };
          fetchGenresList();
    },[])

    useEffect(() => {
        async function fetchData() {
          let endpoint = "now_playing";
          if(type === 'top_rated'){
              endpoint = 'top_rated';
          }
          if(type === 'upcoming'){
            endpoint = 'upcoming';
          }
          const url = `${API_URL}/movie/${endpoint}?api_key=${API_KEY}&page=${pageNum}`;
          const response = await fetch(url);
          const data = await response.json();
          setMovies(data.results);
          setFilteredMovies(data.results);
          setTotalResults(data.total_results)
          setSelectedGenre(0);
          if(hasGenresList){
            let copyList = [...genresList]
            copyList = copyList.map(g => ({...g, count: 0}))
              data.results.forEach(d => {
                d.genre_ids.forEach(g => {
                    copyList.forEach(l => {
                        if(g === l.id){
                            l.count = l.count + 1;
                        }
                    })
                }
                )
              })
            setGenresList(copyList);
          }
        };
        fetchData();
      }, [type,pageNum,hasGenresList]);

  
    useEffect(()=>{
        async function fetchData() {
            const url = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
            const response = await fetch(url);
            const data = await response.json();
            setLatestMovies(data.results.slice(0,3));
            if(type==='top_rated'){
                setLatestMovies(data.results.slice(4,7));
            }
            if(type==='upcoming'){
                setLatestMovies(data.results.slice(8,11));
            }
          };
          fetchData();
    },[type])


    useEffect(()=>{
        let newMovies = movies.filter((m)=>m.title.toLowerCase().startsWith(filterTerm.toLowerCase()));
        setFilteredMovies(newMovies);
    },[filterTerm, movies])

    useEffect(()=>{
        let newMovies = movies.filter((m)=>(m.vote_average>=ratingRange.min && m.vote_average<=ratingRange.max));
        setFilteredMovies(newMovies);
    },[ratingRange, movies])

    useEffect(()=>{
        let newMovies = movies.filter((m)=>{
            let year = m.release_date.split("-")[0];
            return (year>=yearRange.min && year <= yearRange.max)
        });
        setFilteredMovies(newMovies);
    },[yearRange, movies])

    useEffect(()=>{
        if(parseInt(selectedGenre) !== 0){
            const newMovies = movies.filter(m => m.genre_ids.includes(parseInt(selectedGenre)));
            setFilteredMovies(newMovies)
        }
        else{
            setFilteredMovies(movies)
        }
    },[selectedGenre,movies])

    useEffect(()=>{
        let copyMovies = [...movies]
        switch(sortType){
            case 'leastToMostPopular':
                copyMovies.sort((a,b)=>a.popularity-b.popularity);
                break;
            case 'highestToLowestRating':
                copyMovies.sort((a,b) => b.vote_average - a.vote_average);
                break;
            case 'lowestToHighestRating':
                copyMovies.sort((a,b) => a.vote_average - b.vote_average);
                break;
            default:
                break;
        }
        setFilteredMovies(copyMovies);
    },[sortType,movies])
    

    const handleChangePage=(page)=>{
        setPageNum(page);
    }
    const handleClickGenre=(e)=>{
        setSelectedGenre(e.currentTarget.value);
    }
    const handleSelectSort=(e)=>{
        setSortType(e);
    }
    return (
        <>
            <PublicNavbar handleChange={(e)=>setFilterTerm(e.target.value)} value={filterTerm}/>
            <CarouselMovie movies={latestMovies}/>
            <Container fluid className="movie-body">
            <PaginationBar totalResults={totalResults} currentPage={pageNum} clicked={handleChangePage} handleSelect={handleSelectSort}/>
            <Row>
                <Col md={3} className="px-5">
                    {hasGenresList && <GenreCheckBox genresList={genresList} handleClickGenre={handleClickGenre}/>}
                    <Row className="mb-5">
                        <h4 className="my-4 text-warning">Rating</h4>
                        <InputRange draggableTrack maxValue={10} minValue={0} value={ratingRange} onChange={value => setRatingRange(value)}/>
                    </Row>

                    <Row className="mt-5">
                        <h4 className="my-4 text-warning">Year</h4>
                        <InputRange maxValue={2021} minValue={1997} value={yearRange} onChange={value => setYearRange(value)}/>
                    </Row>
                </Col>
                <Col md={9}>
                <Row>
                    <CardDeck>
                        {filteredMovies.map(m=>(<MovieCard movies = {m} key={m.id} genres={genresList}/>))}
                    </CardDeck>
                </Row>
                </Col>
            </Row>
            </Container>
            
            
        </>
    )
}

export default MovieListPage

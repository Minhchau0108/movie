import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MovieDetailPage from './pages/MovieDetailPage'
import MovieListPage from './pages/MovieListPage';

function App() {
  return (
    <div className="App">
    <Router>
    <Switch>
            <Route exact
              path="/movies/upcoming" 
              render={(props) => <MovieListPage {...props} type="upcoming"/>}
            />
            <Route exact
              path="/movies/top_rated" 
              render={(props) => <MovieListPage {...props} type="top_rated"/>}
            />
            <Route exact path="/movies/:id" component={MovieDetailPage} />
            <Route  path="/" component={MovieListPage} />
          </Switch>
    </Router>
          
  
    
    </div>
  );
}

export default App;

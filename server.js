const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname)));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const moviesData = JSON.parse(fs.readFileSync('movies.json', 'utf8'));


app.get('/movies', (req, res) => {
  res.json(moviesData.movies);
});



app.get('/addmovie.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'addmovie.html'));
  });
  
/*app.post('/addmovie', (req, res) => {
  const newMovie = {
    id: moviesData.movies.length + 1, // Auto-increment ID
    title: req.body.title,
    rating: parseFloat(req.body.rating)
  };
  moviesData.movies.push(newMovie);
  fs.writeFileSync('movies.json', JSON.stringify(moviesData, null, 2)); // Use null and 2 for pretty formatting
  res.redirect('/'); // Redirect to home page
});*/

app.post('/addmovie', (req, res) => {
  const newMovie = {
    id: getNextMovieId(),
    title: req.body.title,
    rating: parseFloat(req.body.rating)
  };
  moviesData.movies.push(newMovie);
  fs.writeFileSync('movies.json', JSON.stringify(moviesData));
  res.redirect('/'); 
});


function getNextMovieId() {
  const maxId = Math.max(...moviesData.movies.map(movie => movie.id), 0);
  return maxId + 1;
}
app.get('/searchmovie', (req, res) => {
  const searchId = parseInt(req.query.id);
  const foundMovie = moviesData.movies.find(movie => movie.id === searchId);
  if (foundMovie) {
    res.json(foundMovie); 
  } else {
    res.status(404).json({ error:'Movie not found'});
  }
});


app.put('/updatemovie/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const updatedTitle = req.body.title;
  const updatedRating = parseFloat(req.body.rating);

  const movieToUpdate = moviesData.movies.find(movie => movie.id === movieId);
  if (movieToUpdate) {
    movieToUpdate.title = updatedTitle;
    movieToUpdate.rating = updatedRating;
    fs.writeFileSync('movies.json', JSON.stringify(moviesData, null, 2)); 
    res.send('Movie updated successfully');
  } else {
    res.status(404).send('Movie not found');
  }
});


app.delete('/deletemovie/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const index = moviesData.movies.findIndex(movie => movie.id === movieId);
  if (index !== -1) {
    moviesData.movies.splice(index, 1);
    fs.writeFileSync('movies.json', JSON.stringify(moviesData, null, 2)); 
    res.send('Movie deleted successfully');
  } else {
    res.status(404).send('Movie not found');
  }
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

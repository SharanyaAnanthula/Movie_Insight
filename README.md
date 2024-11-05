MovieInsight is a simple Node.js and Express-based application that allows users to manage a collection of movies stored in a JSON file. With this tool, users can add, delete, search, and update movie information and check existing ratings of movies.

Features:-

1.Add a New Movie: Easily add new movies to the collection with relevant details like title, year, and rating.
2.Delete a Movie: Remove a movie from the collection by its unique identifier.
3.Search for a Movie's Rating: Look up a movie and view its rating and details.
4.Update Movie Details: Update information about an existing movie in the collection.

Installation:-

1.Clone the repository:

git clone https://github.com/your-username/movieinsight.git
cd movieinsight

2.Install dependencies:

npm install

3.Start the Server:

npm start

The application will run at http://localhost:3000


Sample data:

{
  "movies":
  [
    {
    "id":1,
    "title":"Sammohanam",
    "rating":4.5
    },
    {
      "id":2,
      "title":"Anand",
      "rating":4.8
    }
  ]
}


Usage
Adding Movies: Send a POST request to /movies with the movie details in the request body.
Searching Movies: Use GET /movies/:id to retrieve details of a movie, including its rating.
Updating Movies: Use a PUT request to modify details like id, title, rating of a movie.
Deleting Movies: Use a DELETE request to remove a movie from the collection by ID.


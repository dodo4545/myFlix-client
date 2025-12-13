// Mock data to bypass backend JWT issues
// Use this temporarily while waiting for backend fix

export const mockMovies = [
  {
    id: "507f1f77bcf86cd799439011",
    title: "Inception",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    genre: "Science Fiction",
    director: "Christopher Nolan"
  },
  {
    id: "507f1f77bcf86cd799439012",
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    genre: "Action",
    director: "Christopher Nolan"
  },
  {
    id: "507f1f77bcf86cd799439013",
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    image: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    genre: "Drama",
    director: "Frank Darabont"
  },
  {
    id: "507f1f77bcf86cd799439014",
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    image: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    genre: "Crime",
    director: "Quentin Tarantino"
  },
  {
    id: "507f1f77bcf86cd799439015",
    title: "The Matrix",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    image: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    genre: "Science Fiction",
    director: "Lana Wachowski"
  },
  {
    id: "507f1f77bcf86cd799439016",
    title: "Goodfellas",
    description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.",
    image: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    genre: "Crime",
    director: "Martin Scorsese"
  },
  {
    id: "507f1f77bcf86cd799439017",
    title: "The Lord of the Rings: The Fellowship of the Ring",
    description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    image: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    genre: "Fantasy",
    director: "Peter Jackson"
  },
  {
    id: "507f1f77bcf86cd799439018",
    title: "Forrest Gump",
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    image: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    genre: "Drama",
    director: "Robert Zemeckis"
  },
  {
    id: "507f1f77bcf86cd799439019",
    title: "Star Wars",
    description: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station.",
    image: "https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
    genre: "Science Fiction",
    director: "George Lucas"
  },
  {
    id: "507f1f77bcf86cd79943901a",
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    image: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    genre: "Crime",
    director: "Francis Ford Coppola"
  }
];

export const mockUser = {
  _id: "mock-user-id",
  Username: "myuser123",
  Email: "user@test.com",
  Birthday: "1990-01-01T00:00:00.000Z",
  FavoriteMovies: []
};

export const mockToken = "mock-jwt-token-for-development";

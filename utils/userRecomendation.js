// Import required libraries
const { Matrix, SVD, Factorization } = require("ml-matrix");

// Sample user ratings data (user-item matrix)
const userRatings = [
  [5, 3, 0, 1, 4, 0, 0, 0, 0, 0],
  [4, 0, 0, 1, 4, 0, 0, 0, 0, 0],
  [1, 0, 0, 5, 4, 0, 0, 0, 0, 0],
  [0, 1, 4, 0, 0, 0, 3, 5, 0, 0],
  [0, 0, 5, 0, 0, 0, 4, 4, 0, 0],
  [0, 0, 0, 0, 0, 3, 0, 0, 5, 2],
];

// Sample movie metadata (content-based features)
const movieMetadata = [
  { id: 1, genre: "Action", year: 2005 },
  { id: 2, genre: "Drama", year: 2010 },
  { id: 3, genre: "Comedy", year: 2007 },
  { id: 4, genre: "Action", year: 2015 },
  { id: 5, genre: "Drama", year: 2008 },
  { id: 6, genre: "Comedy", year: 2012 },
  { id: 7, genre: "Horror", year: 2019 },
  { id: 8, genre: "Thriller", year: 2016 },
  { id: 9, genre: "Science Fiction", year: 2013 },
  { id: 10, genre: "Romance", year: 2017 },
];

// Convert user ratings data to a Matrix
const userItemMatrix = new Matrix(userRatings);

// Perform Singular Value Decomposition (SVD) on the user-item matrix
const svd = new SVD(userItemMatrix, {
  computeLeftSingularVectors: false,
  computeRightSingularVectors: true,
});
svd.compute();

// Extract the right singular vectors (movie embeddings)
const movieEmbeddings = svd.rightSingularVectors;

// Perform Non-Negative Matrix Factorization (NMF) on movie metadata for content-based filtering
const movieFeatures = movieMetadata.map((movie) => [
  movie.genre === "Action" ? 1 : 0,
  movie.genre === "Drama" ? 1 : 0,
  movie.year / 2022,
]);
const movieFeatureMatrix = new Matrix(movieFeatures);
const nmf = new Factorization(movieFeatureMatrix, {
  method: "nmf",
  maxIterations: 100,
});
nmf.compute();

// Get the movie feature matrix
const movieFeatureMatrixNMF = nmf.getFeatures();

// Function to generate movie recommendations for a given user
function generateRecommendations(userId, numRecommendations) {
  // Get the user's ratings
  const userRatings = userItemMatrix.getRow(userId - 1);

  // Calculate the similarity between the user and each movie
  const similarities = [];
  for (let i = 0; i < movieEmbeddings.rows; i++) {
    const movieEmbedding = movieEmbeddings.getRow(i);
    const similarity =
      userRatings.dot(movieEmbedding) /
      (userRatings.norm() * movieEmbedding.norm());
    similarities.push({ movieId: i + 1, similarity });
  }

  // Sort the movies by similarity in descending order
  similarities.sort((a, b) => b.similarity - a.similarity);

  // Get the top recommendations
  const recommendations = similarities.slice(0, numRecommendations);

  return recommendations;
}

// Function to generate content-based recommendations for a given movie
function generateContentBasedRecommendations(movieId, numRecommendations) {
  // Get the movie's features
  const movieFeatures = movieFeatureMatrixNMF.getRow(movieId - 1);

  // Calculate the similarity between the movie and each other movie
  const similarities = [];
  for (let i = 0; i < movieFeatureMatrixNMF.rows; i++) {
    if (i !== movieId - 1) {
      const otherMovieFeatures = movieFeatureMatrixNMF.getRow(i);
      const similarity =
        movieFeatures.dot(otherMovieFeatures) /
        (movieFeatures.norm() * otherMovieFeatures.norm());
      similarities.push({ movieId: i + 1, similarity });
    }
  }

  // Sort the movies by similarity in descending order
  similarities.sort((a, b) => b.similarity - a.similarity);

  // Get the top recommendations
  const recommendations = similarities.slice(0, numRecommendations);

  return recommendations;
}

// Example usage
const userId = 3;
const numRecommendations = 5;
const recommendations = generateRecommendations(userId, numRecommendations);
console.log(
  `Top ${numRecommendations} movie recommendations for User ${userId}:`
);
recommendations.forEach((recommendation, index) => {
  console.log(
    `${index + 1}. Movie ${
      recommendation.movieId
    } (Similarity: ${recommendation.similarity.toFixed(2)})`
  );
});

const movieId = 1;
const contentBasedRecommendations = generateContentBasedRecommendations(
  movieId,
  numRecommendations
);
console.log(
  `Top ${numRecommendations} content-based recommendations for Movie ${movieId}:`
);
contentBasedRecommendations.forEach((recommendation, index) => {
  console.log(
    `${index + 1}. Movie ${
      recommendation.movieId
    } (Similarity: ${recommendation.similarity.toFixed(2)})`
  );
});

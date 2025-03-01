//it is usually a good practice to create a separate file that contains all of your api calls so that you can keep all the networking operations or stuff related to the API in a separate file and find it easily.
//encodeURIComponent() => removes anything from the string that we cannot pass in the URL
const API_KEY = "eb96676b84420817a707ec57b15b11c0";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};

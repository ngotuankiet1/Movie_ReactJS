export const fetcher = (...args) => fetch(...args).then((res) => res.json());
const apiKey = "85de765b59c10fa01bea0a72203cfa6e";
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";
export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetails: (movieID, suffixes = "") =>
    `${tmdbEndpoint}/${movieID}${
      suffixes ? `/${suffixes}` : ""
    }?api_key=${apiKey}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
  getMovieSearch: (query, page) =>
    `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
};

import { useEffect, useState } from "react";
const KEY = "f8f1b15c";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("batman");

  // useEffect(() => {
  //   // fetch is the effect
  //   const controller = new AbortController();
  //   fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {
  //     signal: controller.signal,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => data.Response === "True" && setMovies(data.Search))
  //     .catch((err) => console.log(err));
  //   return () => controller.abort();
  // }, [query]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        if (data.Response === "True") setMovies(data.Search);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
    return () => controller.abort();
  }, [query]);

  return (
    <div>
      <h1>Movies</h1>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.imdbID}>
              <td>{movie.Title}</td>
              <td>{movie.Year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

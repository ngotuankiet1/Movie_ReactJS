import React, { useEffect, useState, lazy, Suspense } from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import MovieCard, { MovieCardSkeleton } from "../movie/MovieCard";
import useDebounce from "../../hooks/useDebouce";
import ReactPaginate from "react-paginate";
import { v4 } from "uuid";

const MoviePage = () => {
  const [filter, setFilter] = useState("");
  const [nextPage, setNextPage] = useState();
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 20;
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));

  const filterDebounce = useDebounce(filter, 500);

  const handleSearch = (e) => {
    setFilter(e.target.value);
  };

  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;

  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", nextPage));
    }
  }, [filterDebounce, nextPage]);

  const movies = data?.results || [];

  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_pages;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };

  return (
    <div className="pb-4">
      <div className="flex mb-4">
        <div className="flex-1">
          <input
            onChange={handleSearch}
            type="text"
            className="w-full p-4 outline-none bg-slate-800 text-white"
            name="search"
            placeholder="Search"
          />
        </div>
        <button className="p-4 text-white bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              strokeLineCap="round"
              strokeLineJoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
      )}

      {loading && (
        <div className="grid grid-cols-4 gap-10">
          {new Array(itemsPerPage).fill(0).map(() => (
            <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
          ))}
        </div>
      )}

      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          movies &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>

      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="paginate"
        />
      </div>
    </div>
  );
};

export default MoviePage;

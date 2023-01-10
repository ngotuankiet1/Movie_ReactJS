import React, { Fragment } from "react";
import Main from "../layout/Main";
import MovieList from "../movie/MovieList";

const HomePage = () => {
  return (
    <Fragment>
      <section className="movies-layout page-container pb-10">
        <h2 className="capitalize text-2xl text-white font-bold">
          Now Playing
          <MovieList type="now_playing"></MovieList>
        </h2>
      </section>
      <section className="movies-layout page-container pb-10">
        <h2 className="capitalize text-2xl text-white font-bold">trending</h2>
        <MovieList type="popular"></MovieList>
      </section>
      <section className="movies-layout page-container pb-10">
        <h2 className="capitalize text-2xl text-white font-bold">top rated</h2>
        <MovieList></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../movie/MovieCard";

const MovieDetailPage = ({ id }) => {
  const { movieId } = useParams();

  const { data } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);
  console.log(
    "🚀 ~ file: MovieDetailPage.js:12 ~ MovieDetailPage ~ data",
    data
  );
  if (!data) return null;
  const { backdrop_path, poster_path, genres, overview, title } = data;

  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          className="object-cover w-full h-full rounded-lg"
          src={tmdbAPI.imageOriginal(poster_path)}
          alt=""
        />
      </div>
      <h1 className="text-white text-center text-3xl mb-10">{title}</h1>
      {genres.length > 0 && (
        <div className="flex items-center justify-center mb-10 gap-10 text-white">
          {genres.map((item) => (
            <span
              className="py-2 px-4 rounded border border-primary text-primary"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center leading-relaxed max-w-[600px] mx-auto text-white mb-10">
        {overview}
      </p>
      <MovieMeta type="credits"></MovieMeta>
      <MovieMeta type="videos"></MovieMeta>
      <MovieMeta type="similar"></MovieMeta>
      {/* <MovieCredits></MovieCredits>
      <MovieVideos></MovieVideos>
      <MovieSimilar></MovieSimilar> */}
    </div>
  );
};

function MovieMeta({ type = "video" }) {
  const { movieId } = useParams();

  const { data } = useSWR(tmdbAPI.getMovieDetails(movieId, type), fetcher);

  if (type === "credits") {
    if (!data) return null;
    const { cast } = data;
    return (
      <div className="py-4">
        <h2 className="text-2xl text-center text-white font-bold mb-4">
          Casts
        </h2>
        <div className="grid grid-cols-4 gap-5">
          {cast &&
            cast.slice(0, 4).map((item) => (
              <div className="cardItem" key={item.id}>
                <img
                  className="w-full h-[350px] object-cover rounded-lg"
                  src={tmdbAPI.imageOriginal(item.profile_path)}
                  alt=""
                />
                <span>{item.name}</span>
              </div>
            ))}
        </div>
      </div>
    );
  } else {
    if (!data) return null;
    const { results } = data;
    if (type === "videos") {
      return (
        <div className="flex flex-col gap-10">
          {results.slice(0, 3).map((item) => (
            <div key={item.id}>
              <h3 className="text-2xl inline-block p-3 bg-primary text-white">
                {item.name}
              </h3>
              <div key={item.id} className="w-full aspect-video">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${item.key}`}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full object-fill"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (type === "similar") {
      return (
        <div className="py-10">
          <h2 className="text-3xl font-medium mb-10">Lorem, ipsum.</h2>
          <div className="movie-list">
            <Swiper
              grabCursor={"true"}
              spaceBetween={40}
              slidesPerView={"auto"}
            >
              {results &&
                results.map((item) => (
                  <SwiperSlide key={item.id}>
                    <MovieCard item={item}></MovieCard>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      );
    }
  }
  return null;
}

function MovieCredits() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieDetails(movieId, "credits"), fetcher);
  if (!data) return null;
  const { cast } = data;
  return (
    <div className="py-4">
      <h2 className="text-2xl text-center text-white font-bold mb-4">Casts</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast &&
          cast.slice(0, 4).map((item) => (
            <div className="cardItem" key={item.id}>
              <img
                className="w-full h-[350px] object-cover rounded-lg"
                src={tmdbAPI.imageOriginal(item.profile_path)}
                alt=""
              />
              <span>{item.name}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

function MovieVideos() {
  const { movieId } = useParams();

  const { data } = useSWR(tmdbAPI.getMovieDetails(movieId, "videos"), fetcher);

  if (!data) return null;
  const { results } = data;
  // if (!data) return null;

  return (
    <div className="flex flex-col gap-10">
      {results.slice(0, 3).map((item) => (
        <div key={item.id}>
          <h3 className="text-2xl inline-block p-3 bg-primary text-white">
            {item.name}
          </h3>
          <div key={item.id} className="w-full aspect-video">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${item.key}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full object-fill"
            ></iframe>
          </div>
        </div>
      ))}
    </div>
  );
}

function MovieSimilar() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieDetails(movieId, "similar"), fetcher);
  if (!data) return null;
  const { results } = data;

  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium mb-10">Lorem, ipsum.</h2>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieDetailPage;

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher } from "../../config";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const Banner = ({ type = "upcoming" }) => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=85de765b59c10fa01bea0a72203cfa6e`,
    fetcher
  );
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (data) {
      setMovies(data.results);
    }
  }, [data]);

  return (
    <section className="banner h-[400px] page-container mb-20 overflow-hidden">
      <Swiper grabCursor="true" slidesPerView={"auto"}>
        {movies &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerSlide item={item}></BannerSlide>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

function BannerSlide({ item }) {
  const { poster_path, title, id } = item;
  const navigate = useNavigate();
  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded">
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          className="w-full h-full object-cover"
          alt=""
        />
        <div className="absolute left-5 bottom-5 w-full text-white">
          <h1 className="font-bold text-3xl mb-5">{title}</h1>
          <div className="flex items-center gap-x-3 mb-8">
            <span className="py-2 px-4 rounded-md border border-white ">
              Action
            </span>
            <span className="py-2 px-4 rounded-md border border-white ">
              Action
            </span>
            <span className="py-2 px-4 rounded-md border border-white ">
              Action
            </span>
          </div>
          <Button onClick={() => navigate(`/movie/${id}`)}> Watch Now</Button>
          {/* <button className="py-3 px-6 rounded-lg text-white font-bold bg-primary">
            Watch Now
          </button> */}
        </div>
      </div>
    </div>
  );
}
export default Banner;

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { tmdbAPI } from "../../config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "../loading/LoadingSkeleton";

const MovieCard = ({ item }) => {
  const { id, poster_path, title, vote_average, release_date } = item;
  const navigate = useNavigate();
  return (
    <div className="movie-item flex flex-col h-full rounded-lg p-3 bg-slate-800 text-white select-none">
      <img
        className="w-full h-[250px] rounded-lg object-cover mb-3"
        src={tmdbAPI.image500(poster_path)}
        alt=""
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-[20px] font-bold capitalize mb-3">{title}</h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span>{release_date}</span>
          <span>{vote_average} ⭐</span>
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)}>watch now</Button>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    poster_path: PropTypes.string,
    title: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
  }),
};

function FallbackComponent() {
  return <p className="text-red-400 bg-red-50">Error !!!</p>;
}

export const MovieCardSkeleton = () => {
  return (
    <div className="movie-item flex flex-col h-full rounded-lg p-3 bg-slate-800 text-white select-none">
      <LoadingSkeleton
        width="100%"
        height="250px"
        radius="8px"
        className="mb-5"
      ></LoadingSkeleton>
      <div className="flex flex-col flex-1">
        <h3 className="text-[20px] font-bold capitalize mb-3">
          <LoadingSkeleton
            width="100%"
            height="20px"
            radius="8px"
            className="mb-5"
          ></LoadingSkeleton>
        </h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span>
            <LoadingSkeleton
              width="50px"
              height="10px"
              radius="8px"
              className="mb-5"
            ></LoadingSkeleton>
          </span>
          <span>
            <LoadingSkeleton
              width="30px"
              height="10px"
              radius="8px"
              className="mb-5"
            ></LoadingSkeleton>
          </span>
        </div>
        <LoadingSkeleton
          width="50px"
          height="10px"
          radius="8px"
          className="mb-5"
        ></LoadingSkeleton>
        <Button>
          <LoadingSkeleton
            width="100%"
            height="40px"
            radius="8px"
            className="mb-5"
          ></LoadingSkeleton>
        </Button>
      </div>
    </div>
  );
};

export default withErrorBoundary(MovieCard, {
  FallbackComponent,
});

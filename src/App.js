import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import Main from "./component/layout/Main";
// import HomePage from "./component/page/HomePage";
// import Banner from "./component/banner/Banner";
import MoviePageV2 from "./component/page/MoviePageV2";
import MovieDetailPage from "./component/page/MovieDetailPage";

const HomePage = lazy(() => import("./component/page/HomePage"));
const Banner = lazy(() => import("./component/banner/Banner"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route path="/movie" element={<MoviePageV2></MoviePageV2>}></Route>
            <Route
              path="/movie/:movieId"
              element={<MovieDetailPage></MovieDetailPage>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;

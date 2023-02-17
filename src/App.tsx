import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import MovieInfo from "./pages/MovieInfo";
import Trending from "./pages/Trending";
import Tv from "./pages/Tv";
import TvImages from "./pages/TvImages";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieInfo />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/tv" element={<Tv />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

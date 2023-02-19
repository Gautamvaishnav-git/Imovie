import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FourOFour from "./pages/FourOFour";
import Home from "./pages/Home";
import MovieInfo from "./pages/MovieInfo";
import Trending from "./pages/Trending";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieInfo />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="*" element={<FourOFour />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

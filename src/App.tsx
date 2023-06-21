import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RecommendationPage from "./pages/RecommendationPage";
import TopItemsPage from "./pages/TopItemsPage";
import TestViewWithButtons from "./pages/TestViewWithButtons";
import Layout from "./pages/Layout";
import HowItWorks from "./pages/playlist/HowItWorks";
import PlaylistError from "./pages/playlist/PlaylistError";
import SelectArtists from "./pages/playlist/SelectArtists";
import MakeIntervalPlaylist from "./pages/playlist/MakeIntervalPlaylist";
import SelectTracks from "./pages/playlist/SelectTracks";
import SelectGenres from "./pages/playlist/SelectGenres";
import SelectDuration from "./pages/playlist/SelectDuration";
import PlaylistSuccess from "./pages/playlist/PlaylistSuccess";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>{process.env.REACT_APP_AUTH_ENDPOINT} + hit</p>
      </header> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="recommendations" element={<RecommendationPage />} />
            <Route path="interval_playlist" element={<MakeIntervalPlaylist />}>
              <Route index element={<HowItWorks />} />
              <Route path="select_artists" element={<SelectArtists />} />
              <Route path="select_tracks" element={<SelectTracks />} />
              <Route path="select_genres" element={<SelectGenres />} />
              <Route path="select_duration" element={<SelectDuration />} />
              <Route path="success" element={<PlaylistSuccess />} />
            </Route>
            <Route path="top_items" element={<TopItemsPage />} />
            <Route path="test" element={<TestViewWithButtons />} />
            <Route path="callback" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

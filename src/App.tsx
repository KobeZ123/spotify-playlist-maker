import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RecommendationPage from './pages/RecommendationPage';
import TopItemsPage from './pages/TopItemsPage';
import TestViewWithButtons from './pages/TestViewWithButtons';

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
        <Route path="/" element={<Home />}>
          <Route path="recommendations" element={<RecommendationPage />} />
          <Route path="top_items" element={<TopItemsPage />} />
          <Route path="test" element={<TestViewWithButtons />} />
          <Route path="*" element={<RecommendationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

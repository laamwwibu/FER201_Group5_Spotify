import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import Header from './components/Header';
import AlbumDetail from './components/Albums/AlbumDetail';
import AllAlbumByGenre from './components/Albums/AllAlbumByGenre';
import AllArtist from './components/Artists/AllArtist';
import ArtistDetail from './components/Artists/ArtistDetail';
import HomePage from './components/Home/HomePage';

function App() {
  <>
  <Routes>
    <Route path="/" element={<HomePage/>} />
    <Route path="/h1" element={<AlbumDetail />} /> 
  </Routes>
  </>
}

export default App;

import './App.css';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import AlbumDetail from './components/Albums/AlbumDetail';
import AllAlbumByGenre from './components/Albums/AllAlbumByGenre';
import AllArtist from './components/Artists/AllArtist';
import ArtistDetail from './components/Artists/ArtistDetail';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            {/* Nested routes inside AppLayout */}
            <Route index element={<Home />} />
            <Route path="/album/:albumId" element={<AlbumDetail />} />
            <Route path="/genres/:genreName" element={<AllAlbumByGenre />} />
            <Route path="/artists/" element={<AllArtist />} />
            <Route path="/artist/:artistId" element={<ArtistDetail />} />
            {/* Add more nested routes as needed */}
          </Route>
          {/* Route adminPage here */}
          {/* <Route path='/admin' element={<AdminScreen />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


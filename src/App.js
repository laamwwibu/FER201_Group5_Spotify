import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import AlbumDetail from './components/Albums/AlbumDetail';
import AllAlbumByGenre from './components/Albums/AllAlbumByGenre';
import AllArtist from './components/Artists/AllArtist';
import ArtistDetail from './components/Artists/ArtistDetail';
import Home from './components/Home/Home';
import HomeAdmin from './components/Home/HomeAdmin';
import TableAlbum from './components/Tables/TableAlbum';
import TableSong from './components/Tables/TableSong';
import TableUser from './components/Tables/TableUser';
import Search from './components/Search/Search';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="/album/:albumId" element={<AlbumDetail />} />
            <Route path="/genres/:genreName" element={<AllAlbumByGenre />} />
            <Route path="/artists/" element={<AllArtist />} />
            <Route path="/artist/:artistId" element={<ArtistDetail />} />
            <Route path="/search" element={<Search />} />
          </Route>
          <Route path='/admin' element={<HomeAdmin />}>
            <Route index element={<TableAlbum />} />
            <Route path="/admin/albums" element={<TableAlbum />} />
            <Route path="/admin/songs" element={<TableSong />} />
            <Route path="/admin/users" element={<TableUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


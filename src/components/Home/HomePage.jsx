import '../../App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../Navbar';
import Home from './Home';
import Header from '../Header';
import AlbumDetail from '../Albums/AlbumDetail';
import AllAlbumByGenre from '../Albums/AllAlbumByGenre';
import ArtistDetail from '../Artists/ArtistDetail';
import AllArtist from '../Artists/AllArtist';
import Search from '../Search/Search';


function HomePage() {
  return (
    <div className="App">
      <div className="container-fluid p-3">
        <div className="row">
          {/* Navbar */}
          <div className="col-lg-3 col-md-3 page-navbar px-0">
            <div className="container-fluid navbar-container px-0">
              <Navbar></Navbar>
            </div>
          </div>
          {/* Page Content */}
          <div className="col-lg-9 col-md-9 page-content pe-0">
            <div className="container-fluid page-content-container">
              <Header></Header>
              <div className="content-wrapper">
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path="/genres/:genreName" element={<AllAlbumByGenre />} />
                  <Route path="/artists/" element={<AllArtist />} />
                  <Route path="/artist/:artistId" element={<ArtistDetail />} />
                  <Route path="/search" element={<Search />}></Route>
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import Header from './components/Header';
import AlbumDetail from './components/Albums/AlbumDetail';
import AllAlbumByGenre from './components/Albums/AllAlbumByGenre';
import AllArtist from './components/Artists/AllArtist';
import ArtistDetail from './components/Artists/ArtistDetail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
                      <Route path="/" element={<Home />} />
                      <Route path="/album/:albumId" element={<AlbumDetail />} />
                      <Route path="/genres/:genreName" element={<AllAlbumByGenre />} />
                      <Route path="/artists/" element={<AllArtist />} />
                      <Route path="/artist/:artistId" element={<ArtistDetail />} />
                      {/* <Route path="/post" element={<Search />}></Route> */}
                    </Routes>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

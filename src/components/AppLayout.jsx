import Navbar from './Navbar';
import Header from './Header';
import Home from './Home/Home';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {

    return (
        <div className="container-fluid p-3" style={{ height: '100vh', overflowY: 'hidden' }}>
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
                        <div className="content-wrapper" style={{ height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
                            <Outlet></Outlet>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppLayout;

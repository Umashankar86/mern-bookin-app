import { Routes, Route, Navigate, } from 'react-router-dom';
import Layout from './layout/layout';
import Register from './pages/register';
import SignIN from './pages/sign';
import AddHotel from './pages/AddHotel';
import { useAppContext } from './context/AppContext';
import MyHotels from './pages/myHotels';
import EditHotel from './pages/EditHotel';
import Search from "./pages/Search"
import Detail from './pages/detail';
import Booking from './pages/booking';
import MyBookings from './pages/MyBookings';
import Home from './pages/Home';
const App = () => {
    const { isLoggedIn } = useAppContext();

    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout><Home/></Layout>} />
                <Route path="/register" element={<Layout><Register /></Layout>} />
                <Route path="/sign-in" element={<Layout><SignIN /></Layout>} />
                <Route path="/search" element={<Layout><Search/></Layout>} />
                <Route path="/detail/:hotelId" element={<Layout><Detail/></Layout>} />

                {isLoggedIn && (<>
                    <Route path="/hotel/:hotelId/booking" element={<Layout><Booking/></Layout> } />
                    <Route path="/add-hotel" element={<Layout><AddHotel /></Layout> } />
                    <Route path="/my-hotels" element={<Layout><MyHotels/></Layout> }/>                    
                    <Route path="/my-bookings" element={<Layout><MyBookings/></Layout> }/>
                    <Route path="/edit-hotel/:hotelId" element={<Layout><EditHotel/></Layout> }/></>
                )}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};

export default App;

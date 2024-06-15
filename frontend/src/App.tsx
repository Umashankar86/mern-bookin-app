import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/layout';
import Register from './pages/register';
import SignIN from './pages/sign';
import AddHotel from './pages/AddHotel';
import { useAppContext } from './context/AppContext';

const App = () => {
    const { isLoggedIn } = useAppContext();

        return (
            <div>
                <Routes>
                    <Route path="/" element={<Layout><p>home page</p></Layout>} />
                    <Route path="/register" element={<Layout><Register /></Layout>} />
                    <Route path="/sign-in" element={<Layout><SignIN/></Layout>} />
                    {isLoggedIn && (
                        <Route path="/add-hotel" element={<Layout><AddHotel /></Layout>} />
                    )}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        );
    };
    
    export default App;
    

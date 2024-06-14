import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/layout';
import Register from './pages/register';
import  SignIN  from './pages/sign';
const App = () => {
    return (
        <div>
             <Routes>
                <Route path="/" element={<Layout><p>home page</p></Layout>} />
                <Route path="/register" element={<Layout><Register></Register></Layout>} />
                <Route path="/sign-in" element={<Layout><SignIN></SignIN></Layout>} />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};

export default App;

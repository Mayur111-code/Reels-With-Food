// import React from 'react'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import UserRegister from '../pages/auth/UserRegister';
// import ChooseRegister from '../pages/auth/ChooseRegister';
// import UserLogin from '../pages/auth/UserLogin';
// import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister';
// import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin';
// import Home from '../pages/general/Home';
// import Saved from '../pages/general/Saved';
// import BottomNav from '../components/NavBar';
// import CreateFood from '../pages/food-partner/CreateFood';
// import Profile from '../pages/food-partner/Profile';
// import ProtectedRoute from './ProtectedRoute';

// const AppRoutes = () => {
//     return (
//         <Router>
//             <Routes>

//                 {/* Public Routes */}
//                 <Route path="/register" element={<ChooseRegister />} />
//                 <Route path="/user/register" element={<UserRegister />} />
//                 <Route path="/user/login" element={<UserLogin />} />
//                 <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
//                 <Route path="/food-partner/login" element={<FoodPartnerLogin />} />

//                 {/* Protected Routes */}
//                 <Route
//                     path="/"
//                     element={
//                         <ProtectedRoute>
//                             <><Home /><BottomNav /></>
//                         </ProtectedRoute>
//                     }
//                 />

//                 <Route
//                     path="/saved"
//                     element={
//                         <ProtectedRoute>
//                             <><Saved /><BottomNav /></>
//                         </ProtectedRoute>
//                     }
//                 />

//                 <Route
//                     path="/create-food"
//                     element={
//                         <ProtectedRoute>
//                             <CreateFood />
//                         </ProtectedRoute>
//                     }
//                 />

//                 <Route
//                     path="/food-partner/:id"
//                     element={
//                         <ProtectedRoute>
//                             <Profile />
//                         </ProtectedRoute>
//                     }
//                 />

//             </Routes>
//         </Router>
//     )
// }

// export default AppRoutes;



import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegister from '../pages/auth/UserRegister';
import ChooseRegister from '../pages/auth/ChooseRegister';
import UserLogin from '../pages/auth/UserLogin';
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin';
import Home from '../pages/general/Home';
import Saved from '../pages/general/Saved';
import CreateFood from '../pages/food-partner/CreateFood';
import Profile from '../pages/food-partner/Profile';
import ProtectedRoute from './ProtectedRoute';

import NavBar from '../components/NavBar';

const AppRoutes = () => {
    return (
        <Router>
            {/* Global Navbar */}
            <NavBar />

            <Routes>

                {/* Public Routes */}
                <Route path="/register" element={<ChooseRegister />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
                <Route path="/food-partner/login" element={<FoodPartnerLogin />} />

                {/* Protected Routes */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/saved"
                    element={
                        <ProtectedRoute>
                            <Saved />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/create-food"
                    element={
                        <ProtectedRoute>
                            <CreateFood />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/food-partner/:id"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </Router>
    );
};

export default AppRoutes;

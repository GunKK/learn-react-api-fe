import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import DefaultLayout from './layouts/DefaultLayout';
import AdminLayout from './layouts/AdminLayout';
import AccountLayout from './layouts/AccountLayout';

import Home from './pages/Home';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import Search from './pages/Search';

import Profile from './pages/Account/Profile';

import ProtectedRoute from './components/ProtectedRoute';
import AddBook from './pages/Admin/Product/AddBook';
import UpdateBook from './pages/Admin/Product/UpdateBook';
import BookList from './pages/Admin/Product/BookList';

import CustomerList from './pages/Admin/User/CustomerList';
import StaffList from './pages/Admin/User/StaffList';

import AccessDenied from './pages/AccessDenied';
import NotFound from './pages/NotFound';

import authApi from './api/authApi';

import { login, logout } from './redux/actions/auth';

import { roleEnum } from './layouts/components/SideBar/routes';

function App() {
    const currentUser = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    useEffect(() => {
        console.log(currentUser);
        const fetchData = async () => {
            try {
                const data = await authApi.me();
                const { email, fullName, avatar, id, role } = data?.user;
                dispatch(login({ email, fullName, avatar, userId: id, role }));
            } catch (error) {
                if (error.response.status === 403 || error.response.status === 401) {
                    localStorage.removeItem('accessToken');
                    dispatch(logout());
                }
            }
        };

        const token = localStorage.getItem('accessToken');
        if (token && !currentUser.userId) {
            fetchData();
        }

    }, [dispatch, currentUser]);

    return (
        <div className="App">
            <ToastContainer />
            <Routes>
                {/* route guess */}
                <Route path="/" element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/dang-ki" element={<Register />} />
                    <Route path="/dang-nhap" element={<Login />} />
                    
                    <Route path="/san-pham" element={<Product />} />
                    <Route path="/chi-tiet-san-pham/:slug" element={<ProductDetail />} />
                    <Route path="/tim-kiem" element={<Search />} />
                </Route>

                {/* route customer */}
                { console.log(currentUser)}
                {currentUser && currentUser.role !== -1 && (
                    <Route path="/" element={<ProtectedRoute isAllowed={currentUser.role === roleEnum.Customer} />}>
                        <Route element={<DefaultLayout />}>
                            <Route element={<AccountLayout />}>
                                <Route path="tai-khoan" element={<Profile />} />
                            </Route>
                        </Route>
                    </Route>
                )}

                {currentUser && currentUser.role !== -1 && (
                    <Route path="/admin" element={<ProtectedRoute isAllowed={currentUser.role <= roleEnum.Employee} />}>
                        <Route element={<AdminLayout />}>
                            <Route path="book" element={<BookList />} />
                            <Route path="book/add" element={<AddBook />} />
                            <Route path="book/update/:id" element={<UpdateBook />} />
                            <Route path="customer" element={<CustomerList />} />


                        </Route>
                    </Route>
                )}

                {currentUser && currentUser.role !== -1 && (
                    <Route path="/admin" element={<ProtectedRoute isAllowed={currentUser.role === roleEnum.Admin} />}>
                        <Route element={<AdminLayout />}>
                            <Route path="staff" element={<StaffList />} />
                        </Route>
                    </Route>
                )}

                {currentUser.role === -1 && (
                    <>
                        <Route path="/admin/*" element={<AccessDenied />} />
                        <Route path="/don-hang" element={<AccessDenied />} />
                        <Route path="/tai-khoan" element={<AccessDenied />} />
                        <Route path="/dia-chi" element={<AccessDenied />} />
                    </>
                )}

                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;

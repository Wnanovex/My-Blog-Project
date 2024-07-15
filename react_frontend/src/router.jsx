import {Navigate ,createBrowserRouter} from 'react-router-dom';
import Signup from './pages/auth/Signup';
import DefaultLayout from './layout/DefaultLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Blog from './pages/blog/blogIndex';
import GuestLayout from './layout/GuestLayout';
import BlogCreate from './pages/blog/blogCreate';
import BlogShow from './pages/blog/blogShow';
import BlogEdit from './pages/blog/blogEdit';


const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/dashboard' />
            },
            {
                path: '/dashboard',
                element:  <Dashboard />
            },
            {
                path: '/blog',
                element:  <Blog />
            },
            {
                path: '/blog/create',
                element:  <BlogCreate />
            },
            {
                path: '/blog/:slug',
                element:  <BlogShow />
            },
            {
                path: '/blog/:slug/edit',
                element:  <BlogEdit />
            },
            {
                path: '/',
                element: <GuestLayout />,
                children: [
                    {
                        path: '/signup',
                        element:  <Signup />
                    },
                    {
                        path: '/login',
                        element:  <Login />
                    },
                ]
            },
        ]
    },
    {
        path: '*',
        element: <h1>404 - Not Found</h1>
    }
])

export default router;
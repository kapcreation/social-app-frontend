import { useContext, useEffect } from 'react';
import './App.scss';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { createBrowserRouter, RouterProvider, Route, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Leftbar from './components/Leftbar/Leftbar';
import Rightbar from './components/Rightbar/Rightbar';
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/authContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Modal from './components/Modal/Modal';

function App() {
  const queryClient = new QueryClient()

  const { currentUser } = useContext(AuthContext)

  const { darkMode } = useContext(DarkModeContext)

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <div style={{ display: 'flex' }}>
          <Leftbar />
          <div style={{ flex: '6' }}>
            <Outlet />
          </div>
          <Rightbar />
        </div>
      </QueryClientProvider>
    )
  }

  const ProtectedRoute = ({ children }) => {
    if(!currentUser) return <Navigate to='/login' />

    return children
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/profile/:userId',
          element: <Profile />
        },
      ]
    },
    {
      path: '/login',
      element: !currentUser ? <Login /> : <Navigate to='/' />,
    },
    {
      path: '/register',
      element: !currentUser ? <Register /> : <Navigate to='/' />,
    },
  ])

  return (
    <div className={`app ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <RouterProvider router={router} />
      <Modal />
    </div>
  );
}

export default App;

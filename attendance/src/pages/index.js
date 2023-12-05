import {useEffect} from 'react';
import {
  QueryClientProvider,QueryClient
} from '@tanstack/react-query'
import { Inter } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import HomePage from './home-page.js';
import RegisterPage from "./RegisterPage";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.min.js');
  }, []);
  const publicPages = [
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ];
  const queryClient = new QueryClient()

  // const authPages = [
  //   {
  //     path: `${RoutePath.Login}`,
  //     element: <LoginPage />,
  //   },
  // ];

  // const { isLoggedIn, authData } = useAuth();
  return (
    <main className={inter.className}>
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>

    </main>
  )
}

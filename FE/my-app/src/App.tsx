// App.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navbar } from './_components/NavBar';
import { PrivateRoute } from './_components/PrivateRoute';
import { Login } from './login/Login';
import { AddAdminFunction } from './adminFunction/AddAdminFunction';
import { ReadAdminFunction } from './adminFunction/ReadAdminFunction';

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <PrivateRoute><AddAdminFunction /></PrivateRoute> },
    { path: "/read", element: <PrivateRoute><ReadAdminFunction /></PrivateRoute> },
    { path: "/login", element: <Login /> },
  ]);

  return (
    <div className="App">
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

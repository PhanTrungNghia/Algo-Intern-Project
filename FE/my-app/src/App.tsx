// App.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navbar } from './Utils/NavBar';
import { AddAdminFunction } from './_components/adminFunction/AddAdminFunction';
import { ReadAdminFunction } from './_components/adminFunction/ReadAdminFunction';
import { PrivateRoute } from './_components/PrivateRoute';
import { Login } from './login/Login';

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

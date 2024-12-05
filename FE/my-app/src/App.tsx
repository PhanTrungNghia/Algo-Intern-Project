import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { Navbar } from './Utils/NavBar';
import { AddAdminFunction } from './components/adminFunction/AddAdminFunction';
import { ReadAdminFunction } from './components/adminFunction/ReadAdminFunction';

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <AddAdminFunction/> },
    { path: "/read", element: <ReadAdminFunction/> },
    // { path: "/edit/:id", element: <UpdateEmployee/> },
  ])
  return (
    <div className="App">
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

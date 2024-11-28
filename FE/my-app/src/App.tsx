import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { AddEmployee } from './components/AddEmployee';
import { ReadEmployee } from './components/ReadEmployees';
import { Navbar } from './components/NavBar';

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <AddEmployee/> },
    { path: "/read", element: <ReadEmployee/> },
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

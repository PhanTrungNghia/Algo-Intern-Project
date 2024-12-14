// App.tsx
import { Navbar } from './_components/NavBar';
import AppHeader from './_components/AppHeader/AppHeader';
import SideMenu from './_components/SideMenu/SideMenu';
import PageContent from './_components/PageContent/PageContent';
import AppFooter from './_components/AppFooter/AppFooter';
import './App.css';
import DataTable from './DataTable/DataTable';

function App() {
  return (
    <div className="App">
      <Navbar />
      <AppHeader/>
      <div className='SideMenuAndPageContent'>
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </div>
      <AppFooter />
    </div>
  );
}

export default App;

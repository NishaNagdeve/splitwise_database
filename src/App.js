import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import Search from './Pages/Search';
import People from './Pages/People';
import Footer from './Components/Footer';
import Account from './Pages/Account';
import Welcome from './Pages/Welcome';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        {/* <Header/> */}
         <Routes>
          <Route path='/' to element={<Welcome/>}></Route>
          <Route path='/home' to element={<Home/>}></Route>
          <Route path='/search' to element={<Search/>}></Route>
          <Route path='/people' to element={<People/>}></Route>
          <Route path='/account' to element={<Account/>}></Route>
         </Routes>
         {/*  <Footer/> */}
        </BrowserRouter>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/pages/Home';
import AddEdit from './components/pages/AddEdit';
import View from './components/pages/View';
import Header from './components/Header';  

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='min-h-screen' style={{ backgroundImage: 'linear-gradient(115deg,#9F7AEA,#FEE2FE' }}>
          <Header />
          <ToastContainer  position='top-center'/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/add' element={<AddEdit />} />
            <Route path='/update/:id' element={<AddEdit />} />
            <Route path='/view/:id' element={<View />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

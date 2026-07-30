import { Route, Routes } from 'react-router-dom';
import './App.css';
import BookService from './pages/BookService/BookService';
import Home from './pages/Home';
const App=()=>{
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/book-service' element={<BookService />} />
    </Routes>
  );
}

export default App

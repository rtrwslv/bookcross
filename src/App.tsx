import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  { Showcase }  from "./Pages/Showcase/Showcase";
import { Book } from './Pages/Book/Book';
import { Offer } from './Pages/Offer/Offer';
import { Storage } from './Pages/Storage/Storage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="showcase" element={<Showcase />} />
        <Route path="book" element={<Book />} />
        <Route path='offer' element={<Offer />} />
        <Route path="storage" element={<Storage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
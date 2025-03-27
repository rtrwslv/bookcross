import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Showcase } from "./Pages/Showcase/Showcase";
import { Book } from './Pages/Book/Book';
import { Offer } from './Pages/Offer/Offer';
import { Storage } from './Pages/Storage/Storage';
import { Auth } from './Pages/Auth/Auth';
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/showcase" replace />} />
          <Route path="showcase" element={<Showcase />} />
          <Route path="book/:id" element={<Book />} />
          <Route path="offer" element={<Offer />} />
          <Route path="storage" element={<Storage />} />
          <Route path="auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;

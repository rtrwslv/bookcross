import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  { Showcase }  from "./Components/Pages/Showcase/Showcase";
import { Book } from './Components/Pages/Showcase/Book/Book';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="showcase" element={<Showcase />} />
        <Route path="book" element={<Book />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
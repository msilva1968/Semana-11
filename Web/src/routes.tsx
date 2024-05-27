import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Livro from './pages/Livro';
import NotFound from './pages/NotFound';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route index element={<Inicio />} />
        <Route path="livro/:id" element={<Livro />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
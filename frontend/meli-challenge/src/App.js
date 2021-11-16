import { Route, Routes } from 'react-router-dom';
import Search from "./pages/Search/Search";
import Product from "./pages/Product/Product";
import Main from "./pages/Main/Main";
import { BrowserRouter } from 'react-router-dom';

function App() {

  // Se definen las rutas para los distintas vistas de la aplicacion 
  // (Main, Resultados de la busqueda y detalle de producto)
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/items" element={<Search />} />
        <Route exact path="/items/:id" element={<Product />} />
      </Routes >
    </BrowserRouter>
  );
}

export default App;

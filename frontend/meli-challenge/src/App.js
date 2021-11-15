import { Route, Routes } from 'react-router-dom';
import Search from "./pages/Search/Search";
import Product from "./pages/Product/Product";
import Main from "./pages/Main/Main";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/items" element={<Search />} />
        <Route exact path="/items/:id" element={<Product />} />
      </Routes >
    </>
  );
}

export default App;

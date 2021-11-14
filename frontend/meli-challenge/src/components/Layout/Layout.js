import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from 'react-router-dom';
import './Layout.sass';

function Layout({ children, className }){
  const navigate = useNavigate();

  const handleSearch = (searchValue) => {
    navigate(`/items?search=${searchValue}`);
  }

  return (
    <>
      <header>
        <SearchBar handleSearch={handleSearch} />
      </header>
      <main className={className}>{children}</main>
    </>
  );
};

export default Layout;

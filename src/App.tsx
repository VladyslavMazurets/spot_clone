import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Context } from './context';
import Section from './components/const/Section';
import Sidebar from './components/Sidebar';
import Music from './components/Music';
import { Stack } from 'react-bootstrap';
import Search from './components/Search';
import Library from './components/Library';

function App() {

  const [token, setToken] = React.useState<string>("");

  return (
    <Context.Provider value={{ token, setToken }}>
        <Routes>
          <Route path='/' element={<Sidebar />}>
            <Route index element={<Music />} />
            <Route path='section/:id' element={<Section />} />
            <Route path='search' element={<Search />} />
            <Route path='library' element={<Library />} />
          </Route>
        </Routes>
    </Context.Provider>
  )
}

export default App;

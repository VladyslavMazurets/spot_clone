import React from 'react';
import { Context } from './context';
import Feed from './components/Feed';

function App() {

const [token, setToken] = React.useState<string>("");

  return (
    <Context.Provider value={{ token, setToken }}>
     <Feed />
    </Context.Provider>
  )
}

export default App;

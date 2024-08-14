import React from 'react';
import Main from './Components/Main';
import { Route, Routes } from 'react-router-dom';
import Signin from './Components/Signin';
import MovieDetail from './Components/MovieDetail';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/signin' element={<Signin />}/>
        <Route path='/movieDetail' element={<MovieDetail />}/>
      </Routes>      
    </div>
  )
}

export default App
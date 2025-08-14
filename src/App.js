import Body from './Components/body';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/search' element={<Body/>}/>
   </Routes>
   </BrowserRouter>
  
  );
}

export default App;

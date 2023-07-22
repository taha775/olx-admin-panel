import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Link,Routes } from 'react-router-dom';

import './props.css'
import Sider from './Components/Sider';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Allproduct from './Components/Allproduct';
import AddCategory from './Components/AddCategory';
import ProductView from './Components/Productview';

function App() {
  return (
<>



<div className='App'>
    <ToastContainer />
    <Sider/>
      <Routes>
 
      <Route path="/" element={<Allproduct/>}></Route>
      <Route path="/add_category" element={<AddCategory/>}></Route>
      <Route path="/update/:id" element={<AddCategory/>}></Route>
      <Route path="/productview/:id" element={<ProductView/>}></Route>
   
      </Routes>
    
    </div>


</>
  );
}

export default App;

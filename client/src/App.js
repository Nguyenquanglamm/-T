import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ProductsDetails from './components/ProductDetails';
import Products from './components/Products';
import Categorys from './components/Categorys';
import CreateProductDetai from './components/CreateProductDetai';
import Khuyenmais from './components/khuyenmai';
import Cart from './components/Carts/Cart';
import BaoHanh from './components/Baohanh';
import Login from './components/login/Login';
import Register from './components/login/Register';
import Guarantee from './components/Guarantees';


function App() {
  return (
    // <div className="App">
    //   <Products></Products>
    // </div>
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/product" element={<Products></Products>}></Route>
      <Route path="/category" element={<Categorys></Categorys>}></Route>
      <Route path="/product/:productId" element={<ProductsDetails></ProductsDetails>}></Route>
      <Route path="/productDetails" element={<CreateProductDetai></CreateProductDetai>}></Route>
      <Route path="/khuyenmai" element={<Khuyenmais></Khuyenmais>}></Route>
      <Route path="/guarantee" element={<Guarantee></Guarantee>}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/baohanh" element={<BaoHanh />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>

  );
}

export default App;

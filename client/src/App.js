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
import Base from './components/Base';
import BaseAdmin from './components/Admin/BaseAdmin';
import Orderlist from './components/Admin/Orderlist';
import ProductAdmin from './components/Admin/ProductAdmin';
import HomeAdmin from './components/Admin/HomeAdmin';
import Warehouse from './components/Admin/Warehouse';
import Statistics from './components/Statistics';
import WarehouseDetail from './components/Admin/WarehouseDetail';
import UpdateProductAdmin from './components/Admin/UpdateProductAdmin';
import UpdateProductDetailsAdmin from './components/Admin/UpdateProductDetailsAdmin';
import Supplier from './components/Supplier';
import Ordersuccess from './components/Ordersuccess';


function App() {
  return (
    // <div className="App">
    //   <Products></Products>
    // </div>
    <Routes>
      
      <Route path="/admin" element={<BaseAdmin/>}>  
        <Route path="/admin" element={<HomeAdmin />}></Route>
        <Route path="category" element={<Categorys></Categorys>}></Route>
        <Route path="product" element={<ProductAdmin></ProductAdmin>}></Route>
        <Route path="guarantee" element={<Guarantee></Guarantee>}></Route>
        <Route path="khuyenmai" element={<Khuyenmais></Khuyenmais>}></Route>
        <Route path="baohanh" element={<BaoHanh></BaoHanh>}></Route>
        <Route path="productDetails" element={<CreateProductDetai></CreateProductDetai>}></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>    
        <Route path="orderlist" element={<Orderlist></Orderlist>}></Route>
        <Route path="warehouse" element={<Warehouse></Warehouse>}></Route>
        <Route path="statistics" element={<Statistics></Statistics>}></Route>
        <Route path="supplier" element={<Supplier></Supplier>}></Route>
        <Route path="updateproductadmin/:idSanPham" element={<UpdateProductAdmin></UpdateProductAdmin>}></Route>
        <Route path="updateproductdetailsadmin/:idSanPham" element={<UpdateProductDetailsAdmin></UpdateProductDetailsAdmin>}></Route>
        <Route path="warehousedetail/:idSanPham" element={<WarehouseDetail></WarehouseDetail>}></Route>
      </Route>

      <Route path="/" element={<Base/>}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/baohanh" element={<BaoHanh></BaoHanh>}></Route>
        <Route path="/product/:productId" element={<ProductsDetails></ProductsDetails>}></Route>
        <Route path="/product" element={<Products></Products>}></Route>
        <Route path="/productDetails" element={<CreateProductDetai></CreateProductDetai>}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/ordersuccess" element={<Ordersuccess></Ordersuccess>}></Route>

      </Route>

    </Routes>

  );
}

export default App;

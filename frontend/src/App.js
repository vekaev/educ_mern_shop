import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import {
  CartScreen,
  HomeScreen,
  LoginScreen,
  OrderScreen,
  OrderListScreen,
  PaymentScreen,
  PlaceOrderScreen,
  ProductScreen,
  ProfileScreen,
  RegisterScreen,
  ShippingScreen,
  UserEditScreen,
  UserListScreen,
  ProductListScreen,
  ProductEditScreen,
} from "./screens";
import { useSelector } from "react-redux";

const App = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container fluid="lg">
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          {userInfo && userInfo.isAdmin && (
            <>
              <Route path="/admin/usersList" component={UserListScreen} />
              <Route path="/admin/orderlist" component={OrderListScreen} />
              <Route path="/admin/user/:id/edit" component={UserEditScreen} />
              <Route
                path="/admin/product/:id/edit"
                component={ProductEditScreen}
              />
              <Route
                path="/admin/productlist"
                component={ProductListScreen}
                exact
              />
              <Route
                path="/admin/productlist/:pageNumber"
                component={ProductListScreen}
                exact
              />
            </>
          )}
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
            exact
          />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

import Header from './components/Header'
import Footer from './components/Footer'
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Container} from 'react-bootstrap'
import {
  HomeScreen,
  ProductScreen,
  CartScreen,
  LoginScreen,
  RegisterScreen,
  ProfileScreen,
  ShippingScreen,
  PaymentScreen,
  PlaceOrderScreen,
  OrderScreen, UserListScreen, UserEditScreen
} from "./screens";
import {useSelector} from "react-redux";

const App = () => {
  const {userInfo} = useSelector(state => state.userLogin )
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <Container fluid="lg">
          <Route path="/login" component={LoginScreen}/>
          <Route path="/register" component={RegisterScreen}/>
          <Route path="/payment" component={PaymentScreen}/>
          <Route path="/placeorder" component={PlaceOrderScreen}/>
          <Route path="/order/:id" component={OrderScreen}/>
          <Route path="/profile" component={ProfileScreen}/>
          <Route path="/shipping" component={ShippingScreen}/>
          <Route path="/product/:id" component={ProductScreen}/>
          <Route path="/cart/:id?" component={CartScreen}/>
          {userInfo && userInfo.isAdmin && (
            <>
              <Route path="/admin/usersList" component={UserListScreen}/>
              <Route path="/admin/user/:id/edit" component={UserEditScreen}/>
            </>
          )}
          <Route path="/" component={HomeScreen} exact/>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;

import Header from './components/Header'
import Footer from './components/Footer'
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Container} from 'react-bootstrap'
import { HomeScreen, ProductScreen, CartScreen, LoginScreen, RegisterScreen} from "./screens";

const App = () => {
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <Container fluid="lg">
          <Route path="/login" component={LoginScreen}/>
          <Route path="/register" component={RegisterScreen}/>
          <Route path="/product/:id" component={ProductScreen}/>
          <Route path="/cart/:id?" component={CartScreen}/>
          <Route path="/" component={HomeScreen} exact/>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;

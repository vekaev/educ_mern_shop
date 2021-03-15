import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../store/actions/product.action";
import {Col, Row, ListGroup, Image, Form, Button, Card} from "react-bootstrap";
import Message from '../components/Message'
import {addToCart} from "../store/actions/cart.action";

const CartScreen = ({match, location, history}) => {
  const productId = match.params.id

  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart)
  const {} = cartItems

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return <div>Cart</div>;
};

export default CartScreen;

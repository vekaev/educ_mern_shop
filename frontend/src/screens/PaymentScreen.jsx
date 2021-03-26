import {useState} from "react";
import {Button, Col, Form} from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/FormContainer";
import {savePaymentMethod} from "../store/actions/cart.action";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = ({history}) => {
  const {shippingAddress, paymentMethod: paymentMethodFromStorage} = useSelector(state => state.cart)

  const [paymentMethod, setPaymentMethod] = useState(paymentMethodFromStorage)

  const dispatch = useDispatch();

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3/>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>
            Select Method
          </Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              defaultChecked={paymentMethod === 'PayPal'}
              value='PayPal'
              onChange={e => setPaymentMethod(e.target.value)}/>
            <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              defaultChecked={paymentMethod === 'Stripe'}
              value='Stripe'
              onChange={e => setPaymentMethod(e.target.value)}/>
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary' disabled={!paymentMethod}>Continue</Button>
      </Form>
    </FormContainer>
  )
};

export default PaymentScreen;

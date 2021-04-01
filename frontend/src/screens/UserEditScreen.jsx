import {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {Button, Form} from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import Message from '../components/Message'
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {getUserDetails} from "../store/actions/user.action";

const UserEditScreen = ({match, history}) => {
  const userId = match.params.id
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const {loading, error, user} = useSelector(state => state.userDetails)

  useEffect(() => {
    if (user._id !== userId) {
      dispatch(getUserDetails(userId))
    } else {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [dispatch, user])

  const submitHandler = (e) => {
    e.preventDefault()

  }

  return (
    <>
      <Link to={'/admin/userslist'} className='btn btn-light my-3'>Go Back</Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>
                Name
              </Form.Label>
              <Form.Control type='name' placeholder='Enter name' value={name} onChange={e => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>
                Email address
              </Form.Label>
              <Form.Control type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label={'Is Admin'}
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}/>
            </Form.Group>
            <Button type='submit' variant='primary'>Update</Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;

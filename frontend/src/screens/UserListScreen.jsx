import {useEffect} from "react";
import {LinkContainer} from 'react-router-bootstrap';
import {Button, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import Message from '../components/Message'
import Loader from "../components/Loader";
import {deleteUser, listUsers} from "../store/actions/user.action";

const UserListScreen = ({history}) => {
  const dispatch = useDispatch();
  const {loading, error, users: usersList} = useSelector(state => state.usersList)
  const {userInfo} = useSelector(state => state.userLogin)
  const {success: successDelete} = useSelector(state => state.userDelete)

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }

  }, [dispatch, userInfo, history, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <h1>Users</h1>
      {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {usersList?.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
              <td>
                <i
                  className={`fa ${user.isAdmin ? 'fa-check' : 'fa-times'}`}
                  style={{color: user.isAdmin ? 'green' : "red"}}>
                </i>
              </td>
              <td>
                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                  <Button variant='light' className='btn-sm'>
                    <i className="fas fa-edit"/>
                  </Button>
                </LinkContainer>
                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                  <i className="fas fa-trash"/>
                </Button>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      )}
    </>
  )
};

export default UserListScreen;

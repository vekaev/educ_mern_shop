import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../store/actions/order.action";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.orderList);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history]);

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  <i
                    className={`fa ${order.isPaid ? "fa-check" : "fa-times"}`}
                    style={{ color: order.isPaid ? "green" : "red" }}
                  />
                  {order.paidAt && (
                    <span style={{ marginLeft: 3 }}>
                      {order.paidAt?.substring(0, 10)}
                    </span>
                  )}
                </td>
                <td>
                  <i
                    className={`fa ${
                      order.isDelivered ? "fa-check" : "fa-times"
                    }`}
                    style={{ color: order.isDelivered ? "green" : "red" }}
                  />
                  {order.deliveredAt && (
                    <span style={{ marginLeft: 3 }}>
                      {order.deliveredAt?.substring(0, 10)}
                    </span>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;

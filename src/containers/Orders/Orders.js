import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorhandler from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends Component {
  state = { orderstate: [], loading: true };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then(res => {
        const updatedOrders = [];
        for (let key in res.data) {
          updatedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({ loading: false, orderstate: updatedOrders });
      })
      .catch(error => {});
  }

  render() {
    return (
      <React.Fragment>
        <h3 style={{ textAlign: "center" }}>Your Orders</h3>
        {this.state.orderstate.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default withErrorhandler(Orders, axios);

import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/_Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from "../../Store/Action/indexActionCreator";

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    console.log("avadhut");
    this.props.oninitIngredients();
  }
  // use below handler to disable the ORDER NOW button if there is no ingredients added to burger
  orderNowHandler(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  }

  // To show Modal after clicking on ORDER NOW button
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinuedHandler = () => {
    this.props.history.push("/checkout");
  };

  //START RENDERING
  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p style={{ textAlign: "center" }}>
        <b>Unable to fetch Ingredients</b>
      </p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disableItem={disabledInfo}
            purchasable={this.orderNowHandler(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          cancelled={this.purchaseCancelHandler}
          continued={this.purchaseContinuedHandler}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: igName =>
      dispatch(burgerBuilderActions.addIngredient(igName)),
    onIngredientRemoved: igName =>
      dispatch(burgerBuilderActions.removeIngredient(igName)),
    oninitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));

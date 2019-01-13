import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./ContactData.module.css";
import btnclasses from "../../../components/Burger/OrderSummary/CheckoutButton.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: true,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your  Zipcode"
        },
        value: "",
        validation: {
          required: true,
          codeLength: 6,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "COD", displayValue: "COD" },
            { value: "CARD", displayValue: "CARD" }
          ]
        },
        value: "COD",
        validation: {},
        valid: true
      }
    },
    formValid: false,
    loading: false
  };

  dataSubmitHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const orderData = {};
    for (let key in this.state.orderForm) {
      orderData[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: orderData
    };

    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => this.setState({ loading: false }));
  };

  // VALIDATION logic goes here
  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.codeLength) {
      isValid = value.length === rules.codeLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }

  changeNameHandler = (event, id) => {
    const updatedForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedForm[id]
    };
    updatedFormElement.value = event.target.value;
    updatedForm[id] = updatedFormElement;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;

    let formValid = true;
    for (let key in updatedForm) {
      formValid = updatedForm[key].valid && formValid;
    }

    this.setState({ orderForm: updatedForm, formValid: formValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.dataSubmitHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            label={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.changeNameHandler(event, formElement.id)}
          />
        ))}
        <button className={btnclasses.Success} disabled={!this.state.formValid}>
          ORDER
        </button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h3>Delivery Information</h3>
        {form}
      </div>
    );
  }
}

const mapPropsToState = state => {
  return {
    ings: state.ingredients
  };
};

export default connect(mapPropsToState)(ContactData);

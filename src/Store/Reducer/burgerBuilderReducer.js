import * as actionTypes from "../Action/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 15,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 10,
  bacon: 15,
  meat: 30,
  cheese: 15
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };

    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false
      };

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };

    default:
      return state;
  }
};

export default reducer;

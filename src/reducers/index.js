import {combineReducers} from 'redux';

const initialState = {
    addedIds: [],
    quantityById: {},
    priceDic: {}
  }

const addProduct = (state = initialState.addedIds, product) => {
    if(state.indexOf(product) === -1){
      return [...state, product]
    }
    return state;
}
  
const addQuantity = (state = initialState.quantityById, product) => {
    return {
      ...state,
      [product]: (state[product] || 0) + 1
    }
}
  
const addPrice = (state = initialState.priceDic, product) => {
    return {
      ...state,
      [product.id]: product.price
    }
}
  
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'PUSH':
        return {
          ...state,
          addedIds: addProduct(state.addedIds, action.product.id),
          quantityById: addQuantity(state.quantityById, action.product.id),
          priceDic: addPrice(state.priceDic, action.product)
        }
      default:
        return state;
    }
}

const rootReducer = combineReducers(
  {cartReducer}
)

export default rootReducer ;
import {combineReducers} from 'redux';

const initialState = {
    addedIds: [],
    quantityById: {},
    priceDic: {},
    all: {}
  }

const addProduct = (state = initialState.addedIds, product) => {
    if (state.indexOf(product) === -1){
      return [...state, product]
    }
    return state;
}
  


const addAll = (state = initialState.all, product) => {
  if (product.id in state){
      let newNum = state[product.id].count+1;
      return{
        ...state,
        [product.id] : {
          title: product.title,
          count: newNum,
          price: product.price,
        }
      }
  }
  else {
    return {
      ...state,
      [product.id] : {
        title: product.title,
        count: 1,
        price: product.price,
      }
    }
  }
}
  
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'PUSH':
        return {
          ...state,
          addedIds: addProduct(state.addedIds, action.product.id),
          all: addAll(state.all, action.product)
        }
        case 'CANCLE':
          return{
            ...state,
            BIBI:'S'
          }
      default:
        return state;
    }
}

const initialToogleState = {
  modal: false
}

const toogleReducer = (state = initialToogleState, action) =>{
  switch (action.type) {
    case 'TOGGLE':
      return {
        ...state,
        modal: !action.modal
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers(
  {
    cartReducer,
    toogleReducer
  }
)

export default rootReducer ;
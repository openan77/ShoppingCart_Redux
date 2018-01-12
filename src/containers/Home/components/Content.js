import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container, Row, Col, Jumbotron, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import AlbumJSON from './Album.json';
import {createStore} from 'redux';
import { Provider } from 'react-redux'

console.log("Start Redux");

// Reducer
const initialState = {
  addedIds: [],
  quantityById: {}
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

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PUSH":
      return Object.assign({}, state, {
        addedIds: addProduct(state.addedIds, action.product.id),
        quantityById: addQuantity(state.quantityById, action.product.id)
      })
    case "COUNT":
      console.log("Counting.....");
      return state.addedIds.length;
    default:
      return state;
  }
}


const reducer = (state = [], action) => {
  switch (action.type) {
    case "PUSH":
    if (state.indexOf(action.product) > -1){
      return state;
    }
    return [...state,
      action.product
    ];
    case "CHECKOUT":
    default:
      return state;
  }
};

// Store
const store = createStore(cartReducer, initialState);

// UI
store.subscribe(() => {
  console.log(store.getState());
});

// store.dispatch({type: "PUSH", product:{id:2,name:"banaba",price:"20"} });

//----------------------------------------------------------------------------

export default class Content extends Component {

  state = {
   modal: false,
   cart: [],
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  addToCart = (product) => {
    const newCart = this.state.cart;
    newCart.push(product);
    this.setState(
      {cart: newCart}
    );
  }

  checkout = (totalPrice) => {
    alert(`已扣除${totalPrice}元`);
  }

  render() {
    const TotalPrice = this.state.cart.reduce((acc, item) => acc + item.price, 0);
    return (
      <Provider store={store}>
      <Container>
        <Row>
          <Col md="12">
            <Jumbotron>
              <h1 className="display-3">植物工坊</h1>
              <p className="lead">用大自然元素及運行法則栽培農業的植物工坊 工坊座落於大屯山下擁有豐富大自然生態資源，供給工坊最天然的元素。</p>
              <p>太陽，空氣，風，水。。提供工坊種植的優質條件，工坊堅持以老天供給最自然條件生產農作物</p>
              <p className="lead">
                <Button onClick={this.toggle} color="primary">購物車({() => store.dispatch({type: "COUNT",action})})</Button>
              </p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          {
            AlbumJSON.map(product => (
              <Col xs="12" md="4">
                <Card>
                  <CardImg top width="100%" src={product.img} alt="Card image cap" />
                  <CardBody>
                    <CardTitle>{product.title}</CardTitle>
                    <CardSubtitle>價格:{product.price}</CardSubtitle>
                    <CardText>{product.desc}</CardText>
                    <Button  onClick={() => store.dispatch({type: "PUSH", product })}>購買</Button>
                  </CardBody>
                </Card>
              </Col>
            )
          )
          }

        </Row>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>購物車</ModalHeader>
          <ModalBody>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>品項</th>
                  <th>價格</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.cart.map(item => (
                    <tr>
                      <th scope="row">{item.id}</th>
                      <td>{item.title}</td>
                      <td>{item.price}</td>
                    </tr>
                  )
                )
                }

              </tbody>
            </Table>
            <p>總價:{TotalPrice}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" disabled={this.state.cart.length === 0} onClick={() => this.checkout()}>結帳</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>取消</Button>
          </ModalFooter>
        </Modal>
      </Container>
      </Provider>
    );
  }
}

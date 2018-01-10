import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Container, Row, Col } from 'reactstrap';

import Header from './components/Header.js';
import Content from './components/Content.js';
import './Home.less';


export default class Home extends Component {
  render() {
    return (
      <div id="pageHome">
        <Content />
      </div>
    );
  }
}

import React from 'react';
import {
  Nav,
  Navbar,
  NavItem,
} from 'react-bootstrap';

export const Index = React.createClass({

  render() {
    return (
      <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Blog maneiro - React Version</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem href="/post/new">Adicionar Post</NavItem>
        </Nav>
      </Navbar>
      {this.props.children}
      </div>
    );
  }
});

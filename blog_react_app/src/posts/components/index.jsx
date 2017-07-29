import React from 'react';
import {
  Nav,
  Navbar,
  NavItem,
  Grid,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
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
      {this.props.posts.get('errors') ? (
        <Grid><Row><Col xs={12}>
        <ListGroup>
          <ListGroupItem bsStyle="danger">{this.props.posts.get('errors')}</ListGroupItem>
        </ListGroup>
        </Col></Row></Grid>
      ) : ''}
      {this.props.children}
      </div>
    );
  }
});

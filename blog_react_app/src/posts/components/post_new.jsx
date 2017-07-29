import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { Index } from './index';
import { savePost } from '../state/actions';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  PageHeader
} from 'react-bootstrap';


const PostNew = React.createClass({

  submit(){
    let formData = $(this.refs.form).serialize();
    this.props.dispatch(savePost(formData));
  },

  render() {
    return (
      <Index {...this.props}>
        <Grid>
          <Row>
            <Col xs={12}>
              <PageHeader>Adicionar Post</PageHeader>
              <form ref="form">
                <FormGroup>
                  <FormControl.Feedback />
                  <ControlLabel>Título</ControlLabel>
                  <FormControl
                    type="text"
                    name="title"
                    placeholder="Título"
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Texto</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    name="text"
                    rows={10}
                    placeholder="Texto"
                  />
                </FormGroup>
                <Button bsStyle="primary" onClick={this.submit}>Salvar</Button>
              </form>
            </Col>
          </Row>
        </Grid>
      </Index>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  }
};

export const PostNewComponent = connect(mapStateToProps)(PostNew);
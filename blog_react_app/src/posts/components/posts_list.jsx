import React from 'react';
import { connect } from 'react-redux';
import { Index } from './index';
import { getPosts } from '../state/actions';
import {
  Grid,
  Row,
  Col,
  PageHeader
} from 'react-bootstrap';


const PostsList = React.createClass({

  componentWillMount() {
    if (!this.props.posts.get('allPosts')) {
      this.props.dispatch(getPosts());
    }
  },

  render() {
    return (
      <Index {...this.props}>
        <Grid>
          <Row>
            <Col xs={12}>
              <PageHeader>Posts</PageHeader>
              {this.props.posts.get('allPosts') ?
                (this.props.posts.get('allPosts').map((post, i) =>
                  (
                    <div key={i}>
                      <h2>
                          { post.title }
                          <br/>
                          <small>
                              publicado por { post.author.username } em  { post.published_date }
                          </small>
                      </h2>
                      <p style={{margin: "1.4em 0"}}>
                        {post.text.split('\n').map(function(item, key) {
                            return (
                              <span key={key}>
                                {item}
                                <br/>
                              </span>
                            )
                          })
                        }
                      </p>
                      <hr/>
                    </div>
                    )
                  )
                ) : <h2 style={{textAlign: 'center', margin: '2em 0'}}>Ainda não temos posts aqui!</h2>
              }
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

export const PostsListComponent = connect(mapStateToProps)(PostsList);

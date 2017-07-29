import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { PostsListComponent } from './posts/components/posts_list';
import { PostNewComponent } from './posts/components/post_new';

export default () => (
  <Route path="/">
    <IndexRoute component={PostsListComponent} />
    <Route path='/post/new' component={PostNewComponent}/>
  </Route>
);

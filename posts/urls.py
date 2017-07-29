
from django.conf.urls import url, include
from . import views

posts_patterns = ([
    url(r'^$', views.posts_list, name='posts_list'),
    url(r'^post/new/$', views.post_new, name='post_new'),
    url(r'^api/posts/$', views.api_posts_list, name='api_posts_list'),
    url(r'^api/post/new/$', views.api_post_new, name='api_post_new'),
], 'posts')

urlpatterns = [url(r'', include(posts_patterns))]


from django.conf.urls import url, include
from . import views

posts_patterns = ([
    url(r'^$', views.posts_list, name='posts_list'),
    url(r'^post/new/$', views.post_new, name='post_new'),
], 'posts')

urlpatterns = [url(r'', include(posts_patterns))]

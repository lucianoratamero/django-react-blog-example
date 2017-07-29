
from django.conf.urls import url, include
from .views import posts_list

posts_patterns = ([
    url(r'^$', posts_list, name='posts_list'),
], 'posts')

urlpatterns = [url(r'', include(posts_patterns))]

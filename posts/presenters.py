

class PostsPresenter(object):
    def __init__(self, qs):
        self.qs = qs

    @property
    def data(self):
        return {'posts': [{
                    'title': post.title,
                    'published_date': post.published_date.ctime(),
                    'author': {'username': post.author.username},
                    'text': post.text,
                } for post in self.qs]}

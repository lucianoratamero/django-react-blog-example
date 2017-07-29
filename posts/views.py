from django.shortcuts import render, redirect
from django.utils import timezone

from django.contrib.auth.models import User

from .forms import PostForm
from .models import Post


def posts_list(request):
    posts = Post.objects.filter(
        published_date__lte=timezone.now()
    ).order_by('published_date')

    return render(request, 'posts/posts_list.html', {'posts': posts})


def post_new(request):
    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author, created = User.objects.get_or_create(username='main_author')
            if created:
                post.author.set_password('123123123')
            post.published_date = timezone.now()
            post.save()
            return redirect('posts:posts_list')
    else:
        form = PostForm()
    return render(request, 'posts/post_edit.html', {'form': form})

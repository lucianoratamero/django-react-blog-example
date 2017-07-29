from django.shortcuts import render, redirect
from django.utils import timezone
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User

from .forms import PostForm
from .models import Post
from .presenters import PostsPresenter


def posts_list(request):
    qs = Post.objects.filter(
        published_date__lte=timezone.now()
    ).order_by('published_date')

    context = PostsPresenter(qs).data

    return render(request, 'posts/posts_list.html', context)


def api_posts_list(request):
    qs = Post.objects.filter(
        published_date__lte=timezone.now()
    ).order_by('published_date')

    context = PostsPresenter(qs).data

    return JsonResponse(context)


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


@csrf_exempt
def api_post_new(request):
    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author, created = User.objects.get_or_create(username='main_author')
            if created:
                post.author.set_password('123123123')
            post.published_date = timezone.now()
            post.save()
            return JsonResponse(status=201, data={})
        else:
            return JsonResponse(status=400, data=form.errors)

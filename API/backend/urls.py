from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from . import register
from . import login
from . import jokes
from . import jwt_checker
from . import codeVerification
from . import comments
from . import subscribe

urlpatterns = [
    path("", include("jokes.urls")),

    path("admin/", admin.site.urls),
    path("register", register.register, name="register"),
    path("login", login.login, name="login"),
    path("jokes", jokes.jokes, name="jokes"),
    path("validate", codeVerification.codeVerification, name="validate"),

    path("username/<str:username>/jokes", jokes.get_jokes_by_username, name="jokes"),
    path("key/<str:key>/jokes", jokes.get_jokes_by_key, name="jokes"),

    path("jokes/<str:joke_id>", jokes.update_vote, name="jokes"),

    path("jokes/<str:joke_id>", jokes.handle_joke, name="jokes"),

    path("jokes/deleteToxicPosts", jokes.delete_toxic_posts, name="jokes"),

    path("subscribe", subscribe.subscribe, name="subscribe"),
    path('unsubscribe', subscribe.unsubscribe, name="unsuscribe"),
    path('subscriptions', subscribe.get_subscriptions, name="subscriptions"),
    path("utils/jwt-check", jwt_checker.check_jwt, name="jwt-check"),


    path("jokes/<str:joke_id>/comments", comments.comment, name="comments"),
    path("users/<str:username>/comments/jokes", comments.comments_by_username, name="comments"),


] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# [END gaestd_py_django_local_static]

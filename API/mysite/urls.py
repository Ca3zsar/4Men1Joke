from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from . import register
from . import login
from . import jokes
from . import jwt_checker

urlpatterns = [
    path("", include("polls.urls")),
    path("admin/", admin.site.urls),
    path("register", register.register, name="register"),
    path("login", login.login, name="login"),
    path("jokes", jokes.jokes, name="jokes"),


    path("username/<str:username>/jokes", jokes.get_jokes_by_username, name="jokes"),
    path("key/<str:key>/jokes", jokes.get_jokes_by_key, name="jokes"),

    path("jokes/<str:joke_id>/catOk_countup", jokes.catOk_countup, name="jokes"),
    path("jokes/<str:joke_id>/catOk_countdown", jokes.catOk_countdown, name="jokes"),

    path("jokes/<str:joke_id>/BASADO_countup", jokes.BASADO_countup, name="jokes"),
    path("jokes/<str:joke_id>/BASADO_countdown", jokes.BASADO_countdown, name="jokes"),

    path("jokes/<str:joke_id>/questionmark_countup", jokes.questionmark_countup, name="jokes"),
    path("jokes/<str:joke_id>/questionmark_countdown", jokes.questionmark_countdown, name="jokes"),


    path("jokes/<str:joke_id>", jokes.delete_joke, name="jokes"),
    path("utils/jwt-check", jwt_checker.check_jwt, name="jwt-check"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# [END gaestd_py_django_local_static]

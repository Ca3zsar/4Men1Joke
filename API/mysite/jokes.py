import json

import jwt
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

from firebase_admin import db

@csrf_exempt
def jokes(request):

    if request.method == 'POST':
        response_data = {}
        info = json.loads(request.body)

        author = info.get("author", "")
        content = info.get("content", "")
        keys = info.get("keys", "")
        photo_uri = info.get("photo_uri", "")

        if author == "" or content == "" or keys == "":
            return HttpResponse("Fields author, content and keys must exist!", status=400)

        my_json = {
            "author": author,
            "content": content,
            "keys": keys,
            "photo_uri": photo_uri,
            "likes": 0,
            "dislikes": 0
        }

     
        ref = db.reference('/jokes')

        ref.push().set(my_json)

        response_data = {"message": f"Joke successfully created!"}
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=201)     
    elif request.method == 'GET':
        response_data = {}
        ref = db.reference('/jokes')
        jokes = ref.get()
        response_data["jokes"] = jokes
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=200)
    else:
        return HttpResponse("Method not allowed", status=405)

@csrf_exempt
def get_jokes_by_username(request, username):
    if request.method == 'GET':
        response_data = {}
        ref = db.reference('/jokes')
        jokes = ref.order_by_child('author').equal_to(username).get()
        response_data["jokes"] = jokes
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=200)
    else:
        return HttpResponse("Method not allowed", status=405)

@csrf_exempt
def get_jokes_by_key(request, key):
    if request.method == 'GET':
        response_data = {}
        ref = db.reference('/jokes')
        jokes = ref.get()

        jsonArray = []
        for id in jokes:
            if key in jokes[id]["keys"]:
                jsonArray.append({ id : jokes[id] })

        response_data["jokes"] = jsonArray
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=200)
    else:
        return HttpResponse("Method not allowed", status=405)


@csrf_exempt
def like_countup(request, joke_id):
    if request.method == 'PUT':
        response_data = {}
        ref = db.reference('/jokes/' + joke_id)
        ref.update({'likes': ref.get()['likes'] + 1})

        response_data = {"message": f"Joke successfully liked!"}
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=200)
    else:
        return HttpResponse("Method not allowed", status=405)


@csrf_exempt
def like_countdown(request, joke_id):
    if request.method == 'PUT':
        response_data = {}
        ref = db.reference('/jokes/' + joke_id)
        ref.update({'likes': ref.get()['likes'] - 1})

        response_data = {"message": f"Joke successfully liked!"}
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=200)
    else:
        return HttpResponse("Method not allowed", status=405)


@csrf_exempt
def dislike_countup(request, joke_id):
    if request.method == 'PUT':
        response_data = {}
        ref = db.reference('/jokes/' + joke_id)
        ref.update({'dislikes': ref.get()['dislikes'] + 1})

        response_data = {"message": f"Joke successfully disliked!"}
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=200)
    else:
        return HttpResponse("Method not allowed", status=405)


@csrf_exempt
def dislike_countdown(request, joke_id):
    if request.method == 'PUT':
        response_data = {}
        ref = db.reference('/jokes/' + joke_id)
        ref.update({'dislikes': ref.get()['dislikes'] - 1})

        response_data = {"message": f"Joke successfully disliked!"}
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=200)
    else:
        return HttpResponse("Method not allowed", status=405)


@csrf_exempt
def delete_joke(request, joke_id):
    if request.method == 'DELETE':
        response_data = {}
        ref = db.reference('/jokes/' + joke_id)
        ref.delete()

        response_data = {"message": f"Joke successfully deleted!"}
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=200)
    else:
        return HttpResponse("Method not allowed", status=405)


import json

import jwt
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

from firebase_admin import db

from datetime import date

@csrf_exempt
def jokes(request):

    if request.method == 'POST':
        response_data = {}
        info = request.POST

        author = info.get("author", "")
        content = info.get("content", "")
        image = request.FILES.get("image", "")
        tags = info.get("tags", "")
        
        if author == "" or content == "" or tags == "":
            return HttpResponse("Fields author, content and keys must exist!", status=400)

        image_url = image.name if image else ""
        my_json = {
            "author": author,
            "createdAt": str(date.today()),
            "content": content,
            "photo_url": image_url,
            "catOk_count": 0,
            "BASADO_count": 0,
            "questionmark_count": 0,
            "keys": tags.split(",")
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
def catOk_countup(request, joke_id):
    if request.method == 'PUT':
        response_data = {}
        ref = db.reference('/jokes/' + joke_id)
        
        #check if ref exists
        if ref.get() is None:
            return HttpResponse("Joke not found", status=404)

        
        ref.update({'catOk_count': ref.get()['catOk_count'] + 1})

        response_data = {"message": f"Joke successfully catOked!"}
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=200)
    else:
        return HttpResponse("Method not allowed", status=405)


@csrf_exempt
def catOk_countdown(request, joke_id):
    if request.method == 'PUT':
        response_data = {}
        ref = db.reference('/jokes/' + joke_id)
        
        #check if ref exists
        if ref.get() is None:
            return HttpResponse("Joke not found", status=404)

        
        ref.update({'catOk_count': ref.get()['catOk_count'] - 1})

        response_data = {"message": f"Joke successfully discatOked!"}
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=200)
    else:
        return HttpResponse("Method not allowed", status=405)


@csrf_exempt
def BASADO_countup(request, joke_id):
    if request.method == 'PUT':
        response_data = {}
        ref = db.reference('/jokes/' + joke_id)

        #check if ref exists
        if ref.get() is None:
            return HttpResponse("Joke not found", status=404)

        ref.update({'BASADO_count': ref.get()['BASADO_count'] + 1})

        response_data = {"message": f"Joke successfully BASADOed!"}
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=200)
    else:
        return HttpResponse("Method not allowed", status=405)


@csrf_exempt
def BASADO_countdown(request, joke_id):
    if request.method == 'PUT':
        response_data = {}
        ref = db.reference('/jokes/' + joke_id)
        
        #check if ref exists
        if ref.get() is None:
            return HttpResponse("Joke not found", status=404)

        
        ref.update({'BASADO_count': ref.get()['BASADO_count'] - 1})

        response_data = {"message": f"Joke successfully disBASADOed!"}
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=200)
    else:
        return HttpResponse("Method not allowed", status=405)


@csrf_exempt
def questionmark_countup(request, joke_id):
    if request.method == 'PUT':
        response_data = {}
        ref = db.reference('/jokes/' + joke_id)
        
        #check if ref exists
        if ref.get() is None:
            return HttpResponse("Joke not found", status=404)

        
        ref.update({'questionmark_count': ref.get()['questionmark_count'] + 1})

        response_data = {"message": f"Joke successfully questionmarked!"}
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=200)
    else:
        return HttpResponse("Method not allowed", status=405)


@csrf_exempt
def questionmark_countdown(request, joke_id):
    if request.method == 'PUT':
        response_data = {}
        ref = db.reference('/jokes/' + joke_id)
        
        #check if ref exists
        if ref.get() is None:
            return HttpResponse("Joke not found", status=404)

        
        ref.update({'questionmark_count': ref.get()['questionmark_count'] - 1})

        response_data = {"message": f"Joke successfully disquestionmarked!"}
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


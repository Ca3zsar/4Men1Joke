import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import jwt
from firebase_admin import db

from .settings import AUTH_KEY

@csrf_exempt
def subscribe(request):
    if request.method == "POST":
        info = json.loads(request.body)
        req_jwt = info.get("token", "")

        if req_jwt == "":
            return HttpResponse("Field token must exist!", status=400)
        
        try:
            decoded = jwt.decode(req_jwt, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return HttpResponse("Token expired", status=401)
        except jwt.InvalidTokenError:
            return HttpResponse("Invalid token", status=401)

        email = decoded.get("email", "")

        ref = db.reference('/subscriptions')

        if len(ref.order_by_child('email').equal_to(email).get().keys()) > 0:
            return HttpResponse("You have already subscribed!", status=409)

        jsonForSubscribe = {
            "email": email
        }

        ref.push().set(jsonForSubscribe)

        return HttpResponse("You have successfully subscribed!", status=201)


@csrf_exempt
def unsubscribe(request):
    if request.method == "POST":
        info = json.loads(request.body)
        req_jwt = info.get("token", "")

        if req_jwt == "":
            return HttpResponse("Field token must exist!", status=400)
        
        try:
            decoded = jwt.decode(req_jwt, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return HttpResponse("Token expired", status=401)
        except jwt.InvalidTokenError:
            return HttpResponse("Invalid token", status=401)

        email = decoded.get("email", "")

        ref = db.reference('/subscriptions')

        entry = ref.order_by_child('email').equal_to(email).get()
        dict_entry = dict(entry)
        key = list(dict_entry.keys())[0]

        print(entry)
        if not entry:
            return HttpResponse("You have not subscribed yet!", status=409)


        ref = db.reference('/subscriptions/' + entry.keys()[0])
        ref.delete()

        return HttpResponse("You have successfully unsubscribed!", status=201)


@csrf_exempt
def get_subscriptions(request):
    if request.method == 'GET':
        try:
            info = json.loads(request.body)
        except ValueError:
            return HttpResponse("Invalid JSON", status=400)

        auth_key = info.get("auth_key", "")
        if auth_key != AUTH_KEY:
            return HttpResponse("Invalid auth key!", status=401)

        ref = db.reference('/subscriptions')
        subscriptions = list(map(lambda x: x.get('email'),list(dict(ref.get()).values())))
        return HttpResponse(json.dumps(subscriptions), status=200)
    else:
        return HttpResponse("Method not allowed", status=405)
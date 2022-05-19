from datetime import datetime, timezone, timedelta
import json

import jwt
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

from firebase_admin import db


@csrf_exempt
def register(request):
    

    if request.method == 'POST':
        response_data = {}
        info = json.loads(request.body)
        username = info.get("username", "")
        password = info.get("password", "")
        email = info.get("email", "")

        if username == "" or password == "" or email == "":
            return HttpResponse("Fields username, password and email must exist!", status=400)


        ref = db.reference('/users')


        if len(ref.order_by_child('username').equal_to(username).get().keys()) > 0:
            response_data["message"] = "There is a business rule that prevents you from creating that resource"
            response_data["reason"] = "name"
            return HttpResponse(json.dumps(response_data), content_type="application/json", status=409)
        

        my_json = {
            "username": username,
            "password": password,
            "email": email
        }

        ref.push().set(my_json)

        response_data = {"message": f"Account successfully created!"}
        username = info.get("username", "")
        email = info.get("email", "")
        expiry_date = datetime.now(timezone(timedelta(hours=+9))) + timedelta(days=1) 
        jwt_token = jwt.encode({'username': username, 'email' : email, "exp":expiry_date}, 'secret', algorithm='HS256')
        response_data["token"] = jwt_token.decode('utf-8')
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=201)
    else:
        return HttpResponse("Method not allowed", status=405)
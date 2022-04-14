import firebase_admin as fba

def initialize_firebase():
    cred = fba.credentials.Certificate('firestore_credentials.json')
    fba.initialize_app(cred, {
        'databaseURL': 'https://man1joke-default-rtdb.europe-west1.firebasedatabase.app/'
    })

















# config = {
#   "apiKey": "AIzaSyDB9xl1wyzJz45NJOJgeLTdLZ9eih4ugFg",
#   "authDomain": "man1joke.firebaseapp.com",
#   "databaseURL": "https://man1joke-default-rtdb.europe-west1.firebasedatabase.app",
#   "storageBucket": "man1joke.appspot.com",
#   "serviceAccount": "./firestore_creds.json"

# }
# firebase = pyrebase.initialize_app(config)


# def noquote(s):
#   return s


# pyrebase.pyrebase.quote = noquote
# db = firebase.database()

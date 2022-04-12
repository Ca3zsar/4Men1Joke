import pyrebase
config = {
  "apiKey": "AIzaSyDB9xl1wyzJz45NJOJgeLTdLZ9eih4ugFg",
  "authDomain": "man1joke.firebaseapp.com",
  "databaseURL": "https://man1joke-default-rtdb.europe-west1.firebasedatabase.app",
  "storageBucket": "man1joke.appspot.com",
    "serviceAccount": "./firestore_creds.json"

}
firebase = pyrebase.initialize_app(config)


def noquote(s):
  return s


pyrebase.pyrebase.quote = noquote
db = firebase.database()

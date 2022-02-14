from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import datetime

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'secret'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class users(db.Model):
    user_id = db.Column(db.Integer, primary_key=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(40), nullable=False)
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    created = db.Column(db.DateTime, default = datetime.datetime.now)

    def __init__(self, email, password, first_name, last_name):
        self.email = email
        self.password = password
        self.first_name = first_name
        self.last_name = last_name

class friends(db.Model):
    friend_id1 = db.Column(db.Integer, primary_key=True, nullable=False)
    friend_id2 = db.Column(db.Integer, primary_key=True, nullable=False)

    def __init__(self, friend_id1, friend_id2):
        self.friend_id1 = friend_id1
        self.friend_id2 = friend_id2

class posts(db.Model):
    post_id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, primary_key=True, nullable=False)
    content = db.Column(db.String(200))

    def __init__(self, post_id, user_id, content):
        self.post_id = post_id
        self.user_id = user_id
        self.content = content

@app.route('/', methods = ['GET'])
def main():
    return jsonify({"Hello":"World"})

if __name__ == "__main__":
    app.run(debug=True)
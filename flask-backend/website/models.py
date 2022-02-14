from . import db
from flask_login import UserMixin
import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    about = db.Column(db.String(200))
    created = db.Column(db.DateTime, default=datetime.datetime.now)
    last_online = db.Column(db.DateTime)

    @property
    def identity(self):
        return self.user_id

    @property
    def password(self):
        return self.hashed_password

    @property
    def rolenames(self):
        return []

    @classmethod
    def lookup(cls, email):
        return cls.query.filter_by(email=email).one_or_none()

    @classmethod
    def identify(cls, user_id):
        return cls.query.get(user_id)



class Friend(db.Model):
    __tablename__ = 'friends'
    friend_id = db.Column(db.Integer, primary_key=True)
    user1 = db.Column(db.Integer, nullable=False)
    user2 = db.Column(db.Integer, nullable=False)


class FriendReq(db.Model):
    __tablename__ = 'friend_req'
    friend_req_id = db.Column(db.Integer, primary_key=True)
    inviting = db.Column(db.Integer, nullable=False)
    invited = db.Column(db.Integer, nullable=False)


class Post(db.Model):
    __tablename__ = 'posts'
    post_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    content = db.Column(db.String(200))
    created = db.Column(db.DateTime, default=datetime.datetime.now)


class Comment(db.Model):
    __tablename__ = 'comments'
    comment_id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.post_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    content = db.Column(db.String(200))
    created = db.Column(db.DateTime, default=datetime.datetime.now)

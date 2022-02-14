from marshmallow import fields

from .models import *
from . import ma, db
from marshmallow_sqlalchemy import auto_field


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User


class FriendSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Friend
        include_fk = True


class UserSchema2(ma.SQLAlchemySchema):
    class Meta:
        model = User
        include_fk = True

    user_id = auto_field()
    first_name = auto_field()
    last_name = auto_field()


class ProfileSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User

    user_id = auto_field()
    first_name = auto_field()
    last_name = auto_field()
    about = auto_field()


class FriendReqSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = FriendReq


class PostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Post
        include_fk = True


class PostSchema2(ma.SQLAlchemySchema):
    class Meta:
        model = Post
        include_fk = True

    post_id = auto_field()
    user_id = auto_field()
    content = auto_field()
    created = auto_field()
    first_name = fields.Method("get_firstName")
    last_name = fields.Method("get_lastName")
    comments_number = fields.Method("get_commentsNumber")

    def get_firstName(self, obj):
        user = User.query.filter(User.user_id == obj.user_id).first()
        return user.first_name

    def get_lastName(self, obj):
        user = User.query.filter(User.user_id == obj.user_id).first()
        return user.last_name

    def get_commentsNumber(self, obj):
        comments_number = Comment.query.filter(Comment.post_id == obj.post_id).count()
        return comments_number


class CommentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Comment
        include_fk = True


class CommentSchema2(ma.SQLAlchemySchema):
    class Meta:
        model = Comment
        include_fk = True

    comment_id = auto_field()
    post_id = auto_field()
    user_id = auto_field()
    content = auto_field()
    created = auto_field()
    first_name = fields.Method("get_firstName")
    last_name = fields.Method("get_lastName")

    def get_firstName(self, obj):
        user = User.query.filter(User.user_id == obj.user_id).first()
        return user.first_name

    def get_lastName(self, obj):
        user = User.query.filter(User.user_id == obj.user_id).first()
        return user.last_name

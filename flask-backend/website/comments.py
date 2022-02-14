import flask_praetorian
from flask import Blueprint, request, jsonify
from .models import Comment
from .models_schemas import CommentSchema, CommentSchema2
from flask_praetorian import current_user
from . import db

comments = Blueprint('comments', __name__)


@comments.route('/commentslist', methods=['GET'])
def comments_list():
    results = Comment.query.all()
    comment_schema = CommentSchema(many=True)
    output = comment_schema.dump(results)

    return jsonify({'comments': output})


@comments.route('/commentslist/<int:postid>', methods=['GET'])
def comments_list_of_post(postid):
    results = Comment.query.filter(Comment.post_id == postid).all()
    comment_schema = CommentSchema(many=True)
    output = comment_schema.dump(results)

    return jsonify({'comments': output})


@comments.route('/commentslist/<int:postid>/<int:range1>/<int:range2>', methods=['GET'])
@flask_praetorian.auth_required
def comments_list_of_post_limited(postid, range1, range2):
    results = Comment.query.order_by(Comment.created).filter(Comment.post_id == postid).slice(range1, range2)
    comment_schema = CommentSchema2(many=True)
    output = comment_schema.dump(results)

    return jsonify({'comments': output})


@comments.route('/addcomment/<int:postid>', methods=['POST'])
@flask_praetorian.auth_required
def add_post(postid):
    content = request.json.get('content')
    print(content)
    new_comment = Comment(post_id=postid, user_id=current_user().user_id, content=content)
    db.session.add(new_comment)
    db.session.commit()
    return ''

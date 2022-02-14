import flask_praetorian
from flask import Blueprint, request, jsonify
from .models import Post, Friend
from .models_schemas import PostSchema, PostSchema2
from flask_praetorian import current_user
from . import db

posts = Blueprint('posts', __name__)


@posts.route('/postslist', methods=['GET'])
def posts_list():
    results = Post.query.all()
    post_schema = PostSchema(many=True)
    output = post_schema.dump(results)

    return jsonify({'posts': output})


@posts.route('/postslist/<int:userid>', methods=['GET'])
def posts_list_of_user(userid):
    results = Post.query.filter(Post.user_id == userid).all()
    post_schema = PostSchema(many=True)
    output = post_schema.dump(results)

    return jsonify({'posts': output})


@posts.route('/postslist/<int:range1>/<int:range2>', methods=['GET'])
@flask_praetorian.auth_required
def posts_list_of_user_friends_limited(range1, range2):
    userid = current_user().user_id
    results = Friend.query.filter((Friend.user1 == userid) | (Friend.user2 == userid)).all()
    friends = []
    for e in results:
        if e.user1 == userid:
            friends.append(e.user2)
        else:
            friends.append(e.user1)

    results2 = Post.query.order_by(Post.created.desc()).filter(Post.user_id.in_(friends)).slice(range1, range2)
    post_schema = PostSchema2(many=True)
    output = post_schema.dump(results2)
    return jsonify({'posts': output})


@posts.route('/addpost', methods=['POST'])
@flask_praetorian.auth_required
def add_post():
    content = request.json.get('content')
    print(content)
    new_post = Post(user_id=current_user().user_id, content=content)
    db.session.add(new_post)
    db.session.commit()
    return ''

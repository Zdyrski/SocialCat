import flask_praetorian
from flask import Blueprint, jsonify
from .models import User, Friend
from .models_schemas import UserSchema2
from flask_praetorian import current_user

user_friends = Blueprint('user_friends', __name__)


@user_friends.route('/friendslist', methods=['GET'])
@flask_praetorian.auth_required
def friends_list_of_user():
    userid = current_user().user_id
    results = Friend.query.filter((Friend.user1 == userid) | (Friend.user2 == userid)).all()
    friends = []
    for e in results:
        if e.user1 == userid:
            friends.append(e.user2)
        else:
            friends.append(e.user1)

    results3 = User.query.filter(User.user_id.in_(friends)).all()
    user_schema2 = UserSchema2(many=True)
    output = user_schema2.dump(results3)

    return jsonify({'friends': output})

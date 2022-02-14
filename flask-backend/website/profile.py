import flask_praetorian
from flask import Blueprint, request, jsonify
from sqlalchemy import and_, or_
from .models import User, Friend, FriendReq
from .models_schemas import ProfileSchema, FriendReqSchema
from flask_praetorian import current_user, auth_required
from . import db

profile = Blueprint('profile', __name__)


@profile.route('/profile/<int:userid>', methods=['GET'])
@flask_praetorian.auth_required
def get_user_profile(userid):
    if userid == 0:
        userid = current_user().user_id
    result = User.query.filter_by(user_id=userid).first()
    me = current_user().user_id
    #print(result)
    profile_schema = ProfileSchema()
    output = profile_schema.dump(result)
    print(output)
    friendship_status = ''
    friend = Friend.query.filter(or_(and_(Friend.user1 == userid, Friend.user2 == me), and_(Friend.user1 == me, Friend.user2 == userid))).first()
    friend_request1 = FriendReq.query.filter_by(inviting=me, invited=userid).first()
    friend_request2 = FriendReq.query.filter_by(inviting=userid, invited=me).first()
    if friend:
        friendship_status = 'friends'
    elif friend_request1:
        friendship_status = 'waiting'
    elif friend_request2:
        friendship_status = 'invited'
    else:
        friendship_status = 'none'
    print(friendship_status)
    return jsonify({'user_profile': output, 'friendship_status': friendship_status})


@profile.route('/profile/<int:userid>/friendreq', methods=['POST'])
def send_friend_req(userid):
    new_friend_request = FriendReq(inviting=current_user().user_id, invited=userid)
    db.session.add(new_friend_request)
    db.session.commit()


@profile.route('/profile/<int:userid>/addfriend', methods=['POST'])
def accept_friend_req(userid):
    friend_request = FriendReq.query.filter_by(inviting=userid, invited=current_user().user_id).first()
    if friend_request:
        db.session.remove(friend_request)
        new_friend = Friend(user1=userid, user2=current_user().user_id)
        db.session.add(new_friend)
        db.session.commit()


@profile.route('/profile/<int:userid>/deletefriend', methods=['POST'])
def delete_friend(userid):
    friend = Friend.query.filter(or_(and_(Friend.user1 == userid, Friend.user2 == current_user().user_id), and_(Friend.user1 == current_user().user_id, Friend.user2 == userid))).first()
    if friend:
        db.session.remove(friend)
        db.session.commit()

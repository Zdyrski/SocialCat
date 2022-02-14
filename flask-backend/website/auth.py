import flask_praetorian
from flask import Blueprint, request, flash, jsonify
from flask_praetorian import current_user

from .models import User
from . import db, guard


auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    user = guard.authenticate(email, password)
    ret = {"access_token": guard.encode_jwt_token(user)}
    #print(current_user().user_id)
    return jsonify(ret), 200


@auth.route('/refresh', methods=['GET'])
def refresh():
    old_token = guard.read_token_from_header()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {'access_token': new_token}
    return jsonify(ret), 200


@auth.route('/logout', methods=['POST'])
@flask_praetorian.auth_required
def logout():
    print(current_user().user_id)
    return 'Logout'


@auth.route('/sign-up', methods=['POST'])
def sign_up():
    email = request.json.get('email')
    #first_name = request.form.get('firstName')
    #last_name = request.form.get('lastName')
    password = request.json.get('password')

    user = User.query.filter_by(email=email).first()
    if user:
        flash('Email already exists.', category='error')
        return 'Account already exists'
    else:
        new_user = User(email=email, hashed_password=guard.hash_password(password))
        db.session.add(new_user)
        db.session.commit()
        flash('Account created!', category='success')
        return 'Account created'

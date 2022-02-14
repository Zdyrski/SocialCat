import flask_praetorian
from flask import Blueprint, request, jsonify
from sqlalchemy import and_, or_
from .models import User
from .models_schemas import UserSchema2
from flask_praetorian import current_user, auth_required
from . import db

search = Blueprint('search', __name__)


@search.route('/search', methods=['POST'])
@flask_praetorian.auth_required
def search_for_user():
    search_data = request.json.get('search_data')
    search_data2 = search_data.split()
    print(search_data)
    print(search_data2)
    results = User.query.filter(or_(*[User.first_name.like('%{}%'.format(el)) for el in search_data2],
                                    *[User.last_name.like('%{}%'.format(el)) for el in search_data2])).all()
    user_schema2 = UserSchema2(many=True)
    output = user_schema2.dump(results)

    return jsonify({'users': output})
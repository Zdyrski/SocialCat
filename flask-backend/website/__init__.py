from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from os import path
from flask_login import LoginManager
from flask_cors import CORS
import flask_praetorian

db = SQLAlchemy()
ma = Marshmallow()
DB_NAME = "database.db"
guard = flask_praetorian.Praetorian()


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'asasasasaa'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'secret'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['DEFAULT_ROLES_DISABLED'] = True
    app.config["JWT_ACCESS_LIFESPAN"] = {"hours": 24}
    app.config["JWT_REFRESH_LIFESPAN"] = {"days": 30}
    db.init_app(app)
    ma.init_app(app)
    CORS(app, supports_credentials=True)

    from .models import Friend, User
    guard.init_app(app, User)

    from .auth import auth
    from .user_friends import user_friends
    from .comments import comments
    from .posts import posts
    from .profile import profile
    from .search import search

    app.register_blueprint(auth, url_prefix='/')
    app.register_blueprint(user_friends, url_prefix='/')
    app.register_blueprint(comments, url_prefix='/')
    app.register_blueprint(posts, url_prefix='/')
    app.register_blueprint(profile, url_prefix='/')
    app.register_blueprint(search, url_prefix='/')

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    create_database(app)

    return app


def create_database(app):
    if not path.exists('website/' + DB_NAME):
        db.create_all(app=app)
        print('Created Database!')
    else:
        print('Database already exists!')
from flask import Flask
from db import db
from importlib import import_module
from flask_cors import CORS, cross_origin
from flask_jwt_extended import (
    JWTManager,
    jwt_required,
    create_access_token,
    get_jwt_identity
)

#from flask_swagger import swagger_ui_blueprint, SWAGGER_URL

def register_extensions(app):
    db.init_app(app)

def register_blueprints(app):
    from server.routes import blueprint
    app.register_blueprint(blueprint)

def configure_database(app):
    db.init_app(app)

    @app.before_first_request
    def initialize_database():
        with app.app_context():
            db.create_all()

    # @app.teardown_request
    # def shutdown_session(exception=None):
    #     db.session.remove()


def create_app(config):
    app = Flask(__name__)

    app.config.from_object(config)

    configure_database(app)

    jwt = JWTManager(app)

    register_blueprints(app)

    return app

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
    for module_name in {''}:
        module = import_module('routes'.format(module_name))
        app.register_blueprint(module.blueprint)
    for module_name in {'auth'}:
        module = import_module('modules.{}.routes'.format(module_name))
        app.register_blueprint(module.blueprint)


def configure_database(app):
    db.init_app(app)

    @app.before_first_request
    def initialize_database():
        with app.app_context():
            db.create_all()

    @app.teardown_request
    def shutdown_session(exception=None):
        db.session.remove()


def create_app(config):
    app = Flask(__name__)

    app.config.from_object(config)

    configure_database(app)
    CORS(app)

    app.config.from_object('config.Config')
    #app.register_blueprint(swagger_ui_blueprint, url_prefix=SWAGGER_URL)

    jwt = JWTManager(app)

    register_blueprints(app)
    configure_database(app)
    #Migrate(app, db)

    return app

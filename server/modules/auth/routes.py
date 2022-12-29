from flask import request, redirect, url_for, make_response, jsonify, Blueprint
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import cross_origin
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity,
)

from server.models import User, Task, user_task
from server.db import db

blueprint = Blueprint(
    'auth_blueprint',
    __name__,
    url_prefix=''
)

@blueprint.route('/signup', methods=['POST'])
@cross_origin()
def signup():
    try:
        username = request.json.get('username', None)
        email = request.json.get('email', None)
        password = request.json.get('password', None)

        if not username:
            return new_server_error('missing username', 400)
        if not email:
            return new_server_error('missing email', 400)
        if not password:
            return new_server_error('missing password', 400)

        password_hash = generate_password_hash(password)

        user = User(username=username, email=email, password=password_hash)
        db.session.add(user)
        db.session.commit()

        return {"msg": "user successfully registered"}, 201
    except IntegrityError:
        db.session.rollback()
        return new_server_error('user already exists', 400)
    except AttributeError as e:
        return new_server_error(f'provide an username, email and password in json format in the request body: {e}', 400)

@blueprint.route('/signin', methods=['POST'])
@cross_origin()
def login():
    try:
        username = request.json.get('username', None)
        password = request.json.get('password', None)

        if not username:
            return new_server_error('missing username', 400)
        if not password:
            return new_server_error('missing password', 400)

        user = Users.query.filter_by(username=username).first()

        if not user:
            return new_server_error('user not found!', 404)
        if check_password_hash(user.password, password):
            access_token = create_access_token(identity={"id": user.id})
            return {"access_token": access_token}, 200
        else:
            return new_server_error('invalid password!', 400)
    except AttributeError as e:
        return new_server_error(f'provide an email and password in json format in the request body: {e}', 400)


def new_server_error(err_msg: str, code: int) -> tuple[dict[str, str], int]:
    return {"err_msg": err_msg}, code
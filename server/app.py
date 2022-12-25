from flask import Flask, jsonify
from dotenv import load_dotenv, dotenv_values
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

load_dotenv('.flaskenv')

dbConfig = {
    **dotenv_values('.env.database'),
}

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = dbConfig['SQLALCHEMY_DATABASE_URI']
db = SQLAlchemy(app)

user_task = db.Table('user_task',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('task_id', db.Integer, db.ForeignKey('task.id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32), nullable=False)
    email = db.Column(db.String(150), nullable=False, unique=True)
    password = db.Column(db.String(64), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    avatar = db.Column(db.String)
    tasks = db.relationship('task', backref='user')

    def __repr__(self):
        return f'User: {self.name}'

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password


class Task(db.Model):
    __tablename__ = 'task'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(1024))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    owner = db.Column(db.Integer, db.ForeignKey('user.id'))
    shared_to = db.relationship('user',
                               secondary=user_task)

    def __repr__(self):
        return f'Task: {self.content}'

    def __init__(self, content, owner):
        self.content = content
        self.owner = owner

class Main(Resource):
    def get(self):
        return jsonify({'text' : 'Hello World!'})

api = Api()
api.add_resource(Main, '/api/main')
api.init_app(app)

if __name__ == '__main__':
    app.run()

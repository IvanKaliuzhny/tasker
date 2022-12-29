from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from datetime import datetime
from db import db

user_task = db.Table(
    'user_task',
    db.Column('user_id', db.Integer, db.ForeignKey('users.user_id'), primary_key=True),
    db.Column('task_id', db.Integer, db.ForeignKey('tasks.task_id', ondelete="CASCADE"), primary_key=True),
)


class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True, default=uuid4())
    username = db.Column(db.String(50), unique=True, nullable=False, index=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(1000), nullable=False)
    tasks = db.relationship('tasks', secondary=user_task)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())

    @property
    def serialize(self):
        return {
            'user_id': self.user_id,
            'username': self.username,
            'email': self.email,
        }


class Task(db.Model):
    __tablename__ = 'tasks'

    task_id = db.Column(db.Integer, primary_key=True, default=uuid4())
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    status = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())

    @property
    def serialize(self):
        return {
            'task_id': self.task_id,
            'title': self.title,
            'description': self.description,
            'status': self.status,
        }
from flask import Flask
from dotenv import load_dotenv, dotenv_values
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

load_dotenv('.flaskenv')

dbConfig = {
    **dotenv_values('.env.database'),
}

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = dbConfig['SQLALCHEMY_DATABASE_URI']
db = SQLAlchemy(app)

@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


if __name__ == '__main__':
    app.run()

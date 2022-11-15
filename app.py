from flask import Flask, render_template, jsonify, request, redirect, url_for
from pymongo import MongoClient
import jwt
import datetime
import hashlib

from bson.json_util import dumps

app = Flask(__name__)
client = MongoClient("mongodb+srv://test:sparta@cluster0.nxcyemj.mongodb.net/?retryWrites=true&w=majority")
db = client.gsfestival


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/signup')
def signup():
    return render_template('signup.html')


@app.route('/postAdd')
def post_add():
    return render_template('postAdd.html')


# 이메일 중복확인
@app.route('/api/signup_email_check', methods=["GET"])
def post_email_check():
    email_receive = request.args.get("email_give")

    doc = {
        'email': email_receive
    }

    user = db.users.find_one(doc, {'_id': False})
    print(user)

    if user is None:
        return jsonify({'users': None})
    else:
        return jsonify({'users': dumps(user)})


# 닉네임 중복확인
@app.route('/api/signup_nickname_check', methods=["GET"])
def post_nickname_check():
    nickname_receive = request.args.get("nickname_give")
    print(nickname_receive)

    doc = {
        'nickname': nickname_receive
    }

    user = db.users.find_one(doc, {'_id': False})
    print(user)

    if user is None:
        return jsonify({'users': None})
    else:
        return jsonify({'users': dumps(user)})


# 회원가입
@app.route('/api/signup', methods=["POST"])
def post_signup():
    email_receive = request.form["email_give"]
    nickname_receive = request.form["nickname_give"]
    password_receive = request.form["password_give"]

    password_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()

    doc = {
        'email': email_receive,
        'nickname': nickname_receive,
        'password': password_hash
    }

    db.users.insert_one(doc)

    return jsonify({'msg': '회원가입이 완료되었습니다.'})


@app.route("/api", methods=["GET"])  # users information
def gs_festival_user_get():
    users = list(db.users.find({}, {'_id': False}))

    return jsonify({
        'users': users
    })


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)

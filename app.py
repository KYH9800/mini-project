from flask import Flask, render_template, request, jsonify, request, redirect, url_for
from pymongo import MongoClient
import jwt
import datetime
import hashlib

from bson.json_util import dumps

app = Flask(__name__)
client = MongoClient('mongodb+srv://test:sparta@cluster0.fjqxvob.mongodb.net/?retryWrites=true&w=majority')
db = client.dbsparta

# secret_key
SECRET_KEY = 'GS_FESTIVAL'

# 라우트 작업
@app.route('/')
def home():
    token_receive = request.cookies.get("user_token")
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_data = db.users.find_one({"email": payload['id']})
        print(payload)
        return render_template('index.html', user_info=user_data['email'])

    except jwt.ExpiredSignatureError:  # 만료된 서명 오류
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))

    except jwt.exceptions.DecodeError:  # 예외.디코드 에러
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))

@app.route('/login')
def login():
    msg = request.args.get("msg")
    return render_template('login.html', msg=msg)

@app.route('/signup')
def signup_page():
    return render_template('signup.html')


@app.route('/postAdd')
def post_page():
    return render_template('postAdd.html')

# 기능 구현 작업
# 1. 이메일 중복 확인
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

# 2. 닉네임 중복 확인
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

# 3. 회원가입
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

# 4. 게시글 작성
@app.route('/api/post', methods=['POST'])
def post_add():
    content_receive = request.form['content_give']

    token_receive = request.cookies.get('mytoken')
    payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
    user_data = db.users.find_one({"id": payload["id"]}), {'_id': False}
    
    doc = {'content': content_receive}

    db.content.insert_one(doc)

    return jsonify({'msg': '작성 완료!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)

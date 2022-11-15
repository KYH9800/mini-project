from flask import Flask, render_template, jsonify, request, redirect, url_for
from pymongo import MongoClient
import jwt
import datetime
import hashlib

from bson.json_util import dumps

app = Flask(__name__)
client = MongoClient("mongodb+srv://test:sparta@cluster0.nxcyemj.mongodb.net/?retryWrites=true&w=majority")
db = client.gsfestival

# secret_key
SECRET_KEY = 'GS_FESTIVAL'


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


@app.route("/api/login", methods=["POST"])  # users information
def jwt_login():
    email_receive = request.form['email_give']
    pw_receive = request.form['pw_give']
    # print(id_receive, pw_receive)
    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()
    print(email_receive)

    doc = {
        'email': email_receive,
        'password': pw_hash
    }

    result = db.users.find_one(doc)
    print(result)

    if result is not None:
        payload = {
            'id': email_receive,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=5)
            # datetime.datetime.utcnow(): 지금 부터 + datetime.timedelta(seconds=5): 5초 뒤까지
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        return jsonify({'result': 'success', 'token': token})
    else:
        return jsonify({'result': 'fail', 'msg': '아이디 또는 비밀번호가 일치하지 않습니다.'})


@app.route("/api", methods=["GET"])  # users information
def gs_festival_user_get():
    users = list(db.users.find({}, {'_id': False}))

    return jsonify({
        'users': users
    })


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)

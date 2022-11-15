from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
import certifi

app = Flask(__name__)
app = Flask(__name__)
ca = certifi.where()
client = MongoClient('mongodb+srv://test:123@cluster0.vpw4dwu.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.dbsparta


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/signup')
def signup_page():
    return render_template('signup.html')

@app.route('/postAdd')
def add_post_page():
    return render_template('postAdd.html')


# 댓글 포스트
@app.route('/api/comment', methods=['POST'])
def comment_post():
    comment_receive = request.form['comments_give']
    # user_id = db.users.find_one({:}) // 유저 id를 가져옴

    doc = {
        'comment': comment_receive,
    }
    db.comments.insert_one(doc)
    return jsonify({'msg': '댓글작성 완료!'})


# 댓글 get
@app.route('/api/comment', methods=["GET"])
def comment_get():
    comments_list = list(db.comments.find({}, {'_id': False}))

    return jsonify({'comments': comments_list})


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/signup')
def signup():
    return render_template('signup.html')


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)

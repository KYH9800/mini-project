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
    post_id_receive = request.form['post_id_give']
    comment_content_receive = request.form['comment_content_give']
    # user_id = db.users.find_one({:}) // 유저 id를 가져옴

    doc = {
        'post_id': post_id_receive,
        'comment_content': comment_content_receive
    }
    db.comments.insert_one(doc)


@app.route('/api/comment', methods=["GET"])
def comment_get():
    comments_list = list(db.comments.find({}, {'_id': False}))

    return jsonify({'comments': comments_list})


# 글 작성 post
@app.route('/api/post', methods=['POST'])
def post_add():
    content_receive = request.form['content_give'],

    doc = {'content': content_receive}

    db.content.insert_one(doc)
    return jsonify({'msg': '작성 완료!'})


@app.route("/api/post", methods=['GET'])
def post_get():
    # object id 구하는 코드
    posts_list = list(db.content.find({}))
    object_id_li = []
    object_id_list = []
    for i in posts_list:
        i['_id'] = str(i)
        object_id_li.append(i)
    for j in range(0, len(posts_list)):
        object_id_list.append(object_id_li[j]['_id'][18:42])

    return jsonify({'contents': posts_list})


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/signup')
def signup():
    return render_template('signup.html')


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)

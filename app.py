from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('mongodb+srv://test:sparta@cluster0.fjqxvob.mongodb.net/?retryWrites=true&w=majority')
db = client.dbsparta


# 라우트 작업
@app.route('/')
def home():
    return render_template('index.html')


@app.route('/signup')
def signup_page():
    return render_template('signup.html')


@app.route('/postAdd')
def post_page():
    return render_template('postAdd.html')

# 기능 구현 작업
# 1. 게시글 작성
@app.route('/api/post', methods=['POST'])
def post_add():
    content_receive = request.form['content_give']

    doc = {'content': content_receive}

    db.content.insert_one(doc)

    return jsonify({'msg': '작성 완료!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)

$(document).ready(function () {
    post_get()
});

let user_infos = null
let user_name = null

if (document.cookie) {
    $.ajax({
        type: 'GET',
        url: '/api/users_info',
        data: {},
        success: function (response) {
            user_infos = JSON.parse(response['user_infos'])['$oid']
            user_name = JSON.parse(response['user_nick'])
            $('#nickname_tag').text(`${user_name}`)
        }
    })

    let html_temp = `
                    <p class="hello"><span id="nickname_tag"></span>님 안녕하세요.</p>
                    <button id="logout-btn" class="btn btn-danger" onclick="logout()" style="width: 100px">로그아웃</button>
                        <a href="#">
                            <a href="/postAdd">
                                <button id="posting-btn" class="btn btn-dark" style="width: 100px">글쓰기</button>
                            </a>
                        </a>
                    `
    $("#none-user").append(html_temp)
} else if (!document.cookie) {
    user_infos = null

    let html_temp = `
                     <div class="login-forms">
                        <div class="input-group input-group-sm mb-3">
                            <input id="userEmailInput" type="text" class="form-control" aria-label="Sizing example input"
                                   aria-describedby="inputGroup-sizing-sm" placeholder="아이디를 입력하세요">
                        </div>
                        <div class="input-group input-group-sm mb-2 input-pw">
                            <input id="userPassword" type="password" class="form-control" aria-label="Sizing example input"
                                   aria-describedby="inputGroup-sizing-sm" placeholder="비밀번호를 입력하세요">
                        </div>
                    </div>
                    <div class="login-btn-wrapper">
                        <button id="signup-btn" class="btn btn-link" onclick="location.href = '/signup'">회원가입</button>
                        <button id="login-btn" class="btn btn-primary" onclick="login()">로그인</button>
                    </div>
                    <div class="find-email">
                        <a onclick="onClick()">이메일을 찾으시나요?</a>
                    </div>
                    `
    $("#here-user").append(html_temp)
}

// 아이디 찾기 요청
function onClick() {
    alert('페이지 기획중입니다...')
}

// 회원가입 페이지로 이동
function moveToSignupPage() {
    window.location.replace('/signup')
}

// 로그인 요청
function login() {
    let user_email = $("#userEmailInput").val()
    let user_pw = $("#userPassword").val()

    if (!user_email) {
        alert("이메일을 입력해주세요.")
        return false
    } else if (!user_pw) {
        alert("비밀번호를 입력해주세요.")
    } else {
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: {
                "email_give": user_email,
                "pw_give": user_pw
            },
            success: function (response) {
                console.log(response)
                if (response['result'] === 'success') {
                    $.cookie('user_token', response['token']);

                    alert('로그인 완료!')
                    window.location.replace('/')
                } else {
                    alert(response['msg'])
                }
            }
        })
    }
}

// 로그아웃
function logout() {
    $.removeCookie('user_token', {path: '/'});
    alert('로그아웃!')
    window.location.href = '/'
}

// 게시글 불러오기
function post_get() {
    $.ajax({
        type: "GET",
        url: '/api/post', data: {},
        success: function (response) {
            if (!response['contents']) {
                $(`#posted_post`).append(`<h5>게시글이 없습니다. 글을 작성해주세요.</h5>`)
            } else {
                let rows = JSON.parse(response['contents'])
                let post_html = ""

                for (let i = 0; i < rows.length; i++) {
                    let post_id = rows[i]['_id']['$oid']
                    let comments_lists = rows[i]['comments']
                    let comments = rows[i]['comments'][0]
                    let posted_content = rows[i]['content']

                    // user의 post를 찾는다.
                    let post_user_id = rows[i]['user_id']['$oid']
                    let user_id = user_infos
                    if (comments) {
                        console.log("조건문 rows: ", post_user_id)
                        console.log("조건문 user: ", user_id)

                        // todo: delete_post(post_user_id)...
                        // todo: 생성된 tag 안에 onclick 함수 생성 -> 매개변수로 post_user_id 넘기기 : 139, 172번째 삭제 버튼
                        // todo: post_user_id는 post의 _id이고, user_id는 user의 _id이다.
                        post_html = `
                            <!--게시글-->
                            ${post_user_id === user_id ? `<button id="delete_post_btn"  style="width:200px" onclick="delete_post('${post_id}')">내 글 삭제하기</button>` : `<p><p>`}

                            <div class="main-post">
                                ${posted_content}
                            </div>
                            <div class="input-group mb-3">
                                <input id = '${post_id}' type="text" class="form-control" placeholder="댓글을 작성해 주세요!"
                                    aria-label="댓글을 작성해 주세요!"
                                    aria-describedby="button-addon2"
                                    >
                                <input id="${post_id}" type="hidden" value="${post_id}">
                                <button onclick="postComments('${post_id}')" class="btn btn-outline-secondary" type="button" id="button-addon2">작성
                                </button>
                            </div>
                            
                            <table class="visual-comment">
                                <tr>
                                    <div id="${post_id}" class="list-group">
                                    
                                    ${comments_lists.map(function (value, index, array) {
                            let html_temp = `<div>${value['comments']}</div>`
                            return html_temp
                        })
                        }                        
                                    </div>
                                </tr>
                            </table>
                            <br>
                            </div>
                            `
                    } else if (!comments) {
                        post_html = `
                    <!--게시글-->
                    ${post_user_id === user_id ? `<button id="delete_post_btn"  style="width:200px" onclick="delete_post('${post_id}')">내 글 삭제하기</button>` : `<p><p>`}
                        <div class="main-post">
                                ${posted_content}
                        </div>
                        <div class="input-group mb-3">
                            <input id = '${post_id}' type="text" class="form-control" placeholder="댓글을 작성해 주세요!"
                                   aria-label="댓글을 작성해 주세요!"
                                   aria-describedby="button-addon2"
                                   >
                            <input id="${post_id}" type="hidden" value="${post_id}" name='${post_id}'>
                            <button onclick="postComments('${post_id}')" class="btn btn-outline-secondary" type="button" id="button-addon2">작성
                            </button>
                        </div>
                            <table class="visual-comment">
                                <tr>
                                    <div id="${post_id}" class="list-group">
                                    댓글을 달아주세요
                                    </div>
                                </tr>
                            </table>
                            <br>
                    </div>
                     <hr class="comment-top-hr">
                    <br><br>`
                    }
                    $(`#posted_post`).append(post_html)
                }
            }
        }
    });
}

// 게시글 삭제
function delete_post(post_id) {
    $.ajax({
        type: 'POST',
        url: '/post/delete/postid',
        data: {'post_id_value_give': post_id},
        success: function (response) {
            window.location.reload()
            alert(response['msg'])
        }
    })
}

// 게시글에 댓글달기
function commentToPost() {
    $.ajax({
        type: "GET", url: '/api/comment', data: {}, success: function (response) {
            let rows2 = response['comments']
            for (let i = 0; i < rows2.length; i++) {
                let showComment = rows2[i]['comment_content']
                let commentToPostID = rows2[i]['post_id']


                let getComment_html = `<li>${showComment}</li>`
                $(`#${commentToPostID}`).append(getComment_html)
                $(`#${commentToPostID}`).append(getComment_html)
            }

        }
    })
}

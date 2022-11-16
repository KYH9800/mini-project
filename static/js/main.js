$(document).ready(function () {
    post_get()
});

console.log("cookie: ", document.cookie)

if (document.cookie) {
    let html_temp = `
                    <p>{{user_nickname}} 안녕하세요</p>
                    <button id="logout-btn" class="btn btn-danger" onclick="logout()">로그아웃</button>
                        <a href="#">
                            <a href="/postAdd">
                                <button id="posting-btn" class="btn btn-primary">글쓰기</button>
                            </a>
                        </a>
                    `
    $("#none-user").append(html_temp)
} else if (!document.cookie) {
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
                    <button id="signup-btn" class="btn btn-dark" onclick="location.href = '/signup'">회원가입</button>
                    <button id="login-btn" class="btn btn-dark" onclick="login()">로그인</button>
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
                user = $.cookie('user_token', response['token']);

                alert('로그인 완료!')
                window.location.replace('/')
            } else {
                alert(response['msg'])
            }
        }
    })
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
        type: "GET", url: '/api/post',
        data: {},
        success: function (response) {
            console.log(response)
            let rows = JSON.parse(response['content'])
            for (let i = 0; i < rows.length; i++) {
                let posted_content = rows[i]
                let post_id = rows[i]['_id']['$oid']
                let comments = rows[i]['comment']
                let contents = rows[i]['contents']

                console.log(posted_content, post_id, comments, contents)
            }
        }
    })
}

//             let post_html = `
//                                 <!--게시글-->
//                                 <textarea className="main-post container" name="" disabled>
//                                     ${posted_content}
//
//                                 </textarea>
//                                     <div class="input-group mb-3">
//                                         <input id = '${objID}' type="text" class="form-control" placeholder="댓글을 작성해 주세요!"
//                                                aria-label="댓글을 작성해 주세요!"
//                                                aria-describedby="button-addon2"
//                                                >
//                                         <input id="${objID + 'a'}" type="hidden" value="${objID}">
//                                         <button onclick="postComments('${objID}')" class="btn btn-outline-secondary" type="button" id="button-addon2">작성
//                                         </button>
//                                     </div>
//                                 </div>
//                                  <hr className="comment-top-hr">
//
//                                 <br><br>`
//
//             let getComment_html = `<table className="visual-comment">
//                                             <tr>
//                                                 <ul className="list-group">
//                                                     <li>${posted_comment}</li>
//                                                 </ul>
//                                             </tr>
//                                         </table>
//                                         <br>`
//
//             $("#posted_comment").append(getComment_html)
//             $("#posted_post").append(post_html)
//         }
//     }
// }

// )


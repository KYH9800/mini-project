$(document).ready(function () {
    post_get()
});


function post_get() {
    $.ajax({
        type: "GET", url: '/api/post', data: {}, success: function (response) {
            let rows = JSON.parse(response['contents'])
            let post_html = ""
            for (let i = 0; i < rows.length; i++) {
                let post_id = rows[i]['_id']['$oid']
                let comments_lists = rows[i]['comments']
                let comments = rows[i]['comments'][0]
                let posted_content = rows[i]['content']

                if (comments) {
                    post_html = `
                    <!--게시글-->
                    <textarea class="main-post container"  disabled>
                        ${posted_content}
                    </textarea>
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
                                    
                                    ${comments_lists.map(function (value,index,array){
                                        let html_temp = `<div>${value['comments']}</div>`                       
                        
                                        return html_temp
                                        })
                                    }                        
                                    </div>
                                </tr>
                            </table>
                            <br>
                    </div>
                    
                     <hr class="comment-top-hr">

                    <br><br>`
                } else if (!comments) {
                    post_html = `
                    <!--게시글-->
                    <textarea class="main-post container"  disabled>
                        ${posted_content}
                    </textarea>
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
    });
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

function logout() {
    $.removeCookie('mytoken');
    alert('로그아웃!')
    window.location.href = '/login'
}
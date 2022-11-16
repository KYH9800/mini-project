$(document).ready(function () {
    post_get()
});

function post_get() {
    $.ajax({
        type: "GET", url: '/api/post', data: {}, success: function (response) {
            let rows = response['contents']


            let object_id_arr = [];
            for (let i = 0; i < rows.length; i++) {
                let posted_content = rows[i]['content']
                let post_id = rows[i]['_id']
                object_id_arr = post_id.split(',')
                let object_id_obj = object_id_arr[0]
                let objID = object_id_obj.split(':')[1]
                object_id_arr = objID.split(/[',']/)
                objID = object_id_arr[1]
                let post_html = `
                                <!--게시글-->
                                <textarea className="main-post container" name="" disabled>
                                    ${posted_content}
                                    
                                </textarea>
                                    <div class="input-group mb-3">
                                        <input id = '${objID}' type="text" class="form-control" placeholder="댓글을 작성해 주세요!"
                                               aria-label="댓글을 작성해 주세요!"
                                               aria-describedby="button-addon2"
                                               >
                                        <input id="${objID + 'a'}" type="hidden" value="${objID}">
                                        <button onclick="postComments('${objID}')" class="btn btn-outline-secondary" type="button" id="button-addon2">작성
                                        </button>
                                    </div>
                                </div>
                                 <hr className="comment-top-hr">
                
                                <br><br>`

                let getComment_html = `<table className="visual-comment">
                                            <tr>
                                                <ul className="list-group">
                                                    <li>${posted_comment}</li>
                                                </ul>
                                            </tr>
                                        </table>
                                        <br>`

                $(#posted_comment).append(getComment_html)
                $(#posted_post).append(post_html)
            }
        }
    });
}

function logout() {
    console.log("this logout")
    $.removeCookie("user_token")
    alert('로그아웃!')
    window.location.href = '/login'
}

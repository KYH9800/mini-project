function postComments(PostobjID, user_id) {
    let post_obj = PostobjID
    let comment_content = $(`#${PostobjID}`).val()
    console.log('넘겨받은 유저 아디', user_id)

    if (document.cookie) {
        if (!comment_content) {
            alert("글을 입력해 주세요.")
        } else {
            $.ajax({
                type: 'POST',
                url: '/api/comment',
                data: {
                    'post_id_give': post_obj,
                    'comment_content_give': comment_content,
                    'user_id_give': user_id
                },
                success: function (response) {
                    window.location.reload()
                }
            });
        }
    } else {
        alert("댓글을 작성하기 위해서는 로그인이 필요합니다.")
    }
}


function postComments(objID) {
    let obj = objID
    let comment_content = $(`#${objID}`).val()

    if (document.cookie) {
        if (!comment_content) {
            alert("글을 입력해 주세요.")
        } else {
            $.ajax({
                type: 'POST',
                url: '/api/comment',
                data: {
                    'post_id_give': obj,
                    'comment_content_give': comment_content,
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


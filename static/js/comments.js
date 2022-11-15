function postComments(postId) {
    let postComment = $(`#input-comment`).val()
    console.log(postComment)
    $.ajax({
        type: 'POST',
        url: '/api/comment',
        data: {
            'post_id' : postId,
            'comments_give': postComment
        },
        success: function (response) {
            window.location.reload()
        }
    });
}





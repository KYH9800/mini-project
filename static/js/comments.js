function postComments() {
    let postComment = $(`#input-comment`).val()
    let objID = $(`#objValue`).val()
    $.ajax({
        type: 'POST',
        url: '/api/comment',
        data: {
            'comments_give': postComment,
            'post_id_give' : objID
        },
        success: function (response) {
            window.location.reload()
        }
    });
}





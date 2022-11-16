function postComments(objID) {
    let obj = objID
    let comment_content = $(`#${objID}`).val()
    $.ajax({
        type: 'POST',
        url: '/api/comment',
        data: {
            'post_id_give': obj,
            'comment_content_give': comment_content
        },
        success: function (response) {
            window.location.reload()
        }
    });
}
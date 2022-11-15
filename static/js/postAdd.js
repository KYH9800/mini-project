function post_add() {
    let content = $('#content').val()

    $.ajax({
        type: 'POST',
        url: '/api/post',
        data: {
            'content_give': content
        },
        success: function (response) {
            alert(response['msg'])
        }
    })
}
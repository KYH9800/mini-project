$(document).ready(function () {
    getComments()
});

function postComments() {
    let postComment = $('#post-comment').val()
    $.ajax({
        type: 'POST',
        url: '/api/comment',
        data: {
            'comments_give': postComment
        },
        success: function (response) {
            console.log(response)
            window.location.reload()
        }
    })
}


function getComments() {
    $.ajax({
        type: "GET",
        url: '/api/comment',
        data: {},
        success: function (response) {
            let rows = response['comments']


            for (let i = 0; i < rows.length; i++) {
                let posted_comment = rows[i]['comment']

                let tempHtml = `
                <li class="list-group-item">${posted_comment}</li>
                `
                $('#get-comment').append(tempHtml)

            }
            let howManyComments = `
                        <p>댓글 (${rows.length})개</p> 
      
                    `
            $('#how-many-comments').append(howManyComments)

        }
    });
}

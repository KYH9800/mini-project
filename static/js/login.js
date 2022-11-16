function onClick() {
    alert('페이지 기획중입니다...')
}

function moveToSignupPage() {
    window.location.replace('/signup')
}

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

                alert('로그인 완료!')
                window.location.replace('/')
            } else {
                alert(response['msg'])
            }
        }
    })
}
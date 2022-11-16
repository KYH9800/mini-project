// 가입 조건 충족 상태
let email_accession_condition = false
let nickname_accession_condition = false
// 가입 완료 여부
let signup_condition = true

// 로그인 페이지로 이동
function moveToLoginPage() {
    window.location.replace('/login')
}

// 이메일 중복확인
function emailCheck() {
    let email = $('#user-email').val()
    console.log(`${email}: 이메일 중복확인`)
    $.ajax({
        type: "GET",
        url: `/api/signup_email_check`,
        data: {
            'email_give': email
        },
        success: function (response) {
            console.log(!JSON.parse(response['users']))
            if (!JSON.parse(response['users'])) {
                $('#alert-email-check').text('사용가능한 이메일 입니다.').css("color", "blue");
                email_accession_condition = true
            } else if (Boolean(JSON.parse(response['users'])['email'])) {
                $('#alert-email-check').text('이미 사용중인 이메일 입니다.').css("color", "red");
                email_accession_condition = false
            }
        }
    })
}
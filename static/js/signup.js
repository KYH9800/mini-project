// 가입 조건 충족 상태
let email_accession_condition = false
let nickname_accession_condition = false
// 가입 완료 여부
let signup_condition = true


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

// 닉네임 중복확인
const nicknameCheck = () => {
    let nickname = $('#user-nickname').val()
    console.log(`${nickname}:닉네임 중복확인`)

    $.ajax({
        type: "GET",
        url: `/api/signup_nickname_check`,
        data: {
            'nickname_give': nickname
        },
        success: function (response) {
            console.log(!JSON.parse(response['users']))
            if (!JSON.parse(response['users'])) {
                $('#alert-nickname-check').text('사용가능한 닉네임 입니다.').css("color", "blue");
                nickname_accession_condition = true
            } else if (Boolean(JSON.parse(response['users'])['nickname'])) {
                $('#alert-nickname-check').text('이미 사용중인 닉네임 입니다.').css("color", "red");
                nickname_accession_condition = false
            }
        }
    })
}

// 가입하기
function onClickSignup() {
    if(!signup_condition) {
        return alert("가입이 완료된 상태입니다.")
    }

    let email = $('#user-email').val()
    let nickname = $('#user-nickname').val()
    let password = $('#password').val()
    let passwordCheck = $('#password-check').val()

    // 비밀번호 조건 확인
    let pw = $("#password").val();
    let num = pw.search(/[0-9]/g);
    let eng = pw.search(/[a-z]/ig);

    // 비밀번호 조건 확인
    if (pw.search(/\s/) !== -1) {
        $('#alert-password').text('비밀번호는 공백 없이 입력해주세요.').css("color", "red");
        return false;
    } else if (pw.length < 8) {
        $('#alert-password').text('비밀번호는 8자리 이상, 숫자 + 문자 조합으로 이루어져야 합니다.').css("color", "red");
        return false
    } else if (num < 0 || eng < 0) {
        $('#alert-password').text('영문,숫자를 혼합하여 입력해주세요.').css("color", "red");
        return false;
    } else {
        $('#alert-password').text('사용가능한 비밀번호입니다.').css("color", "blue");
    }

    // 비밀번호 일치 확인
    if (password !== passwordCheck) {
        $('#alert-password-check').text('비밀번호가 일치하지 않습니다.').css("color", "red");
        return false
    } else if (password === passwordCheck) {
        $('#alert-password-check').text('비밀번호가 일치합니다.').css("color", "blue");
    }

    // 공백란 확인
    if (!email) {
        alert("이메일을 입력해주세요.")
    } else if (!nickname) {
        alert("닉네임을 입력해주세요.")
    } else if (!password) {
        alert("비밀번호를 입력해주세요.")
    } else if (!passwordCheck) {
        alert("비밀번호를 확인해주세요.")
    }

    // 중복확인 여부 확인
    if (!email_accession_condition) {
        return alert("이메일 중복확인이 필요합니다.")
    } else if (!nickname_accession_condition) {
        return alert("닉네임 중복확인이 필요합니다.")
    }

    $('#alert-email-check').text('사용가능한 이메일 입니다.').css("color", "blue");
    $('#alert-nickname-check').text('사용가능한 닉네임 입니다.').css("color", "blue");

    $.ajax({
        type: "POST",
        url: "/api/signup",
        data: {
            'email_give': email,
            'nickname_give': nickname,
            'password_give': password
        },
        success: function (response) {
            alert(response["msg"])
            signup_condition = false
            window.location.replace('/')
        }
    })
}
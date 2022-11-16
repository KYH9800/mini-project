// function onClick() {
//     alert('페이지 기획중입니다...')
// }
//
// function moveToSignupPage() {
//     window.location.replace('/signup')
// }
//
// function login() {
//     let user_email = $("#userEmailInput").val()
//     let user_pw = $("#userPassword").val()
//     console.log("sdfs", user_email)
//     console.log(" sdfsdf", user_pw)
//
//     if (!user_email) {
//         alert("이메일을 입력해주세요.")
//         return false
//     } else if (!user_pw) {
//         alert("비밀번호를 입력해주세요.")
//     } else {
//         $.ajax({
//             type: 'POST',
//             url: '/api/login',
//             data: {
//                 "email_give": user_email,
//                 "pw_give": user_pw
//             },
//             success: function (response) {
//                 console.log(response)
//                 if (response['result'] === 'success') {
//                     $.cookie('user_token', response['token']);
//
//                     alert('로그인 완료!')
//                     window.location.replace('/')
//                 } else {
//                     alert(response['msg'])
//                 }
//             }
//         })
//     }
// }
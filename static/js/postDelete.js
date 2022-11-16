// $(document).ready(function () {
//     show_order();
// });
// // const delete_onClick = document.querySelector("#delete_post_btn")
// // delete_onClick.addEventListener('click', delete_post())
//
// function show_order() {
//     $.ajax({
//         type: 'GET',
//         url: '/api/post',
//         data: {},
//         success: function (response) {
//             console.log(response['orders'])
//             let rows = response['contents']
//             let object_id_arr = [];
//
//             for (let i = 0; i < rows.length; i++) {
//                 let posted_content = rows[i]['content']
//                 let post_id = rows[i]['_id']
//                 object_id_arr = post_id.split(',')
//                 let object_id_obj = object_id_arr[0]
//                 let objID = object_id_obj.split(':')[1]
//                 object_id_arr = objID.split(/[',']/)
//                 objID = object_id_arr[1]
//                 let post_html = `
//                                 <!--삭제버튼-->
//                                 <tr>
//                                     <td><button type="button"  onclick = "delete_contents(${post_id})"  class="btn btn-danger">게시물 삭제</button> </td>
//                                 </tr>
//                                 <!--게시글-->
//                                 <textarea className="main-post container" name="" disabled>
//                                 ${posted_content}
//                                 </textarea>
//                                 <div class="input-group mb-3">
//                                     <input id = '${objID}' type="text" class="form-control" placeholder="댓글을 작성해 주세요!"
//                                            aria-label="댓글을 작성해 주세요!"
//                                            aria-describedby="button-addon2"
//                                            >
//                                     <input id="${objID + 'a'}" type="hidden" value="${objID}">
//                                     <button onclick="postComments('${objID}')" class="btn btn-outline-secondary" type="button" id="button-addon2">
//                                         작성
//                                     </button>
//                                 </div>
//                                 <hr className="comment-top-hr">
//                                 <br><br>`
//
//                 let getComment_html = `<table className="visual-comment">
//                                             <tr>
//                                                 <ul className="list-group">
//                                                     <li>${posted_comment}</li>
//                                                 </ul>
//                                             </tr>
//                                         </table>
//                                         <br>`
//                 $(#posted_comment).append(getComment_html)
//                 $(#posted_post).append(post_html)
//             }
//
//         }
//     });
// }

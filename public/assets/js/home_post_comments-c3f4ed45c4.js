class PostComments{constructor(e){this.postId=e,this.postContainer=$("#post-"+e),this.newCommentForm=$(`#post-${e}-comments-form`),this.createComment(e);let t=this;$(" .delete-comment-button",this.postContainer).each(function(){t.deleteComment($(this))})}createComment(t){let o=this;this.newCommentForm.submit(function(e){e.preventDefault();$.ajax({type:"post",url:"/comments/create",data:$(this).serialize(),success:function(e){e=o.newCommentDom(e.data.comment);$("#post-comments-"+t).prepend(e),o.deleteComment($(" .delete-comment-button",e)),new ToggleLike($(".toggle-like-button",e)),new Noty({theme:"relax",text:"Comment published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})})}newCommentDom(e){return $(`<li id="comment-${e._id}">
            <p>
                <small>
                    <a class="delete-comment-button" href="/comments/destroy/${e._id}">X</a>
                </small>
                ${e.content} 
                <br>
                <small>
                    ${e.user.name}
                </small> 
                <br>
                <small>
                        <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${e._id}&type=Comment">
                        ${e.likes.length} Likes
                        </a>
                    
                </small>
            </p>
        </li>`)}deleteComment(t){$(t).click(function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(e){$("#comment-"+e.data.comment_id).remove(),new Noty({theme:"relax",text:"Comment Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})})}}
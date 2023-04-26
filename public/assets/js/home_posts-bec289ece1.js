{let t=function(){let e=$("#new-post-form");e.submit(function(t){t.preventDefault(),$.ajax({type:"post",url:"/posts/create",data:e.serialize(),success:function(t){console.log(t);var e=o(t.data.post);$("#posts-list-container>ul").prepend(e),s($(" .delete-post-button",e)),new PostComments(t.data.post._id),new ToggleLike($(".toggle-like-button",e)),new Noty({theme:"relax",text:"Post published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})})},o=function(t){return $(`<li id="post-${t._id}">
                <p>
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${t._id}">X</a>
                    </small>
                    ${t.content}
                    <br>
                    <small>
                    ${t.user.name}
                    </small>
                    <br>
                    <small>
                            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${t._id}&type=Post">
                            ${t.likes.length} Likes
                            </a>
                        
                    </small>
                </p>
                
                <div class="post-comments">
            
                        <form id="post-${t._id}-comments-from" action="/comments/create" method="POST">
                        <input type="text" required placeholder="Type here to add comment..." name="content">
                        <input type="hidden" name="post" value="${t._id}">
                        <input type="submit" value="Add Comment">
                        </form>
                        
                    <div class="post-comments-list">
                        <ul id="post-comments- ${t._id}">
                        </ul>
                    </div> 
                </div>
            </li>`)},s=function(e){$(e).click(function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(t){$("#post-"+t.data.post_id).remove(),new Noty({theme:"relax",text:"Post deleted!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})})},e=function(){$("#posts-list-container>ul>li").each(function(){var t=$(this),e=$(" .delete-post-button",t),e=(s(e),t.prop("id").split("-")[1]);new PostComments(e)})};t(),e()}
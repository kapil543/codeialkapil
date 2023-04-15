class ToggleFriendship{
    constructor(toggleElement){
      
        // assign element
        this.toggler=toggleElement;
        // assign a function to the element
        this.toggleFriendship();
        this.checkFriendship();
    }
     
    toggleFriendship(){ 
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self=this;

            // this is new way of writing ajax which you might've studied ,it looks like the same as promises
            $.ajax({
                type:'POST',
                url:$(self).attr('href'),
            })
            .done(function(data){
                let friendsCount=parseInt($(self).attr('data-Friendships'));
                console.log(friendsCount);
                if(data.data.deleted==true){
                    friendsCount-=1;
                    $(self).html(`Add Friend`);
                }else{
                    friendsCount+=1;
                    $(self).html(`Remove Friend`);
                }

                $(self).attr('data-likes',friendsCount);
            })
            .fail(function(errData){
                console.log('error in completing the request');
            });
        })

    }
};


// class ToggleFriendship {
//     constructor(toggleElement) {
//       // assign element
//       this.toggler = toggleElement;
//       // assign a function to the element
//       this.toggleFriendship();
//     }
//     toggleFriendship() {
//       console.log($(locals.user));
//       $(this.toggler).click(function(e) {
//         e.preventDefault();
//         let self = this;
  
//         // this is new way of writing ajax which you might've studied, it looks like the same as promises
//         $.ajax({
//             type: 'POST',
//             url: $(self).attr('href'),
//           })
//           .done(function(data) {
//             let friendsCount = parseInt($(self).attr('data-Friendships'));
//             console.log(friendsCount);
//             if (data.data.deleted == true) {
//               friendsCount -= 1;
//               $(self).html(`Add Friend`);
//             } else {
//               friendsCount += 1;
//               $(self).html(`Remove Friend`);
//             }
  
//             $(self).attr('data-Friendships', friendsCount);
//           })
//           .fail(function(errData) {
//             console.log('error in completing the request');
//           });
//       })
  
//     }
//   }
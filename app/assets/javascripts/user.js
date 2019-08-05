$(function() {

  var serach_result = $("#user-search-result")
  var add_user = $("#id")

  function appendProduct(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
                serach_result.append(html)
  }

  $(document).on("click", (".chat-group-user__btn--add"), function(){
    var user_id = $(this).attr('data-user-id')
    var user_name = $(this).attr('data-user-name')
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
                add_user.append(html)
                $(this).parent().remove();
  });

  $(document).on("click", (".js-remove-btn"), function(){
    $(this).parent().remove();
  });


  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
    if (users.length !== 0) {
      users.forEach(function(user){
        appendProduct(user);
      });
    }
    else {
      console.log(input);
    }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました')
    })
  });
});
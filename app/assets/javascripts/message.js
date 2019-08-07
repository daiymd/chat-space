$(function(){
// 最下部までスクロール
  // $(function() {
  //   $('.form__submit').click(function() {
  //     $('.right__contents__chat').animate({scrollTop: $('.right__contents__chat')[0].scrollHeight}, 'fast');
  //   });
  // });

  function buildMessage(message){
    message.image != null ? image = `<img src = '${message.image}'>` : image = ``
    var html = `<div class="message" id="num" data-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    <p class="lower-image">
                      ${image}
                    </p>
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.right__contents__chat').append(html);
      $('.right__contents__chat').animate({scrollTop: $('.right__contents__chat')[0].scrollHeight}, 'fast');
      $('.form__submit').removeAttr("disabled");
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('エラー')
      $('.form__submit').removeAttr("disabled");
    })
  })

  var group_id = $(".right__contents__header__group-name").data('id');
  var group_url = `/groups/${group_id}/api/messages`
  if (window.location.href.match(/\/groups\/\d+\/messages/)) {
  var reloadMessages = function() {
    last_message_id = $(".message:last").data('id');
    $.ajax({
      url: `/groups/${group_id}/api/messages`,
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
        messages.forEach(function(message){
          if (message.id > last_message_id){
              insertHTML += buildMessage(message);
              $('.right__contents__chat').append(insertHTML);
              var scroll = $('.right__contents__chat').scrollTop();
              $('.right__contents__chat').animate({scrollTop: scroll + 500}, 'fast');
          }
        });
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 5000);
}
});
$(function(){
// 最下部までスクロール
  $(function() {
    $('.form__submit').click(function() {
      $('.right__contents__chat').animate({scrollTop: $('.right__contents__chat')[0].scrollHeight}, 'fast');
    });
  });

  function buildMessage(message){
    if (message.image != null){
      var image = `<img src = '${message.image}'>`
    } 
    else{
      var image = ``
    }
    var html = `<div class="message">
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
                    ${image}
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
      $('.right__contents__chat').append(html)
      $('#message_content').val('')
      $('.form__submit').removeAttr("disabled");
    })
    .fail(function(){
      alert('エラー')
      $('.form__submit').removeAttr("disabled");
    })
  })
});
$(function(){
  function buildHTML(message){
    if ( message.image.url ) {
      let html =
        `<div class="MessageList__MessageBox" data-message-id=${message.id}>
          <div class="MessageList__MessageBox__MessageInfo">
            <div class="MessageList__MessageBox__MessageInfo__name">
              ${message.user_name}
            </div>
            <div class="MessageList__MessageBox__MessageInfo__date">
              ${message.created_at}
            </div>
          </div>
          <div class="MessageList__MessageBox__message">
            <p class="MessageList__MessageBox__message__body">
              ${message.body}
            </p>
            <img class="MessageList__MessageBox__message__image" src="${message.image.url}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="MessageList__MessageBox" data-message-id=${message.id}>
        <div class="MessageList__MessageBox__MessageInfo">
          <div class="MessageList__MessageBox__MessageInfo__name">
            ${message.user_name}
          </div>
          <div class="MessageList__MessageBox__MessageInfo__date">
            ${message.created_at}
          </div>
        </div>
        <div class="MessageList__MessageBox__message">
          <p class="MessageList__MessageBox__message__body">
            ${message.body}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.MessageForm__Form').on("submit", function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.MessageList').append(html);      
      $('form')[0].reset();
      $('.MessageList').animate({ scrollTop: $('.MessageList')[0].scrollHeight});
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.MessageForm__Form__send').prop('disabled', false);
    });
  })
})
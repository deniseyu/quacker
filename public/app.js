$(document).ready(function(){

  getQuacks();

  $('#quack-button').on('click', function(event){
    event.preventDefault();
    var content = { 'user': 'RubberDuckie',
                    'content': $('#quack-content').val(),
                    'date': new Date()
                  };
    if ($('#quack-content').val() === ''){
      alert('Quack must contain content!');
      return false;
    } else {
      $.ajax({
        type: 'POST',
        url: '/quacks',
        datatype: 'JSON',
        data: content
      }).done(function(res){
        clearQuacks();
        getQuacks();
        $('#quack-content').val('');
      });
    }
  });

  $('#quacks-feed').on('click', '.delete', function(event){
    event.preventDefault();
    var link = $(this);
    var quackID = $(this).data('id');
    $(this).html('you sure? <a href="#" class="yes">yes</a> | <a href="#" class="no">no</a>');
    $(this).on('click', '.yes', function(event){
      event.preventDefault();
      $.ajax({
        type: 'DELETE',
        url: '/quacks/' + quackID
      }).done(function(){
        clearQuacks();
        getQuacks();
      });
    });
    $(this).on('click', '.no', function(event){
      event.preventDefault();
      $(link).html('<a href="#" class="delete" data-id="'+quackID+'">delete</a>');
    });
  });
});

function getQuacks(){
  $.getJSON('/quacks', function(data){
    $.each(data, function(err, item){
      var source = $('#quacksTemplate').html();
      var template = Handlebars.compile(source);
      $('#quacks-feed').append(template(item));
    });
  });
}

function clearQuacks(){
  $('#quacks-feed').html('');
}


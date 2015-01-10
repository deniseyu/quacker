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
      });
    }
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


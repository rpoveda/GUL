$(function(){
	$('#loader').hide();
	$('.getFilmes').on('click', function(event){
		event.preventDefault();

		/*$.post('/links', function(data){
			$('#links').html(data);
		})*/
		$('#loader').show();
		$.ajax({
			url: '/links',
			type: 'POST',
			contentType: 'application/json',
			success: function(data){
				$('#links').html(data);
			},
			complete: function(data){
				$('#loader').hide();
			}
		});
	})
})
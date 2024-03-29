$(function() {

	var h = $('html').height();
	if(h > 400) {
		h = h;
	} else {
		h = 280;
	}

	$("#grid").flexigrid({
		url : '/evento/grid/',
		dataType : 'json',
		colModel : [
					{display : 'Codigo', name : 'idevento',	width : 45,	sortable : true, align : 'left', search : true}, 
					{display : 'Titulo',name : 'titulo',width : 300,sortable : true,align : 'left',search : true}, 
					{display : 'Data', name : 'dataEvento',width : 80,sortable : true,	align : 'left',	search : true}, 
					{display : 'Palestrante',name : 'nome', table:'usuario', width : 300, sortable : true,align : 'left',	search : true}, 
					{display : 'Duracao',name : 'duracao',	width : 70, sortable : true,align : 'left',	search : true}, 
					{display : 'Vagas',name : 'vagasDisponiveis',	width : 55, sortable : true,align : 'left',	search : false}, 
					],
		buttons : [
			// {name : 'Novo',	bclass : 'novo',onpress : doCommand}, 
			// {separator : true}, 
			{name : 'Novo', bclass : 'icon-file',onpress : doCommand	}, 
			// {name : 'Exibir CR', bclass : 'open',onpress : doCommand	}, 
			{name : 'Editar',displayInicial : 'hidden',	bclass : 'icon-pencil',onpress : doCommand	},
			// {name : 'Imprimir',displayInicial : 'hidden',	bclass : 'icon-print',onpress : doCommand	},
			],
		sortname : "dataEvento",
		sortorder : "desc",
		usepager : false,
		useRp : true,
		rp : 1000,
		height : 300,
		singleSelect : false,
		onSuccess : dbl,
		resizable : false
	});
	
	
	
});


function dbl() {
	$('#grid > tbody > tr').each(function() {
		$(this).click(function(e) {
			events();			
		})
	})
	events();
}

function events() {
	
			if($('#grid .trSelected').length == 1) {
				// $('[rel="Editar"]').css('display', 'block');
				$('[rel="editar"]').css('display', 'block');
			} else {
				$('[rel="editar"]').css('display', 'none');
				// $('[rel="Editar"]').css('display', 'none');
			}
			if($('#grid .trSelected').length >= 1) {
				$('[rel="Imprimir"]').css('display', 'block');
				// $('[rel="Excluir"]').css('display', 'block');
			} else {
				$('[rel="Imprimir"]').css('display', 'none');
				// $('[rel="Excluir"]').css('display', 'none');
			}
			
}


function doCommand(com, grid) {
	switch (com) {
		case 'Novo':
			loading('Carregando...', '/evento/formulario/');
			break;
		case 'Editar':
			var id = '';
			$('.trSelected', grid).each(function() {
				id = $(this).attr('id');
				id = id.substring(id.lastIndexOf('row') + 3);
			});
			loading('Carregando...', '/evento/formulario/' + id + '/');
			break;
		default:
			alert($('.trSelected', grid).length);
			break;
	}
}

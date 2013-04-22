var app = {

	initialize : function() {
		this.homeTpl = Handlebars.compile($("#home-tpl").html());
		$('body').html(this.homeTpl());
	}
};

app.initialize();
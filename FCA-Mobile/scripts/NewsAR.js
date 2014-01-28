(function (global) {
    var NewsARViewModel,
		app = global.app = global.app || {};

	NewsARViewModel = kendo.data.ObservableObject.extend({
	    NewsARDataSource: null,

		init: function () {
			var that = this,
				dataSource;

			kendo.data.ObservableObject.fn.init.apply(that, []);

			dataSource = new kendo.data.DataSource({
				transport: {
					read: {
					    url: "data/NewsAR.json",
					    contentType: "application/json; charset=utf-8",
					    type: "POST",
						dataType: "json"
					}
				}
			});

			that.set("NewsARDataSource", dataSource);
		}
	});

	app.NewsARService = {
	    viewModel: new NewsARViewModel()
	};
})(window);
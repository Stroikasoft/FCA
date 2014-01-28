(function (global) {
    var NewsViewModel,
		app = global.app = global.app || {};

	NewsViewModel = kendo.data.ObservableObject.extend({
		NewsDataSource: null,

		init: function () {
			var that = this,
				dataSource;

			kendo.data.ObservableObject.fn.init.apply(that, []);

			dataSource = new kendo.data.DataSource({
				transport: {
					read: {
						url: "data/News.json",
						dataType: "json"
					}
				}
			});

			that.set("NewsDataSource", dataSource);
		}
	});

	app.NewsService = {
	    viewModel: new NewsViewModel()
	};
})(window);
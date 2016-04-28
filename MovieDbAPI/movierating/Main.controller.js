sap.ui.controller("movierating.Main", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf movierating.Main
*/
	onInit: function() {
		var oModel = new sap.ui.model.json.JSONModel();
		$.ajax({
			url:"http://api.themoviedb.org/3/discover/movie?api_key={your_key}",
			dataType: 'json',
			success: function(response) {
				var data = response.results;
				oModel.setData(data);
			}
		});
		sap.ui.getCore().setModel(oModel);
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf movierating.Main
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf movierating.Main
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf movierating.Main
*/
//	onExit: function() {
//
//	}

});

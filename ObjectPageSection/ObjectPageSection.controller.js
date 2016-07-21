sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'
	], function(jQuery, Controller, JSONModel) {
	"use strict";

	var PageController = Controller.extend("sap.uxap.sample.ObjectPageSection.ObjectPageSection", {

		onInit: function () {

			// set explored app's demo model on this sample
			console.log("hi");
		},
		
		tabChanged : function(){
			console.log("hi");
		}
		
	});


	return PageController;

});
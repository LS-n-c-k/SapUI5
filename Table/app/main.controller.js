
sap.ui.controller("app.main", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf app.main
*/
	onInit: function() {
		var oModel = new sap.ui.model.json.JSONModel("http://services.odata.org/V3/Northwind/Northwind.svc/Customers?$format=json");

		sap.ui.getCore().setModel(oModel,"customer");


},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf app.main
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf app.main
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf app.main
*/
//	onExit: function() {
//
//	}
       
	
		//function for shorter button popup
		handleViewSettingsDialogButtonPressed: function (oEvent) {
			if (! sap.ui.getCore().byId("idmain1").getController()._oDialog) {
				sap.ui.getCore().byId("idmain1").getController()._oDialog = sap.ui.xmlfragment("app.Dialog", sap.ui.getCore().byId("idmain1").getController());
				sap.ui.getCore().byId("idmain1").getController()._oDialog.setModel(sap.ui.getCore().byId("idmain1").operatorModel);
			}
			jQuery.sap.syncStyleClass("sapUiSizeCompact", sap.ui.getCore().byId("idmain1"), sap.ui.getCore().byId("idmain1").getController()._oDialog);
			sap.ui.getCore().byId("idmain1").getController()._oDialog.open();
		},
 		
		//	confirmation for shorter popup
		handleConfirm: function(oEvent) {
 
			//var oView = sap.ui.getCore().getView();
			var oTable = sap.ui.getCore().byId("table");
 
			var mParams = oEvent.getParameters();
			var oBinding = oTable.getBinding("items");
 
			// apply sorter to binding
			// (grouping comes before sorting)
			
			var aSorters = [];
			
			var sPath = mParams.sortItem.getKey();
			var bDescending = mParams.sortDescending;
			aSorters.push(new sap.ui.model.Sorter(sPath, bDescending));
			oBinding.sort(aSorters);
			
			// apply filters to binding
			var aFilters = [];
			jQuery.each(mParams.filterItems, function (i, oItem) {
				var aSplit = oItem.getKey().split("___");
				var sPath = aSplit[0];
				var sOperator = aSplit[1];
				var sValue1 = aSplit[2];
				var sValue2 = aSplit[3];
				var oFilter = new sap.ui.model.Filter(sPath, sOperator, sValue1, sValue2);
				console.log(oFilter);
				aFilters.push(oFilter);
			});
			oBinding.filter(aFilters);
			
		}
});

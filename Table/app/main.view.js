jQuery.sap.require("sap.ui.core.util.MockServer");
sap.ui.jsview("app.main", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf app.main
	*/ 
	getControllerName : function() {
		return "app.main";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf app.main
	*/ 
	createContent : function(oController) {
		var app = new sap.m.App("myApp",{});
		
		//app.setBackgroundImage("img/3.jpg");

		var aColumn1 = [
			new sap.m.Column({
				header : new sap.m.Label({
					text : "Customer ID"
				})
			}),
			new sap.m.Column({
				header : new sap.m.Label({
					text : "Customer Name"
				})
			}),
			new sap.m.Column({
				header : new sap.m.Label({
					text : "Phone No"
				})
			})
    	];
		//var oType = new sap.ui.model.type.Date({source: {pattern: "timestamp"}, pattern: "dd.MM.yyyy"});
	
    	var oTemplate1 = new sap.m.ColumnListItem({
            cells : [
                new sap.m.Text({
                    text: "{customer>CustomerID}"
                }),
				 new sap.m.Text({
                    text: "{customer>ContactName}"
                }),
				 new sap.m.Text({
                    text: "{customer>Phone}"
                }),
			]
		});
		var oHeaderToolbar1 = new sap.m.Toolbar({
			content : [
			//sorting and filtering button
			new sap.m.Button({
					//text: "Activate",
					icon: "sap-icon://drop-down-list", 
					tap: [oController.handleViewSettingsDialogButtonPressed,oController]
				}),
				//Agent ID:number
				new sap.m.Text({
					text : "Customer Data || data source - http://services.odata.org/V3/Northwind/Northwind.svc/Customers ",
					wrapping : false,
					style: "bold"
				}),
				new sap.m.ToolbarSpacer(),
			]
		});
		
		//var date = new Date();
		
		//binding table for b page -1st tile     
		var oTable1 = new sap.m.Table({
		    id:"table",
        	headerToolbar : oHeaderToolbar1,
        	columns : aColumn1,
			mode : sap.m.ListMode.MultiSelect,
			growing : true,
			growingThreshold : 7
        });
    	oTable1.bindItems("customer>/value", oTemplate1);


		var page = new sap.m.Page({
			id : "page",
			title: "Test",
			showNavButton:false,
			content: [oTable1]
		});
			
		app.addPage(page);
		
		return app;
		
	}

});

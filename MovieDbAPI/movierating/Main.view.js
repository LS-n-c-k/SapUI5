sap.ui.jsview("movierating.Main", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf movierating.Main
	*/ 
	getControllerName : function() {
		return "movierating.Main";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf movierating.Main
	*/ 
	createContent : function(oController) {
		var oTable = new sap.ui.table.Table("tableId",{
			title:"Movies",
			visibleRowCount: 10,
			editable: false
		});
		
		oTable.addColumn(new sap.ui.table.Column({
			
			label: new sap.ui.commons.Label({text:"ID"}),
			visible: true,
			width: "100px",
			template: new sap.ui.commons.TextView({text:"{id}"})
			
		}));
		
		oTable.addColumn(new sap.ui.table.Column({
			
			label: new sap.ui.commons.Label({text:"Language"}),
			visible: true,
			width: "100px",
			template: new sap.ui.commons.TextView({text:"{original_language}"})
			
		}));
		
//		oTable.addColumn(new sap.ui.table.Column({
//			label : new sap.ui.commons.Label({text : "Poster"}),
//			visible: true,
//			template : new sap.ui.commons.Image().bindProperty("src","http://image.tmdb.org/t/p/w150/uXZYawqUsChGSj54wcuBtEdUJbh.jpg")
//		}));
		
		oTable.addColumn(new sap.ui.table.Column({
			
			label: new sap.ui.commons.Label({text:"Title"}),
			visible: true,
			width: "200px",
			template: new sap.ui.commons.TextView({text:"{original_title}"})
			
		}));
		
		oTable.addColumn(new sap.ui.table.Column({
			
			label: new sap.ui.commons.Label({text:"Overview"}),
			visible: true,
			template: new sap.ui.commons.TextView({text:"{overview}"})
			
		}));

		oTable.addColumn(new sap.ui.table.Column({
	
			label: new sap.ui.commons.Label({text:"Release Date"}),
			visible: true,
			width: "150px",
			template: new sap.ui.commons.TextView({text:"{release_date}"})
	
		}));

		oTable.addColumn(new sap.ui.table.Column({
	
			label: new sap.ui.commons.Label({text:"Popularity"}),
			visible: true,
			width: "100px",
			template: new sap.ui.commons.TextView({text:"{popularity}"})
	
		}));
		
		oTable.bindRows("/");
		
		var dataset = new sap.viz.ui5.data.FlattenedDataset({
			dimensions : [ {
				axis : 1,
                                name :"Movie",
				value : "{original_title}"
			}],
			
			measures : [ {
				name :"Popularity",
				value : "{popularity}"
			} ],

			data : {
				path : "/",
			}
		});

		var column = new sap.viz.ui5.Column({
			width : "95%",
			height : "400px",
			showLegend : false,
			plotArea : {
			//'colorPalette' : d3.scale.category20().range()
			},
			title : {
				visible : true,
				text : "Movies vs Popularity"
			},
			dataset : dataset
		});
		
		var ele = [oTable,column];
		
		return ele;
	}

});

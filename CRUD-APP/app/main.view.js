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
		
	
            var oMockServer = new sap.ui.core.util.MockServer({
                rootUri: "http://mymockserver/",
            });			
            oMockServer.simulate("model/metadata.xml", "model/");
            oMockServer.start();

            // setting up model
            var oModel = new sap.ui.model.odata.ODataModel("http://mymockserver/", true);
            sap.ui.getCore().setModel(oModel);
            
            
            /*****   CREATE Operation  *****/
            function openCreateDialog(){ 
                var oCreateDialog = new sap.ui.commons.Dialog();
                oCreateDialog.setTitle("Create user");
                var oSimpleForm = new sap.ui.layout.form.SimpleForm({
                    maxContainerCols: 2,
                    content:[
                        new sap.ui.core.Title({text:"Person"}),
                        new sap.ui.commons.Label({text:"Name"}),
                        new sap.ui.commons.TextField({value:""}),
                        new sap.ui.commons.Label({text:"Age"}),
                        new sap.ui.commons.TextField({value:""}),
                        new sap.ui.commons.Label({text:"Nick"}),
                        new sap.ui.commons.TextField({value:""}),
                        new sap.ui.commons.Label({text:"Status(Applications,Licenses,Companies)"}),
						new sap.ui.commons.TextField({value:""}) 
                    ]
                });                
                oCreateDialog.addContent(oSimpleForm);
                oCreateDialog.addButton(
                    new sap.ui.commons.Button({
                        text: "Submit", 
                        press: function() {
                            var content = oSimpleForm.getContent();
                            var oEntry = {};
                            oEntry.Name = content[2].getValue();
                            oEntry.Age = content[4].getValue();
                            oEntry.Nick = content[6].getValue();
                            oEntry.Status = content[8].getValue();
                            
                            sap.ui.getCore().getModel().create('/UserSet', oEntry, null, function(){
                                    oCreateDialog.close();
                                    sap.ui.getCore().getModel().refresh();
                                },function(){
                                    oCreateDialog.close();
                                    alert("Create failed");
                                }
                            );
                        }
                    })
                );
                oCreateDialog.open();
            };        
            
		
		var page1 = new sap.m.Page("page1",{
			title: "App",
			showNavButton:true,
			navButtonTap:function(){
				app.back();
			},
			footer: new sap.m.Bar({
					id: 'page1-footer',
					contentRight: [new sap.m.Button({icon:"sap-icon://add", text:"New", type: "Emphasized",
                                        press: function() {
                                             openCreateDialog();
									    }, 									
									})
							]
				}),
			content: [new sap.m.IconTabBar({
				expandable: false,
				items: [
						new sap.m.IconTabFilter({
						    icon: "sap-icon://customer",
						    text: "Users",
						    key: "Users"
						}),
							
						new sap.m.IconTabSeparator(),
						  new sap.m.IconTabFilter({
						    icon: "sap-icon://dimension",
						    text: "Applications",
						    key: "Applications"
						}),
						 new sap.m.IconTabSeparator(),
						  new sap.m.IconTabFilter({
						    icon: "sap-icon://resize",
						    text: "Licenses",
						    key: "Licenses"
					    }),
						 new sap.m.IconTabSeparator(),
						  new sap.m.IconTabFilter({
						    icon: "sap-icon://add-product",
						    text: "Companies",
						    key:"Companies"
						}),
						
				],
				select: function(oEvent) {
					var oBinding = this.getContent()[0].getBinding("items"),
						sKey = oEvent.getParameter("key"),
						oFilter;
					if (sKey == "Users") {
						oBinding.filter([]);
					}
					else {
						oFilter = new sap.ui.model.Filter("Status", "EQ", sKey);
						oBinding.filter([oFilter]);
					}
				},
				content: new sap.m.Table("list1", {
									growing: true,
									growingThreshold: 200,
									//mode: sap.m.ListMode.SingleSelect,
									columns: [
										new sap.m.Column({
											header: new sap.m.Label({text: "Name ( Job Title)"})
										}),
										new sap.m.Column({
											header: new sap.m.Label({text: "Age"})
										}),
										new sap.m.Column({
											header: new sap.m.Label({text: "Nick Name"})
										}),
										new sap.m.Column({
											header: new sap.m.Label({text: "Employee"})
										}),
									],
									items: {
										path: "/UserSet",
										template: new sap.m.ColumnListItem({
											cells: [
												new sap.m.Input({value : "{Name}", editable:false}),
												new sap.m.Input({value: "{Age}", editable:false}),
												new sap.m.Input({value: "{Nick}", editable:false}),
												new sap.m.RadioButton({ selected : true}),
											]
										})
									}
								})
			}),
		]
		});
		
		
		var app = new sap.m.App("myApp",{});

		app.setBackgroundImage("img/3.jpg");
		app.addPage(page1);
		
		
		return app;
		
	}

});
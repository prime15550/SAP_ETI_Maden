genel_veri_url = "https://servereti.herokuapp.com/genelveri"

sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./Popover2",
	"./utilities",
	"sap/ui/core/routing/History"
], function(BaseController, MessageBox, Popover2, Utilities, History) {
	"use strict";
	var data,kullanicilar,kull ; 
	var email,soyad,telefon,firma,isim,s=0;

	return BaseController.extend("com.sap.build.standard.etiMaden.controller.Menu_1", {
		handleRouteMatched: function(oEvent) {
			var sAppId = "App5f4a26c606057837f5db7d1d";

			var oParams = {};

			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;

			} else {
				if (this.getOwnerComponent().getComponentData()) {
					var patternConvert = function(oParam) {
						if (Object.keys(oParam).length !== 0) {
							for (var prop in oParam) {
								if (prop !== "sourcePrototype" && prop.includes("Set")) {
									return prop + "(" + oParam[prop][0] + ")";
								}
							}
						}
					};

					this.sContext = patternConvert(this.getOwnerComponent().getComponentData().startupParameters);

				}
			}

			var oPath;

			if (this.sContext) {
				oPath = {
					path: "/" + this.sContext,
					parameters: oParams
				};
				this.getView().bindObject(oPath);
			}

		},
		_onPageNavButtonPress: function() {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			var oQueryParams = this.getQueryParameters(window.location);

			if (sPreviousHash !== undefined || oQueryParams.navBackToLaunchpad) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("default", true);
			}

		},
		getQueryParameters: function(oLocation) {
			var oQuery = {};
			var aParams = oLocation.search.substring(1).split("&");
			for (var i = 0; i < aParams.length; i++) {
				var aPair = aParams[i].split("=");
				oQuery[aPair[0]] = decodeURIComponent(aPair[1]);
			}
			return oQuery;

		},
		_onButtonPress: function(oEvent) {

			var oBindingContext = oEvent.getSource().getBindingContext();

			return new Promise(function(fnResolve) {

				var i  = false ; 
				soyad= "";
				for(var i in kullanicilar)
				{
					var kull = kullanicilar[i]; 
					
					if(kull["_email"]==email)
					{
						email =kull["_email"]
						soyad =kull["_soyisim"]						
					}	
				}
				this.oRouter.navTo("OrderPage",{email:email},false );
			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		doNavigate: function(sRouteName, oBindingContext, fnPromiseResolve, sViaRelation) {
			var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
			var oModel = (oBindingContext) ? oBindingContext.getModel() : null;

			var sEntityNameSet;
			if (sPath !== null && sPath !== "") {
				if (sPath.substring(0, 1) === "/") {
					sPath = sPath.substring(1);
				}
				sEntityNameSet = sPath.split("(")[0];
			}
			var sNavigationPropertyName;
			var sMasterContext = this.sMasterContext ? this.sMasterContext : sPath;

			if (sEntityNameSet !== null) {
				sNavigationPropertyName = sViaRelation || this.getOwnerComponent().getNavigationPropertyForNavigationWithContext(sEntityNameSet, sRouteName);
			}
			if (sNavigationPropertyName !== null && sNavigationPropertyName !== undefined) {
				if (sNavigationPropertyName === "") {
					this.oRouter.navTo(sRouteName, {
						context: sPath,
						masterContext: sMasterContext
					}, false);
				} else {
					oModel.createBindingContext(sNavigationPropertyName, oBindingContext, null, function(bindingContext) {
						if (bindingContext) {
							sPath = bindingContext.getPath();
							if (sPath.substring(0, 1) === "/") {
								sPath = sPath.substring(1);
							}
						} else {
							sPath = "undefined";
						}

						// If the navigation is a 1-n, sPath would be "undefined" as this is not supported in Build
						if (sPath === "undefined") {
							this.oRouter.navTo(sRouteName);
						} else {
							this.oRouter.navTo(sRouteName, {
								context: sPath,
								masterContext: sMasterContext
							}, false);
						}
					}.bind(this));
				}
			} else {
				this.oRouter.navTo(sRouteName);
			}

			if (typeof fnPromiseResolve === "function") {
				fnPromiseResolve();
			}

		},
		_onButtonPress1: function(oEvent) {

			var oBindingContext = oEvent.getSource().getBindingContext();

			return new Promise(function(fnResolve) {
				this.oRouter.navTo("InfoPage_1",{email : email,soyad : soyad},false);

			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		_onButtonPress2: function(oEvent) {

			var oBindingContext = oEvent.getSource().getBindingContext();

			return new Promise(function(fnResolve) {

				this.oRouter.navTo("ContactPage",{email : email,soyad : soyad},false);
			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		_onButtonPress3: function(oEvent) {

			var oBindingContext = oEvent.getSource().getBindingContext();

			return new Promise(function(fnResolve) {

				this.doNavigate("UnderConstruction_1", oBindingContext, fnResolve, "");
			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		_onButtonPress4: function(oEvent) {

			var sPopoverName = "Popover2";
			this.mPopovers = this.mPopovers || {};
			var oPopover = this.mPopovers[sPopoverName];

			if (!oPopover) {
				oPopover = new Popover2(this.getView());
				this.mPopovers[sPopoverName] = oPopover;

				oPopover.getControl().setPlacement("Auto");

				// For navigation.
				oPopover.setRouter(this.oRouter);
			}

			var oSource = oEvent.getSource();

			oPopover.open(oSource);

		},
		_onButtonPress5: function(oEvent) {

			var oBindingContext = oEvent.getSource().getBindingContext();

			return new Promise(function(fnResolve) {
				this.oRouter.navTo("BasketPage",{email : email,soyad : soyad},false);
			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		_onButtonPress6: function(oEvent) {

			var oBindingContext = oEvent.getSource().getBindingContext();

			return new Promise(function(fnResolve) {
				var aControls = [{
					"groups": ["items"]
				}];
				for (var i = 0; i < aControls.length; i++) {
					var oControl = this.getView().byId(aControls[i].controlId);
					if (oControl) {
						for (var j = 0; j < aControls[i].groups.length; j++) {
							var sAggregationName = aControls[i].groups[j];
							var oBindingInfo = oControl.getBindingInfo(sAggregationName);
							if (oBindingInfo) {
								var oTemplate = oBindingInfo.template;
								oTemplate.destroy();
							}
						}
					}
				}
				this.doNavigate("StartPage_1", oBindingContext, fnResolve, "");
			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		}, OnExit :function()
		{
			this.getView().destroy();
		},ac : function()
		{
			if(s%2==0)
			{

			
			for(var i in kullanicilar)
				{
					
					kull = kullanicilar[i]; 
					
					if(kull["_email"]==email)
					{
						isim = kull["_isim"]+" "+kull["_soyisim"];	
						this.getView().byId("ss1").setValue(isim);	
		
						
						break; 
					}	
					
				}
				s++;
			}else
			{
				this.getView().byId("ss1").setValue(email);	
				s++;

			}
		},
		/*onBeforeRendering:function () {
			var sHash = window.location.hash;
			var t = sHash.split("/");
			 email = t[2]; 
			var oModel = new sap.ui.model.json.JSONModel();
			var oResourceBundle = this.getOwnerComponent()
				.getModel("i18n")
				.getResourceBundle();
			var url = oResourceBundle.getText("dataUrl1");

			oModel.loadData(url); 
			this.getView().setModel(oModel, "dataModel2");
			
			var oVieww = this.getView();
                var oModell = new sap.ui.model.json.JSONModel(genel_veri_url);
				oModel.attachEventOnce("requestCompleted", function() {
					data = JSON.parse(oModel.getJSON());
					kullanicilar = data["users"];
					
					oVieww.setModel(oModell, "fragmentModel");
					for(var i in kullanicilar)
					{
						
						var kull = kullanicilar[i]; 
						
						if(kull["_email"]==email)
						{
							email =kull["_email"];
							soyad =kull["_soyisim"];
							isim = kull["_isim"];
							
							alert(isim);
							


							
						}	
					}
					
				});
		},*/
		onInit: function() {
			
			var oView = this.getView();
			var sHash = window.location.hash;
			var t = sHash.split("/");
			 email = t[2]; 
			var oModel = new sap.ui.model.json.JSONModel();
			var oResourceBundle = this.getOwnerComponent()
				.getModel("i18n")
				.getResourceBundle();
			var url = oResourceBundle.getText("dataUrl1");

			oModel.loadData(url); 
			this.getView().setModel(oModel, "dataModel2");
			
			var oVieww = this.getView();
			
				
                var oModell = new sap.ui.model.json.JSONModel(genel_veri_url);
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("Menu_1").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			
			oModel.attachEventOnce("requestCompleted", function() {
				data = JSON.parse(oModel.getJSON());
				kullanicilar = data["users"];
				
				oVieww.setModel(oModell, "fragmentModel");
			
				
			});
			this.getView().byId("ss1").setValue(email);	
			
			
				
			

				

			

		}
	});
}, /* bExport= */ true);

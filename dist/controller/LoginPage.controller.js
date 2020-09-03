genel_veri_url = "https://servereti.herokuapp.com/genelveri"
sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",

	"sap/ui/core/routing/History"
], function(BaseController, MessageBox, Utilities, History) {
	"use strict";
	var data,kullanicilar ; 
	return BaseController.extend("com.sap.build.standard.etiMaden.controller.LoginPage", {
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
		_onPageNavButtonPress: function(oEvent) {

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

		},
		doNavigate: function(sRouteName, oBindingContext, fnPromiseResolve, sViaRelation) {
			this.oRouter.navTo(sRouteName);

		},
		_onButtonPress: function(oEvent) {

			var oBindingContext = oEvent.getSource().getBindingContext();

			return new Promise(function(fnResolve) {
				var i  = false ; 
				var email = "",soyad= "";
				for(var i in kullanicilar)
				{
					var kull = kullanicilar[i]; 
					
					if(kull["_email"]==this.getView().byId("username").getValue()&&kull["_sifre"]==this.getView().byId("password").getValue())
					{
						email =kull["_email"]
						soyad =kull["_soyisim"]

						i = true;
					}
					
					
				}
				if(i == true)
					{

						this.oRouter.navTo("Menu_1",{email : email,soyad : soyad},false);

					}else
					{
						alert("Şifre yada Kullanici Adi Yanlış")
					}
				
			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		_onButtonPress1: function() {
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
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("LoginPage").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			var oModel = new sap.ui.model.json.JSONModel();
			var oResourceBundle = this.getOwnerComponent()
				.getModel("i18n")
				.getResourceBundle();
			var url = oResourceBundle.getText("dataUrl1");

			oModel.loadData(url); 
			this.getView().setModel(oModel, "dataModel2");

			var oVieww = this.getView();
                var oModell = new sap.ui.model.json.JSONModel(genel_veri_url);
                oModel.attachRequestCompleted(function () {
                    data = JSON.parse(oModel.getJSON());
					kullanicilar = data["users"];
                    oVieww.setModel(oModell, "fragmentModel");
                });
		},
	
		
	});
}, /* bExport= */ true);

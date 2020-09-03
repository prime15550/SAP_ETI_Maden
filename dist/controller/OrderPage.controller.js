sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./Popover1",
	"./utilities",
	"sap/ui/core/routing/History"
], function(BaseController, MessageBox, Popover1, Utilities, History) {
	"use strict";
	var email,data,userdata=[];
	return BaseController.extend("com.sap.build.standard.etiMaden.controller.OrderPage", {
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
		_onRowPress: function(oEvent) {

			var sPopoverName = "Popover1";
			this.mPopovers = this.mPopovers || {};
			var oPopover = this.mPopovers[sPopoverName];

			if (!oPopover) {
				oPopover = new Popover1(this.getView());
				this.mPopovers[sPopoverName] = oPopover;

				oPopover.getControl().setPlacement("Auto");

				// For navigation.
				oPopover.setRouter(this.oRouter);
			}

			var oSource = oEvent.getSource();

			oPopover.open(oSource);

		},
		_onRowPress1: function(oEvent) {

			var sPopoverName = "Popover1";
			this.mPopovers = this.mPopovers || {};
			var oPopover = this.mPopovers[sPopoverName];

			if (!oPopover) {
				oPopover = new Popover1(this.getView());
				this.mPopovers[sPopoverName] = oPopover;

				oPopover.getControl().setPlacement("Auto");

				// For navigation.
				oPopover.setRouter(this.oRouter);
			}

			var oSource = oEvent.getSource();

			oPopover.open(oSource);

		},
		_onRowPress2: function(oEvent) {

			var sPopoverName = "Popover1";
			this.mPopovers = this.mPopovers || {};
			var oPopover = this.mPopovers[sPopoverName];

			if (!oPopover) {
				oPopover = new Popover1(this.getView());
				this.mPopovers[sPopoverName] = oPopover;

				oPopover.getControl().setPlacement("Auto");

				// For navigation.
				oPopover.setRouter(this.oRouter);
			}

			var oSource = oEvent.getSource();

			oPopover.open(oSource);

		},
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("OrderPage").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			var sHash = window.location.hash;
			var t = sHash.split("/");
			 email = t[2]; 
			 this.getView().byId("ss1").setValue(email);	
			 var oVieww = this.getView();
			 var oModel2 = new sap.ui.model.json.JSONModel();
				 oModel2.loadData("https://servereti.herokuapp.com/sepet"); 
				 oModel2.attachRequestCompleted(function () {
					 data= JSON.parse(oModel2.getJSON());
				 })
		 },_onButtonPress1 : function()
		 {
			 var userdata=[];
			 for(var i  in data)
			 {
				 if(data[i]["userEmail"]==email)
				 {
					
					 userdata.push(data[i]);
				 }
			 }
			 this.getView().byId("referansNo").setValue(userdata[0]["refaransNo"]);	
			 this.getView().byId("SiparisNo").setValue(userdata[0]["siparisNo"]);	
			 this.getView().byId("SiparisTarihi").setValue("20200904");	
			 this.getView().byId("urun").setValue(userdata[0]["ürün"]);	
			 this.getView().byId("miktar").setValue(userdata[0]["MiktarKonteyner"]);	
			 this.getView().byId("sevkiyatmiktar").setValue(userdata[0]["MiktarKonteyner"]);
			 var text1 = userdata[0]["aralik1"]+"-"+userdata[0]["aralik2"];	

			 this.getView().byId("sevkiyatTarihi").setValue(text1);
			 this.getView().byId("durum").setValue(userdata[0]["durum"]);




			 this.getView().byId("referansNo1").setValue(userdata[1]["refaransNo"]);	
			 this.getView().byId("SiparisNo1").setValue(userdata[1]["siparisNo"]);	
			 this.getView().byId("SiparisTarihi1").setValue("20200904");	
			 this.getView().byId("urun1").setValue(userdata[1]["ürün"]);	
			 this.getView().byId("miktar1").setValue(userdata[1]["MiktarKonteyner"]);	
			 this.getView().byId("sevkiyatmiktar1").setValue(userdata[1]["MiktarKonteyner"]);
			 var text1 = userdata[1]["aralik1"]+"-"+userdata[1]["aralik2"];	

			 this.getView().byId("sevkiyatTarihi1").setValue(text1);
			 this.getView().byId("durum1").setValue(userdata[1]["durum"]);

			 this.getView().byId("referansNo2").setValue(userdata[2]["refaransNo"]);	
			 this.getView().byId("SiparisNo2").setValue(userdata[2]["siparisNo"]);	
			 this.getView().byId("SiparisTarihi2").setValue("20200904");	
			 this.getView().byId("urun2").setValue(userdata[2]["ürün"]);	
			 this.getView().byId("miktar2").setValue(userdata[2]["MiktarKonteyner"]);	
			 this.getView().byId("sevkiyatmiktar2").setValue(userdata[2]["MiktarKonteyner"]);
			 var text2 = userdata[2]["aralik2"]+"-"+userdata[2]["aralik2"];	

			 this.getView().byId("sevkiyatTarihi2").setValue(text2);
			 this.getView().byId("durum2").setValue(userdata[2]["durum"]);
			 





			;
		 }
	});
}, /* bExport= */ true);

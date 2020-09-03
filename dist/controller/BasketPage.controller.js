sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./Popover3",
	"./utilities",
	"sap/ui/core/routing/History"
], function(BaseController, MessageBox, Popover3, Utilities, History) {
	"use strict";
	var email,data=[];
	return BaseController.extend("com.sap.build.standard.etiMaden.controller.BasketPage", {
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

		},yukle : function()
		{

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

			var sPopoverName = "Popover3";
			this.mPopovers = this.mPopovers || {};
			var oPopover = this.mPopovers[sPopoverName];

			if (!oPopover) {
				oPopover = new Popover3(this.getView());
				this.mPopovers[sPopoverName] = oPopover;

				oPopover.getControl().setPlacement("Auto");

				// For navigation.
				oPopover.setRouter(this.oRouter);
			}

			var oSource = oEvent.getSource();

			oPopover.open(oSource);

		},
		_onRowPress1: function(oEvent) {

			var sPopoverName = "Popover3";
			this.mPopovers = this.mPopovers || {};
			var oPopover = this.mPopovers[sPopoverName];

			if (!oPopover) {
				oPopover = new Popover3(this.getView());
				this.mPopovers[sPopoverName] = oPopover;

				oPopover.getControl().setPlacement("Auto");

				// For navigation.
				oPopover.setRouter(this.oRouter);
			}

			var oSource = oEvent.getSource();

			oPopover.open(oSource);

		},
		_onRowPress2: function(oEvent) {

			var sPopoverName = "Popover3";
			this.mPopovers = this.mPopovers || {};
			var oPopover = this.mPopovers[sPopoverName];

			if (!oPopover) {
				oPopover = new Popover3(this.getView());
				this.mPopovers[sPopoverName] = oPopover;

				oPopover.getControl().setPlacement("Auto");

				// For navigation.
				oPopover.setRouter(this.oRouter);
			}

			var oSource = oEvent.getSource();

			oPopover.open(oSource);

		},
		onInit: function() {
			var sHash = window.location.hash;
			var t = sHash.split("/");
			 email = t[2]; 
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("BasketPage").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			this.getView().byId("ss1").setValue(email);	
			var oVieww = this.getView();
			var oModel2 = new sap.ui.model.json.JSONModel();
				oModel2.loadData("https://servereti.herokuapp.com/basket"); 
				oModel2.attachRequestCompleted(function () {
					data= JSON.parse(oModel2.getJSON());
				})
		},yukle:function()
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
			 
		},
		onay :function()
		{
			var count = 0 ; 
			var data1=[];
			var userdata=[];
			var userdata1 =[];
			for(var i  in data)
			{
				if(data[i]["userEmail"]!=email)
				{
				   userdata.push(data[i]);
				}else
				{
					userdata1.push(data[i]);
				}
				count++;
			}
		
			var s = 0 ;
			for (var i in userdata1)
			{
				var v = userdata1[i];
				var tempdata =
				{
					isim          : v["isim"],
					
					soyad         : v["soyad"],
					siparisNo     : v["siparisNo"],
					sektör        : v["sektör"],
				   teslimSekli    : v["teslimSekli"],
				   paketleme1     : v["paketleme1"],
				   paketleme2     : v["paketleme2"],
				   paketleme3     : v["paketleme3"],
				   paketleme4     : v["paketleme4"],
				   MiktarKonteyner: v["MiktarKonteyner"],
				   konteynerTürü  : v["konteynerTürü"],
				   bosaltmaYeri   : v["bosaltmaYeri"],
				   bosaltmaYeri2  : v["bosaltmaYeri2"],
				   kons           : v["kons"],
				   aralik1        : v["aralik1"],
				   aralik2        : v["aralik2"],
				   ürün           : v["ürün"],
				   faturaFirması  : v["faturaFirması"],
				   aliciFirması   : v["aliciFirması"],
				   firmaIhbar1    : v["firmaIhbar1"],
				   firmaIhbar2    : v["firmaIhbar2"],
				   ekaciklama     : v["ekaciklama"],
				   aciklamaasil   : v["aciklamaasil"],
				   userEmail      : v["userEmail"],
				   tasimaSekli    : v["tasimaSekli"],
				   ödemesekil     : v["ödemesekil"],
				   paraBirimi     : v["paraBirimi"],
				   markalama      : v["markalama"],
				   ilaclama       : v["ilaclama"],
				   gozetmen       : v["gozetmen"],
				   durum          : v["durum"],
				   refaransNo     : v["refaransNo"],
				}
				data1.push(tempdata);
				s++;
			}
			
			
			for(var x = 0 ; x<s;x++){
			jQuery.ajax({
				type: "POST",
				data: JSON.stringify(data1[x]),
				contentType: "application/json",
				url: "https://servereti.herokuapp.com/sepet",
				success: function () {
					
					console.log("Success");
					
					setTimeout(() => {
						location.reload();
					}, 1500);
				},
				error: function (error) {
					console.log("HATA: ", error);
					
					setTimeout(() => {
						location.reload();
					}, 1500);
				},
			});
		}
		

			jQuery.ajax({
				type: "DELETE",
				url: "https://servereti.herokuapp.com/basket",
				success : function( data) {
					console.log('success');
				 },
				error : function() {
				  console.log('error');
		  
				}
			});
			for(var x = 0 ; x<(count-x);x++){
			jQuery.ajax({
				type: "POST",
				data: JSON.stringify(userdata[x]),
				contentType: "application/json",
				url: "https://servereti.herokuapp.com/basket",
				success: function () {
					
					console.log("Success");
					
					setTimeout(() => {
						location.reload();
					}, 1500);
				},
				error: function (error) {
					console.log("HATA: ", error);
					
					setTimeout(() => {
						location.reload();
					}, 1500);
				},
			});
		}
		
			alert("Sepete Onaylandı");

			this.oRouter.navTo("Menu_1",{email : email},false);

		}
	});
}, /* bExport= */ true);

sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History"
], function(BaseController, MessageBox, Utilities, History) {
	"use strict";
var email,konteyner,data,newData = []; ; 
	return BaseController.extend("com.sap.build.standard.etiMaden.controller.ReviewPage", {
		handleRouteMatched: function(oEvent) {
			var sAppId = "App5f4a5315eeb6e558760071e4";
			
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
		_onEditButtonPress: function(oEvent) {

			var oBindingContext = oEvent.getSource().getBindingContext();

			return new Promise(function(fnResolve) {
				jQuery.ajax({
					type: "DELETE",
					url: "https://servereti.herokuapp.com/konteyner",
					success : function( data) {
						console.log('success');
					 },
					error : function() {
					  console.log('error');
			  
					}
				});
				this.oRouter.navTo("KonteynerPage",{email : email},false);

			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		_onEditButtonPress2: function(oEvent) {

			var oBindingContext = oEvent.getSource().getBindingContext();
			return new Promise(function(fnResolve) {
				jQuery.ajax({
					type: "DELETE",
					url: "https://servereti.herokuapp.com/konteyner",
					success : function( data) {
						console.log('success');
					 },
					error : function() {
					  console.log('error');
			  
					}
				});
				this.oRouter.navTo("Menu_1",{email : email},false);

			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		_onEditButtonPress3: function(oEvent) {

			var oBindingContext = oEvent.getSource().getBindingContext();
			return new Promise(function(fnResolve) {
				var text = data[0]["isim"]+" "+data[0]["soyad"]

				this.getView().byId("ad").setValue(text);	
				var text1 = data[0]["aralik1"]+"-"+data[0]["aralik2"]
				this.getView().byId("aralik").setValue(text1);
				this.getView().byId("ODEMETUR").setValue(data[0]["ödemesekil"]);
				this.getView().byId("belgeler").setValue(data[0]["aciklamaasil"]);
				this.getView().byId("markalama").setValue(data[0]["markalama"]);
				this.getView().byId("ilaclama").setValue(data[0]["ilaclama"]);
				this.getView().byId("gozetmen").setValue(data[0]["gozetmen"]);
				this.getView().byId("Konsimento").setValue(data[0]["kons"]);
				this.getView().byId("aciklama").setValue(data[0]["ekaciklama"]);
				this.getView().byId("urun").setValue(data[0]["ürün"]);
				this.getView().byId("miktar").setValue(data[0]["MiktarKonteyner"]);
				var text2 = data[0]["paketleme1"]+"\n"+data[0]["paketleme2"]+" "+data[0]["paketleme3"]+" "+data[0]["paketleme4"];
				this.getView().byId("paketleme").setValue(text2);
				var text3 = data[0]["bosaltmaYeri"]+"-"+data[0]["bosaltmaYeri2"];
				this.getView().byId("kosaltmayeri").setValue(text3);
				this.getView().byId("sonkullanici").setValue(data[0]["userEmail"]);
				
			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},_onEditButtonPress4 :function(oEvent)
		{
			var oBindingContext = oEvent.getSource().getBindingContext();
			return new Promise(function(fnResolve) {
				var min = Math.ceil(min);
				var max = Math.floor(max);
				var referansNo= Math.floor(Math.random() * (max - min +1)) + min;
				var tempdata0 = 
				{
					isim           :data[0]["isim"],
					soyad          :data[0]["soyad"],
					siparisNo      :data[0]["siparisNo"],
					sektör         :data[0]["sektör"],
					teslimSekli    :data[0]["teslimSekli"],
					paketleme1     :data[0]["paketleme1"],
					paketleme2     :data[0]["paketleme2"],
					paketleme3     :data[0]["paketleme3"],
					paketleme4     :data[0]["paketleme4"],
					MiktarKonteyner:data[0]["MiktarKonteyner"],
					konteynerTürü  :data[0]["konteynerTürü"],
					bosaltmaYeri   :data[0]["bosaltmaYeri"],
					bosaltmaYeri2  :data[0]["bosaltmaYeri2"],
					kons           :data[0]["kons"],
					aralik1        :data[0]["aralik1"],
					aralik2        :data[0]["aralik2"],
					ürün           :data[0]["ürün"],
					faturaFirması  :data[0]["faturaFirması"],
					aliciFirması   :data[0]["aliciFirması"],
					firmaIhbar1    :data[0]["firmaIhbar1"],
					firmaIhbar2    :data[0]["firmaIhbar2"],
					ekaciklama     :data[0]["ekaciklama"],
					aciklamaasil   :data[0]["aciklamaasil"],
					userEmail      :data[0]["userEmail"],
					tasimaSekli    :data[0]["tasimaSekli"],
					ödemesekil     :data[0]["ödemesekil"],
					paraBirimi     :data[0]["paraBirimi"],
					markalama      :data[0]["markalama"],
					ilaclama       :data[0]["ilaclama"],
					gozetmen       :data[0]["gozetmen"],
					durum             :"Onay  Bekliyor",
					refaransNo       :referansNo.toString(),
				}
				newData.push(tempdata0)
				jQuery.ajax({
					type: "POST",
					data: JSON.stringify(newData[0]),
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
				jQuery.ajax({
					type: "DELETE",
					url: "https://servereti.herokuapp.com/konteyner",
					success : function( data) {
						console.log('success');
					 },
					error : function() {
					  console.log('error');
			  
					}
				});
				this.oRouter.navTo("Menu_1",{email : email},false);

				
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
		onInit: function() {
			var sHash = window.location.hash;
			var t = sHash.split("/");
			 email = t[2]; 
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var oVieww = this.getView();
			var oModel2 = new sap.ui.model.json.JSONModel();
				oModel2.loadData("https://servereti.herokuapp.com/konteyner"); 
				oModel2.attachRequestCompleted(function () {
					data= JSON.parse(oModel2.getJSON());
				})
				
				
	
			this.oRouter.getTarget("ReviewPage").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			
		},onExit:function()
		{
			jQuery.ajax({
				type: "DELETE",
				url: "https://servereti.herokuapp.com/konteyner",
				success : function( data) {
					console.log('success');
				 },
				error : function() {
				  console.log('error');
		  
				}
			});
		}

	});
}, /* bExport= */ true);

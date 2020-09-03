sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History"
], function(BaseController, MessageBox, Utilities, History) {
	"use strict";
var email,markalama,ilaclama,gozetmen,aciklamaasil="",s=1,newData = []; 
	return BaseController.extend("com.sap.build.standard.etiMaden.controller.KonteynerPage", {
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

			this.aRadioButtonGroupIds = ["sap_Wizard_Page_0-content-sap_m_Wizard-1-steps-sap_m_WizardStep-1598706909817-content-build_simple_form_Form-1598708323263-formContainers-build_simple_form_FormContainer-1-formElements-build_simple_form_FormElement-1-fields-sap_m_RadioButtonGroup-1598708399140", "sap_Wizard_Page_0-content-sap_m_Wizard-1-steps-sap_m_WizardStep-1598706909817-content-build_simple_form_Form-1598708323263-formContainers-build_simple_form_FormContainer-1-formElements-build_simple_form_FormElement-3-fields-sap_m_RadioButtonGroup-1598708490211", "sap_Wizard_Page_0-content-sap_m_Wizard-1-steps-sap_m_WizardStep-1598706909817-content-build_simple_form_Form-1598708323263-formContainers-build_simple_form_FormContainer-1-formElements-build_simple_form_FormElement-4-fields-sap_m_RadioButtonGroup-1598708546577"];
			this.handleRadioButtonGroupsSelectedIndex();

		},
		handleRadioButtonGroupsSelectedIndex: function() {
			var that = this;
			this.aRadioButtonGroupIds.forEach(function(sRadioButtonGroupId) {
				var oRadioButtonGroup = that.byId(sRadioButtonGroupId);
				var oButtonsBinding = oRadioButtonGroup ? oRadioButtonGroup.getBinding("buttons") : undefined;
				if (oButtonsBinding) {
					var oSelectedIndexBinding = oRadioButtonGroup.getBinding("selectedIndex");
					var iSelectedIndex = oRadioButtonGroup.getSelectedIndex();
					oButtonsBinding.attachEventOnce("change", function() {
						if (oSelectedIndexBinding) {
							oSelectedIndexBinding.refresh(true);
						} else {
							oRadioButtonGroup.setSelectedIndex(iSelectedIndex);
						}
					});
				}
			});

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

		},_onButtonPress:function()
		{
			var kopya = this.byId("kopyasay").getValue();
			var dokumantur = this.byId("box10").getSelectedItem().getText();
			var aciklama = this.byId("aciklama").getValue();
			var temp =s+"-) "+ dokumantur+" * "+kopya+"\n"+aciklama+"\n"; 
			alert(temp," eklendi")
			this.byId("kopyasay").setValue("0");
			this.byId("box10").setSelectedIndex(0);
			this.byId("aciklama").setValue("");
			alert(temp," eklendi");
			aciklamaasil+=temp;
			s+=1;
		},
		_onWizardComplete: function(oEvent) {

			
			var oBindingContext = oEvent.getSource().getBindingContext();
			var model = this.getView();
			return new Promise(function(fnResolve) {
				var tasimaSekli = this.byId("box9").getSelectedItem().getText();
				var ödemesekil =this.byId("box12").getSelectedItem().getText();
				var paraBirimi =this.byId("box13").getSelectedItem().getText();
				
				
				
				var isim = model.byId("sap_Wizard_Page_0-content-sap_m_Wizard-1-steps-sap_m_WizardStep-1-content-build_simple_form_Form-1598707009913-formContainers-build_simple_form_FormContainer-1-formElements-build_simple_form_FormElement-1-fields-sap_m_Input-1").getValue();
				var soyad = model.byId("sap_Wizard_Page_0-content-sap_m_Wizard-1-steps-sap_m_WizardStep-1-content-build_simple_form_Form-1598707009913-formContainers-build_simple_form_FormContainer-1-formElements-build_simple_form_FormElement-2-fields-sap_m_Input-1598707121110").getValue(); 
				var siparisNo = model.byId("sap_Wizard_Page_0-content-sap_m_Wizard-1-steps-sap_m_WizardStep-1-content-build_simple_form_Form-1598707009913-formContainers-build_simple_form_FormContainer-1-formElements-build_simple_form_FormElement-3-fields-sap_m_Input-1598707198614").getValue(); 
				var sektör = model.byId("sektIN").getValue(); 
				var ürün = this.byId("box0").getSelectedItem().getText() 
				var teslimSekli =  this.byId("box1").getSelectedItem().getText();
				var paketleme1 =  this.byId("box2").getSelectedItem().getText();
				var paketleme2 =  this.byId("box3").getSelectedItem().getText();
				var paketleme3 =  this.byId("box4").getSelectedItem().getText();
				var paketleme4 =  this.byId("box5").getSelectedItem().getText();
				var MiktarKonteyner = model.byId("MiktartKonteyner").getValue().toString(); 
				var konteynerTürü = this.byId("box6").getSelectedItem().getText();
				
				var bosaltmaYeri = this.byId("box7").getSelectedItem().getText();
				var bosaltmaYeri2 = this.byId("box8").getSelectedItem().getText();
				
				
				var kons = this.byId("box11").getSelectedItem().getText();
				var aralik1 = this.byId("date1").getValue().toString(); 
				var aralik2 = this.byId("date2").getValue().toString(); 
				
				var faturaFirması = this.byId("faturaFirma").getValue(); 
				var aliciFirması = this.byId("aliciFirma").getValue(); 
				var firmaIhbar1 = this.byId("sap_Wizard_Page_0-content-sap_m_Wizard-1-steps-sap_m_WizardStep-1598706915215-content-build_simple_form_Form-1598708975550-formContainers-build_simple_form_FormContainer-1-formElements-build_simple_form_FormElement-1598709253672-fields-sap_m_Input-1598709277254").getValue();
				var firmaIhbar2 = this.byId("sap_Wizard_Page_0-content-sap_m_Wizard-1-steps-sap_m_WizardStep-1598706915215-content-build_simple_form_Form-1598708975550-formContainers-build_simple_form_FormContainer-1-formElements-build_simple_form_FormElement-1598709254494-fields-sap_m_Input-1598709341215").getValue();
				
				var ekaciklama = this.byId("ekaciklama").getValue();
				
				var tempdata0 = {
					isim : isim,
					soyad:soyad,
					ürün:ürün,
					siparisNo:siparisNo,
					sektör:sektör,
					teslimSekli:teslimSekli,
					paketleme1:paketleme1,
					paketleme2:paketleme2,
					paketleme3:paketleme3,
					paketleme4:paketleme4,
					MiktarKonteyner:MiktarKonteyner,
					konteynerTürü:konteynerTürü,
					bosaltmaYeri:bosaltmaYeri,
					bosaltmaYeri2:bosaltmaYeri2,
					kons:kons,
					aralik1:aralik1,
					aralik2:aralik2,
					faturaFirması:faturaFirması,
					aliciFirması:aliciFirması,
					firmaIhbar1:firmaIhbar1,
					firmaIhbar2:firmaIhbar2,
					ekaciklama:ekaciklama,
					aciklamaasil:aciklamaasil,
					userEmail:email,
					tasimaSekli:tasimaSekli,
					ödemesekil :ödemesekil ,
					paraBirimi :paraBirimi ,
					markalama:markalama,
					ilaclama:ilaclama,
					gozetmen:gozetmen
				}
				newData.push(tempdata0)

				if(aralik1>aralik2)
				{
					alert("Giriş tarih 1 hatası");
				}else
				{
					console.log("JSSS:", newData[0]);
			jQuery.ajax({
				type: "POST",
				data: JSON.stringify(newData[0]),
				contentType: "application/json",
				url: "https://servereti.herokuapp.com/konteyner",
				success: function () {
					

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
					this.oRouter.navTo("ReviewPage",{email : email},false);

				}
				
				
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
		convertTextToIndexFormatter: function(sTextValue) {
			var oRadioButtonGroup = this.byId("sap_Wizard_Page_0-content-sap_m_Wizard-1-steps-sap_m_WizardStep-1598706909817-content-build_simple_form_Form-1598708323263-formContainers-build_simple_form_FormContainer-1-formElements-build_simple_form_FormElement-1-fields-sap_m_RadioButtonGroup-1598708399140");
			var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
			if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
				// look up index in bound context
				var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
				return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function(oButtonContext) {
					return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
				});
			} else {
				// look up index in static items
				return oRadioButtonGroup.getButtons().findIndex(function(oButton) {
					return oButton.getText() === sTextValue;
				});
			}

		},
		_onRadioButtonGroupSelect: function(e) {
			var idx = e.getParameter("selectedIndex");
			var button = e.getSource().getButtons()[idx];
			 markalama = button.getText();
		},
		convertTextToIndexFormatter1: function(sTextValue) {
			var oRadioButtonGroup = this.byId("sap_Wizard_Page_0-content-sap_m_Wizard-1-steps-sap_m_WizardStep-1598706909817-content-build_simple_form_Form-1598708323263-formContainers-build_simple_form_FormContainer-1-formElements-build_simple_form_FormElement-3-fields-sap_m_RadioButtonGroup-1598708490211");
			var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
			if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
				// look up index in bound context
				var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
				return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function(oButtonContext) {
					return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
				});
			} else {
				// look up index in static items
				return oRadioButtonGroup.getButtons().findIndex(function(oButton) {
					return oButton.getText() === sTextValue;
				});
			}

		},
		_onRadioButtonGroupSelect1: function(e) {
			var idx = e.getParameter("selectedIndex");
			var button = e.getSource().getButtons()[idx];
			ilaclama = button.getText();
		},
		convertTextToIndexFormatter2: function(sTextValue) {
			var oRadioButtonGroup = this.byId("sap_Wizard_Page_0-content-sap_m_Wizard-1-steps-sap_m_WizardStep-1598706909817-content-build_simple_form_Form-1598708323263-formContainers-build_simple_form_FormContainer-1-formElements-build_simple_form_FormElement-4-fields-sap_m_RadioButtonGroup-1598708546577");
			var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
			if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
				// look up index in bound context
				var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
				return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function(oButtonContext) {
					return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
				});
			} else {
				// look up index in static items
				return oRadioButtonGroup.getButtons().findIndex(function(oButton) {
					return oButton.getText() === sTextValue;
				});
			}

		},
		_onRadioButtonGroupSelect2: function(e) {
			var idx = e.getParameter("selectedIndex");
			var button = e.getSource().getButtons()[idx];
			gozetmen = button.getText();
			
		},
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("KonteynerPage").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			this.oModel = this.getOwnerComponent().getModel();
			var sHash = window.location.hash;
			var t = sHash.split("/");
			 email = t[2]; 
			 
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);

		},
			onExit: function() {

			// to destroy templates for bound aggregations when templateShareable is true on exit to prevent duplicateId issue
			var aControls = [{
				"controlId": "sap_Responsive_Page_0-content-sap_m_ComboBox-1598944979217",
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

		}
	});
}, /* bExport= */ true);

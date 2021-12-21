"use strict";var __decorate=this&&this.__decorate||function(e,t,i,a){var o,r=arguments.length,l=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,i,a);else for(var n=e.length-1;0<=n;n--)(o=e[n])&&(l=(r<3?o(l):3<r?o(t,i,l):o(t,i))||l);return 3<r&&l&&Object.defineProperty(t,i,l),l},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),forms_1=require("@angular/forms"),router_1=require("@angular/router"),platform_browser_1=require("@angular/platform-browser"),service_1=require("../../../shared/service"),CalibrationsComponent=function(){function e(e,t,i,a){this.router=e,this.titleService=t,this.formBuilder=i,this._dataService=a,this.loading=!1,this._getUrl="/api/calibration/getall",this._getbyIdUrl="/api/calibration/getbyid",this._saveUrl="/api/calibration/save",this._deleteUrl="/api/calibration/deletebyid",this._updateUrl="/api/calibration/updateStatus"}return e.prototype.ngOnInit=function(){this.titleService.setTitle("Envanter Takip Sistemi | Calibrations"),this.createForm(),this.getAll(),this.loggedUser=JSON.parse(localStorage.getItem("loggedUser"))},e.prototype.createForm=function(){this.calibrationForm=this.formBuilder.group({id:0,calibrationName:new forms_1.FormControl("",forms_1.Validators.required)})},e.prototype.addNew=function(){$("#defaultsizemodal").modal("show"),$("#defaultsizemodal").on("shown.bs.modal",function(){$(this).find("#calibrationName").focus()}),this.reset()},e.prototype.getAll=function(){var t=this;this.loading=!0,this._dataService.getall(this._getUrl).subscribe(function(e){t.calibrations=e},function(e){console.log(e)}),this.loading=!1},e.prototype.edit=function(e,t){var i=this;this.loading=!0,e.preventDefault(),this._dataService.getbyid(t.id,this._getbyIdUrl).subscribe(function(e){i.calibration=e,i.calibrationForm.setValue({id:i.calibration.id,calibrationName:i.calibration.calibrationName}),$("#defaultsizemodal").modal("show"),$("#defaultsizemodal").on("shown.bs.modal",function(){$(this).find("#calibrationName").focus()}),i.loading=!1},function(e){console.log(e)})},e.prototype.onSubmit=function(){var t=this;this.loading=!0,this.calibrationForm.invalid||this._dataService.saveWithUser(this.calibrationForm.value,this.loggedUser,this._saveUrl).subscribe(function(e){t.resmessage=e.message,t.alertmessage="alert-outline-info",t.getAll(),t.reset(),$("#defaultsizemodal").modal("hide"),t.loading=!1},function(e){console.log(e)})},e.prototype.updateStatus=function(e,t){var i=this;this.loading=!0,e.preventDefault(),confirm("You are about to delete "+t.calibrationname+". Are you sure?")&&this._dataService.updateStatus(t,this.loggedUser,this._updateUrl).subscribe(function(e){i.resmessage=e.message,i.alertmessage="alert-outline-info",i.getAll(),i.reset(),i.loading=!1,$("#defaultsizemodal").modal("hide")},function(e){console.log(e),i.loading=!1}),this.loading=!1},e.prototype.delete=function(e,t){var i=this;this.loading=!0,e.preventDefault(),confirm("You are about to delete "+t.calibrationname+". Are you sure?")&&this._dataService.delete(t.id,this._deleteUrl).subscribe(function(e){i.resmessage=e,i.getAll(),i.loading=!1},function(e){console.log(e)})},e.prototype.reset=function(){this.calibrationForm.setValue({id:0,calibrationName:null}),this.resmessage=null,$("#calibrationName").focus()},__decorate([core_1.Component({selector:"ng-calibration",templateUrl:"./app/backoffice/equipment/calibration/component.html",providers:[service_1.DataService]}),__metadata("design:paramtypes",[router_1.Router,platform_browser_1.Title,forms_1.FormBuilder,service_1.DataService])],e)}();exports.CalibrationsComponent=CalibrationsComponent;
"use strict";var __decorate=this&&this.__decorate||function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var l=e.length-1;0<=l;l--)(r=e[l])&&(n=(a<3?r(n):3<a?r(t,i,n):r(t,i))||n);return 3<a&&n&&Object.defineProperty(t,i,n),n},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),forms_1=require("@angular/forms"),router_1=require("@angular/router"),platform_browser_1=require("@angular/platform-browser"),service_1=require("../../../shared/service"),CalibrationsComponent=function(){function e(e,t,i,o){this.router=e,this.titleService=t,this.formBuilder=i,this._dataService=o,this._getUrl="/api/calibration/getall",this._getbyIdUrl="/api/calibration/getbyid",this._saveUrl="/api/calibration/save",this._deleteUrl="/api/calibration/deletebyid"}return e.prototype.ngOnInit=function(){this.titleService.setTitle("Envanter Takip Sistemi | Calibrations"),this.createForm(),this.getAll()},e.prototype.createForm=function(){this.calibrationForm=this.formBuilder.group({id:0,calibrationName:new forms_1.FormControl("",forms_1.Validators.required)})},e.prototype.addNew=function(){$("#defaultsizemodal").modal("show"),$("#defaultsizemodal").on("shown.bs.modal",function(){$(this).find("#calibrationName").focus()}),this.reset()},e.prototype.getAll=function(){var t=this;this._dataService.getall(this._getUrl).subscribe(function(e){console.log(e),t.calibrations=e},function(e){console.log(e)})},e.prototype.edit=function(e,t){var i=this;e.preventDefault(),this._dataService.getbyid(t.id,this._getbyIdUrl).subscribe(function(e){i.calibration=e,i.calibrationForm.setValue({id:i.calibration.id,calibrationName:i.calibration.calibrationName}),$("#defaultsizemodal").modal("show"),$("#defaultsizemodal").on("shown.bs.modal",function(){$(this).find("#calibrationName").focus()})},function(e){console.log(e)})},e.prototype.onSubmit=function(){var t=this;this.calibrationForm.invalid||this._dataService.save(this.calibrationForm.value,this._saveUrl).subscribe(function(e){t.resmessage=e.message,t.alertmessage="alert-outline-info",t.getAll(),t.reset(),$("#defaultsizemodal").modal("hide")},function(e){console.log(e)})},e.prototype.delete=function(e,t){var i=this;e.preventDefault(),confirm("You are about to delete "+t.calibrationname+". Are you sure?")&&this._dataService.delete(t.id,this._deleteUrl).subscribe(function(e){i.resmessage=e,i.getAll()},function(e){console.log(e)})},e.prototype.reset=function(){this.calibrationForm.setValue({id:0,calibrationName:null}),this.resmessage=null,$("#calibrationName").focus()},__decorate([core_1.Component({selector:"ng-calibration",templateUrl:"./app/backoffice/book/calibration/component.html",providers:[service_1.DataService]}),__metadata("design:paramtypes",[router_1.Router,platform_browser_1.Title,forms_1.FormBuilder,service_1.DataService])],e)}();exports.CalibrationsComponent=CalibrationsComponent;

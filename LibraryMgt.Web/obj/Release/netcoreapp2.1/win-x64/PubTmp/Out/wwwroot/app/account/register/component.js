"use strict";var __decorate=this&&this.__decorate||function(e,r,t,o){var a,s=arguments.length,i=s<3?r:null===o?o=Object.getOwnPropertyDescriptor(r,t):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,r,t,o);else for(var n=e.length-1;0<=n;n--)(a=e[n])&&(i=(s<3?a(i):3<s?a(r,t,i):a(r,t))||i);return 3<s&&i&&Object.defineProperty(r,t,i),i},__metadata=this&&this.__metadata||function(e,r){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,r)};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),forms_1=require("@angular/forms"),router_1=require("@angular/router"),platform_browser_1=require("@angular/platform-browser"),service_1=require("../../shared/service"),RegisterComponent=function(){function e(e,r,t,o){this.router=e,this.titleService=r,this.formBuilder=t,this._dataService=o,this._saveUrl="/api/auth/regusers"}return e.prototype.ngOnInit=function(){this.titleService.setTitle("Library System | Register"),this.createForm()},e.prototype.createForm=function(){this.userForm=this.formBuilder.group({firstName:new forms_1.FormControl("",forms_1.Validators.required),lastName:new forms_1.FormControl("",forms_1.Validators.required),email:new forms_1.FormControl("",forms_1.Validators.compose([forms_1.Validators.required,forms_1.Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")])),contact:new forms_1.FormControl("",forms_1.Validators.required)}),$("#firstName").focus()},e.prototype.onSubmit=function(){var r=this;this.userForm.invalid||this._dataService.save(this.userForm.value,this._saveUrl).subscribe(function(e){r.resmessage=e.message,r.alertmessage="alert-outline-info"},function(e){})},e.prototype.reset=function(){this.userForm.setValue({firstName:null,lastName:null,email:null,contact:null}),this.resmessage=null},__decorate([core_1.Component({selector:"app-register",templateUrl:"./app/account/register/component.html",providers:[service_1.DataService]}),__metadata("design:paramtypes",[router_1.Router,platform_browser_1.Title,forms_1.FormBuilder,service_1.DataService])],e)}();exports.RegisterComponent=RegisterComponent;
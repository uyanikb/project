"use strict";var __decorate=this&&this.__decorate||function(e,t,r,o){var i,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;0<=a;a--)(i=e[a])&&(n=(s<3?i(n):3<s?i(t,r,n):i(t,r))||n);return 3<s&&n&&Object.defineProperty(t,r,n),n},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),forms_1=require("@angular/forms"),router_1=require("@angular/router"),platform_browser_1=require("@angular/platform-browser"),service_1=require("../../../shared/service"),ReturnComponent=function(){function e(e,t,r,o){this.router=e,this.titleService=t,this.formBuilder=r,this._dataService=o,this.bookreturned=[],this.bookreturnedlist=[],this._getUrl="/api/circulation/getreturnall",this._getbyIdUrl="/api/circulation/getreturnbyid",this._saveUrl="/api/circulation/returnbook"}return e.prototype.handleKeyboardEvent=function(e){this.keypress=e.keyCode,32==this.keypress&&(this.resmessage=null,this.reset(),this.focus())},e.prototype.ngOnInit=function(){this.titleService.setTitle("Library System | Return"),this.loadScripts(),this.createForm()},e.prototype.loadScripts=function(){for(var e=["assets/js/datepicker-init.js"],t=0;t<e.length;t++){var r=document.createElement("script");r.src=e[t],r.type="text/javascript",r.async=!1,r.charset="utf-8",document.getElementsByTagName("body")[0].appendChild(r)}},e.prototype.createForm=function(){this.returnForm=this.formBuilder.group({id:0,memberSearch:new forms_1.FormControl(""),memberName:new forms_1.FormControl(""),dueDate:new forms_1.FormControl("")}),this.focus()},e.prototype.onChange=function(e,t){var r=this;e.preventDefault(),this._dataService.getbyid(t,this._getbyIdUrl).subscribe(function(e){null!=e?(r.bookissue=e,r.bookreturnedlist=e.books,r.returnForm.setValue({id:r.bookissue.id,memberName:r.bookissue.membername,dueDate:r.bookissue.duedate,memberSearch:null})):r.reset(),r.focus(),r.resmessage=null},function(e){})},e.prototype.onSubmit=function(){var t=this;this.returnForm.invalid||0<this.returnForm.value.id&&this._dataService.save(this.returnForm.value,this._saveUrl).subscribe(function(e){t.resmessage=e.message,t.alertmessage="alert-outline-info",t.reset(),t.focus()},function(e){})},e.prototype.returnedList=function(){var t=this;$("#largesizemodal").modal({backdrop:"static",keyboard:!1,show:!0}),this._dataService.getall(this._getUrl).subscribe(function(e){t.bookreturned=e},function(e){})},e.prototype.returnedListclose=function(){this.focus()},e.prototype.reset=function(){this.returnForm.setValue({id:0,memberSearch:null,memberName:null,dueDate:null}),this.bookreturnedlist=[]},e.prototype.focus=function(){$("#memberSearch").focus()},__decorate([core_1.HostListener("document:keypress",["$event"]),__metadata("design:type",Function),__metadata("design:paramtypes",[KeyboardEvent]),__metadata("design:returntype",void 0)],e.prototype,"handleKeyboardEvent",null),__decorate([core_1.Component({selector:"ng-return",templateUrl:"./app/backoffice/circulation/return/component.html",providers:[service_1.DataService]}),__metadata("design:paramtypes",[router_1.Router,platform_browser_1.Title,forms_1.FormBuilder,service_1.DataService])],e)}();exports.ReturnComponent=ReturnComponent;
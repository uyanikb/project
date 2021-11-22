"use strict";var __decorate=this&&this.__decorate||function(e,t,i,s){var r,a=arguments.length,o=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var n=e.length-1;0<=n;n--)(r=e[n])&&(o=(a<3?r(o):3<a?r(t,i,o):r(t,i))||o);return 3<a&&o&&Object.defineProperty(t,i,o),o},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),forms_1=require("@angular/forms"),router_1=require("@angular/router"),platform_browser_1=require("@angular/platform-browser"),service_1=require("../../../shared/service"),IssueComponent=function(){function e(e,t,i,s){this.router=e,this.titleService=t,this.formBuilder=i,this._dataService=s,this.equipmentlist=[],this.availableequipmentlist=[],this.equipmentchoosed=[],this.equipmentissueed=[],this.equipmentissueedlist=[],this._getUrl="/api/circulation/getissueall",this._getbyIdUrl="/api/circulation/getissuebyid",this._saveUrl="/api/circulation/issueequipment",this._getequipmentUrl="/api/circulation/getallequipment",this._getavailableallequipmentUrl="/api/equipment/getavailableallequipment",this._getbyUserIdUrl="/api/users/getbyid"}return e.prototype.handleKeyboardEvent=function(e){this.keypress=e.keyCode,32==this.keypress&&(this.resmessage=null,this.reset(),this.focus())},e.prototype.ngOnInit=function(){this.titleService.setTitle("Envanter Takip Sistemi| Ödünç"),this.loadScripts(),this.createForm(),this.availableequipmentList()},e.prototype.loadScripts=function(){for(var e=["assets/js/datepicker-init.js"],t=0;t<e.length;t++){var i=document.createElement("script");i.src=e[t],i.type="text/javascript",i.async=!1,i.charset="utf-8",document.getElementsByTagName("body")[0].appendChild(i)}},e.prototype.createForm=function(){this.issueForm=this.formBuilder.group({id:0,userId:0,memberSearch:new forms_1.FormControl(""),memberName:new forms_1.FormControl(""),email:new forms_1.FormControl(""),dueDate:new forms_1.FormControl(""),equipments:[]}),this.focus()},e.prototype.onChange=function(e,t){var i=this;this.reset(),e.preventDefault(),this._dataService.getbyid(t,this._getbyUserIdUrl).subscribe(function(e){i.user=e;e=new Date;e.setDate(e.getDate()+15),i.issueForm.setValue({id:0,userId:i.user.userId,memberName:i.user.firstname+" "+i.user.firstname,email:i.user.email,dueDate:e.toLocaleDateString("en-US"),memberSearch:null,equipments:[]})},function(e){}),this._dataService.getbyid(t,this._getbyIdUrl).subscribe(function(e){console.log(e),null!=e&&(i.equipmentissueedlist=e),i.resmessage=null},function(e){})},e.prototype.onSearch=function(){var t=this.searchTerm;this.availableequipmentlist=this.availableequipmentlist.filter(function(e){return 0<=e.equipmentId.indexOf(t)})},e.prototype.oncheckChange=function(e,t){e.preventDefault(),e.currentTarget.checked&&this.equipmentchoosed.push({id:t})},e.prototype.onSubmit=function(){var t=this;this.issueForm.patchValue({equipments:this.equipmentchoosed}),console.log(this.equipmentchoosed),this.issueForm.invalid||0<this.issueForm.value.userId&&this._dataService.save(this.issueForm.value,this._saveUrl).subscribe(function(e){t.resmessage=e.message,t.alertmessage="alert-outline-info",t.reset(),t.focus()},function(e){})},e.prototype.equipmentList=function(){var t=this;this._dataService.getall(this._getequipmentUrl).subscribe(function(e){t.equipmentlist=e},function(e){})},e.prototype.availableequipmentList=function(){var t=this;this._dataService.getall(this._getavailableallequipmentUrl).subscribe(function(e){t.availableequipmentlist=e},function(e){})},e.prototype.issueedList=function(){var t=this;$("#largesizemodal").modal({backdrop:"static",keyboard:!1,show:!0}),this._dataService.getall(this._getUrl).subscribe(function(e){t.equipmentissueed=e},function(e){}),console.log(this.equipmentissueed)},e.prototype.issueedListclose=function(){this.focus()},e.prototype.reset=function(){this.issueForm.setValue({id:0,userId:0,memberSearch:null,memberName:null,email:null,dueDate:null,equipments:[]}),this.searchTerm="",this.equipmentissueedlist=[],this.availableequipmentList(),this.availableequipmentlist=[]},e.prototype.focus=function(){$("#memberSearch").focus()},__decorate([core_1.HostListener("document:keypress",["$event"]),__metadata("design:type",Function),__metadata("design:paramtypes",[KeyboardEvent]),__metadata("design:returntype",void 0)],e.prototype,"handleKeyboardEvent",null),__decorate([core_1.Component({selector:"ng-issue",templateUrl:"./app/backoffice/circulation/issue/component.html",providers:[service_1.DataService]}),__metadata("design:paramtypes",[router_1.Router,platform_browser_1.Title,forms_1.FormBuilder,service_1.DataService])],e)}();exports.IssueComponent=IssueComponent;
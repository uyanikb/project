"use strict";var __decorate=this&&this.__decorate||function(e,t,a,s){var o,r=arguments.length,i=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,a):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,a,s);else for(var n=e.length-1;0<=n;n--)(o=e[n])&&(i=(r<3?o(i):3<r?o(t,a,i):o(t,a))||i);return 3<r&&i&&Object.defineProperty(t,a,i),i},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),forms_1=require("@angular/forms"),router_1=require("@angular/router"),platform_browser_1=require("@angular/platform-browser"),service_1=require("../../../shared/service"),CategoriesComponent=function(){function e(e,t,a,s){this.router=e,this.titleService=t,this.formBuilder=a,this._dataService=s,this._getUrl="/api/category/getall",this._getbyIdUrl="/api/category/getbyid",this._saveUrl="/api/category/save",this._deleteUrl="/api/category/deletebyid"}return e.prototype.ngOnInit=function(){this.titleService.setTitle("Envanter Takip Sistemi| Kategori"),this.loadScripts(),this.createForm(),this.getAll()},e.prototype.loadScripts=function(){for(var e=["assets/plugins/bootstrap-datatable/js/jquery.dataTables.min.js","assets/plugins/bootstrap-datatable/js/dataTables.bootstrap4.min.js","assets/plugins/bootstrap-datatable/js/dataTables.buttons.min.js","assets/plugins/bootstrap-datatable/js/buttons.bootstrap4.min.js","assets/plugins/bootstrap-datatable/js/jszip.min.js","assets/plugins/bootstrap-datatable/js/pdfmake.min.js","assets/plugins/bootstrap-datatable/js/vfs_fonts.js","assets/plugins/bootstrap-datatable/js/buttons.html5.min.js","assets/plugins/bootstrap-datatable/js/buttons.print.min.js","assets/plugins/bootstrap-datatable/js/buttons.colVis.min.js"],t=0;t<e.length;t++){var a=document.createElement("script");a.src=e[t],a.type="text/javascript",a.async=!1,a.charset="utf-8",document.getElementsByTagName("body")[0].appendChild(a)}},e.prototype.createForm=function(){this.categForm=this.formBuilder.group({id:0,categoryName:new forms_1.FormControl("",forms_1.Validators.required)})},e.prototype.addNew=function(){$("#defaultsizemodal").modal("show"),$("#defaultsizemodal").on("shown.bs.modal",function(){$(this).find("#categoryName").focus()}),this.reset()},e.prototype.getAll=function(){var t=this;this._dataService.getall(this._getUrl).subscribe(function(e){t.categories=e},function(e){console.log(e)})},e.prototype.edit=function(e,t){var a=this;e.preventDefault(),this._dataService.getbyid(t.id,this._getbyIdUrl).subscribe(function(e){a.category=e,a.categForm.setValue({id:a.category.id,categoryName:a.category.categoryname}),$("#defaultsizemodal").modal("show"),$("#defaultsizemodal").on("shown.bs.modal",function(){$(this).find("#categoryName").focus()})},function(e){console.log(e)})},e.prototype.onSubmit=function(){var t=this;this.categForm.invalid||this._dataService.save(this.categForm.value,this._saveUrl).subscribe(function(e){t.resmessage=e.message,t.alertmessage="alert-outline-info",t.getAll(),t.reset()},function(e){console.log(e)})},e.prototype.delete=function(e,t){var a=this;e.preventDefault(),confirm("You are about to delete "+t.categoryname+". Are you sure?")&&this._dataService.delete(t.id,this._deleteUrl).subscribe(function(e){a.resmessage=e,a.getAll()},function(e){console.log(e)})},e.prototype.reset=function(){this.categForm.setValue({id:0,categoryName:null}),this.resmessage=null,$("#categoryName").focus()},__decorate([core_1.Component({selector:"ng-categories",templateUrl:"./app/backoffice/book/categories/component.html",providers:[service_1.DataService]}),__metadata("design:paramtypes",[router_1.Router,platform_browser_1.Title,forms_1.FormBuilder,service_1.DataService])],e)}();exports.CategoriesComponent=CategoriesComponent;

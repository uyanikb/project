"use strict";var __decorate=this&&this.__decorate||function(e,o,r,t){var n,u=arguments.length,c=u<3?o:null===t?t=Object.getOwnPropertyDescriptor(o,r):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,o,r,t);else for(var l=e.length-1;0<=l;l--)(n=e[l])&&(c=(u<3?n(c):3<u?n(o,r,c):n(o,r))||c);return 3<u&&c&&Object.defineProperty(o,r,c),c};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),router_1=require("@angular/router"),common_1=require("@angular/common"),forms_1=require("@angular/forms"),http_1=require("@angular/http"),component_1=require("./component"),routes=[{path:"",component:component_1.ReturnComponent}],ReturnModule=function(){function e(){}return __decorate([core_1.NgModule({imports:[common_1.CommonModule,http_1.HttpModule,forms_1.FormsModule,forms_1.ReactiveFormsModule,router_1.RouterModule.forChild(routes)],declarations:[component_1.ReturnComponent]})],e)}();exports.ReturnModule=ReturnModule;
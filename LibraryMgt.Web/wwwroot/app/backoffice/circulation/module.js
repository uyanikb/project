"use strict";var __decorate=this&&this.__decorate||function(e,o,r,t){var c,u=arguments.length,n=u<3?o:null===t?t=Object.getOwnPropertyDescriptor(o,r):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,o,r,t);else for(var i=e.length-1;0<=i;i--)(c=e[i])&&(n=(u<3?c(n):3<u?c(o,r,n):c(o,r))||n);return 3<u&&n&&Object.defineProperty(o,r,n),n};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),router_1=require("@angular/router"),common_1=require("@angular/common"),forms_1=require("@angular/forms"),http_1=require("@angular/http"),component_1=require("./component"),routes=[{path:"",component:component_1.CirculationComponent,children:[{path:"",redirectTo:"backoffice/circulation/issue"},{path:"backoffice/circulation/issue",loadChildren:"./app/backoffice/circulation/issue/module#IssueModule"},{path:"backoffice/circulation/return",loadChildren:"./app/backoffice/circulation/return/module#ReturnModule"}]}],CirculationModule=function(){function e(){}return e=__decorate([core_1.NgModule({imports:[common_1.CommonModule,http_1.HttpModule,forms_1.FormsModule,forms_1.ReactiveFormsModule,router_1.RouterModule.forChild(routes)],declarations:[component_1.CirculationComponent]})],e)}();exports.CirculationModule=CirculationModule;
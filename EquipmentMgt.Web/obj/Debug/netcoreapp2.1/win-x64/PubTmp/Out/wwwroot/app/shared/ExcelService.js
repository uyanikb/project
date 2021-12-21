"use strict";var __decorate=this&&this.__decorate||function(e,t,r,a){var o,c=arguments.length,i=c<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,a);else for(var s=e.length-1;0<=s;s--)(o=e[s])&&(i=(c<3?o(i):3<c?o(t,r,i):o(t,r))||i);return 3<c&&i&&Object.defineProperty(t,r,i),i},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),file_saver_1=require("file-saver"),XLSX=require("xlsx"),EXCEL_TYPE="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",EXCEL_EXTENSION=".xlsx",ExcelService=function(){function e(){}return e.prototype.exportAsExcelFile=function(e,t){e=XLSX.utils.json_to_sheet(e);console.log("worksheet",e);e=XLSX.write({Sheets:{data:e},SheetNames:["data"]},{bookType:"xlsx",type:"array"});this.saveAsExcelFile(e,t)},e.prototype.saveAsExcelFile=function(e,t){e=new Blob([e],{type:EXCEL_TYPE});file_saver_1.FileSaver.saveAs(e,t+"_export_"+(new Date).getTime()+EXCEL_EXTENSION)},__decorate([core_1.Injectable(),__metadata("design:paramtypes",[])],e)}();exports.ExcelService=ExcelService;
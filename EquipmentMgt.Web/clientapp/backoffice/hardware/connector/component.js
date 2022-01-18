"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var service_1 = require("../../../shared/service");
var ConnectorComponent = /** @class */ (function () {
    function ConnectorComponent(_http, router, titleService, formBuilder, _dataService) {
        this._http = _http;
        this.router = router;
        this.titleService = titleService;
        this.formBuilder = formBuilder;
        this._dataService = _dataService;
        this.adet = 0;
        this.loading = false;
        this._getUrl = '/api/Connector/getAll';
        this._getbyIdUrl = '/api/connector/getById';
        this._saveUrl = '/api/connector/save';
        this._deleteUrl = '/api/connector/deleteById';
        this._updateUrl = '/api/connector/updateStatus';
        this._receiveUrl = '/api/connector/receive';
        this._getLocationUrl = '/api/location/getAll';
        this._getProjectUrl = '/api/project/getAll';
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        this.loggedUserName = this.loggedUser.displayName;
        this.loggedEmail = this.loggedUser.email;
        this.loggedUserType = this.loggedUser.userType;
    }
    ConnectorComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Envanter Takip Sistemi | Connector");
        this.loadScripts();
        this.createForm();
        this.getAll();
    };
    ConnectorComponent.prototype.loadScripts = function () {
        var libScripts = [
            'assets/js/datepicker-init.js'
        ];
        for (var i = 0; i < libScripts.length; i++) {
            var node = document.createElement('script');
            node.src = libScripts[i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('body')[0].appendChild(node);
        }
    };
    ConnectorComponent.prototype.createForm = function () {
        this.connectorForm = this.formBuilder.group({
            id: 0,
            locationId: new forms_1.FormControl(''),
            port: new forms_1.FormControl(''),
            TeiPartNumber: new forms_1.FormControl(''),
            description: new forms_1.FormControl(''),
            manufacturer: new forms_1.FormControl(''),
            manufacturePartNumber: new forms_1.FormControl(''),
            quantity: new forms_1.FormControl(''),
            package: new forms_1.FormControl(''),
            projectId: new forms_1.FormControl('')
        });
    };
    //Pop Modal
    ConnectorComponent.prototype.addNew = function () {
        this.reset();
        this.getLocations();
        this.getProjects();
        $('#largesizemodal').modal('show');
        $("#largesizemodal").on('shown.bs.modal', function () {
            $(this).find('#port').focus();
        });
    };
    //Get Connectors 
    ConnectorComponent.prototype.getAll = function () {
        var _this = this;
        //debugger
        this.loading = true;
        this._dataService.getAll(this._getUrl)
            .subscribe(function (response) {
            _this.connectors = response;
            _this.connectorsCopy = response;
        }, function (error) {
            console.log(error);
        });
        this.loading = false;
    };
    //Get by ID
    ConnectorComponent.prototype.edit = function (e, m) {
        var _this = this;
        e.preventDefault();
        this.loading = true;
        this.getLocations();
        this.getProjects();
        this._dataService.getById(m.id, this._getbyIdUrl)
            .subscribe(function (response) {
            _this.loading = false;
            _this.connector = response;
            _this.connectorForm.setValue({
                id: _this.connector.id,
                locationId: _this.connector.locationId,
                port: _this.connector.port,
                TeiPartNumber: _this.connector.teiPartNumber,
                description: _this.connector.description,
                manufacturer: _this.connector.manufacturer,
                manufacturePartNumber: _this.connector.manufacturePartNumber,
                quantity: _this.connector.quantity,
                package: _this.connector.package,
                projectId: _this.connector.projectId,
            });
            $('#largesizemodal').modal('show');
            $("#largesizemodal").on('shown.bs.modal', function () {
                $(this).find('#name').focus();
            });
        }, function (error) {
            console.log(error);
        });
    };
    ConnectorComponent.prototype.onSearch = function () {
        var term = this.searchTerm;
        this.connectors = this.connectorsCopy.filter(function (tag) {
            return tag.description.toLowerCase().indexOf(term.toLowerCase()) >= 0;
        });
    };
    ConnectorComponent.prototype.receive = function (e, m) {
        var _this = this;
        var id = m.id;
        var count = 0;
        for (var i = 0; i < this.connectors.length; i++) {
            if (this.connectors[i].id != m.id)
                count++;
            else if (this.connectors[i].id == m.id) {
                break;
            }
        }
        this.adet = document.getElementById("receiveQuantity" + (count + 1)).value;
        if (m.quantity == 0) {
            alert("Elimizde hiç malzeme bulunmamaktadır.");
        }
        else if (m.quantity >= this.adet) {
            this.loading = true;
            this._dataService.receiveWithUser(m, this.adet, this.loggedUser, this._receiveUrl)
                .subscribe(function (response) {
                _this.loading = false;
                _this.getAll();
            }, function (error) {
                console.log(error);
            });
        }
        else {
            alert("Ooopps elimizde o kadar yok mevcut sayısından az bir sayı giriniz");
        }
        e.preventDefault();
        this.loading = false;
    };
    //Create
    ConnectorComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        if (this.connectorForm.invalid) {
            return;
        }
        var formModel = new FormData();
        formModel.append('id', this.connectorForm.value.id);
        formModel.append('locationId', this.connectorForm.value.locationId);
        formModel.append('port', this.connectorForm.value.port);
        formModel.append('TeiPartNumber', this.connectorForm.value.TeiPartNumber);
        formModel.append('description', this.connectorForm.value.description);
        formModel.append('manufacturer', this.connectorForm.value.manufacturer);
        formModel.append('manufacturePartNumber', this.connectorForm.value.manufacturePartNumber);
        formModel.append('quantity', this.connectorForm.value.quantity);
        formModel.append('package', this.connectorForm.value.package);
        formModel.append('projectId', this.connectorForm.value.projectId);
        //debugger
        this._dataService.saveWithUser(this.connectorForm.value, this.loggedUser, this._saveUrl)
            .subscribe(function (response) {
            _this.loading = false;
            _this.resmessage = response.message;
            _this.alertmessage = "alert-outline-info";
            _this.getAll();
            $('#largesizemodal').modal('hide');
            //this.reset();
        }, function (error) {
            console.log(error);
        });
    };
    ConnectorComponent.prototype.updateStatus = function (e, m) {
        var _this = this;
        this.loading = true;
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.description + '. Are you sure?');
        if (IsConf) {
            this._dataService.updateStatus(m, this.loggedUser, this._updateUrl)
                .subscribe(function (response) {
                //console.log(response);
                _this.resmessage = response.message;
                _this.alertmessage = "alert-outline-info";
                _this.getAll();
                _this.reset();
                _this.loading = false;
                $('#defaultsizemodal').modal('hide');
            }, function (error) {
                console.log(error);
                _this.loading = false;
            });
        }
        this.loading = false;
    };
    ConnectorComponent.prototype.getLocations = function () {
        var _this = this;
        this.loading = true;
        //debugger
        this._dataService.getAll(this._getLocationUrl)
            .subscribe(function (response) {
            _this.locations = response;
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    ConnectorComponent.prototype.getProjects = function () {
        var _this = this;
        this.loading = true;
        //debugger
        this._dataService.getAll(this._getProjectUrl)
            .subscribe(function (response) {
            _this.projects = response;
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    //Delete
    ConnectorComponent.prototype.delete = function (e, m) {
        var _this = this;
        this.loading = true;
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.description + '. Are you sure?');
        if (IsConf) {
            this._dataService.delete(m.id, this._deleteUrl)
                .subscribe(function (response) {
                _this.loading = false;
                _this.resmessage = response;
                _this.getAll();
            }, function (error) {
                console.log(error);
            });
        }
    };
    ConnectorComponent.prototype.reset = function () {
        this.connectorForm.setValue({
            id: 0,
            locationId: 0,
            port: null,
            TeiPartNumber: null,
            description: null,
            quantity: 0,
            projectId: 0,
            manufacturer: null,
            manufacturePartNumber: null,
            package: null,
        });
        this.searchTerm = "";
        this.connectorsCopy = [];
        this.connectors = [];
        this.resmessage = null;
        $('#port').focus();
    };
    ConnectorComponent = __decorate([
        core_1.Component({
            selector: 'ng-connector',
            templateUrl: './app/backoffice/hardware/connector/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [http_1.Http,
            router_1.Router,
            platform_browser_1.Title,
            forms_1.FormBuilder,
            service_1.DataService])
    ], ConnectorComponent);
    return ConnectorComponent;
}());
exports.ConnectorComponent = ConnectorComponent;
//# sourceMappingURL=component.js.map
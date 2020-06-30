import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import {environment1} from '../../environments/environment.prod';
import {Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
	providedIn: 'root'
})
export class UserService {
	notificatins: Notification[];

	mynotification =[];
	constructor( private httpClient:HttpClient) { }
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	}
	newtest(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'abcd',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}  

	Login(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'user/Login',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}  

	addSurgeryMaster(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'SurgeryCenter/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateSurgeryMaster(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'SurgeryCenter/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateSurgeryStatus(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'SurgeryCenter/IsActive',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	deleteSurgeryStatus(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'SurgeryCenter/IsDeleted',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getSurgeryDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"SurgeryCenter/GetDeletedList",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updatePhysicianStatus(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PhysicianOffice/IsActive',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	deletePhysicianStatus(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PhysicianOffice/IsDeleted',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getPhysicainDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"PhysicianOffice/GetDeletedList",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	
	addPhysicianMaster(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PhysicianOffice/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updatePhysicianMaster(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PhysicianOffice/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	addSubAdmin(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'user/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	getPhysicianCenterList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"PhysicianOffice/List",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getSurgeryCenterList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"SurgeryCenter/List",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))

	}
	addEquipment(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Equipments/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getEquipmentList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Equipments/List",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getEquipDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Equipments/GetDeletedList",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	equipmentIsActive(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Equipments/IsActive",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	equipmentIsDeleted(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Equipments/IsDeleted",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	equipmentListDD(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Equipments/ListDD",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateEquipment(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Equipments/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	addEthinicity(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Ethinicity/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	ethinicityIsActive(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Ethinicity/IsActive',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	ethinicityIsDelete(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Ethinicity/IsDeleted',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	EthinicityListDD(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Ethinicity/ListDD',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getEthinicityList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Ethinicity/List",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	GetDeletedEthinicityList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Ethinicity/GetDeletedList",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateEthinicity(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Ethinicity/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	addInstruments(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Instruments/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getInstrumentsList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Instruments/List",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getInstrumentsListDD(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Instruments/ListDD",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateInstruments(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Instruments/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	instrumentsIsActive(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Instruments/IsActive',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	instrumentsIsDeleted(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Instruments/IsDeleted',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getInstruDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Instruments/GetDeletedList",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	addLanguage(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Language/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getLanguageList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Language/List",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getLanguageDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Language/GetDeletedList",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getLanguageListDD(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Language/ListDD",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateLanguage(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Language/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	languageIsActive(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Language/IsActive',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	languageIsDeleted(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Language/IsDeleted',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	

	addNationality(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Nationality/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getNationalityList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Nationality/List",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getNationalityDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Nationality/GetDeletedList",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getNationalityListDD(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Nationality/ListDD",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateNationality(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Nationality/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	nationalityIsActive(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Nationality/IsActive',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	nationalityIsDeleted(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Nationality/IsDeleted',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	

	addReligion(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Religion/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getReligionList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Religion/List",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getReligionDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Religion/GetDeletedList",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getReligionListDD(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Religion/ListDD",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateReligion(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Religion/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	religionIsActive(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Religion/IsActive',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	religionIsDelete(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Religion/IsDeleted',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}


	addUser(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'User/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getUserList(): Observable<any> {
		return this.httpClient.get<any>(environment1.endPoint+"User/List")
		.pipe(retry(1))
	}
	updateUser(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'User/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	addRace(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Race/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getRaceList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Race/List",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getRaceDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Race/GetDeletedList",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getRaceListDD(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Race/ListDD",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateRace(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Race/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	raceListIsActive(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Race/IsActive",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	raceListIsDeleted(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Race/IsDeleted",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	addRelation(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Relation/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getRelationList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Relation/List",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getRelationDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Relation/GetDeletedList",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getRelationListDD(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Relation/GetDeletedList",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateRelation(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Relation/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	relationIsActive(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Relation/IsActive',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	relationIsDeleted(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Relation/IsDeleted',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	addIncident(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Incident/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getIncidentList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Incident/List",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
		.pipe(retry(1))
	}
	getInciDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Incident/GetDeletedList",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
		.pipe(retry(1))
	}
	updateIncident(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Incident/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	incidentListDD(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Incident/ListDD',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	incidentIsActive(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Incident/IsActive',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	incidentIsDeleted(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Incident/IsDeleted',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}


	addPrefix(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Prefix/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getPrefixList(): Observable<any> {
		return this.httpClient.get<any>(environment1.endPoint+"Prefix/List")
		.pipe(retry(1))
	}
	updatePrefix(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Prefix/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	addSupplies(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Supplies/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getSuppliesList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Supplies/List",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getSuppDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Supplies/GetDeletedList",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getSuppliesListDD(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Supplies/ListDD",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateSuppliesNew(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Supplies/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	suppliesIsActive(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Supplies/IsActive',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	suppliesIsDeleted(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Supplies/IsDeleted',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	

	addAnesthesia(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Anesthesia/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getAnesthesiaList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Anesthesia/List',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getAnesthesiaListForDD(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Anesthesia/ListDD',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateAnesthesia(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Anesthesia/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	anesthesiaIsActive(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Anesthesia/IsActive',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	anesthesiaIsDelete(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Anesthesia/IsDeleted',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	getAnesDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Anesthesia/GetDeletedList',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	addBlock(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Block/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getBlockList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Block/List",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateBlock(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Block/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	getBlockDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Block/GetDeletedList",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	blockIsActive(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Block/IsActive",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	blockIsDelete(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Block/IsDeleted",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	blockListDD(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Block/ListDD",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	getMasterCategoryRoles(): Observable<any> {
		return this.httpClient.get<any>(environment1.endPoint+"RightM/List")
		.pipe(retry(1))
	}

	addUserRole(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Role/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getSpecialties(): Observable<any> {
		return this.httpClient.get<any>(environment1.endPoint+"Specility/List")
		.pipe(retry(1))
	}
	getSpecialtiesFilter(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Specility/ListDD",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	getUserRoles(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Role/List",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	UpdateUserRoles(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Role/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	getUserRoleDeletedList(): Observable<any> {
		return this.httpClient.get<any>(environment1.endPoint+"Role/GetDeletedList")
		.pipe(retry(1))
	}

	findRoleById(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Role/Select',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getGroupList(): Observable<any> {
		return this.httpClient.get<any>(environment1.endPoint+"RightM/GetGroupList")
		.pipe(retry(1))
	}
	getGroupListWithFilter(id): Observable<any> {
		return this.httpClient.get<any>(environment1.endPoint+"RightM/GetListFilterWithGroup?groupname"+'='+id)
		.pipe(retry(1))
	}


	addStaff(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'StaffM/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getStaffList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"StaffM/List",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateStaff(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'StaffM/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	getStaffDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'StaffM/GetDeletedList',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	//return this.httpClient.get<any>(environment1.endPoint + 'Patient/SearchWithSSN?FilterText' +'='+ id + '&POID=' + poid)
	GetRolesFilterwithSC(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Role/GetRolesFilterwithSC',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	addSurgerySetting(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'SurgeryCenter/AddSetting',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getSurgerySetting(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"SurgeryCenter/Select",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateSurgerySetting(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'SurgeryCenter/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	getDeletedSurgerySetting(): Observable<any> {
		return this.httpClient.get<any>(environment1.endPoint+"SurgeryCenter/GetDeletedList")
		.pipe(retry(1))
	}
	addPhysicianSetting(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PhysicianOffice/AddSetting',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getPhysicianSetting(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"PhysicianOffice/select",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updatePhysicianSetting(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PhysicianOffice/DeleteSetting',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	getDeletedPhysicianSetting(): Observable<any> {
		return this.httpClient.get<any>(environment1.endPoint+"PhysicianOffice/GetDeletedList")
		.pipe(retry(1))
	}
	getSingleSurgeryCenter(id): Observable<any> {
		return this.httpClient.get<any>(environment1.endPoint+"SurgeryCenter/select?UniqueID" +'='+ id)
		.pipe(retry(1))
	}
	
	getSinglePhysicianOffice(id): Observable<any> {
		return this.httpClient.get<any>(environment1.endPoint+"PhysicianOffice/select?UniqueID" +'='+ id)
		.pipe(retry(1))
	}
	addICD(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'ICD/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	
	updateICD(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'ICD/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	getICDDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"ICD/GetDeletedList",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getICDList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"ICD/List",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getICDListDD(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"ICD/ListDD",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	ICDIsActive(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"ICD/IsActive",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	ICDIsDeleted(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"ICD/IsDeleted",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	addSpecility(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Specility/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getSpecilityList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Specility/List",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getSpecsDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Specility/GetDeletedList",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getSpecsListDD(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Specility/ListDD",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateSpecility(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Specility/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	specilityIsActive(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Specility/IsActive',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	specilityIsDeleted(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Specility/IsDeleted',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	

	addDesignation(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Designation/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	
	updateDesignation(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Designation/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	getDesiDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Designation/GetDeletedList",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getDesignationList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Designation/List",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getDesignationListDD(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Designation/ListDD",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	designationIsActive(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Designation/IsActive",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	designationIsDeleted(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Designation/IsDeleted",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	
	saveSiteUrl(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'SurgeryCenter/AddSiteURL',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	saveAppearance(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'SurgeryCenter/AddAppearance',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	saveLogo(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'SurgeryCenter/AddLogo',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	addSlider(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'SurgeryCenter/AddSlider',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	addFooter(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'SurgeryCenter/AddFooter',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	addMiscellaneous(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'SurgeryCenter/AddMiscellaneous',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	chnageStatusSlider(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'SurgeryCenter/ActiveSlider',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	deleteSlider(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'SurgeryCenter/DeleteSlider',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	savePhySiteUrl(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PhysicianOffice/AddSiteURLs',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	savePhyAppearance(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PhysicianOffice/AddAppearances',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	savePhyLogo(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PhysicianOffice/AddLogos',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	addPhySlider(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PhysicianOffice/AddSliders',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	addPhyFooter(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PhysicianOffice/AddFooters',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	addPhyMiscellaneous(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PhysicianOffice/AddMiscellaneouss',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	chnageStatusPhySlider(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PhysicianOffice/ActiveSliders',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	deletePhySlider(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PhysicianOffice/DeleteSliders',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	addCPT(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'CPT/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getCPTList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"CPT/List",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateCPT(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'CPT/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	cPTIsActive(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'CPT/IsActive',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	cPTIsDelete(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'CPT/IsDeleted',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	CPTListDD(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'CPT/ListDD',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	getCPTDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"CPT/GetDeletedList",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	addPatient(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Patient/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	addPrimaryInsurance(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Patient/AddPrimaryInsurance',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	addSecondaryInsurance(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Patient/AddFSecondaryInsurance',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	addThirdInsurance(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Patient/AddSSecondaryInsurance',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	addFourthInsurance(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Patient/AddTSecondaryInsurance',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	AddIncidentBooking(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Booking/AddIncident',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	AddPreoperativeMedicalClearance(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Booking/AddPreoperativeMedicalClearance',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	AddSpecialRequest(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Booking/AddSpecialRequest',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	AddInsurancePrecertificationAuthorization(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Booking/AddInsurancePrecertificationAuthorization',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	AddAlerts(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Booking/AddAlerts',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	UploadPatientDocuments(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Booking/UploadPatientDocuments',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	addForm(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Forms/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getFormList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Forms/List",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateForm(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Forms/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateFromsIsActive(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Forms/IsActive',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateFromsIsDelete(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Forms/IsDeleted',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	getFormDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Forms/GetDeletedList",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getPackDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Pack/GetDeletedList",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getPackList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Pack/List",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updatePack(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Pack/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getPackListDD(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Pack/ListDD',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	updateFromsStatus(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Pack/IsActive',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	deleteFromsStatus(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Pack/IsDeleted',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	addPack(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Pack/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getpatientList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Patient/GetPatientList',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	filterPhyWithSC(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PhysicianOffice/GetPoListFilterWithSC',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	SearchWithPatientCode(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Patient/SearchWithPatientCode',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	addBooking(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Booking/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	findCPTwithCat(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'CPT/GetCPTListFilterWithCode',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	findICDwithCat(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'ICD/GetICDFilterWithCode',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	getListAppointments(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Booking/GetBookingList',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	
	updatePatientRecords(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Patient/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	addAlert(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Alert/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}


	getAlertList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Alert/List',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getAlertListForDropDown(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Alert/ListDD',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	updateAlert(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Alert/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	getAlertDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Alert/GetDeletedList',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	alertIsActive(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Alert/IsActive',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	alertIsDelete(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Alert/IsDeleted',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getPatinetViaId(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'patient/select',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	isURLExist(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'SurgeryCenter/CheckSiteURL',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	addProcedures(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Procedure/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getProceduresList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Procedure/List",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getProceduresDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Procedure/GetDeletedList",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateProcedures(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Procedure/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	proceduresIsActive(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Procedure/IsActive',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	proceduresIsDelete(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Procedure/IsDeleted',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	findProcedurewithCat(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Procedure/GetProcedureFilterWithCategory',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	findOneSurgeryCenter(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'SurgeryCenter/Select',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	applyWayStarApi(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Patient/CheckInsuranceAuthentication',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	SaveInsuranceInformation(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Patient/SaveInsuranceInformation',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	searchZipCode(id): Observable<any> {
		return this.httpClient.get<any>('http://production.shippingapis.com/ShippingAPITest.dll?API' +'='+ id)
		.pipe(retry(1))
	}
	AddSurgicalProcedureInformation(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Booking/AddSurgicalProcedureInformation',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	GetBookingList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Booking/GetBookingList',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getBookingCounts(id, type, slug): Observable<any> {
		return this.httpClient.get<any>(environment1.endPoint + 'Booking/GetBookingCount?Surgery_Center_ID' +'='+ id + '&Office_Type=' + type + '&Slug=' + slug)
		.pipe(retry(1))
	}
	UpdateBookingStatus(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Booking/UpdateBookingStatus',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	DcryptSSNnumber(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'User/Dcrypt',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	checkEmail(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'User/CheckEmail',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	checkDocCodeEmpCode(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'StaffM/CheckCodeExist',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	checkPatientEmail(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Patient/CheckEmail',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getBookingViaId(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'booking/select',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	AssignNotificationToBooking(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Booking/AssignNotification',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	DeleteAssignedNotificationToBooking(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Booking/DeleteAssignedNotification',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	changeStaffStatus(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'StaffM/IsActive',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	changeStaffDeleteStatus(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'StaffM/IsDeleted',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	getFormViaId(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Forms/Select',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	SaveFormBuilderData(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Forms/SaveFormBuilderData',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	GetFormFilterWithPackID(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Forms/GetFormFilterWithPackID',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	SavePatientsForms(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Booking/PatientForms',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateRejectService(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Booking/UpdateBookingStatus',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	GetScListFilterWithPO(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'SurgeryCenter/GetSCListFilterWithPO',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}


	searchWithSSNOrPatient(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Patient/SearchWithSSN?FilterText',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	GetBookingListFilterWithPO(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Booking/GetBookingListFilterWithPO',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	GetNotiCategoryList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"NotiCategory/List",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	GetIntakeCategoryList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"PatientIntake/List",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	assignPatientForms(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Booking/PatientForms',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	NotificationsCreate(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Notifications/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	PatientIntakeCreate(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PatientIntake/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	notiTypeCreateService(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'NotiType/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	IntakeTypeCreateService(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PatiIntakeType/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	GetNotiTypeListFilterWithCatID(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'NotiType/GetNotiTypeListFilterWithCatID',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	GetPatiIntakeTypeListFilterWithCatID(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PatiIntakeType/GetPatiIntakeTypeListFilterWithCatID',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	getpatientEmail(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Patient/GetEmail',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	generatePatientFormUrl(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PatiFormURL/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	sendEmailToPatient(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Email/SendMail',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	GetLURL(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PatiFormURL/GetActualURL',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	PatiFormURLVerifyPasscode(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PatiFormURL/VerifyPasscode',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	saveBookingInOne(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Booking/AddBooking',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	createPatientInOne(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Patient/AddPatient',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	EditBookigInOne(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Booking/EditBooking',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	saveSPITemplete(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'SPTemplates/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	checkSpiTempleteName(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'SPTemplates/IsExist',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	GetTemplateFilterWithSurgeon(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'SPTemplates/GetTemplateFilterWithSurgeon',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	selectSPITemplete(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'SPTemplates/Select',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	GetFormFilterWithSurgeryPhysicianCenterID(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Forms/GetFormFilterWithSurgeryPhysicianCenterID',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	GetForm_Surgery_Physician_Id(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Forms/List',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	GetInsurCompanyFilterWithName(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'InsuranceCompany/GetInsurCompanyFilterWithName',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	KbCategoryCreate(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'KBCategory/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	KbCategoryUpdate(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'KBCategory/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	KbCategoryIsActive(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'KBCategory/IsActive',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	KbCategoryIsDeleted(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'KBCategory/IsDeleted',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	KbCategoryList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'KBCategory/List',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	KbCategoryDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'KBCategory/GetDeletedList',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getKBSubCategoryList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'KBCategory/ListDD',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getKnowlwdgeBaseDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'KnowledgeBase/GetDeletedList',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	DocumentCatCreate(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'DocumentCategory/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	DocumentCatUpdate(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'DocumentCategory/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	DocumentCatIsActive(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'DocumentCategory/IsActive',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	DocumentCatIsDeleted(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'DocumentCategory/IsDeleted',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	DocumentCatList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'DocumentCategory/List',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	DocumentCatDeletedList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'DocumentCategory/GetDeletedList',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	DocumentSubCatList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'DocumentCategory/ListDD',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	KnowledgeBaseCreate(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'KnowledgeBase/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	kBSubCategoryListDD(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'KBCategory/SubCategoryListDD',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}


	// new changes in notification on date19-12-19
	NotificationsActionCreate(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Notifications/AddAction',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	PatientIntakeActionCreate(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PatientIntake/AddAction',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	NotificationsGetNotiList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'Notifications/GetNotiListFilterWithPO',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	IntakeGetInatkeList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'PatientIntake/GetPatiIntakeListFilterWithPO',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}


	deleteNotifications(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Notifications/IsDeleted',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	deleteIntakes(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PatientIntake/IsDeleted',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}


	updateNotifications(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Notifications/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	


	getSingleNotifications(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Notifications/select',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getSingleInatke(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PatientIntake/select',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}


	deleteNotificationsActions(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Notifications/DeleteAction',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	deleteIntakeActions(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PatientIntake/DeleteAction',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	updateNotificationsActions(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Notifications/EditAction',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	getSingleNotificationsActons(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Notifications/SelectAction',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	getSingleIntakeActons(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PatientIntake/SelectAction',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	editNotificationsActons(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Notifications/EditAction',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	editPatientIntakeActons(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PatientIntake/EditAction',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	knowlwdgeBaseList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'KnowledgeBase/List',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	GetNotiCategoryCreate(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"NotiType/Create",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	GetIntakeCategoryCreate(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"PatiIntakeType/Create",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	sendsms(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Sms/SendSMS",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}


	sendemail(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Email/SendMail",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	KBAddReference(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"KnowledgeBase/AddReference",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getKBViaId(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"KnowledgeBase/Select",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	sendvoicecall(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Voice/SetCall",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	sendwhatsappmassages(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"WhatsApp/MessageToWhatsapp",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	IsDeletedReference(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"KnowledgeBase/IsDeletedReference",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	IsDeletedKB(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"KnowledgeBase/IsDeleted",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	IsActiveKB(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"KnowledgeBase/IsActive",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateReference(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"KnowledgeBase/Update",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	viewAndDownloadPDF(bookId, PatId, slug): Observable<any> {
		return this.httpClient.get<any>(environment1.endPoint + 'Booking/DownloadPDF?bookingid' +'='+ bookId +'&'+'patientid='+PatId+'&'+'Slug='+slug)
		.pipe(retry(1))
	}

	IsActiveWithUMID(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"User/IsActiveWithUMID",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	IsDeletedWithUMID(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"User/IsDeletedWithUMID",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	
	GetCompletedBookingList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'Booking/GetCompletedBookingList',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	saveSystemEmailTemp(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'SysEmailTemplate/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	listSystemEmailTemp(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'SysEmailTemplate/List',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	seletEmailViaName(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'SysEmailTemplate/SelectWithName',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateSystemEmailTemp(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'SysEmailTemplate/Edit',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	VarifyPasscode(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'User/VarifyPasscode',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	ResetPassword(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'User/ResetPassword',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	ResetPasswordViaEmail(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'User/ResetPass',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	GetNotificationTimming(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'NotificationTiming/GetNotificationTiming',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	GetQuickBookingList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'Booking/GetQuickBookingList',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	GetWalkInBookingList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'Booking/GetWalkInBookingList',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	GetPatientBookingList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'Booking/GetPatientBookingList',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	CheckOldPassword(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'User/CheckOldPassword',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	PatientResetPassword(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'User/PatientResetPassword',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}	

	editPatientDetails(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'Patient/FillDetailsByPatient',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}	
	QBBookingWKBooking(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'QBBooking/AddBooking',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}	

	checkSSN(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'Patient/CheckSSN',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	GetPatientBookingStatusList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'Booking/GetPatientBookingStatusList',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	PatiIntakeCategory(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'PatiIntakeCategory/List',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	GetNotiTypeListFilterWithCatID1(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'NotiType/GetNotiTypeListFilterWithCatID',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	GetIntakeTypeListFilterWithCatID1(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'PatiIntakeType/GetPatiIntakeTypeListFilterWithCatID',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	createPatientIntake(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'PatientIntake/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	UpdatePatientIntake(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'PatientIntake/update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	ListPatientIntake(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'PatientIntake/List',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	statusPatientIntake(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'PatientIntake/IsActive',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	IsDeletedPatientIntake(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+'PatientIntake/IsDeleted',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}





	/////////////////////////////////////////////////////////////////////////////

	getUserName(id): Observable<any> {
		return this.httpClient.get<any>(environment1.endPoint + 'user/select?UniqueID' +'='+ id)
		.pipe(retry(1))
	}

	add_listing(): Observable<any> {
		return this.httpClient.get<any>(environment1.endPoint+"add_listing")
		.pipe(retry(1))
	}

	CreateNotificationTime(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"NotificationTiming/Create",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	addVCBooking(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"VirtualConsultant/AddVCBooking",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	VCListForPO(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"VirtualConsultant/VCListForPO",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	editVCBooking(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"VirtualConsultant/EditVCBooking",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	findOneVcBooking(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"VirtualConsultant/Select",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	assignVCNotification(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"VirtualConsultant/AssignNotification",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	deleteAssignedVCNotification(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"VirtualConsultant/DeleteAssignedNotification",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	vClistForPatient(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"VirtualConsultant/VCListForPatient",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	VCCancelledListForPatient(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"VirtualConsultant/VCCancelledListForPatient",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	VCBCancelledUpdate(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"VirtualConsultant/UpdateStatus",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	IsDeletedUploadPatientDocuments(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Booking/IsDeletedUploadPatientDocuments",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	statusFilter(id, ftype, Status, Slug): Observable<any> {
		return this.httpClient.get<any>(environment1.endPoint + 'Booking/GetBookingListFilterWithPO?SurgeryPhysicianID' +'='+ id+ '&OfficeType='+ ftype+'&Status='+Status+'&Slug='+Slug)
		.pipe(retry(1))
	}

	MarkAsCompleteBooking(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Booking/MarkAsCompleteBooking",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	CheckPatientBooking(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint+"Booking/CheckPatientBooking",
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	AssignPermissionRole(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Role/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	vcHistoryList(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'VirtualConsultant/VCHistoryListForPO',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	getPagesNameForPermission(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'PCategory/List',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	createBookingLogs(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'Log/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	pagesListViaCatFromermission(data): Observable<any> {
		return this.httpClient.post<any>(environment1.endPoint + 'UserPermission/ListFilterWithUser',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	AssignUserPermission(data):Observable<any>{
		return this.httpClient.post<any>(environment1.endPoint + 'UserPermission/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	addPermissionWhenUserCreeate(data):Observable<any>{
		return this.httpClient.post<any>(environment1.endPoint + 'UserPermission/AssignDefaultPermission',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

	getAllPermissionOfUser(data):Observable<any>{
		return this.httpClient.post<any>(environment1.endPoint + 'UserPermission/ListFilterWithUserID',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	FormDataFilledByPatient(data):Observable<any>{
		return this.httpClient.post<any>(environment1.endPoint + 'PatientFormData/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	staffListForSA(data):Observable<any>{
		return this.httpClient.post<any>(environment1.endPoint + 'StaffM/ListForSA',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	staffListForSCPO(data):Observable<any>{
		return this.httpClient.post<any>(environment1.endPoint + 'StaffM/ListForSCPO',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	addMultiLang(data):Observable<any>{
		return this.httpClient.post<any>(environment1.endPoint + 'Localization/Create',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	updateMultiLang(data):Observable<any>{
		return this.httpClient.post<any>(environment1.endPoint + 'Localization/Update',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	IsActiveMultiLang(data):Observable<any>{
		return this.httpClient.post<any>(environment1.endPoint + 'Localization/IsActive',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	IsDeleteMultiLang(data):Observable<any>{
		return this.httpClient.post<any>(environment1.endPoint + 'Localization/IsDeleted',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	multiLangList(data):Observable<any>{
		return this.httpClient.post<any>(environment1.endPoint + 'Localization/List',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	getCountForAdmin(id): Observable<any> {
		return this.httpClient.get<any>(environment1.endPoint+"Count/All"+'?'+'Slug='+id)
		.pipe(retry(1))
	}
	GetFormData(data):Observable<any>{
		return this.httpClient.post<any>(environment1.endPoint + 'PatientFormData/GetFormData',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}
	SurgeonList(data):Observable<any>{
		return this.httpClient.post<any>(environment1.endPoint + 'StaffM/SurgeonList',
			JSON.stringify(data), this.httpOptions)
		.pipe(retry(1))
	}

}

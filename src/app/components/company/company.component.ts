import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CompanyserviceService} from '../../service/companyservice.service';
import {Company} from '../../models/company';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  data = ['Midroc','Teklebirhan Ambaye  ','Bamacon','Yotek ','Zamra','Sunshine ','Satcon'];
  companies:Company [] = [];
  createProviderForm:FormGroup;
  public isLoggedIn = false;

  constructor(private ref: ChangeDetectorRef ,private userService: UserService, private modal: NzModalService,private notification: NzNotificationService, private fb:FormBuilder,private constructionCompanyService:CompanyserviceService) {
    this.userService.getLoginState().subscribe(loginStatus=>{
      this.isLoggedIn = loginStatus;

    });
  }

  ngOnInit() {

    this.createProviderForm = this.fb.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      grade: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    });
    this.getCompanies();


  }
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  showDeleteConfirm(company:Company): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this task?',
      nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.onDeleteCompany(company),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  getCompanies(){
    let self=this;

    this.constructionCompanyService.getCompanies().once('value').then(function(companies){
      self.companies = [];

      companies.forEach(company=>{

        const currentCompany = company.toJSON() as Company;
        currentCompany.id = company.key;
        self.companies.push(currentCompany);
      })

    });
  }

  onDeleteCompany(company:Company) {
    let self = this;
    this.constructionCompanyService.deleteCompany(company,function (success,message) {
      if(success){
        console.log('callback message: '+message);
        self.getCompanies();
      }
    })
  }
  postCompany(){
    for (const i in this.createProviderForm.controls) {

      this.createProviderForm.controls[i].markAsDirty();
      this.createProviderForm.controls[i].updateValueAndValidity();
      if(this.createProviderForm.controls[i].errors){
        console.log('errors');
        return;
      }
    }
    let self = this;
    this.constructionCompanyService.postCompany(
      {name:this.createProviderForm.controls.name.value, type:this.createProviderForm.controls.type.value, phoneNo:this.createProviderForm.controls.phone.value, grade: this.createProviderForm.controls.grade.value} as Company,function (success, message) {
        if(success){
          self.getCompanies();
          self.createNotification('success')
          self.close();
        }
        else{
          self.createNotification('success')
        }

      })
  }
  createNotification(type: string): void {
    this.notification.create(
      type,
      'Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
    );
  }



}

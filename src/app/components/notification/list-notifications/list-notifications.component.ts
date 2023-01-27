import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier/lib/services/notifier.service';
import { notificationsTypes } from 'src/app/models/enums/notifications-type';
import { BaseResponseList } from 'src/app/models/notification-model/baseResponseList';
import { Notification } from 'src/app/models/notification-model/notification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-list-notifications',
  templateUrl: './list-notifications.component.html',
  styleUrls: ['./list-notifications.component.css']
})
export class ListNotificationsComponent implements OnInit {
  
  notificationsList: Notification[] = [];

  showFilter = false;

  selectedFilter: any;

  filter!: FormGroup;

  metadata = {
    types: notificationsTypes,
  };

  constructor
  (
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit() {

    this.filter = new FormGroup({
      selectedFilter: new FormControl(null),
    });

    this.getList();

  }

  getList(){

    var filterCommand = this.filter?.value;

    if(filterCommand.selectedFilter != null){
      filterCommand.selectedFilter = Number(filterCommand.selectedFilter);
    }

    this.notificationService.getAll(filterCommand.selectedFilter).subscribe((resp: any) => {
      this.notificationsList = resp.data;
    });
  }

  clearFilter(){
    this.filter.get('selectedFilter')?.setValue(null);
    this.getList();
  }

  delete(id: string){
    this.notificationService.remove(id).subscribe((resp: any) => {
      this.notificationsList = this.notificationsList.filter(x => x.id != id);
    });
  }

  edit(id: string){
    this.router.navigate(['/edit/' + id]);
  }

}

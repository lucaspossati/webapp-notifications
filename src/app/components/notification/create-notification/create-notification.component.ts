import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { takeWhile } from 'rxjs';
import { notificationsTypes } from 'src/app/models/enums/notifications-type';
import { Notification } from 'src/app/models/notification-model/notification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-create-notification',
  templateUrl: './create-notification.component.html',
  styleUrls: ['./create-notification.component.css']
})
export class CreateNotificationComponent implements OnInit {

  notificationToEdit: any;
  formNotification!: FormGroup;
  id: string = '';
  obs:any;

  metadata = {
    types: notificationsTypes,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private injector: Injector,
    private notificationService: NotificationService,
    private notifierService: NotifierService
  ) { }

  ngOnInit() {
    this.createForm();

    this.route.params.subscribe( params => 
      {
        this.id = params['id'];

        if(this.id != null){
          this.get();
        }
      }
    );

    this.inject();

  }

  get(){
    this.notificationService.get(this.id).subscribe((resp: any) => {
      this.notificationToEdit = resp;

      this.setValuesInForm(this.notificationToEdit);
    });
  }

  createForm(){
    this.formNotification = new FormGroup({
      id: new FormControl(null),
      tipo: new FormControl(null, Validators.required),
      mensagem: new FormControl(null, Validators.required),
      emailOrigem: new FormControl(null),
      assunto: new FormControl(null, Validators.required),
      cliente: new FormControl(null, Validators.required),
      nomeUsuario: new FormControl(null, Validators.required),
      emailDestinatario: new FormControl(null),
      numDestinatario: new FormControl(null),
    });
  }

  setValuesInForm(notification: Notification){
    this.formNotification.get('id')!.setValue(notification.id);
    this.formNotification.get('tipo')!.setValue(notification.tipo);
    this.formNotification.get('mensagem')!.setValue(notification.mensagem);
    this.formNotification.get('emailOrigem')!.setValue(notification.emailOrigem);
    this.formNotification.get('assunto')!.setValue(notification.assunto);
    this.formNotification.get('cliente')!.setValue(notification.cliente);
    this.formNotification.get('nomeUsuario')!.setValue(notification.nomeUsuario);
    this.formNotification.get('emailDestinatario')!.setValue(notification.emailDestinatario);
    this.formNotification.get('numDestinatario')!.setValue(notification.numDestinatario);
  }

  inject() {
    const notificationService = this.injector.get(NotificationService);
    // use auth as usual
  }

  save() {

    if (this.formNotification.invalid) {
      this.notifierService.notify
      ('error', 'Preencha todos os campos do formulário');
      return;
    }

    var cmd = this.formNotification.value;

    if (this.id) {
      cmd.tipo = Number(cmd.tipo);
      this.obs = this.notificationService.update(this.formNotification.value);
    } else {
      cmd.tipo = Number(cmd.tipo);
      this.obs = this.notificationService.create(this.formNotification.value);
    }

    this.obs.subscribe((resp: any) => {
      this.notifierService.notify('success', 'Dados salvos com sucesso');
      this.router.navigate(['/']);
    });
  }

}

import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }


  confirm(message: string, label1 = 'OK', label2 = 'Cancel', okCallback: () => any) {
    alertify.confirm(message, function (e) {
      if (e) {
        okCallback();
      } else { }
    })
      .setting({
        'title': 'Boardology',
        'modal': true,
        'labels': {ok: label1, cancel: label2},
        'transition': 'zoom'
      });
  }

  success(message: string, duration?: number) {
    alertify.success(message, duration);
  }

  error(message: string, duration?: number) {
    alertify.error(message, duration);
  }

  warning(message: string, duration?: number) {
    alertify.warning(message, duration);
  }

  message(message: string, duration?: number) {
    alertify.message(message, duration);
  }
}

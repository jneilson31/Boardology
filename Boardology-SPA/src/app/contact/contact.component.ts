import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactUsEmail } from '../_models/contact-us-email';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactUsForm: FormGroup;
  contactUsEmail: ContactUsEmail;
  baseUrl = `${environment.apiUrl}auth/`;

  constructor(private fb: FormBuilder, private http: HttpClient, private alertify: AlertifyService) { }

  ngOnInit() {
    this.createContactUsForm();
  }

  createContactUsForm() {
      this.contactUsForm = this.fb.group(
        {
          email: ['', Validators.required],
          subject: [''],
          message: ['', Validators.required],
        }
      );
  }

  sendEmail() {
    if (this.contactUsForm.valid) {
      this.contactUsEmail = Object.assign({}, this.contactUsForm.value);
      this.http.post(this.baseUrl + 'contact-us', this.contactUsEmail)
      .subscribe(next => {
        this.alertify.success('Sent contact us email');
        this.contactUsForm.reset();
      }, error => {
        this.alertify.error('Could not send contact us email');
      });
    }
  }

}

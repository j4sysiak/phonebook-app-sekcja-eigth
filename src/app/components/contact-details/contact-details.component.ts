import { Component, OnInit } from '@angular/core';
import { Contact } from '../../model/contact';
import { PhonebookService } from 'src/app/service/phonebook.service';
import { ActivatedRoute, Router } from '@angular/router';

const swal = window['swal'];

@Component({
  selector: 'pb-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  contact: Contact = new Contact();

  constructor(private service : PhonebookService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( paramsData => {
      this.service.getContactDetails(paramsData['id']).subscribe(data => this.contact = data);
    }
    )
  }

  testSwal() {
    // swal('Hello');
    // swal('Phonbook App', 'Hello Friend', 'success');
    // swal('Phonbook App', 'Hello Friend', 'warning');
    swal({
      title: 'Phonbook App',
      icon:  'info',
      text:  'You are in the contact-detail-page'
    })
  }

  deleteContact() {

    // if(!confirm('Are you sure?')) {
    //   return;
    // }

    swal({
      title: 'You are about to delete this contact',
      text: 'Please confirm',
      icon: 'warning',
      buttons: [
        {
          text: 'Yes, I am sure',
          visible: true,
          value: true
        },
        {
          text: 'Cancel',
          visible: true,
          value: false
        }
      ]
    }).then(result => {
      if (result===true){
        this.service.deleteContact(this.contact.id).subscribe(() => {
          this.router.navigate(['/contact-list']);
        });
      }
    })


  }
}



































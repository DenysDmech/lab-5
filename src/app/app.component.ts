import { MyValidator } from './my.validators';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'lab-5';
  form: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required, MyValidator.restrictedEmails]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      address: new FormGroup({ country: new FormControl('ua'), city: new FormControl('Запорожье', Validators.required) }),
      skills: new FormArray([]),
    });
  }
  submit() {
    const formControl = { ...this.form?.value };
    console.log(formControl);
    this.form.reset();
  }
  setCapital() {
    const mapCity = { ua: "Киев", pl: "Варшава", de: "Берлин" };
    const getCity = this.form.get('address').value.countrythis.form.get('address').patchValue({ city: mapCity[getCity] });
  }
  addSkill() {
    const control = new FormControl('', Validators.required);
    (<FormArray>this.form.get('skills')).push(control);
  }
}

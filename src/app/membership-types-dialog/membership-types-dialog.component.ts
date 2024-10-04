import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { IMembershipType } from '../core/interfaces/membership-type.interface.js';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-membership-types-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
  ],
  templateUrl: './membership-types-dialog.component.html',
  styleUrl: './membership-types-dialog.component.css',
})
export class MembershipTypesDialogComponent {
  title: string = '';
  action: string = '';
  membershipTypeId: string | undefined;
  url: string = '';

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      action: string;
      membershipType: IMembershipType;
      url: string;
    },
    public dialogRef: MatDialogRef<MembershipTypesDialogComponent>,
    private http: HttpClient
  ) {
    this.title = data.title;
    this.action = data.action;
    this.url = data.url;

    if (data.membershipType !== undefined) {
      const form = this.form.controls;
      this.membershipTypeId = data.membershipType.id;

      form.name.setValue(data.membershipType.name);
      form.description.setValue(data.membershipType.description);
      form.price.setValue(data.membershipType.price.toString());
    }
  }

  onSubmit(): void {
    let data: Record<string, any> = {
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
      price: Number(this.form.get('price')?.value),
    };

    if (this.action === 'post') {
      try {
        this.http.post<any>(this.url, data).subscribe((info) => {
          this.dialogRef.close('created');
        });
      } catch (error: any) {
        console.log(error);
      }
    } else if (this.action === 'put') {
      try {
        this.http
          .put<any>(this.url + '/' + this.membershipTypeId, data)
          .subscribe((info) => {
            this.dialogRef.close('updated');
          });
      } catch (error: any) {
        console.log(error);
      }
    }
  }
}

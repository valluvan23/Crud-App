import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent  implements OnInit{
  emForm: FormGroup;

  education: string[]=[
    'Matric',
    'Diploma',
    'Graduate',
    'Post Graduate',

  ];
   constructor(private _fb: FormBuilder,
    private _empService: EmployeeService, 
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
    
    {
    this.emForm = this._fb.group({
      firstname:'',
      lastname:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:'',
    });
   }

   ngOnInit(): void {
     this.emForm.patchValue(this.data);
   }

   onformSubmit(){
    if(this.emForm.valid){
      if(this.data){
        this._empService.updateEmployee(this.data.id, this.emForm.value).subscribe({
          next: (val:any) => {
            alert('Employee detail updated!');
            this._dialogRef.close(true);
          },
          error: (err: any)=>{
            console.error(err);
          },
        });

      }else{
        this._empService.addEmployee(this.emForm.value).subscribe({
          next: (val:any) => {
            alert('Employee added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any)=>{
            console.error(err);
          },
        });

      }
      
    }
   }

}

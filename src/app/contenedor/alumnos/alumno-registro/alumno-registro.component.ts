import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlumnoService } from '../../../services/alumno.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumno-registro',
  templateUrl: './alumno-registro.component.html',
  styles: [
  ]
})
export class AlumnoRegistroComponent  {
  miFormulario:FormGroup=this.fb.group({
    nombre:[,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    apellido:[,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    dni:[,[Validators.required,Validators.min(10000000),Validators.max(99999999)]],
    telefono:[,[Validators.required,Validators.min(100000000),Validators.max(999999999)]],
    email:[,[Validators.required,Validators.email]],
    gusto:[,[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
  })
  constructor(private fb:FormBuilder,private alumnoSerive:AlumnoService,private router:Router) { }


  campoNoValido(campo:string){
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched
  }

 
  registrar(){
    // console.log();
    const newAlumno=this.miFormulario.value
    this.alumnoSerive.registrar(newAlumno)
    .subscribe(
      resp=>{console.log(resp);
      }
    )
    // window.location.reload()
    this.router.navigateByUrl('/Menu/Alumnos')
    // console.log(newAlumno);
    
  }

}

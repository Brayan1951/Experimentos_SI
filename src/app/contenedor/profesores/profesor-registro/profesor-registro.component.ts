import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfesorService } from '../../../services/profesor.service';

@Component({
  selector: 'app-profesor-registro',
  templateUrl: './profesor-registro.component.html',
  styles: [
  ]
})
export class ProfesorRegistroComponent  {
  miFormulario:FormGroup=this.fb.group({
    nombre:[,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    apellido:[,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    dni:[,[Validators.required,Validators.min(10000000),Validators.max(99999999)]],
    telefono:[,[Validators.required,Validators.min(100000000),Validators.max(999999999)]],
    email:[,[Validators.required,Validators.email]],
    especialidad:[,[Validators.required,Validators.minLength(4),Validators.maxLength(50)]],
    
  })
  constructor(private fb:FormBuilder,private profesorService:ProfesorService,private router:Router) { }

 
campoNoValido(campo:string){
  return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched
}


registrar(){
  const newProfe=this.miFormulario.value
    this.profesorService.registrar(newProfe)
    .subscribe(
      resp=>{
        // console.log(resp);
      }
    )
    this.router.navigateByUrl('/Menu/Profesor')
}
}

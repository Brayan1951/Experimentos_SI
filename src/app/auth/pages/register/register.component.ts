import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent  {

  miFormulario:FormGroup=this.fb.group({
    nombre:[,[Validators.required,Validators.minLength(3),Validators.maxLength(9)]],
    dni:[,[Validators.required,Validators.min(11111111),Validators.max(99999999)]],
    telefono:[,[Validators.required,Validators.min(100000000),Validators.max(999999999)]],
    email:[,[Validators.required,Validators.email]],
    password:[,[Validators.required,Validators.minLength(6)]],
  })
msg:string=''
  constructor(private fb:FormBuilder,private router:Router,private authService:AuthService) { }

  campoNoValido(campo:string){
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched
  }

 

  password():boolean{
    const regexDigito= /[\d]/g
    const regexLetras= /[a-z]/g

    
    var valido=this.miFormulario.value.password

    if(valido.match(regexDigito)&&valido.match(regexLetras)){

      return false
    }
    // return valido.match(regex)
    return true
  }


  register(){
    const { nombre,dni,telefono, email, password } = this.miFormulario.value;
    this.authService.registro( nombre,dni,telefono, email, password )
    .subscribe( ok => {

      if ( ok === true ) {
        
        this.router.navigateByUrl('/Menu');
      } else {
        Swal.fire('Error', ok, 'error');
        
        
      }
    });
  }
  }



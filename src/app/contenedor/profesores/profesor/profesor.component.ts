import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfesorService } from '../../../services/profesor.service';
import { Profesor } from '../../../interface/interface';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

  valido:boolean=false

  mensaje:string[]=[]
  profesor:Profesor={
    _id:'',
    usuario:'',
    nombre:'',
    apellido:'',
    dni:'',
    email:'',
    especialidad:'',
    telefono:'',
    
  }



  constructor(private profesorService:ProfesorService,private activateRouter:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
   
   this.activateRouter.params
   .pipe(
     switchMap(({id})=>this.profesorService.viewId(id))
   ).subscribe(resp=>{
     this.profesor=resp
   })
  }


  actualizar(){
    this.activateRouter.params
    .pipe(
      switchMap(({id})=>this.profesorService.update(id,this.profesor))
    )
  .subscribe(resp=>{
  //  console.log(resp);
   
  })
  window.location.reload()
    
  }


  validacion(){

      this.mensaje=[]
      
      this.valido=true
      
        if (this.profesor.nombre.length<3 || this.profesor.nombre.length>20) {
          this.valido=false
          this.mensaje.push('Rellenar el campo nombre')
        }
        if (this.profesor.apellido.length<3 || this.profesor.apellido.length>20) {
          this.valido=false
          this.mensaje.push('Rellenar el campo apellido')
        }
        if (Number(this.profesor.dni) <=10000000 ||Number(this.profesor.dni) >=99999999 ) {
          this.valido=false
          this.mensaje.push('Rellenar el campo dni')
        }
        if ( Number(this.profesor.telefono) <=100000000 ||Number(this.profesor.telefono) >=999999999) {
          this.valido=false
          this.mensaje.push('Rellenar el campo telefono')
        }
        if (this.profesor.email.length<6) {
          this.valido=false
          this.mensaje.push('Rellenar el campo email')
        }
        if (this.profesor.especialidad.length<3 ||this.profesor.especialidad.length>50 ) {
          this.valido=false
          this.mensaje.push('Rellenar el campo especialidad')
        }
        
        
        
       
        
        return this.valido
        



  }

}

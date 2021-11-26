import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoService } from '../../../services/alumno.service';
import { Alumno } from '../../../interface/interface';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  valido:boolean=false

  mensaje:string[]=[]
  
  alumno:Alumno={
    _id:'',
    usuario:'',
    nombre:'',
    apellido:'',
    dni:'',
    email:'',
    gusto:'',
    telefono:'',
    
  }
  constructor(private alumnoService:AlumnoService,private activateRouter:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.activateRouter.params
    .pipe(
      switchMap(({id})=>this.alumnoService.viewId(id))
    ).subscribe(resp=>{
      this.alumno=resp
    })
  }

  actualizar(){
    this.activateRouter.params
    .pipe(
      switchMap(({id})=>this.alumnoService.update(id,this.alumno))
    )
  .subscribe(resp=>{
  //  console.log(resp);
   
  })
  window.location.reload()
    
  }


  validacion(){

      this.mensaje=[]
      
      this.valido=true
      
        if (this.alumno.nombre.length<3 || this.alumno.nombre.length>20) {
          this.valido=false
          this.mensaje.push('Rellenar el campo nombre')
        }
        if (this.alumno.apellido.length<3 || this.alumno.apellido.length>20) {
          this.valido=false
          this.mensaje.push('Rellenar el campo apellido')
        }
        if (Number(this.alumno.dni) <=10000000 ||Number(this.alumno.dni) >=99999999 ) {
          this.valido=false
          this.mensaje.push('Rellenar el campo dni')
        }
        if ( Number(this.alumno.telefono) <=100000000 ||Number(this.alumno.telefono) >=999999999) {
          this.valido=false
          this.mensaje.push('Rellenar el campo telefono')
        }
        if (this.alumno.email.length<6) {
          this.valido=false
          this.mensaje.push('Rellenar el campo email')
        }
        if (this.alumno.gusto.length<3 ||this.alumno.gusto.length>50 ) {
          this.valido=false
          this.mensaje.push('Rellenar el campo gusto')
        }
        
        
        
       
        
        return this.valido
        



  }

}

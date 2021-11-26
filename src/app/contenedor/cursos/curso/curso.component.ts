import { Component, OnInit } from '@angular/core';
import { ProfesorService } from '../../../services/profesor.service';
import { Profesor, Curso } from '../../../interface/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../../../services/cursos.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  

  msg:string=''
ok:boolean=false

  profesor:Profesor={
    _id:           '',
    usuario:      '',
    nombre:       '',
    apellido:     '',
    dni:          '',
    telefono:     '',
    email:        '',
    especialidad: ''
  }
  
  curso:Curso={
    _id:'',
    usuario:'',
    nombre:'',
    profesor: this.profesor,
    horaI:'',
    horaF:'',
    descripcion:''
  }
  
  profesorTotal:Profesor[]=[]
  constructor( private cursosService:CursosService,private profesorService:ProfesorService,private activatedRouter:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.profesorService.profesores()
    .subscribe(
      resp=>{
        // console.log(resp);
        
        this.profesorTotal=resp
      }
    )


      this.activatedRouter.params
      .pipe(
        switchMap(({id})=>this.cursosService.viewId(id))
      ).subscribe(resp=>{
        this.curso=resp
      })


  }

  delete(id:string){
    this.cursosService.eliminar(id)
    .subscribe(resp=>{
      if (resp===true) {
        this.msg=resp
            this.ok=true
            this.router.navigateByUrl('/Menu/Cursos')
      }else{
        this.msg=resp
        this.ok=false
      }
    })
  }




  update(){
    // console.log(this.curso);
  //  return
    this.activatedRouter.params
      .pipe(
        switchMap(({id})=>this.cursosService.update(id,this.curso))
      )
    .subscribe(resp=>{
    //  console.log(resp);
     
    })
    window.location.reload()  
  }

 





}

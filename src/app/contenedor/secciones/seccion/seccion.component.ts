import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  switchMap } from 'rxjs/operators';
import { SeccionService } from '../../../services/seccion.service';
import { Seccion, Curso, Alumno } from '../../../interface/interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from '../../../services/cursos.service';
import { AlumnoService } from '../../../services/alumno.service';

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.css']
})
export class SeccionComponent implements OnInit {
  msg=''
  msg1=''
  ok=false
  ok1=false
  curso:Curso[] =[]
  alumnos:Alumno[]=[]
  secc:Seccion={
    _id:'',
    alumno:this.alumnos,
    curso:this.curso,
    limite:0,
    nombre:'',
    usuario:''
  }

  CursoTotal:Curso[]=[]
  newcurso:string=''
  AlumnoTotal:Alumno[]=[]
  newAlumno:string=''

 

  constructor(private seccionService:SeccionService,private fb:FormBuilder,private activatedRouter:ActivatedRoute
    ,private cursosService:CursosService,private router:Router,private alumnoService:AlumnoService) { }

  ngOnInit(): void {
    this.activatedRouter.params
    .pipe(
      switchMap(({id})=>this.seccionService.viewId(id))
    ).subscribe(resp=>{
      this.secc=resp 
      this.alumnos= resp.alumno
   

      // this.curso= resp.curso.sort(((a, b) => Number(a.horaI)  - Number(b.horaI) ))
      this.curso= resp.curso.sort((a, b) =>{
       
        if (a.horaI > b.horaI) {
          return 1;
        }
        if (a.horaI < b.horaI) {
          return -1;
        }
       
       
        return 0
      } )
      // console.log(this.curso.sort(((a, b) => new Date(a.horaI).getTimezoneOffset()  - new Date(b.horaI).getTimezoneOffset() )));
      // console.log(this.curso.sort((a, b) =>{
       
      //   if (a.horaI > b.horaI) {
      //     return 1;
      //   }
      //   if (a.horaI < b.horaI) {
      //     return -1;
      //   }
       
       
      //   return 0
      // } )
      
      
      
      // );
      
      
      
    })

    this.cursosService.cursos()
    .subscribe(
      resp=>{
        
        this.CursoTotal=resp

      }
    )

    this.alumnoService.alumnos()
    .subscribe(
      resp=>{
        // console.log(resp);
        this.AlumnoTotal=resp
      }
    )


  }
  delete(id:string){
    this.seccionService.eliminar(id)
    .subscribe(resp=>{
      if (resp===true) {
        this.msg=resp
            this.ok=true
            this.router.navigateByUrl('/Menu/Seccion')
      }else{
        this.msg=resp
        this.ok=false
      }
    })
  }



  addCurso(){

    if(this.newcurso===''){
      return
    }else{
      this.activatedRouter.params
      .pipe(
        switchMap(({id})=>this.seccionService.addSectionC(id,this.newcurso))
      ).subscribe(
        resp=>{
          if(resp===true){
            this.msg="Se agrego correctamente"
            this.ok=true
            setTimeout(()=>{
              this.msg=""
              window.location.reload()
            },3000) 
          }else{
           
            
          this.msg=resp
          this.ok=false
          setTimeout(()=>{
            this.msg=""
          },4000)  
          
          }
         
        }
      )
 
     
    }
    
  } 

  addAlumno(){

    if(this.newAlumno===''){
      return
    }else{
      this.activatedRouter.params
      .pipe(
        switchMap(({id})=>this.seccionService.addSectionA(id,this.newAlumno))
      ).subscribe(
        resp=>{
          if(resp===true){
            this.msg1="Se agrego correctamente"
            this.ok1=true
            setTimeout(()=>{
              this.msg1=""
              window.location.reload()
            },3000)  
          }else{
          console.log(resp);
          this.msg1=resp
          this.ok1=false
          setTimeout(()=>{
            this.msg1=""
          },4000)  
          
          }
         
        }
      )
 
     
    }
    
  } 

  verificarHora(i:number){
 
    var regex = /(\d+)/g;
    let msg:String=''
    


    if(this.curso.length>1 && i>=1){
      
      const hora1I=this.curso[i-1].horaI
      const hora1F=this.curso[i-1].horaF
      const hora2I=this.curso[i].horaI
      const hora2F=this.curso[i].horaF
      // console.log(hora1+"|"+hora2);
      // console.log(hora1.match(regex));
      const horaC1I=hora1I.match(regex)
      const horaC1F=hora1F.match(regex)
      const horaC2I=hora2I.match(regex)
      const horaC2F=hora2F.match(regex)
      

      if (horaC1I![0]===horaC2I![0]) {
        msg='Conflicto de hora Inicio!'
        
      }else if(horaC1F![0]===horaC2I![0] &&  horaC1F![1]>horaC2I![1] ){
        msg='Conflicto de hora!'
      }else{
        msg=''
      }


    }


    return msg
  }

  deleteA(alumno:string){
    this.activatedRouter.params
      .pipe(
        switchMap(({id})=>this.seccionService.deleteA(id,alumno))
      ).subscribe(
        resp=>{
          if(resp===true){
            this.msg1="Se elimino correctamente"
            this.ok1=true
            setTimeout(()=>{
              this.msg1=""
              window.location.reload()
            },3000) 
          }else{
            console.log(resp);
            
          this.msg1=resp
          this.ok1=false
          
          }
         
        }
      )
    
  }
  deleteC(curso:string){
    this.activatedRouter.params
      .pipe(
        switchMap(({id})=>this.seccionService.deleteC(id,curso))
      ).subscribe(
        resp=>{
          if(resp===true){
            this.msg="Se elimino correctamente"
            this.ok=true
            setTimeout(()=>{
              this.msg1=""
              window.location.reload()
            },3000) 
          }else{
            console.log(resp);
            
          this.msg=resp
          this.ok=false
          
          }
         
        }
      )
    
  }
  cursos(){
  
    return this.curso
  }

  alumnosT(){
    return this.AlumnoTotal
  }

}

import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../../interface/interface';
import { ProfesorService } from '../../../services/profesor.service';

@Component({
  selector: 'app-profesor-menu',
  templateUrl: './profesor-menu.component.html',
  styleUrls: ['./profesor-menu.component.css']
})
export class ProfesorMenuComponent implements OnInit {

  profesor:Profesor[]=[]
  msg:string=''
  ok:boolean=false
  busqueda='';


  constructor(private profesorService:ProfesorService) { }

  ngOnInit(): void {
    this.profesorService.profesores()
    .subscribe(
      resp=>{
        // console.log(resp);
        this.profesor=resp
      }
    )
  }

  profesors(){
    return this.profesor
  }

  delete(id:string){
    this.profesorService.delete(id)
    .subscribe(resp=>{
      if (resp===true) {
        this.ok=true
        this.msg=resp
        window.location.reload()
      }else{
        this.ok=false
        this.msg=resp

        setTimeout(()=>{
          this.msg=""
        },4000)

      }
    })
  }

  find(){
    // console.log(this.busqueda);
    // return 
    this.profesorService.find(this.busqueda).subscribe(
      resp=>{
        this.profesor=resp
      }
    )
  }

 

}

import { Component, OnInit } from '@angular/core';
import { Seccion } from '../../../interface/interface';
import { SeccionService } from '../../../services/seccion.service';

@Component({
  selector: 'app-seccion-menu',
  templateUrl: './seccion-menu.component.html',
  styleUrls: ['./seccion-menu.component.css']
})
export class SeccionMenuComponent implements OnInit {

  seccion:Seccion[]=[]

  constructor(private seccionService:SeccionService) { }

  ngOnInit(): void {
    this.seccionService.seccion()
    .subscribe(
      resp=>{
        
        
        this.seccion=resp
        
      }
    )
  }

  seccions(){
    
    return this.seccion
  }

}

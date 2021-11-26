import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Seccion, Usuario, Respuesta } from '../interface/interface';
import { environment } from 'src/environments/environment';
import { tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeccionService {
  
  private baseUrl:string=environment.baseUrl;
 



  constructor(private authService:AuthService, private http:HttpClient) {
   
   }

   seccion(){
    let usuario:Usuario
    usuario =this.authService.usuario
    const url=`${this.baseUrl}/seccion/view`
    const user=usuario
    const body={"usuario":user.id}
    
    return this.http.post<Seccion[]>(url,body)
   }


   addSection(nombre:string,limite:number){
    let usuario:Usuario
    usuario =this.authService.usuario
    const url=`${this.baseUrl}/seccion/new`
    const user=usuario
    const body={"usuario":user.id,"nombre":nombre,"limite":limite}
    return this.http.post<Seccion[]>(url,body)
   }




   eliminar(id:string){
    const url=`${this.baseUrl}/seccion/delete`
    const body={
      "id":id
    }
  
    return this.http.post<Respuesta>(url,body)
      .pipe(
        tap(({ok,msg})=>{
          if(ok){console.log("todo ok");
          }
        }),
        map(resp=>resp.ok),
        catchError(err=>of(err.error.msg))
      )
  }






   viewId(id:string){
    const url=`${this.baseUrl}/seccion/viewId`
    
    return this.http.get<Seccion>(`${url}/${id}`)
   }

   addSectionC(id:String,curso:string){

    const url=`${this.baseUrl}/seccion/AsignarC`
    const body={"curso":curso}
    return this.http.put<Respuesta>(`${url}/${id}`,body)
    .pipe(
      tap(({ok,msg})=>{
        if(ok){
          console.log("todo ok");
          
        }
      }),map(resp=>resp.ok),
      catchError(err=>of(err.error.msg))
    )

   }



   addSectionA(id:String,alumno:string){

    const url=`${this.baseUrl}/seccion/AsignarA`
    const body={"alumno":alumno}
    return this.http.put<Respuesta>(`${url}/${id}`,body)
    .pipe(
      tap(({ok,msg})=>{
        if(ok){
          console.log("todo ok");
          
        }
      }),map(resp=>resp.ok),
      catchError(err=>of(err.error.msg))
    )

   }
   deleteA(id:string,alumno:string){
    let usuario:Usuario
    usuario =this.authService.usuario
    const user=usuario
    const url=`${this.baseUrl}/seccion/deleteA`
    const body={
      "id":id,
      "alumno":alumno
    }
    return this.http.put<Respuesta>(`${url}`,body)
    .pipe(
      tap(({ok,msg})=>{
        if(ok){
          console.log("todo ok");
          
        }
      }),map(resp=>resp.ok),
      catchError(err=>of(err.error.msg))
    )

   }
   deleteC(id:string,curso:string){
    let usuario:Usuario
    usuario =this.authService.usuario
    const user=usuario
    const url=`${this.baseUrl}/seccion/deleteC`
    const body={
      "id":id,
      "curso":curso
    }
    return this.http.put<Respuesta>(`${url}`,body)
    .pipe(
      tap(({ok,msg})=>{
        if(ok){
          console.log("todo ok");
          
        }
      }),map(resp=>resp.ok),
      catchError(err=>of(err.error.msg))
    )

   }


}

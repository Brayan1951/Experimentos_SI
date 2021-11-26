import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Usuario, AuthResponse } from '../interface/interface';
import {catchError, map,tap} from 'rxjs/operators'
import { of, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string=environment.baseUrl;
  private _usuario!:Usuario

  get usuario(){
    return {...this._usuario}
  }

  constructor(private http:HttpClient) { }


  registro(nombre:string,dni:string,telefono:string,email:string,password:string){
    const url=`${this.baseUrl}/usuario/new`
    const body={nombre,dni,telefono,email,password}

    return this.http.post<AuthResponse>(url,body)
          .pipe(
            tap(({ok,token})=>{
              if(ok){
                localStorage.setItem('token',token!)
              }
            }),
            map(resp=>resp.ok),
            catchError(err=>of(err.error.msg))
          )

  }
  login (email:string,password:string){
    const url=`${this.baseUrl}/usuario/`
    const body={email,password}

    return this.http.post<AuthResponse>(url,body)
    .pipe(
      tap( resp => {
        if ( resp.ok ) {
          localStorage.setItem('token', resp.token! );
        }
      }),
      map( resp => resp.ok ),
      catchError( err => of(err.error.msg) )
    );

  }

  validarToken():Observable<boolean>{
    const url=`${this.baseUrl}/usuario/renew`
    const headers=new HttpHeaders()
    .set('x-token',localStorage.getItem('token')||'')
    // console.log(headers);
    
    return this.http.get<AuthResponse>(url,{headers})
      .pipe(
        map( resp => {
          localStorage.setItem('token', resp.token! );
          this._usuario = {
            id: resp.id!,
            nombre: resp.nombre!,
            email: resp.email!
          }

          return resp.ok;
        }),
        catchError( err => of(false) )
      )
  }

  logout(){
    localStorage.clear()
  }
}
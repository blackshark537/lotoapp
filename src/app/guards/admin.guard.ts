import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  canActivate(){
    const role = localStorage.getItem('role');
    if(role === 'Admin'){
      return true;
    } else {
      return false;
    }
  }
  
}

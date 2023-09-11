import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MobileService {
  public isMobile: boolean = window.innerWidth < 1024;

  private mobileSource = new BehaviorSubject<boolean>(this.isMobile);
  /**
   * @deprecated use isMobile$ instead
   */
  public mobile = this.mobileSource.asObservable();

  public isMobile$ = this.mobileSource.asObservable();

  constructor() {
    window.addEventListener('resize', () => {
      const isMobile = window.innerWidth < 961;
      if (this.isMobile !== isMobile) {
        this.isMobile = isMobile;
        this.setMobile(this.isMobile);
      }
    });
    this.setMobile(this.isMobile);
  }
  setMobile(flag: boolean) {
    this.mobileSource.next(flag);
  }

  getMobile() {
    return this.isMobile;
  }
}

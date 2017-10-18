import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  // activeMenu: string;

  constructor(public menuCtrl: MenuController, public navCtrl: NavController) {
    // this.menuActive();
  }

  openMenu() {
   this.menuCtrl.open();
 }

 closeMenu() {
   this.menuCtrl.close();
 }

 toggleMenu() {
   this.menuCtrl.toggle();
 }

  // menuActive() {
  //   this.activeMenu = 'menu';
  //   this.menuCtrl.enable(true, 'menu');
  // }
}

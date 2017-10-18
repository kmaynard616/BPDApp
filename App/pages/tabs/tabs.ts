import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { GenchatPage } from '../genchat/genchat';
import { FichatPage } from '../fichat/fichat';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = GenchatPage;
  tab2Root = FichatPage;
  tab3Root = ContactPage;

  constructor() {

  }
}

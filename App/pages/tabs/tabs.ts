import { Component } from '@angular/core';

import { GenchatPage } from '../genchat/genchat';
import { FichatPage } from '../fichat/fichat';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = GenchatPage;
  tab2Root = FichatPage;

  constructor() {

  }
}

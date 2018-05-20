import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  private newTag: string;

  private tags: string[];
  private selectedTag: string;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public menuCtrl: MenuController) {
    this.initializeApp();

    this.tags = ['Hot', 'Science', 'DIY'];
    this.selectedTag = "";
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(tag: string, index: number) {
    //Already on Hot page
    if (!this.selectedTag && tag == 'hot')
      return;

    //Load the hot posts (NOT 'hot' tags)
    if (tag == 'hot' && index < 0) {
      this.selectedTag = "";
      this.nav.setRoot(this.rootPage, {tag: 'Hot', isHot: true});
      return;
    }

    //Already on selected tag page
    if (this.selectedTag == tag &&
        this.selectedTag == this.tags[index])
      return;

    this.selectedTag = tag;
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(this.rootPage, {tag: tag, isHot: false});
  }

  addNewTag() {
    if (this.newTag) {
      if (this.tags.indexOf(this.newTag) > -1)
        return;

      this.tags.push(this.newTag);
      this.openPage(this.newTag, this.tags.length - 1);
      this.menuCtrl.close();
      this.newTag = "";
    }
  }

  removeTag(tag: string) {
    if (!tag)
      return;

    this.tags = this.tags.filter(t => t != tag);
  }
}

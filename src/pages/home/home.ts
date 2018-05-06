import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ImgurProvider } from '../../providers/rest/imgurRest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  posts: string[];
  errorMessage: string;

  constructor(public navCtrl: NavController, public imgur: ImgurProvider) {

  }

  ionViewDidLoad() {
    this.getPosts();
  }

  getPosts() {
    this.imgur.getHotPosts()
       .subscribe(
         posts => this.posts = posts,
         error =>  this.errorMessage = <any>error);
  }

}

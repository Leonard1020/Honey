import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ImgurProvider } from '../../providers/rest/imgurRest';

@Component({
  selector: 'page-imgur',
  templateUrl: 'imgur.html'
})

export class ImgurPage {

  posts: string[];
  errorMessage: string;

  constructor(public navCtrl: NavController, public imgur: ImgurProvider) {

  }

  ionViewDidLoad() {
    this.getPosts();
  }

  getPosts() {
    this.imgur.getSubRedditPosts("science")
       .subscribe(
         posts => this.posts = posts,
         error =>  this.errorMessage = <any>error);
  }

}

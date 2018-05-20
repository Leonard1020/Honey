import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ImgurProvider } from '../../providers/rest/imgurRest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  private tag: string;
  private isHot: boolean;

  private posts: string[];

  private errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public imgur: ImgurProvider) {
    this.tag = navParams.get('tag');
    this.isHot = navParams.get('isHot');

    //Set defaults for startup
    if (!this.tag) {
      this.tag = 'nsfw';
      this.isHot = false;
    }
  }

  ionViewDidLoad() {
    this.getPosts();
  }

  getPosts() {
    if (this.isHot) {
      this.imgur.getHotPosts()
        .subscribe(
          posts => {
            this.posts = posts;
            console.log(posts);
          },
          error =>  this.errorMessage = <any>error);
    }
    else {
      this.imgur.getAllPosts(this.tag)
        .subscribe(
          posts => {
            posts.sort(this.sort)
            this.posts = posts
          },
          error => this.errorMessage = <any>error);
    }
  }

  private sort(a: any, b: any) {
    return (b.datetime > a.datetime)
      ? 1
      : ((a.datetime > b.datetime) ? -1 : 0);
  }

  loadMoreImages(id: string) {
    this.imgur.getPost(id)
      .subscribe(
        post => {
          let original = this.posts.find(p => p['id'] == id);
          for (var i in original['images']) {
            post['images'][i].requestLoad = original['images'][i].requestLoad;
          }
          original['images'] = post['images'];
        },
        error => this.errorMessage = <any>error);
  }
}

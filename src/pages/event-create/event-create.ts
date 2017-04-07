import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventData } from '../../providers/event-data';
/*
  Generated class for the EventCreate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-create',
  templateUrl: 'event-create.html'
})
export class EventCreatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventData: EventData) {}

  createEvent(eventName: string, eventDate: string, eventPrice: number, eventCost: number): void {
    this.eventData.createEvent(eventName, eventDate, eventPrice, eventCost).then( () => {
      this.navCtrl.pop();
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EventCreatePage');
  }

}

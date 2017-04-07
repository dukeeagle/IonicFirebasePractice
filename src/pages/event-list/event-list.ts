import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventDetailPage } from '../event-detail/event-detail';
import { EventData } from '../../providers/event-data';

/*
  Generated class for the EventList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html'
})
export class EventListPage {
  public eventList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventData: EventData) {}

  ionViewDidEnter(){
    this.eventData.getEventList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        rawList.push({
          id: snap.key,
          name: snap.val().name,
          price: snap.val().price,
          date: snap.val().date,
        });
        return false
      });
      this.eventList = rawList;
    });
  }

  goToEventDetail(eventId){
      //sending user to specific event page also passes eventId
      this.navCtrl.push(EventDetailPage, { eventId: eventId });
  }

  //temp fix?
  /*goToEventDetail(eventData){
    this.navCtrl.push(EventDetailPage, eventData);
  }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventListPage');
  }

}

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
  public eventRef: any;
  public loadedList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventData: EventData) {
    this.eventRef = this.eventData.getEventList();

    this.eventRef.on('value', eventList => {
      let events = [];
      eventList.forEach( event => {
        events.push(event.val());
      });

      this.eventList = events;
      this.loadedList = events;
    });
  }

  //searchbar stuff------------
  initializeItems(){
    this.eventList = this.loadedList;
  }

  getItems(searchbar){
    //reset items back to all of the items
    this.initializeItems();

    //set q to the value of the searchbar
    var q = searchbar.srcElement.value;

    //if the value is an empty string, don't filter the items
    if(!q){
      return;
    }

    this.eventList = this.eventList.filter((v) => {
      if(v.name && q){
        if(v.name.toLowerCase().indexOf(q.toLowerCase()) > -1){
          return true;
        }
        return false;
      }
    });
  }

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

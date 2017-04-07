import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
/*
  Generated class for the EventData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventData {
  //Database references
  public currentUser: string;
  public eventList: firebase.database.Reference;

  constructor() {
    //store event list inside of userProfile database node
    this.currentUser = firebase.auth().currentUser.uid;
    this.eventList = firebase.database().ref(`userProfile/${this.currentUser}/eventList`);
  }

  createEvent(eventName: string, eventDate: string, eventPrice: number, eventCost: number): firebase.Promise<any> {
    //push all new objects to the eventList node
    return this.eventList.push({
      name: eventName,
      date: eventDate,
      price: eventPrice * 1,
      cost: eventCost * 1,
      revenue: eventCost * -1
    }).then( newEvent => {
      this.eventList.child(newEvent.key).child('id').set(newEvent.key);
    });
  }

  getEventList(): firebase.database.Reference {
    return this.eventList;
  }

  //return eventList given uid
  getEventDetail(eventId): firebase.database.Reference {
    return this.eventList.child(eventId);
  }

  addGuest(guestName, eventId, eventPrice): any {
    return this.eventList.child(eventId).child('guestList').push({
      guestName: guestName
    }).then(() => {
      this.eventList.child(eventId).child('revenue').transaction((revenue)=> {
        revenue += eventPrice;
        return event;
      });
    });
  }
}

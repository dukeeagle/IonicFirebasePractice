import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the ProfileData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProfileData {
    //used to create database reference to userProfile node
    public userProfile: firebase.database.Reference;
    //used to create auth reference to logged in user
    public currentUser: firebase.User;

  constructor() {
    //create said references
    this.currentUser = firebase.auth().currentUser;
    this.userProfile = firebase.database().ref('/userProfile');

  }

  getUserProfile(): firebase.database.Reference {
    //returns database reference to userprofile/uid of current user, will be used to get user profile on page
    return this.userProfile.child(this.currentUser.uid);
  }

  updateName(firstName: string, lastName: string): firebase.Promise<any> {
    return this.userProfile.child(this.currentUser.uid).update({
        firstName: firstName,
        lastName: lastName
    });
  }

  //save date of birth
  updateDOB(birthDate: string): firebase.Promise<any> {
    return this.userProfile.child(this.currentUser.uid).update({
        birthDate: birthDate,
    });
  }

  //First changes email in the auth portion of firebase, not the userProfile/uid database node. Then, finally updates database to reflect auth changes.
  updateEmail(newEmail: string, password: string): firebase.Promise<any> {
    const credential = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, password);

    return this.currentUser.reauthenticate(credential).then( user => {
      this.currentUser.updateEmail(newEmail).then( user => {
        this.userProfile.child(this.currentUser.uid);
      });
    });
  }

  //change user's password with auth, not database
  updatePassword(newPassword: string, oldPassword: string): firebase.Promise<any> {
    const credential = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, oldPassword);

    return this.currentUser.reauthenticate(credential).then( user => {
      this.currentUser.updatePassword(newPassword).then( user => {
        console.log("Password changed.");
      }, error => {
        console.log(error);
      });
    });
  }

}

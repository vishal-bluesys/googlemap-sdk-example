import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  HtmlInfoWindow,
  BaseArrayClass,
  MyLocation,
  GoogleMapsAnimation
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
map: GoogleMap;
htmlInfoWindow = new HtmlInfoWindow();
  constructor(public navCtrl :NavController) { }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDJYwSZTcwrDsquEs3daZP7udKY_5YHp0c',
     'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDJYwSZTcwrDsquEs3daZP7udKY_5YHp0c'
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 19.9975,
           lng: 73.7898
         },
         zoom: 14,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);
    
    let locations : BaseArrayClass<any> = new BaseArrayClass<any>([
      {
        position: {lat:19.9975, lng:73.7898},
        iconData: "./assets/imgs/Number-1-icon.png"
      },
      {
        position: {lat:20.0136549, lng:73.763789},
        iconData: "http://icons.iconarchive.com/icons/iconarchive/red-orb-alphabet/24/Number-2-icon.png"
      },
      {
        position: {lat:20.0055553, lng:73.7647021},
        iconData: {
          url: "http://icons.iconarchive.com/icons/iconarchive/red-orb-alphabet/48/Number-3-icon.png",
          size: {
            width: 24,
            height: 24
          }
        }
      },
      {
        position: {lat:20.0055553, lng:73.7647021},
        title: "4",
        iconData: "blue"
      },
      {
        position: {lat:20.007753, lng:73.7654316},
        title: "5",
        iconData:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACVUlEQVRIS8WWjVXCMBRGwwTqBMIEuAG4ARuIE6gTKBOgEyAT4AbABjKBMIE/C+h3m6S2pWlJ8BzfOTkpad6770teEzom3bZy/VbrpYTopDjJZ6w2c77X6p9j46SCUXvuYDxHq04BZ2rPHXa3y/DRqlPAmdqZW+hrkMZEq44F52q3oGTdrjEpqmPBudoxKVBVKqsU1THgPbW+klNUt4GHCn6idqEGuMveerUeXFGtNTCvah9qaz+n2gMmKMGBnLrfjPFcMirZ7231XUF19RUJkIhPZqXnT8AM9Osy62v0VPihUqIfjWwx1RkJvbxIpjArhabfbEJ6zQYwysiiT3CW8kJ6Q4BgqMALEnqVNAqQZGSkM/R7nMOBLhZ/B/ZQeg9V/1EsrpLy5dIqP8aAXV6WlQIlZrWq/wzeBK0DM3Y0vA0aAh8FPwTaBC7B2W8+qUOMT4l9dYUUrJK2k4tCOHl7O7zK+Xx69nbWU/iebgKz1+9E+OYPToR1fqOe+SquujeBWdzlYGBPohhjW9b2lGbRa72bwLdyml5d2auvaPyeTOzIw4MxzCkal8h8no3cqT3WJd0ExuFmOjXmlhRIXbnfKZQ7hfJ4HDTM8wVIMi6xJ01y3mV8E5glGlDRGIEKS75DrAtFn/0DA3x/b0ddZbPgGt23JnBW0agpKPzUGCvhoT4iv1HG9Zodtc6HGBTYnoXAXc3UR5SbBwK1d8y+8RUAzxNwU2orOwQeyolF/lLT7mUqQ8BqCj4Bt+j1lR0Cs3Sopt8GFLYNF/2JU7K2k6stePL7fwP/AER2xy+mY1/QAAAAAElFTkSuQmCC"
      }])

locations.forEach((data: any) => {
    let marker: Marker = this.map.addMarkerSync(data);
    this.addinfowindow(marker);
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
      this.htmlInfoWindow.open(marker);

    });
    });
  
}

 addinfowindow(marker){
   
     let frame: HTMLElement = document.createElement('div');
    frame.innerHTML = [
      '<h3>Hearst Castle</h3>',
      ].join("");
    frame.addEventListener("click", () => {
      //this.htmlInfoWindow.setBackgroundColor('red');
      this.navCtrl.push('InfowindowPage');
    });

   this.htmlInfoWindow.setContent(frame, {
  width: "280px",
  height: "200px"
});

//this.htmlInfoWindow.open(marker);



 }
  

  onButtonClick() {
    this.map.clear();

    // Get the location of you
    this.map.getMyLocation()
      .then((location: MyLocation) => {
        console.log(JSON.stringify(location, null ,2));

        // Move the map camera to the location with animation
        this.map.animateCamera({
          target: location.latLng,
          zoom: 17,
          tilt: 30
        })
        .then(() => {
          // add a marker
          let marker: Marker = this.map.addMarkerSync({
            title: '@ionic-native/google-maps plugin!',
            snippet: 'This plugin is awesome!',
            position: location.latLng,
            animation: GoogleMapsAnimation.BOUNCE
          });

          // show the infoWindow
          marker.showInfoWindow();

          // If clicked it, display the alert
          marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          //  this.showToast('clicked!');
          });
        });
      });
  }



}

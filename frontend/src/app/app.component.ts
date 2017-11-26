import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import _ from 'lodash';
/**
 * App Component
 * Top Level Component
 */

 declare const google: any;
 const apiValues = [
   {
     name: 'Marine Harvest',
     lat: 66.000096,
     lng: 12.268494,
     value: '3.21'
   },
   {
     name: 'Lerøy Seafood',
     lat: 70.034636,
     lng:  20.990421,
     value: '4.26'
   },
   {
     name: 'Salmar',
     lat: 63.678536,
     lng: 9.361787,
     value: '4.36'
   },
   {
     name: 'Cermaq',
     lat: 68.600404,
     lng: 15.373317,
     value: '2.85'
   },
   {
     name: 'Grieg Seafood',
     lat: 59.226811,
     lng:  5.852032,
     value: '2.34'
   },
   {
     name: 'Nova Sea',
     lat: 66.366284,
     lng: 12.372324,
     value: '2.79'
   },
   {
     name: 'Nordlaks',
     lat: 68.573682,
     lng: 14.954632,
     value: '3.06'
   },
   {
     name: 'Norway Royal Salmon',
     lat: 69.498695,
     lng: 17.907981,
     value: '4.52'
   },
   {
     name: 'Sinkaberg-Hansent',
     lat: 64.854263,
     lng: 11.247880,
     value: '3.67'
   },
   {
     name: 'Alsaker Fjordbruk',
     lat: 59.954304,
     lng: 5.669493,
     value: '2.45'
   }
 ];

const layer_colors = [ 'bg-success', 'bg-warning', 'bg-danger' ];
const layer_limits = [ 3.0, 4.0 ];

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {


  private  map;
  private  mapProp;

  private  initialBounds;
  private  currentBounds;

  private farms;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Make the HTTP request:
    // this.http.get('http://127.0.0.1:5000/menu').subscribe(data => {
    //   // Read the result field from the JSON response.
    //   console.log('*************');
    //   console.log(data);
    //   console.log('*************');
    // });


  // ITERATE THE LIST AND SORT IT
  // COORDINATES + VALUE
  this.farms = _.sortBy(apiValues, o => {
    return parseFloat(o.value);
  });

    this.mapProp = {
              center: new google.maps.LatLng(66.000096,12.268494),
              zoom: 4,
              mapTypeId: google.maps.MapTypeId.ROADMAP
   };
   this.map = new google.maps.Map(document.getElementById("googleMap"), this.mapProp);
   let myLatlng = new google.maps.LatLng(51.508742, -0.120850);
   let marker = new google.maps.Marker({
       position: myLatlng
   });

  }

  getColor(value: number) {
    let color = this.checkValue(value);
    switch(color) {
      case 'green': return layer_colors[0];
      case 'yellow': return layer_colors[1];
      case 'red': return layer_colors[2];
      default: break;
    }
    if(value < layer_limits[0]) {
      return 'green';
    } else if(value < layer_limits[1]) {
      return 'yellow';
    } else {
      return 'red';
    }
  }


  checkValue(value: number) {
    if(value < layer_limits[0]) {
      return 'green';
    } else if(value < layer_limits[1]) {
      return 'yellow';
    } else {
      return 'red';
    }
  }

  pinpoint(farm: any) {
    let color = this.checkValue(farm.value);
    let myLatlng = new google.maps.LatLng(farm.lat, farm.lng);
    let marker = new google.maps.Marker({
        position: myLatlng,
        title: farm.name,
        icon: 'http://maps.google.com/mapfiles/ms/icons/'+ color +'-dot.png'
    });

    // To add the marker to the map, call setMap();
    marker.setMap(this.map);
  };

}

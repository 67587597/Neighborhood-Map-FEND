
var map;
var markers =[];
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 21.422871, lng: 39.825735},
    zoom: 15
  });

//$(function() {

  locations = [
  { title:'Safa and Marwa', location: {lat: 21.42394, lng: 39.82762}},
  { title:'Great Mosque of Mecca', location: {lat: 21.422889, lng: 39.825718}},
  { title:'Abraj Al Bait', location: {lat: 21.418674, lng: 39.824946}},
  { title:'Al Baik', location: {lat: 21.421111, lng: 39.821706}},
  { title:'Zamzam Well', location: {lat: 21.424068, lng: 39.831808}}
];

/*function Item(title) {
    this.title = ko.observable(title);
}

//do some basic mapping (without mapping plugin)
var mappedData = ko.utils.arrayMap(locations, function(item) {
    return new Item(item.title);
});
*/

//var viewModel = {
//  locations: ko.observableArray([]),
  //query : ko.observable(''),

/*var viewModel = {
  locations: ko.observableArray(locations)
    query: ko.observable('')
    search: function(value) {
    // remove all the current beers, which removes them from the view
    viewModel.locations.removeAll();

    for(var x in locations) {
      if(locations[x].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        viewModel.locations.push(locations[x]);
      }
    }
  }
};
ko.applyBindings(viewModel);*/

/*viewModel.locations = ko.dependentObservable(function() {
      var search = this.query().toLowerCase();
      return ko.utils.arrayFilter(locations, function(location) {
          return location.title.toLowerCase().indexOf(search) >= 0;
      });
  }, viewModel);

  ko.applyBindings(viewModel);
});*/
/*viewModel.locations = ko.computed(function() {
      var search = this.filter().toLowerCase();
      if (!filter) {
        return this.item();
      }
      else{
          return ko.utils.arrayFilter(this.item(), function(item) {
          return ko.utils.stringstartswith(item.name().toLowerCase(),filter)
          });
        }
  }, viewModel);*/

  //ko.applyBindings(viewModel);});
//ko.applyBindings(viewModel);

/*
 search: function(value) {
    // remove all the current beers, which removes them from the view
    viewModel.locations.removeAll();
    if(value = '') return;
    for(var location in locations) {
      if(locations[location].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        viewModel.locations.push(locations[location]);
      }
    }
  }
};
viewModel.query.subscribe(viewModel.search);
ko.applyBindings(viewModel);

*/




var largeInfowindow = new google.maps.InfoWindow();
//var bounds = new google.maps.LatLngBounds();
for (var i=0; i<locations.length; i++)
{
  var position = locations[i].location;
  var title = locations[i].title;
  var marker = new google.maps.Marker({
  map: map,
  icon: 'http://1.bp.blogspot.com/_GZzKwf6g1o8/S6xwK6CSghI/AAAAAAAAA98/_iA3r4Ehclk/s1600/marker-green.png',
  position: position,
  title: title,
  animation: google.maps.Animation.DROP,
  id: i
});

markers.push(marker);
//bounds.extend(marker.position);
marker.addListener('click', function()
{
  populateInfoWindow(this, largeInfowindow);
});

marker.addListener('mouseover', function()
{
  this.setIcon(highLightedIcon);
});


marker.addListener('mouseout', function()
{
  this.setIcon(defaultIcon);
});

}

//set  default icon
var defaultIcon = 'http://1.bp.blogspot.com/_GZzKwf6g1o8/S6xwK6CSghI/AAAAAAAAA98/_iA3r4Ehclk/s1600/marker-green.png';
//set highlited icon
var highLightedIcon = 'http://maps.google.com/mapfiles/ms/icons/blue.png';
}

function populateInfoWindow(marker, infowindow) {

  var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';
      var wikiTimeout = setTimeout(function () {
alert("failed to load wikipedia page");
}, 40000);
$.ajax({
                    url: wikiURL,
                    dataType: "jsonp",
                    success: function (response) {
                     var articleList = response[3];
                     var articleName = response[0];

  if (infowindow.marker != marker)
  {
    infowindow.marker = marker;
    infowindow.open(map, marker);
    infowindow.addListener('closeclick', function(){
        infowindow.setMarker(null);
      });
      infowindow.setContent('<div>' + marker.title + '</br> check here for wiki link: <a href ="' + articleList + '">' + articleName + ' </div>');

       clearTimeout(wikiTimeout);
    }
  }
  });
}

//function to open navside
function openNav() {
   document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
   document.getElementById("mySidenav").style.width = "0";
}

/*function Item(title, location, marker) {
    this.title = ko.observable(title);
    this.location = ko.observable(location);
    this.marker = ko.dependentObservable(function() {
      var marker = new google.maps.Marker({
      map: map,
      icon: 'http://1.bp.blogspot.com/_GZzKwf6g1o8/S6xwK6CSghI/AAAAAAAAA98/_iA3r4Ehclk/s1600/marker-green.png',
      position: location,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i
      });
        return (marker);
    }, this);
}
*/

//var mappedData = ko.utils.arrayMap(locations, function(item) {
  //  return new Item(item.title, item.location, item.marker);
//});

 function ViewModel(){
  var self =this;
  this.filter = ko.observable();

  this.locations = ko.observableArray([{ title:'Safa Bridge',location: {lat: 21.42394, lng: 39.82762}},
  { title:'Holy Mosque', location: {lat: 21.422889, lng: 39.825718}},
  { title:'Diamond Tower', location: {lat: 21.418674, lng: 39.824946}},
  { title:'Albaik Resturant', location: {lat: 21.421111, lng: 39.821706}},
  { title:'Zamzam', location: {lat: 21.424068, lng: 39.831808}}]);
  /*for (var i=0; i<locations.length; i++)
  {
    var position = locations[i].location;
    var title = locations[i].title;
    var marker = new google.maps.Marker({
    map: map,
    icon: 'http://1.bp.blogspot.com/_GZzKwf6g1o8/S6xwK6CSghI/AAAAAAAAA98/_iA3r4Ehclk/s1600/marker-green.png',
    position: position,
    title: title,
    animation: google.maps.Animation.DROP,
    id: i
  });
}*/
  this.visibleLocations = ko.computed(function(){
       return this.locations().filter(function(location){
           if(!self.filter() || location.title.toLowerCase().indexOf(self.filter().toLowerCase()) !== -1)
             return location;

       });
   },this);

}

ko.applyBindings(new ViewModel());

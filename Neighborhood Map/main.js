var map;
var locations = [
{ title:'Safa and Marwa', location: {lat: 21.42394, lng: 39.82762}},
{ title:'Great Mosque of Mecca', location: {lat: 21.422889, lng: 39.825718}},
{ title:'Abraj Al Bait', location: {lat: 21.418674, lng: 39.824946}},
{ title:'Al Baik', location: {lat: 21.421111, lng: 39.821706}},
{ title:'Zamzam Well', location: {lat: 21.424068, lng: 39.831808}}
];
var markers =[];

// intialiate map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 21.422871, lng: 39.825735},
    zoom: 15
  });
  var largeInfowindow = new google.maps.InfoWindow();

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

//create the live search of list of location and thier markers
  function ViewModel()
  {
    var self =this;
    this.filter = ko.observable();
    this.locations = ko.observableArray(markers);

//make some animation when click on map elements
    self.markerlistAnimation = function(location) {
        location.setAnimation(google.maps.Animation.BOUNCE);
        populateInfoWindow(this, largeInfowindow);
        setTimeout(function () {
          location.setAnimation(null);
        }, 1400);
    }

      this.visibleLocations = ko.computed(function()
    {
      return this.locations().filter(function(location)
      {
        if(!self.filter() || location.title.toLowerCase().indexOf(self.filter().toLowerCase()) !== -1){
          location.setVisible(true);
          return location;

        } else {
          location.setVisible(false);
        }
      });
    },this);
  }
  ko.applyBindings(new ViewModel());
};

//function to populate info window with title and wiki url using AJAX
function populateInfoWindow(marker, infowindow) {
  var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';
  var wikiTimeout = setTimeout(function ()
  {
    alert("failed to load wikipedia page");
  }, 40000);
  $.ajax
  ({
    url: wikiURL,
    dataType: "jsonp",
    success: function (response)
    {
     var articleList = response[3];
     var articleName = response[0];
     if (infowindow.marker != marker)
     {
      infowindow.marker = marker;
      infowindow.open(map, marker);
      infowindow.addListener('closeclick', function()
      {
        infowindow.setMarker(null);
      });
      infowindow.setContent('<div>' + marker.title + '</br> check here for wiki link: <a href ="' + articleList + '">' + articleName + ' </div>');
      clearTimeout(wikiTimeout);
    }
  }
})
}
//function to open navside
function openNav()
{
  document.getElementById("mySidenav").style.width = "250px";
}

// Set the width of the side navigation to 0 and the left margin of the page content to 0
function closeNav()
{
 document.getElementById("mySidenav").style.width = "0";
}

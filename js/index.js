var x = document.getElementById("demo");
var far;
var cel;
var weatherIcon;
var vm;

$(document).ready(function(){
  vm = new Vue({
    el: '#demo',
    data: {
        message: 'Gathering Weather Data...',
        icon: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA'
    },
    methods: {
        setTemp: function (temp) {
          this.message = temp
        },
        setIcon: function (i) {
           switch (i) {
    case "clear-day":
        this.icon = "https://www.holidify.com/images/logos/weather-icons/clear-day.svg";
        break;
    case "clear-night":
        this.icon = "https://d30y9cdsu7xlg0.cloudfront.net/png/74027-200.png";
        break;
    case "rain":
        this.icon = "https://d30y9cdsu7xlg0.cloudfront.net/png/2878-200.png";
        break;
    case "snow":
        this.icon = "https://maxcdn.icons8.com/Share/icon/Weather//snow1600.png";
        break;
    case "sleet":
        this.icon = "http://icons.iconarchive.com/icons/icons8/windows-8/512/Weather-Sleet-icon.png";
        break;
    case "wind":
        this.icon = "https://d30y9cdsu7xlg0.cloudfront.net/png/7702-200.png";
        break;
    case "fog":
        this.icon = "https://www.iconfinder.com/data/icons/meteocons/512/fog-cloud-128.png";
        break;
             case "cloudy":
               this.icon = "http://icons.iconarchive.com/icons/icons8/ios7/256/Weather-Partly-Cloudy-Day-icon.png";
               break;
             case "partly-cloudy-day":
               this.icon = "http://icons.iconarchive.com/icons/icons8/android/512/Weather-Partly-Cloudy-Day-icon.png";
               break;
             case "partly-cloudy-night":
               this.icon = "http://icons.iconarchive.com/icons/icons8/android/512/Weather-Partly-Cloudy-Night-icon.png";
               break;
             default:
               this.icon = "https://www.mikeafford.com/store/store-images/ms01b_example_heavy_rain_showers.png";
}
        }
      }
    })
  
  if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }


function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
  $.ajax({
  url: "https://api.forecast.io/forecast/533f4bee1e892d09ef36b7a90d538c2d/"+position.coords.latitude+","+position.coords.longitude,
  dataType: "jsonp",
  success: function (data) {
      
    vm.setIcon(data.currently.icon);
    far = Math.round(data.currently.temperature);
    cel = Math.round((far - 32) * (5/9));
    vm.setTemp(far);
      console.log(data.currently.icon);
    $("#temp").toggle();
      console.log(data.currently.temperature);
  }
});
}
  
  $('#temp').on('click', function(){
    console.log("test");
                if($('#temp').html() == "F"){
                  vm.setTemp(cel);
                  $('#temp').html("C");
                }
    else{
      vm.setTemp(far);
      $('#temp').html("F");
    }
                })
})
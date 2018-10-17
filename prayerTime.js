var prayerTimeApi = (function () {
    
    /////////// private variables and methods /////////////////

    // array to store all the prayer times
    var prayerTimes = [];

    // prayer object 
    var PrayerTime = function(name, dateTime) {
        this.name = name;
        this.dateTime = dateTime;
    } 

    // save the prayer times to the local storage
    function savePrayerTimes() {
        localStorage.setItem("prayerTimes", JSON.stringify(prayerTimes));
    }

    function loadPrayerTimes() {
        prayerTimes = JSON.parse(localStorage.getItem("prayerTimes"));
    }
    loadPrayerTimes();

    /////////// Public API Methods /////////////////

    var obj = {};

    // Adding prayer time to the prayerTime array
    obj.addPrayerTime = function(name, dateTime) {
        var prayerTime = new PrayerTime(name, dateTime);
        prayerTimes.push(prayerTime);

        savePrayerTimes();
    }


    // Function to store the prayer times to local storage
    obj.savePrayerTime = function(name, prayerTime) {
        // remove prayer if it already exits
        prayerTimes = prayerTimes.filter(prayer => prayer.name != name);

        var currentDate = new Date();
        

        //prayer has already gone set the time for tomorrow  
        if(prayerTime.getTime() < currentDate.getTime()) { 
            // obj.addDayToPrayerTime(name, prayerTime, 1);
            
            var tomorrow = new Date(prayerTime);
            tomorrow.setDate(tomorrow.getDate() + 1);

            var prayer = new PrayerTime(name, tomorrow.toString());
            prayerTimes.push(prayer);
            savePrayerTimes();
            
        }
        else {
            var prayer = new PrayerTime(name, prayerTime.toString());
            prayerTimes.push(prayer);
            savePrayerTimes();
        }

    } 

    // Function to calculate the time remaining for each prayer 
    obj.getTimeRemaining = function(name) {
        
        var prayerTimeCopy = {};

        // find the prayer object 
        for(var i in prayerTimes){
          if(prayerTimes[i].name === name){
            prayerTimeCopy = prayerTimes[i];
          }
        }
    
       var currentdate = new Date();
        
       var dateTime = prayerTimeCopy.dateTime;
       var currentTimediffrence = new Date(dateTime).getTime() - currentdate.getTime();
       var timeRemainingDate = new Date(currentTimediffrence);
       // removing an hours because of daylight time saving
       timeRemainingDate.setHours(timeRemainingDate.getHours() -1);
  
      return timeRemainingDate;
    }

    // Get a prayerTime by name return the prayerTime object = name + string date
    obj.getPrayerTime = function(name) {

        var prayerTimeCopy = {};

        for(var i in prayerTimes){
            if(prayerTimes[i].name === name){
                prayerTimeCopy = prayerTimes[i];
            }
        }
        return prayerTimeCopy;

    }


    // Function to calculate the next prayer based on time remaining
    // return the prayertime obj of the next prayer
    obj.getNextPrayer = function () {

        var currentDate = new Date();

        var fajrTime = new Date(obj.getPrayerTime('fajr').dateTime);
        var fajrTimeLeft = new Date(obj.getPrayerTime('fajr').dateTime).getTime() - currentDate.getTime();
        
        var zohrTime = new Date(obj.getPrayerTime('zohr').dateTime);
        var zohrTimeLeft = new Date(obj.getPrayerTime('zohr').dateTime).getTime() - currentDate.getTime() ;
        
        var asrTime = new Date(obj.getPrayerTime('asr').dateTime);
        var asrTimeLeft = new Date(obj.getPrayerTime('asr').dateTime).getTime() - currentDate.getTime() ;
        
        var magribTime = new Date(obj.getPrayerTime('magrib').dateTime);
        var magribTimeLeft = new Date(obj.getPrayerTime('magrib').dateTime).getTime() - currentDate.getTime() ;
        
        var ishaTime = new Date(obj.getPrayerTime('isha').dateTime);
        var ishaTimeLeft = new Date(obj.getPrayerTime('isha').dateTime).getTime() - currentDate.getTime() ;


        var prayerTimesRemaining = {
            'fajr': fajrTimeLeft,
            'zohr': zohrTimeLeft,
            'asr' : asrTimeLeft,
            'magrib': magribTimeLeft,
            'isha': ishaTimeLeft
        }
    
        var sortable = [];
        for (var time in prayerTimesRemaining) {
            sortable.push([time, prayerTimesRemaining[time]]);
        }

        sortable.sort(function(a, b) {
            return a[1] - b[1];
        });

        var nextPrayer = obj.getPrayerTime(sortable[0][0]);
             
        return nextPrayer;
    }

    obj.addDayToPrayerTime = function(name, date, days) {
        
        var tommorow = new Date(date);
        tommorow.setDate(tommorow.getDate() + days);
        
        if(name === 'magrib') {
            
            var magribDate = new Date(tommorow);
            
            var durationInMinutes = 2;
            
            magribDate.setMinutes(tommorow.getMinutes() - durationInMinutes);

            var prayer = obj.getPrayerTime(name);
        
            prayer.dateTime = magribDate;
            
            obj.savePrayerTime(prayer.name, prayer.dateTime);

        }
        else {
            var prayer = obj.getPrayerTime(name);
            prayer.dateTime = tommorow;

            // store the prayer now 
            obj.savePrayerTime(prayer.name, prayer.dateTime);
        }
        
    }

    obj.clearAllTimes = function(){
        prayerTimes = [];
        savePrayerTimes();
    }

    obj.saveRawPrayerTime = function(name, time) {

        if (localStorage.getItem(name) !== null) {
            localStorage.removeItem(name);
        }
        
        localStorage.setItem(name, time);

    }

    obj.getRawPrayerTime = function(name) {
        return localStorage.getItem(name);
    }

    return obj;

})();
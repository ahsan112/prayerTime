
// ========== function to run on load displaying the next prayer time ================== //

function run() {
    
    var currentDate = new Date();
    
    var nextPrayer = prayerTimeApi.getNextPrayer();
    nextPrayer.timeRemaining = new Date(nextPrayer.dateTime).getTime() - currentDate.getTime();
    nextPrayer.timeRemaining = new Date(nextPrayer.timeRemaining);
    nextPrayer.timeRemaining.setHours(nextPrayer.timeRemaining.getHours() -1);

    document.querySelector('#nextPrayer').innerHTML = nextPrayer.name;
    document.querySelector('#nextPrayerTime').innerHTML = nextPrayer.timeRemaining.getHours() + ' :' +  nextPrayer.timeRemaining.getMinutes() + ' :' + nextPrayer.timeRemaining.getSeconds();

    // need to see if this works then make an api method for it
    if(nextPrayer.timeRemaining.getHours() == 0 && nextPrayer.timeRemaining.getMinutes() == 0 && nextPrayer.timeRemaining.getSeconds() ==0 ) {
      
        if(nextPrayer.name == 'fajr') {
            prayerTimeApi.addDayToPrayerTime('fajr',new Date(nextPrayer.dateTime),1);
        } 
        if(nextPrayer.name == 'zohr') {
            prayerTimeApi.addDayToPrayerTime('zohr',new Date(nextPrayer.dateTime),1);
        } 
        if(nextPrayer.name == 'asr') {
            prayerTimeApi.addDayToPrayerTime('asr',new Date(nextPrayer.dateTime),1);
        } 
        if(nextPrayer.name == 'magrib') {
            prayerTimeApi.addDayToPrayerTime('magrib',new Date(nextPrayer.dateTime),1);
        } 
        if(nextPrayer.name == 'isha') {
            prayerTimeApi.addDayToPrayerTime('isha',new Date(nextPrayer.dateTime),1);
        } 

  
    }

    // send notification when the prayer time is 5 minutes away
    if(nextPrayer.timeRemaining.getHours() == 0 && nextPrayer.timeRemaining.getMinutes() == 5 && nextPrayer.timeRemaining.getSeconds() == 0) {
        
        if (window.Notification && Notification.permission !== "granted") {
            Notification.requestPermission(function (status) {
                if (Notification.permission !== status) {
                Notification.permission = status;
                }
            });
        }
        if (window.Notification && Notification.permission == "default") {
            
            Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                    var theBody = 'Time for success: ' + nextPrayer.name + ' is 5 minutes away';

                    var options = {
                        body: theBody,
                        requireInteraction: 1,
                        vibrate: [200, 100, 200]
                    }
                    var notification = new Notification(nextPrayer.name  + ' Time', options);
                }
            
            });
            
        } 
        if (Notification.permission !== 'denied') {
            
            Notification.requestPermission(function (permission) {
                if(!('permission' in Notification)) {
                    Notification.permission = permission;
                }
                
                if (permission === "granted") {
                    var theBody = 'Time for success: ' + nextPrayer.name + ' is 5 minutes away';

                    var options = {
                        body: theBody,
                        requireInteraction: 1,
                        vibrate: [200, 100, 200]
                    }
                var notification = new Notification(nextPrayer.name  + ' Time', options);

                // window.navigator.vibrate(500);
                }
            });
        }
    }

    

};
setInterval(run,1000);

// ========== END OF function to run on load displaying the next prayer time================== //


// ========== function to save the prayer times ================== //

var calculateButton = document.querySelector('#calc');
calculateButton.addEventListener('click', storePrayerTimes);

function storePrayerTimes() {
  
  var currentDate = new Date();
  prayerTimeApi.clearAllTimes();
  
  //=========================== fajr ===================================

  var fajrValue = document.querySelector('#fajr_time').value; 
  var fajrTime = new Date(currentDate.toDateString() + ' ' + fajrValue );
  prayerTimeApi.savePrayerTime('fajr', fajrTime);
  prayerTimeApi.saveRawPrayerTime('fajr_time_raw', fajrValue);
  
  // =========================FAJR END ===================================

  // zohr time
  var zohrValue = document.querySelector('#zohr_time').value;
  var zohrTime = new Date(currentDate.toDateString() + ' ' + zohrValue);
  prayerTimeApi.savePrayerTime('zohr', zohrTime);
  prayerTimeApi.saveRawPrayerTime('zohr_time_raw', zohrValue);

  // =========================ZOHR END ===================================
  
  // asr time
  var asrValue = document.querySelector('#asr_time').value;
  var asrTime = new Date(currentDate.toDateString() + ' ' + asrValue);
  prayerTimeApi.savePrayerTime('asr', asrTime);
  prayerTimeApi.saveRawPrayerTime('asr_time_raw', asrValue);
  
  // =========================ASR END ===================================


  // magrib time
  var magribValue = document.querySelector('#magrib_time').value;
  var magribTime = new Date(currentDate.toDateString() + ' ' + magribValue);
  prayerTimeApi.savePrayerTime('magrib', magribTime);
  prayerTimeApi.saveRawPrayerTime('magrib_time_raw', magribValue);

  // =========================MAGRIB END ===================================

  // Isha time
  var ishaValue = document.querySelector('#isha_time').value;
  var ishaTime = new Date(currentDate.toDateString() + ' ' + ishaValue);
  prayerTimeApi.savePrayerTime('isha', ishaTime);
  prayerTimeApi.saveRawPrayerTime('isha_time_raw', ishaValue);


  // =========================ISHA END ===================================


}

// ========== END OF function to save the prayer times ================== //


// ========== function to save the prayer times ================== //
    
function calculateRemainingPrayerTimes() {
      
    //FAJR
    var timeRemainingTillFajr = prayerTimeApi.getTimeRemaining('fajr');
    document.querySelector('#fajr-remaining').innerHTML = timeRemainingTillFajr.getHours() + ' :' +  timeRemainingTillFajr.getMinutes() + ' :' + timeRemainingTillFajr.getSeconds();
    
    //ZOHR
    var timeRemainingTillZohr = prayerTimeApi.getTimeRemaining('zohr');
    document.querySelector('#zohr-remaining').innerHTML = timeRemainingTillZohr.getHours() + ' :' +  timeRemainingTillZohr.getMinutes() + ' :' + timeRemainingTillZohr.getSeconds();
    
    //ASR
    var timeRemainingTillAsr = prayerTimeApi.getTimeRemaining('asr');
    document.querySelector('#asr-remaining').innerHTML = timeRemainingTillAsr.getHours() + ' :' +  timeRemainingTillAsr.getMinutes() + ' :' + timeRemainingTillAsr.getSeconds();
    
    //MAGRIB - THIS WILL BE REDONE TO GET THE SUN SET VERSION AUTO
    var timeRemainingTillMagrib = prayerTimeApi.getTimeRemaining('magrib');
    document.querySelector('#magrib-remaining').innerHTML = timeRemainingTillMagrib.getHours() + ' :' +  timeRemainingTillMagrib.getMinutes() + ' :' + timeRemainingTillMagrib.getSeconds();
    
    //ISHA
    var timeRemainingTillIsha = prayerTimeApi.getTimeRemaining('isha');
    document.querySelector('#isha-remaining').innerHTML = timeRemainingTillIsha.getHours() + ' :' +  timeRemainingTillIsha.getMinutes() + ' :' + timeRemainingTillIsha.getSeconds();

}
  
setInterval(calculateRemainingPrayerTimes,1000);

// ========== END OF function to save the prayer times ================== //


if (localStorage.getItem('fajr_time_raw') !== null) {
    document.querySelector('#fajr_time').value = prayerTimeApi.getRawPrayerTime('fajr_time_raw');    
}
if (localStorage.getItem('zohr_time_raw') !== null) {
    document.querySelector('#zohr_time').value = prayerTimeApi.getRawPrayerTime('zohr_time_raw');    
}
if (localStorage.getItem('asr_time_raw') !== null) {
    document.querySelector('#asr_time').value = prayerTimeApi.getRawPrayerTime('asr_time_raw');    
}
if (localStorage.getItem('magrib_time_raw') !== null) {
    document.querySelector('#magrib_time').value = prayerTimeApi.getRawPrayerTime('magrib_time_raw');    
}
if (localStorage.getItem('isha_time_raw') !== null) {
    document.querySelector('#isha_time').value = prayerTimeApi.getRawPrayerTime('isha_time_raw');    
}



function changeView(button) {
    if(button == 'mainView') {
        var mainView = document.querySelector('.main');
        mainView.style.display = 'block';

        var settingsView = document.querySelector('.settings');
        settingsView.style.display = 'none';
    }
    else {
        var settingsView = document.querySelector('.settings');
        settingsView.style.display = 'block';

        var mainView = document.querySelector('.main');
        mainView.style.display = 'none';
    }
    
}


Notification.requestPermission();
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDeyHWfq_ZiEn_gKZ8B0or7cAVSaGDx18c",
    authDomain: "trainscheduleassignment.firebaseapp.com",
    databaseURL: "https://trainscheduleassignment.firebaseio.com",
    projectId: "trainscheduleassignment",
    storageBucket: "trainscheduleassignment.appspot.com",
    messagingSenderId: "926774940529"
  };

  firebase.initializeApp(config);

// Variables
	var database = firebase.database();

// function to accept values from the form and push them to the database.
  $("#Add-Train").on("click", function(event) {

    event.preventDefault();

   var trainName = $("#train-name").val().trim();
   var destination = $("#train-destination").val().trim();
   var firstTrainTime = $("#train-time").val().trim();
   var frequency = $("#train-frequency").val().trim();

  

    database.ref().push({
      TrainName: trainName,
      Destination: destination,
      FirstTrainTime: firstTrainTime,
      Frequency: frequency
    })
  });

  database.ref().on("child_added", function(snap) {

    var trainTime = moment(snap.val().FirstTrainTime, "HH:mm").subtract(1, "years");
    var trainFrequency = snap.val().Frequency;
    var trainTimeDiff = moment().diff(moment(trainTime), "minutes");
    var timeRemainder = trainTimeDiff % trainFrequency;
    var MinsTillTrain = trainFrequency - timeRemainder;
    var nextTrain = moment().add(MinsTillTrain, "minutes");

    $("#train-data").prepend("<tr> <td>" + snap.val().TrainName + "</td> <td>" + snap.val().Destination + "</td> <td>" + snap.val().Frequency + "</td> <td>" + moment(nextTrain).format("HH:mm") + "</td> <td>" + MinsTillTrain + "</td> </tr>" );

  });
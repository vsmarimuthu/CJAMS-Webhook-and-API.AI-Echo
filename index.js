"use strict";

const express = require("express");
const bodyParser = require("body-parser");
var request = require('request');
const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/createIntake", function (req, res) {
  var _narrative =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.Narrative ?
    req.body.queryResult.parameters.Narrative : "";

    var _purpose =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.Purpose ?
    req.body.queryResult.parameters.Purpose : "";

    var _firstname =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.Firstname ?
    req.body.queryResult.parameters.Firstname : "";

    var _lastname =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.Lastname ?
    req.body.queryResult.parameters.Lastname : "";

    var _role =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.Role ?
    req.body.queryResult.parameters.Role : "";
	
  var speech='';
  var access_token = '';
  request.post(
    'https://api-re-cw.cardinalityai.xyz/api/users/login', {
      json: {
        "email": "mccauley@cardinality.ai",
        "password": "ccwis@123"
      }
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        access_token = response.body.id;
        request(
          'https://api-re-cw.cardinalityai.xyz/api/Nextnumbers/getNextNumber?apptype=IntakeNumber',

          function (error, response, body) {
            if (!error && response.statusCode == 200) {
              var apiNextNumber = JSON.parse(response.body);
              speech = apiNextNumber.nextNumber;
              request.post(
                'https://api-re-cw.cardinalityai.xyz/api/Intakedastagings/reviewIntake', {
                  headers: {
                    'access_token': access_token
                  },
                  json: {
                    "intake": {
                      "crossReference": [],
                      "persons": [],
                      "reasonforDraft": [
                        {
                          "time": 1593792499376
                        },
                        {
                          "time": 1593792503129
                        },
                        {
                          "time": 1593792503354
                        },
                        {
                          "time": 1593792503543
                        },
                        {
                          "time": 1593792503736
                        },
                        {
                          "time": 1593792506547
                        },
                        {
                          "time": 1593792512498
                        },
                        {
                          "time": 1593792526718
                        },
                        {
                          "time": 1593792527243
                        }
                      ],
                      "agency": "CW",
                      "intakeDATypeDetails": [],
                      "General": {
                        "Time": "2020-07-03T16:08:47.243Z",
                         "IntakeNumber": speech,
                        "intakeservice": [],
                        "InputSource": "b5b40aa0-d2d9-4c04-a3f6-07ed304d904c",
                        "RecivedDate": "7/3/2020, 9:38:16 PM",
                        "CreatedDate": "2020-07-03T16:08:16.149Z",
                        "Author": "Christina McCauley",
                        "Agency": "CW",
                        "Purpose": "247a8b26-cdee-4ce8-b36e-b37e49fd0103~undefined",
                        "PurposeName": "Child Protective Services",
                        "countyid": "e2c90cd0-a905-4cca-ad60-396ac2cfc41e",
                        "islocalreferal": 0,
                        "queAdditionDate": "2020-07-03T16:08:45.190Z",
                        "servicerequest": [],
                        "suggestedresource": [],
                        "isacknowledgementletter": 1,
                        "Iscps": null,
                        "cpsHistoryClearance": null,
                        "Narrative": "<p>"+_narrative+"</p>",
                        "IsAnonymousReporter": false,
                        "IsUnknownReporter": false,
                        "RefuseToShareZip": false,
                        "offenselocation": "",
                        "narrativeUpdatedDate": null,
                        "communicationDescription": "Face to Face"
                      },
                      "narrative": [
                        { 
                        "Firstname": _firstname,
                          "Lastname":_lastname,
                          "Middlename": "",
                          "PhoneNumber": "",
                          "PhoneNumberExt": "",
                          "ZipCode": "",
                          "Role": _role,
                          "RoleName": "",
                          "organization": null,
                          "title": null,
                          "incidentlocation": "",
                          "incidentdate": "",
                          "isapproximate": false,
                          "email": ""
                        }
                      ],
                      "evaluationFields": null,
                      "reviewstatus": {
                        "appevent": "DRAFT",
                        "status": "",
                        "commenttext": "",
                        "ispreintake": false
                      },
                      "disposition": null,
                      "createdCases": null,
                      "sdm": {
                        "isar": true,
                        "ismaltreatment": false,
                        "ischildfatality": false,
                        "isrecsc_screenout": false,
                        "isrecsc_scrrenin": true,
                        "datesubmitted": null
                      },
                      "clwStatus": null,
                      "focuspersoncasedetails": [],
                      "roacps": null,
                      "userrole": "",
                      "officelocation": "Washington"
                    },
                    "review": {
                      "appevent": "DRAFT",
                      "status": "",
                      "commenttext": "",
                      "ispreintake": false
                    }
                  }
                },
                function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                    speech = '<speak><break strength="x-strong"/> Congratulations. <break time=".5s"/> Intake has been created with Intake number <say-as interpret-as="cardinal">' + speech +'</say-as></speak>';
                    var speechResponse = {
                      google: {
                        expectUserResponse: true,
                        richResponse: {
                          items: [{
                            simpleResponse: {
                              textToSpeech: speech
                            }
                          }]
                        }
                      }
                    };

                    return res.json({
                      payload: speechResponse,
                      //data: speechResponse,
                      fulfillmentText: speech,
                      speech: speech,
                      displayText: speech,
                      source: "webhook-echo-sample"
                    });
                  }
                }
              );
            }
          }
        );


      }
    }
  );


});


restService.post("/audio", function (req, res) {
  var speech = "";
  switch (req.body.result.parameters.AudioSample.toLowerCase()) {
    //Speech Synthesis Markup Language 
    case "music one":
      speech =
        '<speak><audio src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
    case "music two":
      speech =
        '<speak><audio clipBegin="1s" clipEnd="3s" src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
    case "music three":
      speech =
        '<speak><audio repeatCount="2" soundLevel="-15db" src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
    case "music four":
      speech =
        '<speak><audio speed="200%" src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
    case "music five":
      speech =
        '<audio src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio>';
      break;
    case "delay":
      speech =
        '<speak>Let me take a break for 3 seconds. <break time="3s"/> I am back again.</speak>';
      break;
      //https://www.w3.org/TR/speech-synthesis/#S3.2.3
    case "cardinal":
      speech = '<speak><say-as interpret-as="cardinal">12345</say-as></speak>';
      break;
    case "ordinal":
      speech =
        '<speak>I stood <say-as interpret-as="ordinal">10</say-as> in the class exams.</speak>';
      break;
    case "characters":
      speech =
        '<speak>Hello is spelled as <say-as interpret-as="characters">Hello</say-as></speak>';
      break;
    case "fraction":
      speech =
        '<speak>Rather than saying 24+3/4, I should say <say-as interpret-as="fraction">24+3/4</say-as></speak>';
      break;
    case "bleep":
      speech =
        '<speak>I do not want to say <say-as interpret-as="bleep">F&%$#</say-as> word</speak>';
      break;
    case "unit":
      speech =
        '<speak>This road is <say-as interpret-as="unit">50 foot</say-as> wide</speak>';
      break;
    case "verbatim":
      speech =
        '<speak>You spell HELLO as <say-as interpret-as="verbatim">hello</say-as></speak>';
      break;
    case "date one":
      speech =
        '<speak>Today is <say-as interpret-as="date" format="yyyymmdd" detail="1">2017-12-16</say-as></speak>';
      break;
    case "date two":
      speech =
        '<speak>Today is <say-as interpret-as="date" format="dm" detail="1">16-12</say-as></speak>';
      break;
    case "date three":
      speech =
        '<speak>Today is <say-as interpret-as="date" format="dmy" detail="1">16-12-2017</say-as></speak>';
      break;
    case "time":
      speech =
        '<speak>It is <say-as interpret-as="time" format="hms12">2:30pm</say-as> now</speak>';
      break;
    case "telephone one":
      speech =
        '<speak><say-as interpret-as="telephone" format="91">09012345678</say-as> </speak>';
      break;
    case "telephone two":
      speech =
        '<speak><say-as interpret-as="telephone" format="1">(781) 771-7777</say-as> </speak>';
      break;
      // https://www.w3.org/TR/2005/NOTE-ssml-sayas-20050526/#S3.3
    case "alternate":
      speech =
        '<speak>IPL stands for <sub alias="indian premier league">IPL</sub></speak>';
      break;
  }
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

restService.post("/video", function (req, res) {
  return res.json({
    speech: '<speak>  <audio src="https://www.youtube.com/watch?v=VX7SSnvpj-8">did not get your MP3 audio file</audio></speak>',
    displayText: '<speak>  <audio src="https://www.youtube.com/watch?v=VX7SSnvpj-8">did not get your MP3 audio file</audio></speak>',
    source: "webhook-echo-sample"
  });
});

restService.post("/slack-test", function (req, res) {
  var slack_message = {
    text: "Details of JIRA board for Browse and Commerce",
    attachments: [{
        title: "JIRA Board",
        title_link: "http://www.google.com",
        color: "#36a64f",

        fields: [{
            title: "Epic Count",
            value: "50",
            short: "false"
          },
          {
            title: "Story Count",
            value: "40",
            short: "false"
          }
        ],

        thumb_url: "https://stiltsoft.com/blog/wp-content/uploads/2016/01/5.jira_.png"
      },
      {
        title: "Story status count",
        title_link: "http://www.google.com",
        color: "#f49e42",

        fields: [{
            title: "Not started",
            value: "50",
            short: "false"
          },
          {
            title: "Development",
            value: "40",
            short: "false"
          },
          {
            title: "Development",
            value: "40",
            short: "false"
          },
          {
            title: "Development",
            value: "40",
            short: "false"
          }
        ]
      }
    ]
  };
  return res.json({
    speech: "speech",
    displayText: "speech",
    source: "webhook-echo-sample",
    data: {
      slack: slack_message
    }
  });
});

restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening");
});

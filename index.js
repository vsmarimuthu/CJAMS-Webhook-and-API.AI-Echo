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
  var speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.Name ?
    req.body.queryResult.parameters.Name :
    "Seems like some problem. Speak again.";
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
                      "persons": [{
                        "Pid": "0f63e4dc-7491-4479-965a-ad49d9bd4eae",
                        "Lastname": "Andrew",
                        "Firstname": "john",
                        "Gender": "1282",
                        "Dob": "09/23/2006",
                        "Role": "CHILD",
                        "RelationshiptoRA": "SELF",
                        "Dangerousself": "no",
                        "Dangerousworker": "no",
                        "Mentealimpair": "no",
                        "Mentealillness": "no",
                        "ishousehold": "yes",
                        "drugexposednewbornflag": 0,
                        "fetalalcoholspctrmdisordflag": 0,
                        "sexoffenderregisteredflag": 0,
                        "probationsearchconductedflag": 0,
                        "safehavenbabyflag": 0,
                        "personRole": [{
                          "rolekey": "CHILD",
                          "description": "Child",
                          "isprimary": "true",
                          "relationshiptorakey": "SELF",
                          "hidden": null
                        }],
                        "personAddressInput": [],
                        "cjamspid": "100000210",
                        "substances": [],
                        "phoneNumber": [],
                        "emailID": [],
                        "fullName": "john Andrew"
                      }],
                      "reasonforDraft": [],
                      "agency": "CW",
                      "intakeDATypeDetails": [],
                      "General": {
                        "Time": "2020-06-25T12:12:12.480Z",
                        "IntakeNumber": speech,
                        "intakeservice": [],
                        "InputSource": "d1d7780d-a31a-4c23-826e-0495a64694bc",
                        "RecivedDate": "06/25/2020, 5:38:38 PM",
                        "CreatedDate": "2020-06-25T12:08:38.430Z",
                        "Author": "Jacob John",
                        "Agency": "CW",
                        "Purpose": "247a8b26-cdee-4ce8-b36e-b37e49fd0103~CW",
                        "countyid": "7665ca54-5374-4174-be07-a687b811a82c",
                        "islocalreferal": 0,
                        "queAdditionDate": "2020-06-25T12:08:38.430Z",
                        "isacknowledgementletter": 1,
                        "Iscps": null,
                        "Narrative": "<p>dsfds</p>",
                        "IsAnonymousReporter": false,
                        "IsUnknownReporter": false,
                        "RefuseToShareZip": false,
                        "offenselocation": ""
                      },
                      "narrative": [{
                        "Firstname": "aa",
                        "Lastname": "ss",
                        "Middlename": "",
                        "PhoneNumber": "",
                        "ZipCode": "",
                        "Role": "Rep"
                      }],
                      "evaluationFields": null,
                      "reviewstatus": {
                        "appevent": "INTR",
                        "status": "supreview",
                        "commenttext": "test",
                        "ispreintake": false,
                        "assignsecurityuserid": "eba740d3-c238-4497-a660-3b7b09e12922",
                        "ismanualrouting": true
                      },
                      "disposition": [{
                        "ServiceRequestNumber": "I201900351313",
                        "DaTypeKey": "247a8b26-cdee-4ce8-b36e-b37e49fd0103",
                        "dispositioncode": "Scrnin",
                        "DAStatus": "Review",
                        "intakeMultipleDispositionDropdown": [{
                          "text": "Close Case",
                          "value": "Closed"
                        }, {
                          "text": "Pre Court Services",
                          "value": "courtsrv"
                        }, {
                          "text": "Reject Case for legal insufficiency",
                          "value": "rejected"
                        }, {
                          "text": "Screen In",
                          "value": "Scrnin"
                        }, {
                          "text": "Screen Out",
                          "value": "ScreenOUT"
                        }, {
                          "text": "Send to Court",
                          "value": "sendcourt"
                        }],
                        "intakeserreqstatustypekey": "Review",
                        "comments": "test",
                        "intakeAction": "",
                        "supStatus": "",
                        "supComments": "",
                        "reason": "",
                        "caseID": "",
                        "serviceTypeID": "",
                        "supMultipleDispositionDropdown": []
                      }],
                      "createdCases": null,
                      "sdm": {
                        "referralname": "",
                        "referraldob": "2020-06-25T12:11:18.909Z",
                        "referralid": "",
                        "countyid": null,
                        "ismaltreatment": false,
                        "maltreatment": "no",
                        "childfatality": "no",
                        "ischildfatality": false,
                        "isfcplacementsetting": false,
                        "isprivateplacement": false,
                        "islicenseddaycare": false,
                        "isschool": false,
                        "physicalAbuse": {
                          "ismalpa_suspeciousdeath": false,
                          "ismalpa_nonaccident": false,
                          "ismalpa_injuryinconsistent": false,
                          "ismalpa_insjury": false,
                          "ismalpa_childtoxic": false,
                          "ismalpa_caregiver": false
                        },
                        "sexualAbuse": {
                          "ismalsa_sexualmolestation": false,
                          "ismalsa_sexualact": false,
                          "ismalsa_sexualexploitation": false,
                          "ismalsa_physicalindicators": false
                        },
                        "generalNeglect": {
                          "isneggn_suspiciousdeath": false,
                          "isneggn_signsordiagnosis": false,
                          "isneggn_inadequatefood": false,
                          "isneggn_childdischarged": false
                        },
                        "arGeneralNeglect": {
                          "isneggn_exposuretounsafe": false,
                          "isneggn_inadequateclothing": false,
                          "isneggn_inadequatesupervision": false,
                          "isnegrh_treatmenthealthrisk": false
                        },
                        "isnegfp_cargiverintervene": false,
                        "isnegab_abandoned": false,
                        "unattendedChild": {
                          "isneguc_leftunsupervised": false,
                          "isneguc_leftaloneinappropriatecare": false,
                          "isneguc_leftalonewithoutsupport": false
                        },
                        "riskofHarm": {
                          "isnegrh_priordeath": false,
                          "isnegrh_domesticviolence": false,
                          "isnegrh_sexualperpetrator": false,
                          "isnegrh_basicneedsunmet": false,
                          "isnegrh_substantial_risk": false
                        },
                        "isnegmn_unreasonabledelay": false,
                        "ismenab_psycologicalability": true,
                        "ismenng_psycologicalability": true,
                        "screeningRecommend": "Scrnin",
                        "scnRecommendOveride": "",
                        "screenOut": {
                          "isscrnoutrecovr_insufficient": false,
                          "isscrnoutrecovr_information": false,
                          "isscrnoutrecovr_historicalinformation": false,
                          "isscrnoutrecovr_otherspecify": false,
                          "scrnout_description": ""
                        },
                        "screenIn": {
                          "isscrninrecovr_courtorder": false,
                          "isscrninrecovr_otherspecify": false,
                          "scrnin_description": ""
                        },
                        "immediate": "Immediate",
                        "immediateList": {
                          "isimmed_childfaatility": true,
                          "isimmed_seriousinjury": true,
                          "isimmed_childleftalone": null,
                          "isimmed_allegation": null,
                          "isimmed_otherspecify": null,
                          "immediateList6": null
                        },
                        "noImmediateList": {
                          "isnoimmed_physicalabuse": false,
                          "isnoimmed_sexualabuse": false,
                          "isnoimmed_neglectresponse": false,
                          "isnoimmed_screeninoverride": false,
                          "isnoimmed_substantial_risk": false,
                          "isnoimmed_risk_harm": false
                        },
                        "childunderoneyear": "Yes",
                        "childUnderOneYear": "",
                        "officerfirstname": "",
                        "officermiddlename": "",
                        "officerlastname": "",
                        "badgenumber": "",
                        "recordnumber": "",
                        "reportdate": null,
                        "worker": "",
                        "comments": "",
                        "workerdate": null,
                        "supervisor": "",
                        "supervisordate": null,
                        "disqualifyingCriteria": {
                          "issexualabuse": false,
                          "isoutofhome": false,
                          "isdeathorserious": false,
                          "isrisk": false,
                          "isreportmeets": true,
                          "issignordiagonises": false,
                          "ismaltreatment3yrs": false,
                          "ismaltreatment12yrs": false,
                          "ismaltreatment24yrs": false,
                          "isactiveinvestigation": false
                        },
                        "disqualifyingFactors": {
                          "isreportedhistory": false,
                          "ismultiple": false,
                          "isdomesticvoilence": false,
                          "iscriminalhistory": false,
                          "isthread": false,
                          "islawenforcement": false,
                          "iscourtiinvestigation": false
                        },
                        "cpsResponseType": "CPS-IR",
                        "isar": false,
                        "isir": true,
                        "isfinalscreenin": "true",
                        "allegedvictim": [{
                          "victimname": ""
                        }],
                        "allegedmaltreator": [{
                          "maltreatorsname": ""
                        }],
                        "provider": [{
                          "providername": ""
                        }],
                        "ismalpa_suspeciousdeath": false,
                        "ismalpa_nonaccident": false,
                        "ismalpa_injuryinconsistent": false,
                        "ismalpa_insjury": false,
                        "ismalpa_childtoxic": false,
                        "ismalpa_caregiver": false,
                        "ismalsa_sexualmolestation": false,
                        "ismalsa_sexualact": false,
                        "ismalsa_sexualexploitation": false,
                        "ismalsa_physicalindicators": false,
                        "isneggn_suspiciousdeath": false,
                        "isneggn_signsordiagnosis": false,
                        "isneggn_inadequatefood": false,
                        "isneggn_childdischarged": false,
                        "isneggn_exposuretounsafe": false,
                        "isneggn_inadequateclothing": false,
                        "isneggn_inadequatesupervision": false,
                        "isnegrh_treatmenthealthrisk": false,
                        "isneguc_leftunsupervised": false,
                        "isneguc_leftaloneinappropriatecare": false,
                        "isneguc_leftalonewithoutsupport": false,
                        "isnegrh_priordeath": false,
                        "isnegrh_domesticviolence": false,
                        "isnegrh_sexualperpetrator": false,
                        "isnegrh_basicneedsunmet": false,
                        "isnegrh_substantial_risk": false,
                        "isscrnoutrecovr_insufficient": false,
                        "isscrnoutrecovr_information": false,
                        "isscrnoutrecovr_historicalinformation": false,
                        "isscrnoutrecovr_otherspecify": false,
                        "scrnout_description": "",
                        "isscrninrecovr_courtorder": false,
                        "isscrninrecovr_otherspecify": false,
                        "scrnin_description": "",
                        "isimmed_childfaatility": true,
                        "isimmed_seriousinjury": true,
                        "isimmed_childleftalone": null,
                        "isimmed_allegation": null,
                        "isimmed_otherspecify": null,
                        "immediateList6": null,
                        "isnoimmed_physicalabuse": false,
                        "isnoimmed_sexualabuse": false,
                        "isnoimmed_neglectresponse": false,
                        "isnoimmed_screeninoverride": false,
                        "isnoimmed_substantial_risk": false,
                        "isnoimmed_risk_harm": false,
                        "issexualabuse": false,
                        "isoutofhome": false,
                        "isdeathorserious": false,
                        "isrisk": false,
                        "isreportmeets": true,
                        "issignordiagonises": false,
                        "ismaltreatment3yrs": false,
                        "ismaltreatment12yrs": false,
                        "ismaltreatment24yrs": false,
                        "isactiveinvestigation": false,
                        "isreportedhistory": false,
                        "ismultiple": false,
                        "isdomesticvoilence": false,
                        "iscriminalhistory": false,
                        "isthread": false,
                        "islawenforcement": false,
                        "iscourtiinvestigation": false,
                        "isrecsc_screenout": false,
                        "isrecsc_scrrenin": true
                      },
                      "focuspersoncasedetails": [],
                      "DAType": {
                        "DATypeDetail": [{
                          "ServiceRequestNumber": "I201900351313",
                          "DaTypeKey": "247a8b26-cdee-4ce8-b36e-b37e49fd0103",
                          "dispositioncode": "Scrnin",
                          "DAStatus": "Review",
                          "intakeMultipleDispositionDropdown": [{
                            "text": "Close Case",
                            "value": "Closed"
                          }, {
                            "text": "Pre Court Services",
                            "value": "courtsrv"
                          }, {
                            "text": "Reject Case for legal insufficiency",
                            "value": "rejected"
                          }, {
                            "text": "Screen In",
                            "value": "Scrnin"
                          }, {
                            "text": "Screen Out",
                            "value": "ScreenOUT"
                          }, {
                            "text": "Send to Court",
                            "value": "sendcourt"
                          }],
                          "intakeserreqstatustypekey": "Review",
                          "comments": "test",
                          "intakeAction": "",
                          "supStatus": "",
                          "supComments": "",
                          "reason": "",
                          "caseID": "",
                          "serviceTypeID": "",
                          "supMultipleDispositionDropdown": []
                        }]
                      }
                    },
                    "review": {
                      "appevent": "INTR",
                      "status": "supreview",
                      "commenttext": "test",
                      "ispreintake": false,
                      "assignsecurityuserid": "eba740d3-c238-4497-a660-3b7b09e12922",
                      "ismanualrouting": true
                    }
                  }
                },
                function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                    speech = 'Hurray!!. Intake has been created with Intake number ' + speech;
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

// last update: 2022-02-19

var dateObject = new Date();
var monthObject = ('0' + (dateObject.getMonth()+1)).slice(-2);
var dayObject = ('0' + dateObject.getDate()).slice(-2);

var today = monthObject + "" + dayObject;
var date = dayObject;
var day = dateObject.getDay();

var theQuestion
var theAnswer
var additionalAnswer
var answerIsPositive

var shortDay1 = "0105"					// (XXXX-01-05)		// Trettondagsafton
var shortDay2 = "0414"					// (XXXX-04-14)		// Skärtorsdagen
var shortDay3 = "0430"					// (XXXX-04-30)		// Valborg
var shortDay4 = "1104"					// (XXXX-11-04)		// Dagen före Alla Helgons dag
var shortDay5 = "1223"					// (XXXX-12-23)		// Dagen innan julafton

var sportlovStart = "0221"				// (XXXX-02-21)		// första dagen
var sportlovEnd = "0225"				// (XXXX-02-25)		// sista dagen

var vacationStart = "1101"				// (XXXX-05-23)		// första dagen
var vacationEnd = "1105"				// (XXXX-05-30)		// sista dagen

var specialDayIsOn = false
var specialDayDate = "0915"
var specialDayText = "Är WPMU snabb än?"
var specialDayAnswer = ""
var specialDayAdditionalAnswer = ""
var specialDayIsPositive = true

var specialDay2IsOn = false
var specialDay2Date = "1203"
var specialDay2Text = "Blir det bättre?"
var specialDay2Answer = "Nej"
var specialDay2AdditionalAnswer = ""
var specialDay2IsPositive = false

setTextToDisplay();					// kör
refreshAt(03,01,0); 				// ladda om sidan kl 03:01

function refreshAt(hours, minutes, seconds) {
    var now = new Date();
    var then = new Date();

    if(now.getHours() > hours ||
       (now.getHours() == hours && now.getMinutes() > minutes) ||
        now.getHours() == hours && now.getMinutes() == minutes && now.getSeconds() >= seconds) {
        then.setDate(now.getDate() + 1);
    }
    then.setHours(hours);
    then.setMinutes(minutes);
    then.setSeconds(seconds);

    var timeout = (then.getTime() - now.getTime());
    setTimeout(function() { window.location.reload(true); }, timeout);
}

function generateAnswer (negativeOrPositive) {
	if (negativeOrPositive === "positive") {
		var randomAnswers = [ "Yes!", "Ja!", "Jepp!"];
		theAnswer = randomAnswers[Math.floor(Math.random() * randomAnswers.length)];
	} else if (negativeOrPositive === "negative") {
		var randomAnswers = [ "Näpp", "Nää", "Nej", "Nope"];
		theAnswer = randomAnswers[Math.floor(Math.random() * randomAnswers.length)];
	}
}

function displayText(theQuestion, otherAnswer, additionalAnswer, answerIsPositive) {
	if (answerIsPositive == true) {
		generateAnswer("positive");
		if (otherAnswer != "") {
			theAnswer = otherAnswer
		}
	} else {
		generateAnswer("negative");
		if (otherAnswer != "") {
			theAnswer = otherAnswer
		}
	}

	document.getElementById("blankRow").innerHTML = '<br>';
	document.getElementById("questionRow").innerHTML = theQuestion;
	if (answerIsPositive == true) {
		document.getElementById("answerRowGreen").innerHTML = theAnswer;
	} else {	
		document.getElementById("answerRowRed").innerHTML = theAnswer;
	}
	document.getElementById("additionalAnswerRow").innerHTML = additionalAnswer;
}

function setTextToDisplay() {
	if (specialDayIsOn == true && today == specialDayDate) {
		displayText(specialDayText, specialDayAnswer, specialDayAdditionalAnswer, specialDayIsPositive);
	
	} else if (specialDay2IsOn == true && today == specialDay2Date) {
		displayText(specialDay2Text, specialDay2Answer, specialDay2AdditionalAnswer, specialDay2IsPositive);
	
	} else if (today == "1224") {	
		displayText("Är det julafton idag?", "", "God Jul", true);
	
	} else if (today == shortDay1 && day < 6 || today == shortDay3 && day == 5 || today == shortDay4 && day < 6 || today == shortDay5 && day == 5) {
		displayText("Är det halvdag idag?", "", "", true);
	
	} else if (today == shortDay2 && day < 6 || today == shortDay3 && day >= 1 && day <= 4  ) {
		displayText("Är det halvdag idag?", "Typ!", "", true);
	
	} else if (date == 25 && day >= 1 && day <= 5 || date == 26 && day == 1 && today != "1226") {
		displayText("Får vi lön idag?", "", "💰", true);
	
	} else if (today >= vacationStart && today <= vacationEnd) {
		displayText("Är det höstlov?", "", "", true);
	
	} else if (today == "0601") {
		displayText("Är det sommar nu?", "", "", true);
	
	} else if (day === 5) {
		displayText("Är det fredag?", "", "", true);
	
	} else if (today >= sportlovStart && today <= sportlovEnd) {
		displayText("Är det sportlov?", "", "", true);
	
	} else {
		var listOfDisplays = [ "fredag", "fredag", "julafton", "halvdag", "lön", "sommar", "semester", "fredag", "fredag", "fredag", "fredag", "fredag"];
		randomDisplay = listOfDisplays[Math.floor(Math.random() * listOfDisplays.length)];
	
		if (randomDisplay === "julafton") {
			if (today >= "1120" && today < "1224") {
				displayText("Är det jul snart?", "Snart!", "", true);
			} else {
				displayText("Är det jul snart?", "", "", false);
			}
		
		} else if (randomDisplay == "halvdag") {
			displayText("Är det halvdag idag?", "", "", false);
		
		} else if (randomDisplay == "lön") {
			if (date >= 20 && date < 25) {
				displayText("Får vi lön snart?", "Snart!", "", true);
			} else {
				displayText("Får vi lön snart?", "", "", false);
			}
		
		} else if (randomDisplay == "sommar") {
			if (today > "0531" && today < "0901") {
				displayText("Är det sommar än?", "", "☀️", true);
			} else {
				displayText("Är det sommar än?", "", "", false);
			}
		
		} else if (randomDisplay == "semester") {
			displayText("Är det semester snart?", "", "", false);
		
		} else if (randomDisplay == "fredag") {
			displayText("Är det fredag?", "", "", false);
		}
	}
}
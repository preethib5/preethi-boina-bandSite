var commentKeyValue = [{
        name: "Miles Acosta",
        SubmittedOn: "12/20/2020",
        bodyText: `I can t stop listening. Every time I hear one of their songs the vocals it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.`,
    },
    {
        name: "Emilie Beach",
        SubmittedOn: "01/09/2021",
        bodyText: `I feel blessed to have seen them in person. What a show! They were just perfection.If there was one day of my life I could relive, this would be it. What an incredible day.`,
    },
    {
        name: "Connor Walton",
        SubmittedOn: "02/17/2021",
        bodyText: `This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work this for what it is and what it contains.`,
    }

];
const form = document.getElementById("commentForm");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    commentKeyValue.name = event.target.name.value;
    commentKeyValue.bodyText = event.target.bodyText.value;
    commentKeyValue.SubmittedOn = getTimeStamp(howLongAgo);

    addComment(commentKeyValue).unshift(commentKeyValue);
    console.log(commentKeyValue.length);
    form.reset(); //clearing of all form fields
})

function addComment(object) {
    const commentSection = document.getElementById("container");
    let masterDiv = document.createElement('div')
    masterDiv.classList = "container__commentBox";

    let masterDiv1 = document.createElement('div')
    masterDiv1.classList = "container__leftPanelImg";

    let profileImg = document.createElement('img');
    profileImg.classList.add("container__leftPanelImg--img");
    profileImg.src = "https://www.sjra.net/wp-content/uploads/2019/08/light-grey-background-253x450.png";
    masterDiv1.appendChild(profileImg);

    let masterDiv2 = document.createElement('div')
    masterDiv2.classList = "container__rightPanel";

    let commentPersonName = document.createElement('span');
    commentPersonName.classList.add('container__rightPanel--name');
    commentPersonName.innerText = object.name;

    let commentedDate = document.createElement('div');
    commentedDate.classList.add('container__rightPanel--date');
    commentedDate.innerText = object.SubmittedOn;

    let masterDiv3 = document.createElement('div')
    masterDiv3.classList = "container__comment";

    let commentDescription = document.createElement('p');
    commentDescription.classList.add('container__comment--para');
    commentDescription.innerText = object.bodyText;

    masterDiv2.appendChild(commentPersonName);
    masterDiv2.appendChild(commentedDate);
    masterDiv3.appendChild(commentDescription);
    masterDiv.appendChild(masterDiv1);
    masterDiv.appendChild(masterDiv2);
    masterDiv.appendChild(masterDiv3);
    commentSection.insertBefore(masterDiv, commentSection.firstChild);


    return object;
}

var result = commentKeyValue.map(addComment);
console.log(result);


//Create a TimeStamp
let unix_timestamp = Math.round(new Date().getTime() - 10).toString();

// The time now
var now = new Date().getTime();
// The difference between now and created
var howLongAgo = unix_timestamp - now;

var getTimeStamp = function(timestamp) {
    // Convert to a positive integer
    var time = Math.abs(timestamp);
    // Define humanTime and units
    var humanTime, units;
    // If there are years
    if (time > (1000 * 60 * 60 * 24 * 365)) {
        humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 365), 10);
        units = 'years';
    }
    // If there are months
    else if (time > (1000 * 60 * 60 * 24 * 30)) {
        humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 30), 10);
        units = 'months';
    }
    // If there are weeks
    else if (time > (1000 * 60 * 60 * 24 * 7)) {
        humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 7), 10);
        units = 'weeks';
    }
    // If there are days
    else if (time > (1000 * 60 * 60 * 24)) {
        humanTime = parseInt(time / (1000 * 60 * 60 * 24), 10);
        units = 'days';
    }
    // If there are hours
    else if (time > (1000 * 60 * 60)) {
        humanTime = parseInt(time / (1000 * 60 * 60), 10);
        units = 'hours';
    }
    // If there are minutes
    else if (time > (1000 * 60)) {
        humanTime = parseInt(time / (1000 * 60), 10);
        units = 'minutes';
    }
    // Otherwise, use seconds
    else {
        humanTime = parseInt(time / (1000), 10);
        units = 'seconds';
    }
    // Get the time and units
    var timeUnits = humanTime + ' ' + units;

    // If in the future
    if (timestamp > 0) {
        return timeUnits;
    }
    // If in the past
    return timeUnits + ' ago';

};
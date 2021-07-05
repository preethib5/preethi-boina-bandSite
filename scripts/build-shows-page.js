let shows = [
    { dates: "Mon Sept 06 2021", venu: "Ronald Lane", location: "San Francisco, CA" },
    { dates: "Tue Sept 21 2021", venu: "Pier 3 East", location: "San Francisco, CA" },
    { dates: "Fri Oct 15 2021", venu: "View Lounge", location: "San Francisco, CA" },
    { dates: "Sat Nov 06 2021", venu: "Hyatt Agency", location: "San Francisco, CA" },
    { dates: "Fri Nov 26 2021", venu: "Moscow Center", location: "San Francisco, CA" },
    { dates: "Wed Dec 15 2021", venu: "Moscow Center", location: "San Francisco, CA" }

];

function addShows(object) {
    const showsSection = document.getElementById("shows");

    object.forEach((obj) => {
        let masterDiv1 = document.createElement('div')
        masterDiv1.classList = "shows__containerHeader";

        let dateHeader = document.createElement('h3');
        dateHeader.classList.add("shows__dateHeader");
        dateHeader.innerText = "DATES";
        masterDiv1.appendChild(dateHeader);

        let venuHeader = document.createElement('h3');
        venuHeader.classList.add("shows__venuHeader");
        venuHeader.innerText = "VENU";
        masterDiv1.appendChild(venuHeader);

        let locationHeader = document.createElement('h3');
        locationHeader.classList.add("shows__locationHeader");
        locationHeader.innerText = "LOCATION";
        masterDiv1.appendChild(locationHeader);


        let masterDiv2 = document.createElement('div')
        masterDiv2.classList = "shows__containerBody";

        let dates = document.createElement('div');
        dates.classList.add("shows__date");
        dates.innerText = obj.dates;
        masterDiv2.appendChild(dates);

        let venu = document.createElement('div');
        venu.classList.add("shows__venu");
        venu.innerText = obj.venu;
        masterDiv2.appendChild(venu);


        let location = document.createElement('div');
        location.classList.add("shows__location");
        location.innerText = obj.location;
        masterDiv2.appendChild(location);

        let tickets = document.createElement('button');
        tickets.classList.add("shows__tickets");
        tickets.innerText = "BUT TICKETS";
        masterDiv2.appendChild(tickets);
        tickets.addEventListener("click", () => {
            console.log(`ConfirmationInfo: Date: ${obj.dates}, Venu: ${obj.venu}, Location: ${obj.location}`);
        })

        showsSection.appendChild(masterDiv1);
        showsSection.appendChild(masterDiv2);
        //console.log(masterDiv1)
        //console.log(masterDiv2)
        console.log(showsSection)
    })
}
addShows(shows);
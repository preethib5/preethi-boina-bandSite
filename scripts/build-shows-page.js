let shows = [];

const showsSection = document.getElementById("shows");
const API_KEY = "d6a098da-46ff-4fba-989f-687f81b38ca9";


function addShows(object) {
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
        let ts = Number(obj.date);
        let ts_ms = ts;
        let date_ob = new Date(ts_ms).toDateString();
        dates.innerText = date_ob;
        masterDiv2.appendChild(dates);

        let venu = document.createElement('div');
        venu.classList.add("shows__venu");
        venu.innerText = obj.place;
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
    })
}



axios
    .get(`https://project-1-api.herokuapp.com/showdates?api_key=${API_KEY}`)
    .then((response) => {
        let res = response.data;
        shows = res;
        addShows(shows);
    })
    .catch((error) => {
        console.log(error);
    });
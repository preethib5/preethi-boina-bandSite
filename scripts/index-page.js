let commentKeyValue = [];
const API_KEY = "d6a098da-46ff-4fba-989f-687f81b38ca9";
const form = document.getElementById("commentForm");
const commentSection = document.getElementById("container");
let likeButton = document.createElement("img");

let displayComments = function(object) {
    object.forEach((newCom) => {
        let masterDiv = document.createElement("div");
        masterDiv.id = `${newCom.id}`
        masterDiv.classList.add("container__commentBox");

        let masterDiv1 = document.createElement("div");
        masterDiv1.classList.add("container__leftPanelImg");

        let profileImg = document.createElement("img");
        profileImg.classList.add("container__leftPanelImg--img");
        profileImg.src =
            "https://www.sjra.net/wp-content/uploads/2019/08/light-grey-background-253x450.png";
        profileImg.alt = "grayProfileImage"
        masterDiv1.appendChild(profileImg);

        let masterDiv2 = document.createElement("div");
        masterDiv2.classList.add("container__rightPanel");

        let commentPersonName = document.createElement("span");
        commentPersonName.classList.add("container__rightPanel--name");
        commentPersonName.innerText = newCom.name;
        masterDiv2.appendChild(commentPersonName);

        let masterDiv3 = document.createElement("div");
        masterDiv3.classList.add("container__comment");

        let commentDescription = document.createElement("p");
        commentDescription.classList.add("container__comment--para");
        commentDescription.innerText = newCom.comment;
        masterDiv3.appendChild(commentDescription);

        let commentedDate = document.createElement("div");
        commentedDate.classList.add("container__rightPanel--date");


        let unix_timestamp = newCom.timestamp;
        var now = new Date().getTime();
        var howLongAgo = unix_timestamp - now;

        var getTimeStamp = function(ts) {
            var time = Math.abs(ts);
            var humanTime, units;
            if (time > 1000 * 60 * 60 * 24 * 365) {
                humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 365), 10);
                units = "years";
            } else if (time > 1000 * 60 * 60 * 24 * 30) {
                humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 30), 10);
                units = "months";
            } else if (time > 1000 * 60 * 60 * 24 * 7) {
                humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 7), 10);
                units = "weeks";
            } else if (time > 1000 * 60 * 60 * 24) {
                humanTime = parseInt(time / (1000 * 60 * 60 * 24), 10);
                units = "days";
            } else if (time > 1000 * 60 * 60) {
                humanTime = parseInt(time / (1000 * 60 * 60), 10);
                units = "hours";
            } else if (time > 1000 * 60) {
                humanTime = parseInt(time / (1000 * 60), 10);
                units = "minutes";
            } else {
                humanTime = parseInt(time / 1000, 10);
                units = "seconds";
            }
            var timeUnits = humanTime + " " + units;
            if (ts > 0) {
                return timeUnits;
            }
            return timeUnits + " ago";
        };
        let postdate = getTimeStamp(howLongAgo);
        commentedDate.innerText = postdate;
        masterDiv2.appendChild(commentedDate);


        let buttonSection = document.createElement("div");
        buttonSection.classList.add("container__button");

        let like = document.createElement("div");
        like.classList.add("container__like");
        let likeButton = document.createElement("img");
        likeButton.id = newCom.id;
        likeButton.classList.add("container__button--like");
        likeButton.src = "./assets/icons/icon-like.svg";
        likeButton.alt = "likeImage"
        buttonSection.appendChild(like);
        like.appendChild(likeButton);
        let likeCount = document.createElement("p");
        likeCount.id = `count ${newCom.id}`;
        likeCount.classList.add("container__button--count");
        likeCount.innerText = newCom.likes;
        like.appendChild(likeCount);

        likeButton.addEventListener('click', (e) => {
            e.preventDefault()
            const id = e.srcElement.attributes[0].nodeValue;
            console.log(id)
            console.log(commentKeyValue)
            const updateLike = {
                id: id
            }
            axios.put(`https://project-1-api.herokuapp.com/comments/${updateLike.id}/like?api_key=${API_KEY}`, updateLike)
                .then((response) => {
                    let res = response.data;
                    console.log(res)
                    document.getElementById(`count ${id}`).innerText = res.likes;
                }).catch((error) => {
                    console.log(error);
                })

        })

        let deleteButton = document.createElement("img");
        deleteButton.id = `$delete_${newCom.id}`;
        deleteButton.classList.add("container__button--delete");
        deleteButton.src = "./assets/icons/icon-delete.svg";
        deleteButton.alt = "deleteImage";
        buttonSection.appendChild(deleteButton);

        deleteButton.addEventListener('click', (e) => {
            e.preventDefault()
            console.log(e)
            const id = e.srcElement.attributes[0].nodeValue.split('_')[1];
            console.log(id)
            console.log(commentKeyValue)
            const deleteComment = {
                id: id
            }
            axios.delete(`https://project-1-api.herokuapp.com/comments/${deleteComment.id}?api_key=${API_KEY}`, deleteComment)
                .then((response) => {
                    let res = response.data;
                    commentSection.removeChild(document.getElementById(`${id}`));
                    commentKeyValue = commentKeyValue.filter(x => x.id !== id);
                }).catch((error) => {
                    console.log(error);
                })

        })

        masterDiv.appendChild(masterDiv1);
        masterDiv.appendChild(masterDiv2);
        masterDiv.appendChild(masterDiv3);
        masterDiv.appendChild(buttonSection);
        commentSection.insertBefore(masterDiv, commentSection.firstChild);

    });
};


axios
    .get(`https://project-1-api.herokuapp.com/comments?api_key=${API_KEY}`)
    .then((response) => {
        let res = response.data;
        console.log(res)
        commentKeyValue = res;
        displayComments(commentKeyValue);
    })
    .catch((error) => {
        console.log(error);
    });

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const comment = event.target.comment.value;
    const newComment = {
        name: name,
        comment: comment
    };
    axios
        .post(
            `https://project-1-api.herokuapp.com/comments?api_key=${API_KEY}`,
            newComment
        )
        .then((response) => {
            let res = response.data
            commentKeyValue.push(res);
            commentSection.innerText = "";
            displayComments(commentKeyValue);
        })
        .catch((error) => {
            console.log(error)
        });
    form.reset();
});
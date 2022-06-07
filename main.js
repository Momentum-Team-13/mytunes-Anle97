const searchBox = document.querySelector("#search")
const searchButton = document.querySelector("#searchbutton")
const results = document.querySelector(".container")
const profileElement = document.querySelector(".profile")
const audioBox = document.querySelector(".audio")

searchButton.addEventListener("click", search)

function playSong(url) {
    console.log(url)
}

function search() {
    results.innerHTML = "";
    const searchInput = searchBox.value;

    fetch(`https://itunes.apple.com/search?term='${searchInput}`)
        .then((response) => response.json())
        .then((data) => {
        console.log(data)  

        for (let song of data.results) {
            //profile container and function to grab preview URL
            let profileElement = document.createElement('div')
            profileElement.classList.add("profile")
            profileElement.addEventListener("click", (e) => {
                playSong(song.previewUrl)
                })
            //song name
            let trackNameElement = document.createElement('div')
            trackNameElement.classList.add(".trackname")
            trackNameElement.innerText = song.trackName
            profileElement.appendChild(trackNameElement)

            //artist name
            let artistNameElement = document.createElement('div')
            artistNameElement.classList.add(".artistname")
            artistNameElement.innerText = song.artistName
            profileElement.appendChild(artistNameElement)

            //artwork
            let artworkElement = document.createElement('img')
            artworkElement.src = song.artworkUrl60
            profileElement.appendChild(artworkElement)

            results.appendChild(profileElement)
            }
        })
}




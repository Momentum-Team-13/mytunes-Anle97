const form = document.querySelector("#form")
const searchBox = document.querySelector("#searchbox")
const searchButton = document.querySelector("#searchbutton")
const results = document.querySelector("#results")
const profileElement = document.querySelector(".profile")
const audioBox = document.querySelector(".audio")

// searchButton.addEventListener("click", search)
// searchBox.addEventListener("change", search) 
form.addEventListener("submit", search)

// grabbing song url from fetch request and assigning it to audio source
function playSong(url) {
    audioBox.src = url
    setTimeout(function() {
        audioBox.play()
    }, 1000)
}

function search(e) {
    e.preventDefault()
    results.innerHTML = "";
    const searchInput = searchBox.value;

    fetch(`https://itunes.apple.com/search?term='${searchInput}&entity=song`)
        .then((response) => response.json())
        .then((data) => {
        console.log(data)
        if (data.results.length === 0) {
            let noResultsElement = document.createElement('div')
            noResultsElement.classList.add(".noResults")
            noResultsElement.innerText = "Sorry, no results. Please search again!"
            results.appendChild(noResultsElement)
        }
        for (let song of data.results) {
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

                //album name
                let albumElement = document.createElement('div')
                albumElement.classList.add(".album")
                albumElement.innerText = song.collectionName
                profileElement.appendChild(albumElement)

                results.appendChild(profileElement)                
                }            
            
        })
        .catch(err => {
            console.log(err)
            // alert("Server side error. Please try again!");
        })
}




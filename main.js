const searchBox = document.querySelector("#search")
const searchButton = document.querySelector("#searchbutton")
const results = document.querySelector(".container")

searchButton.addEventListener("click", search)

function search() {
    const searchInput = searchBox.value;

    fetch(`https://itunes.apple.com/search?term='${searchInput}`)
        .then((response) => response.json())
        .then((data) => {
        console.log(data)  
    
        for (let song of data.results) {
            //profile container
            let profileElement = document.createElement('div')
            profileElement.classList.add("profile")

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

            //audio file
            let previewElement = document.createElement('audio')
            previewElement.src = song.previewUrl
            profileElement.appendChild(previewElement) 
            
            results.appendChild(profileElement)
        }
        })
}


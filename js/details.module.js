// section of details

export class Details{
    constructor(id){
        this.getDetails(id)
        this.closeDetails()
    }
    // ===== display Details function =====
    displayDetails(gamesData){
        let detailsBox = 
            `<div class="col-md-4">
                    <img src="${gamesData.thumbnail}" class="w-100">
            </div>
            <div class="col-md-8">
                <h3>Title: ${gamesData.title}</h3>
                <p>Category: <span class="badge text-bg-info">${gamesData.genre}</span></p>
                <p>Platform: <span class="badge text-bg-warning">${gamesData.platform}</span></p>
                <p>Status: <span class="badge text-bg-danger">${gamesData.status}</span></p>
                </div>
                <p>${gamesData.description}</p>
                <a href="${gamesData.game_url}" target="_blank" class="btn btn-outline-warning text-light">Show Game</a>
            `
            document.getElementById('detailsContainer').innerHTML = detailsBox
        }
    // close Details section
    closeDetails(){
            document.querySelector('.btn-close').addEventListener('click', function(){
                document.querySelector('header').classList.remove('d-none')
                document.querySelector('.games').classList.remove('d-none')
                document.querySelector('.details').classList.add('d-none')
            })
    }
    // ===== Get Game Details from API with id number =====
    async getDetails(id = '582'){
        document.querySelector('.loading').classList.remove('d-none')
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'e80d8ac1b8mshd47871d1acca0d0p19e4dfjsn4371c13b6852',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(url, options);
            const gameDetails = await response.json();
            // console.log(gameDetails);
            this.displayDetails(gameDetails)
            document.querySelector('.loading').classList.add('d-none')
        } catch (error) {
            console.error(error);
        }
    }
}
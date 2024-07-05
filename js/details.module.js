// section of details

export class Details{
    constructor(){
        this.getDetails()
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
                    <p>Platform: <span class="badge text-bg-info">${gamesData.platform}</span></p>
                    <p>Status: <span class="badge text-bg-info">${gamesData.status}</span></p>
                    <p>${gamesData.description}</p>
                        <a href="${gamesData.game_url}" target="_blank" class="btn btn-outline-warning text-light">Show Game</a>
                </div>`
                document.getElementById('detailsContainer').innerHTML = detailsBox
            }

    // ===== Get Game Details from API with id number =====
    async getDetails(id){
        id = '582'
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
            console.log(gameDetails);
            this.displayDetails(gameDetails)
        } catch (error) {
            console.error(error);
        }
    }
}
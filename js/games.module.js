// section of home

import { Details } from "./details.module.js"

export class Games{
    constructor(){
        this.changeActive()
        this.getGames("MMORPG")

    }
    
    // ===== change Active link when click =====
    changeActive(){
        let links = document.querySelectorAll('.nav-link')
        for (let i=0; i<links.length; i++){
            links[i].addEventListener('click', (e)=> {
                document.querySelector('nav a.active').classList.remove('active')
                e.target.classList.add('active')
                // ===== get games with category name =====
                let category = e.target.getAttribute('data-category')
                // console.log(category)
                this.getGames(category)
            })
        }
    }
    
    // ===== display Games function =====
    displayGames(gamesData){
        // console.log(gamesData[1].short_description.split(" ", 8).join(' '))
        let gamesBox = ''
        for(let i=0; i<gamesData.length; i++){
            gamesBox += `
                <div class="col">
                    <div data-id="${gamesData[i].id}" class="card h-100 bg-transparent" role="button">
                        <div class="card-body">
                            <figure class="position-relative">
                                <img class="card-img-top object-fit-cover h-100"
                                    src="${gamesData[i].thumbnail}">
                            </figure>
                            <figcaption>
                                <div class="hstack justify-content-between">
                                    <h6 class="text-light small mb-0">${gamesData[i].title}</h6>
                                    <span class="badge text-bg-danger p-2">free</span>
                                </div>
                                <p class="card-text mt-2 text-light small text-center opacity-50">
                                    ${gamesData[i].short_description.split(" ", 8).join(' ')}</p>
                            </figcaption>
                        </div>
                        <div class="card-footer small d-flex justify-content-between">
                            <span class="badge text-bg-info">${gamesData[i].genre}</span>
                            <span class="badge text-bg-warning">${gamesData[i].platform}</span>
                        </div>
                    </div>
                </div>`
        }
        document.getElementById('gamesContainer').innerHTML = gamesBox
    }

    // ===== Get Games from API with Category name =====
    async getGames(category){
        document.querySelector('.loading').classList.remove('d-none')
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?&category=${category}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'e80d8ac1b8mshd47871d1acca0d0p19e4dfjsn4371c13b6852',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(url, options);
            const gamesData = await response.json();
            // console.log(gamesData);
            this.displayGames(gamesData)
            // loading spinner
            document.querySelector('.loading').classList.add('d-none')
            // show details
            let cards = document.querySelectorAll('#gamesContainer .card')
            // console.log(cards)
            for(let card of cards){
                card.addEventListener('click', function(){
                    document.querySelector('header').classList.add('d-none')
                    document.querySelector('.games').classList.add('d-none')
                    document.querySelector('.details').classList.remove('d-none')
                    new Details(card.dataset.id)
                })
            }

        } catch (error) {
            console.error(error);  
            document.getElementById('alert').classList.remove('d-none')
        }
    }
}
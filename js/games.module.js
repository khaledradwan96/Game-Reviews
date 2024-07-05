// section of home

export class Games{
    constructor(){
        // ===== Navbar (add active class when click) =====
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
    // ===== Get Games from API with Category name =====
    async getGames(category){
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=browser&category=${category}&sort-by=release-date`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'e80d8ac1b8mshd47871d1acca0d0p19e4dfjsn4371c13b6852',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
    
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error);   
            Console.log('')
        }
    }
}
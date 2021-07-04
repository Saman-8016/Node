const Film = require("../models/film");
const Comment = require("../models/comment");

const film_seeds = [
    {   
        name: "The Matrix",
        description: "At an abandoned hotel within a major city, a police squad corners Trinity, who overpowers them with her superhuman abilities. She flees, pursued by the police and a group of suited Agents capable of similar superhuman feats. She answers a ringing public telephone and vanishes just before an Agent crashes a truck into the booth",
        casts: "Keeanu Reeves, ...",
        origin: "USA",
        genre: "sci-fi",
        date: "1999-03-31",
        artwork: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/The_Matrix_Poster.jpg/220px-The_Matrix_Poster.jpg"
    },
    {
        name: "Schindler's List",
        description: "The film follows Oskar Schindler, a German industrialist who together with his wife Emilie Schindler saved more than a thousand mostly Polish-Jewish refugees from the Holocaust by employing them in his factories during World War II.",
        casts: "Liam Neeson, ...",
        origin: "USA",
        genre: "history",
        date: "1993-11-30",
        artwork: "https://upload.wikimedia.org/wikipedia/en/3/38/Schindler%27s_List_movie.jpg"
    },
    {
        name: "Titanic",
        description: "Incorporating both historical and fictionalized aspects, it is based on accounts of the sinking of the RMS Titanic, and stars Leonardo DiCaprio and Kate Winslet as members of different social classes who fall in love aboard the ship during its ill-fated maiden voyage.",
        casts: "Leonardo DeCaprio, Kate Winslet, ...",
        origin: "USA",
        genre: "romance",
        date: "1997-11-1",
        artwork: "https://upload.wikimedia.org/wikipedia/en/1/19/Titanic_%28Official_Film_Poster%29.png"
    }
]

// Delete all films and comments
const seed = async () => {
    
    await Film.deleteMany();
    console.log("Deleted all movies");
    
    await Comment.deleteMany();
    console.log("deleted all comments");
    
    // Create three new films
    for(const film_seed of film_seeds) {
        let film = await Film.create(film_seed);
        console.log("created a new movie: ", film.name)
        
        // Create a comment for each film
        await Comment.create({
            user: "Scooby Doo",
            text: "i ruv this movie",
            filmId: film._id
        })
        console.log("created a comment");
    }
        
}


module.exports = seed
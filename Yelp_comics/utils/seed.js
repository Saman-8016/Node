const Comic = require("../models/comic");
const Comment = require("../models/comment");


const comic_seeds = [
    {
        title: "Watchmen",
        description: "Watchmen is american omic book ...",
        author: "Alan Moore",
        publisher: "DC Comics",
        date: "1986-09-01",
        series: "Watchmen",
        issue: 1,
        genre: "superhero",
        color: true,
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Watchmen%2C_issue_1.jpg/220px-Watchmen%2C_issue_1.jpg"
    },
    {
        title: "Batman",
        description: "Batman is american omic book ...",
        author: "Frank MIller",
        publisher: "DC Comics",
        date: "1986-02-01",
        series: "The Dark Knight",
        issue: 2,
        genre: "superhero",
        color: true,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Batman_Comic_Book_-_NARA_-_595420.gif/250px-Batman_Comic_Book_-_NARA_-_595420.gif" 
    },
    {
        title: "Y: the Last Man",
        description: "Y: The Last Man is the post-apocolyptic science fiction comic book...",
        author: "Brian K. Vaughn",
        publisher: "Vertigo",
        date: "2002-09-01",
        series: "Y: the Last Man",
        issue: 1,
        genre: "sci-fi",
        color: true,
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Y_-_The_Last_Man_23_-_Widow%27s_Pass_03_-_00_-_FC.jpg/250px-Y_-_The_Last_Man_23_-_Widow%27s_Pass_03_-_00_-_FC.jpg" 
    }
]

const seed = async () => {
    // Delete all the current comics and comments
    await Comic.deleteMany();
    console.log("Deleted All the Comics!")

    await Comment.deleteMany();
    console.log("Deleted All teh Comments!")
    // create three new comics
    // for(const comic_seed of comic_seeds) {
    //     let comic = await Comic.create(comic_seed)
    //     console.log("Created a new comic", comic.title)
    //     // create a new comment for each comic
    //     await Comment.create({
    //         text: "I ruved this romic rook",
    //         user: "scooby_doo",
    //         comicId: comic._id
    //     })
    //     console.log("created a new comment!")
    // }
}

module.exports = seed;
const Product = require("../models/productModel");
const User = require("../models/userModel");

const recommendation = async (req, res) => {
  try {
    // All Songs
    const items = await Product.find({});

    // Liked Songs:
    const user = await User.findById(req.verifyUserId);
    const genreArr = user.review.map((value) => {
      return value.genres;
    });
    const artistArr = user.review.map((value) => {
      return value.artist;
    });
    const title = user.review.map((value) => {
      return value.title;
    });

    const genres = genreArr.filter(
      (item, index) => genreArr.indexOf(item) === index
    );
    const artist = artistArr.filter(
      (item, index) => artistArr.indexOf(item) === index
    );

    const likedItems = {
      title: title,
      genres: genres,
      artist: artist,
      country: user.country,
      year: new Date().getFullYear(),
    };

    // Algorithm
    function getRecommendations(likedItems) {
      const scoredItems = [];

      // Compute scores for each item based on its similarity to liked items
      items.forEach((item) => {
        const score = computeScore(likedItems, item);
        if (score > 0) {
          scoredItems.push({ item, score });
        }
      });

      // Sort scored items by score in descending order
      scoredItems.sort((a, b) => b.score - a.score);

      // Return the top 5 scored items
      return scoredItems.slice(0, 5);
    }

    function computeScore(likedItems, item) {
      let score = 0;

      // 1) Compute score based on genres
      //   const sharedGenres = item.genres.filter((genre) =>
      //     likedItems.genres.includes(genre)
      //   );
      const sharedGenres = likedItems.genres.includes(item.genres);
      if (sharedGenres) {
        //   score += sharedGenres.length;
        score += 1;
      }

      // 2) Compute score based on artists
      //   const sharedArtists = item.artists.filter((artist) =>
      //     likedItems.artists.includes(artist)
      //   );
      const sharedArtists = likedItems.artist.includes(item.artist);
      if (sharedArtists) {
        //   score += sharedArtists.length;
        score += 1;
      }

      // 3) Compute score based on year
      const yearDiff = Math.abs(item.year - likedItems.year);
      if (yearDiff < 5) {
        score += 1;
      }

      // 4) Check if user love songs then score will be 1
      if (likedItems.title.includes(item.title) && sharedArtists) {
        score = 1;
      }

      // 5) Compute score based on country
      if (item.country == likedItems.country) {
        score += 1;
      }

      return score;
    }

    res.send(getRecommendations(likedItems));
    // console.log(likedItems);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { recommendation };

const Song = require("../models/songModel");
// const dataset = require("./songs");
const datasetApi = require("./utils/songapi.json");
const axios = require("axios");

// KNN Algorithm
const explore = async (req, res) => {
  try {
    // Load the dataset
    const dataset = await Song.find({});
    const id = req.body.id;
    const result = await Song.findById(id);
    const { genre, artist, duration, popularity } = result;

    // Select relevant features for recommendations
    const features = ["genre", "artist", "duration", "popularity"];

    // Calculate Euclidean distance between two data points
    function euclideanDistance(pointA, pointB) {
      let sum = 0;
      for (let i = 0; i < pointA.length; i++) {
        sum += Math.pow(pointA[i] - pointB[i], 2);
      }
      return Math.sqrt(sum);
    }

    // Find k nearest neighbors for a given data point
    function findNeighbors(XTrain, yTrain, point, k) {
      const distances = [];
      for (let i = 0; i < XTrain.length; i++) {
        const distance = euclideanDistance(XTrain[i], point);
        distances.push({ index: i, distance });
      }
      distances.sort((a, b) => a.distance - b.distance);

      const neighbors = [];
      for (let i = 0; i < k; i++) {
        neighbors.push(yTrain[distances[i].index]);
      }
      return { neighbors, distances };
    }

    // Make recommendations for a new song
    const newSong = [genre, artist, duration, popularity];
    // console.log(newSong);
    // const newSong = ["Pop", "Narayan Gopal", 230, 7085];
    const k = 5; // Number of neighbors to consider

    // Split the dataset into features and target variable
    const XTrain = dataset.map((song) =>
      features.map((feature) => song[feature])
    );
    const yTrain = dataset.map((song) => song._id.toString());

    // Encode categorical variables
    function encodeCategoricalData(data, categories) {
      const encodedData = [];
      for (let i = 0; i < data.length; i++) {
        const encodedInstance = [];
        for (let j = 0; j < data[i].length; j++) {
          if (typeof data[i][j] === "string") {
            encodedInstance.push(categories[j].indexOf(data[i][j]));
          } else {
            encodedInstance.push(data[i][j]);
          }
        }
        encodedData.push(encodedInstance);
      }
      return encodedData;
    }

    // Convert new song data(genre and artist) to encoded format
    const encodedXTrain = encodeCategoricalData(XTrain, [
      dataset.map((song) => song.genre),
      dataset.map((song) => song.artist),
    ]);
    console.log(encodedXTrain);

    const encodedNewSong = [];
    for (let i = 0; i < newSong.length; i++) {
      if (typeof newSong[i] === "string") {
        encodedNewSong.push(
          dataset.map((song) => song[features[i]]).indexOf(newSong[i])
        );
      } else {
        encodedNewSong.push(newSong[i]);
      }
    }

    // const neighbors = findNeighbors(encodedXTrain, yTrain, encodedNewSong, k);
    const { neighbors, distances } = findNeighbors(
      XTrain,
      yTrain,
      encodedNewSong,
      k
    );

    console.log("Recommended Songs:", neighbors);
    // console.log("Distances:", distances);

    // Use $in operator to match multiple IDs and not equal to same id
    const songs = await Song.find({
      $and: [{ _id: { $in: neighbors } }, { _id: { $ne: { _id: id } } }],
    });

    // console.log("Recommended Songs:", songs);

    res.status(200).json(songs);
  } catch (err) {
    console.log(err);
  }
};

//
//
//
//
//
//
//
//
//
//

// Songs
const uploadSong = async (req, res) => {
  try {
    datasetApi.map(async (value) => {
      const { title, genre, artist, duration, release_year } = value;
      const song = await Song.find({});
      if (title != song.title) {
        const popularity = Math.floor(Math.random() * 80 + 20);
        const result = await Song.create({
          title,
          genre,
          artist,
          duration,
          popularity,
          release_year,
        });
        if (result) {
          console.log("Uploaded Successfully");
        }
      } else {
        console.log("Song already uploaded!");
      }
    });
    res.send("Successful");
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Fail to create" });
  }
};

const fetchSong = async (req, res) => {
  try {
    const result = await Song.find({});
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

const fetchSongById = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await Song.findById({ _id });
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(400).send({ msg: "Song not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

const fetchApi = async (req, res) => {
  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/recommendations/",
    params: {
      limit: "20",
      seed_tracks: "0c6xIDDpzE81m2q797ordA",
      seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
      seed_genres: "classical,country",
    },
    headers: {
      "X-RapidAPI-Key": "20b58c18acmsh4824409fc27eb63p14e77bjsn53c202ddc328",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { explore, uploadSong, fetchSong, fetchSongById, fetchApi };

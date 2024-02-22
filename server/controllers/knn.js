const Song = require("../models/songModel");
// const dataset = require("./utils/songs");

// KNN Algorithm
const explore = async (req, res) => {
  try {
    // Load the dataset
    const dataset = await Song.find({});
    const id = req.body.id;
    const result = await Song.findById(id);
    const { genre, artist, duration, popularity, title } = result;

    // Define the features to be considered
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
      const distancesToNeighbors = [];

      for (let i = 0; i < k; i++) {
        neighbors.push(yTrain[distances[i].index]);
        distancesToNeighbors.push(distances[i].distance);
      }

      return { neighbors, distances: distancesToNeighbors };
    }

    // Encode categorical variables (genre and artist)
    function encodeCategoricalData(data, categories) {
      const encodedData = [];
      for (let i = 0; i < data.length; i++) {
        const encodedInstance = [];
        for (let j = 0; j < data[i].length; j++) {
          if (typeof data[i][j] === "string") {
            encodedInstance.push(categories[j].indexOf(data[i][j]));
            // console.log("True:", categories[j].indexOf(data[i][j]));
          } else {
            encodedInstance.push(data[i][j]);
            // console.log("False:", data[i][j]);
          }
        }
        encodedData.push(encodedInstance);
      }
      // console.log(encodedData);
      return encodedData;
    }

    // Example new song data (replace with actual values)
    // const newSong = ["Pop", "Narayan Gopal", 230, 7085];
    const newSong = [genre, artist, duration, popularity];
    const k = 5; // Number of neighbors to consider

    // Split the dataset into features and target variable
    const XTrain = dataset.map((song) =>
      features.map((feature) => song[feature])
    );
    const yTrain = dataset.map((song) => song._id.toString());

    // Encode categorical variables (genre and artist)
    const encodedXTrain = encodeCategoricalData(XTrain, [
      dataset.map((song) => song.genre),
      dataset.map((song) => song.artist),
    ]);

    // Convert new song data to encoded format
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

    const { neighbors, distances } = findNeighbors(
      encodedXTrain,
      yTrain,
      encodedNewSong,
      k
    );

    // console.log("Recommended Song IDs:", neighbors);
    const dis = distances.splice(1, 5);
    // console.log("Distances to Neighbors:", dis);

    // Use $in operator to match multiple IDs
    const song = await Song.find(
      // { _id: { $in: neighbors } }
      {
        $and: [{ _id: { $in: neighbors } }, { _id: { $ne: { _id: id } } }],
      }
    );

    // console.log("Recommended Songs:", songs);

    res.status(200).json({ song, distances: dis });

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
    //
    // ACCURACY

    // Example dataset of songs with labels (ground truth)

    const modalset = { title, genre, artist };

    // Simulated sorted result from your algorithm
    const predictedResult = song.map((value) => {
      return {
        title: value.title,
        genre: value.genre,
        artist: value.artist,
      };
    });
    // console.log("predictedResult:", predictedResult);
    // console.log("Modalset:", modalset);

    // Function to calculate accuracy based on how many genres were correctly predicted
    function calculateAccuracy(groundTruth, predictedResult) {
      let correctGenresCount = 0;
      // console.log(groundTruth.genre);

      // Check if each song in predictedResult has a valid genre and if it matches the ground truth
      for (let i = 0; i < predictedResult.length; i++) {
        // Check if the predictedResult and groundTruth have valid genres
        // console.log(predictedResult[i].title, ":", predictedResult[i].genre);
        if (groundTruth.genre === predictedResult[i].genre) {
          correctGenresCount++;
        }
      }

      // Calculate accuracy as a percentage of correct genre predictions
      const accuracy = (correctGenresCount / predictedResult.length) * 100;
      return accuracy;
    }

    const accuracy = calculateAccuracy(modalset, predictedResult);
    // console.log(`Accuracy: ${accuracy.toFixed(2)}%`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { explore };

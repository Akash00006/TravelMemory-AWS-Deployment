const tripModel = require('../models/trip.model');

async function tripAdditionController(req, res) {
    console.log(req.body);

    try {
        const tripDetail = tripModel.Trip({
            tripName: req.body.tripName,
            startDateOfJourney: req.body.startDateOfJourney,
            endDateOfJourney: req.body.endDateOfJourney,
            nameOfHotels: req.body.nameOfHotels,
            placesVisited: req.body.placesVisited,
            totalCost: req.body.totalCost,
            tripType: req.body.tripType,
            experience: req.body.experience,
            image: req.body.image,
            shortDescription: req.body.shortDescription,
            featured: req.body.featured
        });

        await tripDetail.save();

        res.status(201).send('Trip added Successfully');

    } catch (error) {
        console.error('Trip addition error:', error);
        res.status(500).send('Something went wrong while adding the trip');
    }
}


async function getTripDetailsController(req, res) {
    try {
        const trips = await tripModel.Trip.find({});

        res.status(200).send(trips);

    } catch (error) {
        console.error('Get trips error:', error);
        res.status(500).send('Something went wrong while fetching trips');
    }
}


async function getTripDetailsByIdController(req, res) {
    try {
        const trip = await tripModel.Trip.findById(req.params.id);

        if (!trip) {
            return res.status(404).send('Trip not found');
        }

        res.status(200).send(trip);

    } catch (error) {
        console.error('Get trip by ID error:', error);
        res.status(500).send('Something went wrong while fetching the trip');
    }
}


module.exports = {
    tripAdditionController,
    getTripDetailsController,
    getTripDetailsByIdController
};

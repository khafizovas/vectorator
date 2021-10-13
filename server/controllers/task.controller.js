const ratioPointCoordinates = require('../services/ratio_point_coordinates');

const ratioPointCoordinates = (req, res) => {
	res.json({
		result: ratioPointCoordinates(req.body.pointsPair, req.body.ratioParts),
	});
};

module.exports = { ratioPointCoordinates };

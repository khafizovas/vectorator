const findRatioPoint3D = require('../services/ratio_point_coordinates');

const ratioPointCoordinates = (req, res) => {
	res.json({
		result: findRatioPoint3D(req.body.pointsPair, req.body.ratioParts),
	});
};

module.exports = { ratioPointCoordinates };

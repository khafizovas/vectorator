const mongoose = require('mongoose');

const solutionSchema = require('../schemas/solution.schema');

const Solution = mongoose.model('Solution', solutionSchema);

module.exports = Solution;

//calcola percentuale di tweet per ogni giorno

exports.dateStats = (req, res, next) => {
	if (req.data.statuses.length > 0) {

		let dateStats = {};

		for (let i = 0; i < req.data.statuses.length; i++) {

			key = req.data.statuses[i].created_at.split(' ');

			key = key.split(' ');

			key = [key[1], key[2], key[key.length-1]].join(' ');

			if (!dateStats[key]) dateStats[key] = 1;
			else dateStats[key] += 1;
		}

		for (let key in dateStats) {
			dateStats[key] /= req.data.statuses.length;
			dateStats[key] *= 100;
			dateStats[key] = Math.round(dateStats[key] * 100)/100;
		}

		console.log(dateStats);

		req.data.dateStats = dateStats;
	}

	next();
};

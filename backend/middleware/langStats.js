//calcola percentuale di tweet per ogni lingua presente

exports.langStats = (req, res, next) => {
	if (req.data.statuses.length > 0) {

		let langStats = {}

		for (let i = 0; i < req.data.statuses.length; i++) {

			key = req.data.statuses[i].lang

			if (!langStats[key]) langStats[key] = 1;
			else langStats[key] += 1
		}

		for (let key in langStats) {
			langStats[key] /= req.data.statuses.length;
			langStats[key] *= 100;
			langStats[key] = Math.round(langStats[key] * 100)/100;
		}

		console.log(langStats);

		res.status(200).json({
			...req.data,
			wordCloud: Object.fromEntries(wordCloud),
		});
	} else {
		res.status(200).json({ ...req.data });
	}


	next();
};

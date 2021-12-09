//calcola quanti post hanno likes < 10, < 100, < 1000 etc in percentuale

exports.likesStats = (req, res, next) => {
    if (req.data.statuses.length > 0) {

		let likesStats = {};

	  	for (let i = 0; i < nums.length; i++) {
			let likeLog = Math.floor(Math.log10(req.data.statuses[i].favourite_count))
			let key = `${Math.pow(10, likeLog+1)}`;

			if (!likesStats[key]) likesStats[key] = 1;
			else likesStats[key] += 1
		}

		for (let key in likesStats) {
			likesStats[key] /= req.data.statuses.length;
			likesStats[key] *= 100;
			likesStats[key] = Math.round(likesStats[key] * 100)/100;
		}

		console.log(likesStats);

		req.data.likesStats = likesStats

	}

    next();
};

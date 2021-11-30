sw = require('stopword')


const urlRegex =
        /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;

const punctuationRegex = /[.,\/#!$%\^&\*;:{}="'\-_`~()]/g

const newLineRegex = /\n/g

exports.createWordCloud = (req, res, next) => {

   
    if (req.data.statuses.length > 0) {

        const wordCloud = new Map();
        
        for (let i = 0; i < req.data.statuses.length; i++) {

            //rimozione link
            let textNoUrl = req.data.statuses[i].full_text.replace(urlRegex, '')
            
            //rimozione punteggiatura
            let textNoPunctuation = textNoUrl.replace(punctuationRegex, '')

            //rimozione gli a capo
            let textNoNewLine = textNoPunctuation.replace(newLineRegex, ' ')
            
            //rimozione stopword
            let words = sw.removeStopwords(textNoNewLine.toLowerCase().split(' '), sw[`${ req.data.statuses[i].lang}`] || sw.en );
            
            if (words.length > 0) {
                
                for (let j = 0; j < words.length; j++) {
                    
                    if (words[j] !== '' && words[j] != "rt") {
                        if (!wordCloud.has(words[j])) {
                            wordCloud.set(words[j], 1)
                        } else {
                            wordCloud.set(words[j], wordCloud.get(words[j]) + 1)
                        } 
                    }
                    
                    
                }
            }
        }

        res.status(200).json({ ...req.data, wordCloud: Object.fromEntries(wordCloud)});

    } else {
        res.status(200).json({ ...req.data });
    }
}
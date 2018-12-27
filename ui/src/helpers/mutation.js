function isVowelInitial(noun) {
	if(noun === null || noun.length === 0) return false;
	const vowels = ["a", "á", "e", "é", "i", "í", "o", "ó", "u", "ú"];
	return vowels.includes(noun.charAt(0).toLowerCase());
}

module.exports.isVowelInitial = isVowelInitial;

module.exports.classifyArticle = (noun, gender, func, count) => {
	if(noun === null || noun.split(" ").length > 1) 
		return "";
	if(count === "plural") 
		return func === "nominative" && isVowelInitial(noun) ? "na h-" : "na ";
	if(func === "genitive" && gender === "feminine" && count === "singular") 
		return isVowelInitial(noun) ? "na h-" : "na ";
	if(func === "nominative" && gender === "masculine" && count === "singular")
		return isVowelInitial(noun) ? "an t-" : "an ";
		
	return "an ";
};

module.exports.lenite = (noun) => {
	const lenitableInitials = {
		"b": "bh", 
		"c": "ch", 
		"d": "dh", 
		"f": "fh", 
		"g": "gh", 
		"m": "mh", 
		"p": "ph", 
		"s": "ts", 
		"t": "th"
	};

	if(noun === null) return noun;
	let initial = noun.charAt(0).toLowerCase();
	return Object.keys(lenitableInitials).includes(initial) ? lenitableInitials[initial] + noun.slice(1) : noun;
};

module.exports.eclipse = (noun) => {
	const eclipsableInitials = {
		"a": "n-a",
		"á": "n-á",
		"b": "mb",
		"c": "gc",
		"d": "nd",
		"e": "n-e",
		"é": "n-é",
		"f": "bhf",
		"g": "ng",
		"i": "n-i",
		"í": "n-í",
		"o": "n-ó",
		"ó": "n-ó",
		"p": "bp",
		"t": "dt",
		"u": "n-u",
		"ú": "n-ú"
	};

	if(noun === null) return noun;
	let initial = noun.charAt(0).toLowerCase();
	return Object.keys(eclipsableInitials).includes(initial) ? eclipsableInitials[initial] + noun.slice(1) : noun;
};

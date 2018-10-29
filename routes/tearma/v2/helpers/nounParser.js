const fs = require('fs');
const xmldom = require('xmldom');
const xpath = require('xpath');
const parser = new xmldom.DOMParser();
const serializer = new xmldom.XMLSerializer();
const filterXml = require('filterxml');

const xml = `
<martif type="TBX" xml:lang="ga">
	<martifHeader>
		<fileDesc>
			<sourceDesc>
				<p>Arna easpórtáil ó bhunachar téarmaíochta téarma.ie</p>
			</sourceDesc>
		</fileDesc>
	</martifHeader>
	<text>
		<body>
            <termEntry id="concept-948975">
				<descrip type="domain" xml:lang="ga">Dlí › Dlí Réadmhaoine</descrip>
				<descrip type="domain" xml:lang="en">Law › Property Law</descrip>
				<langSet xml:lang="en">
					<tig>
						<term>occupier</term>
						<termNote type="partOfSpeech">s</termNote>
					</tig>
				</langSet>
				<langSet xml:lang="ga">
					<tig>
						<term>áititheoir</term>
						<termNote type="partOfSpeech">fir3</termNote>
						<termNote type="gu">áititheora</termNote>
						<termNote type="iol">áititheoirí</termNote>
					</tig>
				</langSet>
				<descrip type="definition" xml:lang="ga">Duine i seilbh iarbhír maoine.</descrip>
				<descrip type="definition" xml:lang="en">A person in actual possession of property.</descrip>
				<descrip type="example" xml:lang="en">— that the respondent is the occupier of the said premises,</descrip>
				<descrip type="example" xml:lang="ga">— gurb é/í an freagróir áititheoir an áitribh sin, FOINSE: I.R. Uimh. 93 de 1997_leath 2</descrip>
				<descrip type="example" xml:lang="en">( b ) in other cases, to the occupier of the premises at or on which the machine stands or to which it is affixed.</descrip>
				<descrip type="example" xml:lang="ga">(b) i gcásanna eile, do shealbhóir an áitribh ina bhfuil nó ar a bhfuil an t-inneall ina sheasamh nó dá bhfuil sé daingnithe. FOINSE: I.R. 1980</descrip>
				<descrip type="example" xml:lang="en">(1) The owner, occupier or person in charge of any holding or other land shall, if there are any animals thereon, keep such records as the Minister may require of—</descrip>
				<descrip type="example" xml:lang="ga">(1) Déanfaidh úinéir, áititheoir nó an duine i bhfeighil aon ghabháltais nó talaimh eile, má bhíonn aon ainmhithe air, cibé taifid a choimeád a theastóidh ón Aire- [foinse: TSL]</descrip>
				<descrip type="collection">Téarmaí Faofa as Ionstraimí Reachtúla (2013)/Approved Terms from Statutory Instruments (2013)</descrip>
			</termEntry>
		</body>
	</text>
</martif>
`;

const nounsQuery = '//termEntry[./langSet/tig/termNote[@type="partOfSpeech" and text()="s"]]';

function classifyGender(gender) {
    switch (gender.toString().toLowerCase()) {
        case "fir":
            return "masculine";
        case "bain":
            return "feminine";
        default:
            return "verbal noun";
    }
}

function classifyDeclension(declension) {
    return declension ? parseInt(declension) : -1;
}

module.exports.parseNouns = (path) => {
    let nouns = [];

    return new Promise((res) => {
        fs.readFile(path, "utf8", (err, xml) => {
            console.log("read xml file");
            let root = parser.parseFromString(xml, 'text/xml');
            console.log("parsed xml to root");
            root = xpath.select(nounsQuery, root);
            console.log("parsed nouns via nounsQuery");



            root.forEach((noun) => {
                let rawGenderDeclension = xpath.select('./langSet[2]/tig/termNote[@type="partOfSpeech"]/text()', noun).toString();
                let declension = rawGenderDeclension.replace(/\D/g, '');
                let gender = rawGenderDeclension.replace(/[0-9]/g, '');

                let enNominativeSingular = xpath.select('./langSet[1]/tig/term/text()', noun).toString();

                let gaNominativeSingular = xpath.select('./langSet[2]/tig/term/text()', noun).toString();
                let gaGenitiveSingular = xpath.select('./langSet[2]/tig/termNote[@type="gu"]/text()', noun).toString();
                let gaNominativePlural = xpath.select('./langSet[2]/tig/termNote[@type="gi" or @type="iol"]/text()', noun).toString();
                let gaGenitivePlural = xpath.select('./langSet[2]/tig/termNote[@type="ni" or @type="iol"]/text()', noun).toString();

                nouns.push({
                    ga: {
                        term: gaNominativeSingular,
                        mutations: {
                            nominativeSingular: gaNominativeSingular,
                            genitiveSingular: gaGenitiveSingular,
                            nominativePlural: gaNominativePlural,
                            genitivePlural: gaGenitivePlural
                        },
                        gender: classifyGender(gender),
                        declension: classifyDeclension(declension)
                    },
                    en: {
                        term: enNominativeSingular
                    },
                    domains: [],
                    examples: []
                });
            });

            res(nouns);
        });
    });
};

import { isVowelInitial, classifyArticle, lenite, eclipse } from "../../helpers/mutation";

describe("mutation", () => {
	describe("#isVowelInitial", () => {
		test("vowel initial returns true", () => {
			let result = isVowelInitial("ualach");
			expect(result).toEqual(true); 
		});

		test("vowel with fada initial returns true", () => {
			let result = isVowelInitial("úalach");
			expect(result).toEqual(true); 
		});

		test("consonant initial returns false", () => {
			let result = isVowelInitial("vowel");
			expect(result).toEqual(false); 
		});

		test("null noun return false", () => {
			let result = isVowelInitial(null);
			expect(result).toEqual(false); 
		});

		test("noun with length 0 return false", () => {
			let result = isVowelInitial("");
			expect(result).toEqual(false); 
		});
	});

	describe("#classifyArticle", () => {
		test("should return na for singular feminine noun in the genitive case", () => {
			let result = classifyArticle("noun", "feminine", "genitive", "singular");
			expect(result).toEqual("na ");
		});

		test("should return na h- for singular feminine noun with vowel initial in the genitive case", () => {
			let result = classifyArticle("ualach", "feminine", "genitive", "singular");
			expect(result).toEqual("na h-");
		});

		test("should return an for singular masculine noun in the genitive case", () => {
			let result = classifyArticle("noun", "masculine", "genitive", "singular");
			expect(result).toEqual("an ");
		});

		test("should return an for singular noun in the nominative case", () => {
			let result = classifyArticle("noun", "masculine", "nominative", "singular");
			expect(result).toEqual("an ");
		});

		test("should return an for singular noun with vowel initial in the nominative case", () => {
			let result = classifyArticle("ualach", "masculine", "nominative", "singular");
			expect(result).toEqual("an t-");
		});

		test("should return na for plural noun in the nominative case", () => {
			let result = classifyArticle("noun", "masculine", "nominative", "plural");
			expect(result).toEqual("na ");
		});
		
		test("should return na for plural noun in the genitive case", () => {
			let result = classifyArticle("noun", "masculine", "genitive", "plural");
			expect(result).toEqual("na ");
		});

		test("should return na for plural noun with vowel initial in the genitive case", () => {
			let result = classifyArticle("ualach", "masculine", "genitive", "plural");
			expect(result).toEqual("na ");
		});

		test("should not return article for multiple words", () => {
			let result = classifyArticle("two words", "masculine", "genitive", "plural");
			expect(result).toEqual("");
		});
	});

	describe("#eclipse", () => {
		test("should eclipse consonant", () => {
			let result = eclipse("bean");
			expect(result).toEqual("mbean");
		});

		test("should not eclipse uneclipsable consonant", () => {
			let result = eclipse("lúnasa");
			expect(result).toEqual("lúnasa");
		});

		test("should eclipse vowel", () => {
			let result = eclipse("úll");
			expect(result).toEqual("n-úll");
		});

		test("should eclipse single letter", () => {
			let result = eclipse("b");
			expect(result).toEqual("mb");
		});

		test("should return null for null noun", () => {
			let result = eclipse(null);
			expect(result).toEqual(null);
		});
	});
    
	describe("#lenite", () => {
		test("should lenite consonant", () => {
			let result = lenite("bean");
			expect(result).toEqual("bhean");
		});

		test("should not lenite unlenitable consonant", () => {
			let result = lenite("lúnasa");
			expect(result).toEqual("lúnasa");
		});

		test("should not lenite vowel", () => {
			let result = lenite("úll");
			expect(result).toEqual("úll");
		});

		test("should lenite single letter", () => {
			let result = lenite("b");
			expect(result).toEqual("bh");
		});

		test("should return null for null noun", () => {
			let result = lenite(null);
			expect(result).toEqual(null);
		});
	});
});

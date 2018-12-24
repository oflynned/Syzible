import { lenite, eclipse } from "../../helpers/mutation";

describe("mutation", () => {
	describe("eclipse", () => {
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
    
	describe("lenite", () => {
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

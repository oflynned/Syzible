# Syzible
Some APIs made as a collection to host on an instance and generally either provide a web interface for some service and/or provide services for apps.

## Loinnir
https://loinnir.syzible.com

This is a non-functional, historic backup of the social network. There is no persistence layer hooked up to the service application.

## Wedder
https://wedder.syzible.com

This is a colloquial weather web app to show current weather data for the corresponding user location.

## Tearma
- Currently available on https://syzible.com/tearma, soon to be moved to https://tearma.syzible.com.
- V1 is set to be completely removed
- V2 is set to become the defacto standard for use with the React web-app
- The Android app will also need to get updated to V2 at some point as it will become defunct. An update should be put out to put it in maintenance mode for the foreseeable future until V2 is releasable.

### v1
#### :boom: deprecated as it does not work anymore since Tearma.ie redesigned their website
This service is a man-in-the-middle parser for tearma.ie. Requests are relayed to Tearma, and the resulting HTML is parsed into a more usable JSON structure.

The API is exposed by querying with parameters:

* GET `/tearma/v1?term=[term]&limit=[limit]&lang=[lang]`

There are 3 parameters, 2 of them are always required:
* *term - this is the search term being provided, results will pertain to this word provided
* *lang - this is the search language, is can either be en or ga
* limit - this limits the returned JSON to the given limit. Note that the first result is always the searched language and is used in the web interface.

The first element of the JSON array response contains meta data about the search.

### v2
#### :wrench: in progress
This is a micro-service based approach to polling the latest tbx repository of data from tearma for parsing. The data is run through a parser to generate well formed and logical JSON, divided by linguistic function into collections.

* GET `/tearma/api/v2/find?query=[term]&queryLanguage=[language]&limit=[limit]&offset=[offset]`

A full redesign and migration of the website is being done to React.js.

Some APIs made as a collection to host on an instance and generally either provide a web interface for some service and/or provide services for apps.

## Irish Rail
Currently sitting on https://syzible.com/irish-rail as a half-baked web app. Soon to be moved to https://irish-rail.syzible.com.

This is a service to subscribe to updates by push-notifications and see real-time information for train departures/arrivals.

## Loinnir
https://loinnir.syzible.com

This is a non-functional, historic backup of the social network. There is no persistence layer hooked up to the service application or keys for interacting with the Facebook app.

## Syzible
https://syzible.com

Originally a base for some projects but is unfinished. Soon to be converted to a proper portfolio site for software engineering projects.

## Tearma
- Currently available on https://syzible.com/tearma, soon to be moved to https://tearma.syzible.com.
- V1 is set to be completely removed
- V2 is set to become the defacto standard for use with the React web-app
- The Android app will also need to get updated to V2 at some point as it will become defunct. An update should be put out to put it in maintenance mode for the foreseeable future until V2 is releasable.

### :boom: v1
Deprecated as it does not work anymore since Tearma.ie redesigned their website

### :wrench: v2 in progress
This is a micro-service based approach to polling the latest tbx repository of data from tearma for parsing. The data is run through a parser to generate well formed and logical JSON, divided by linguistic function into collections.

* GET `/tearma/api/v2/find?query=[term]&queryLanguage=[language]&limit=[limit]&offset=[offset]`

A full redesign and migration of the website is being done to React.js.

## Wedder
https://wedder.syzible.com

This is a colloquial weather web app to show current weather data for the corresponding user location.

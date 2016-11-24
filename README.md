# Web-Backend-APIs
Some APIs I made as a collection to host on an instance and generally either provide a web interface for some service and/or provide services for apps.

## Tearma API
The backend is exposed by querying with parameters:

* http://localhost:3000/tearma/backend?term="test"&limit=4&lang="en"

There are 3 parameters, 2 of them are always required:
* *term - this is the search term being provided, results will pertain to this word provided
* *lang - this is the search language, is can either be en or ga
* limit - this limits the returned JSON to the given limit. Note that the first result is always the searched language and is used in the web interface.

#Simple HTTP Server with Persistence

This HTTP server receives GET and POST requests to '/json'.

If a POST request is sent carrying a JSON string the JSON string is saved into a JSON file in a 'data' folder.  Each time a POST request is sent the name of the saved file is incremented by one.  For example, if one POST request carrying a JSON string is sent and no GET requests have been sent the first file will be named '0.json'.  If another POST request carrying a JSON string is then sent the new file saved will be named '1.json'.

If a GET request is sent the content of the most recently saved JSON file in the 'data' folder will be sent to the client.  If there are no saved JSON files a default JSON file is created and it's content is then returned.

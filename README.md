# portfolio-be
The backend of the portFolio or :Folio project.

This is an Express/NodeJS app that communicates over a REST API and stores data in a MongoDB database.

It is hosted at https://portfolio.tincaniam.com/projects.

It communicates with the following HTTP methods: GET, POST, PUT, DELETE

# GET
Get all projects
GET https://portfolio.tincaniam.com/projects
Will return all projects currently stored in the database.
Responds with all projects and the status code 200 if successful, or 400 if the request is invalid.

Get a specific project
GET https://portfolio.tincaniam.com/projects/'project_id'
Responds with the requested project and the status code 200 if successful. Or status code 404 if the project is not found, or 400 if the request is invalid.

Filter projects
You can filer your GET results by passing query params searching for any of the objects key values.
ie.
GET https://portfolio.tincaniam.com/projects?status=Completed
or
GET https://portfolio.tincaniam.com/projects?name=Hash Map
Responds the same as the general GET request, but with only the filtered values.
# POST
Create a project
POST https://portfolio.tincaniam.com/projects
JSON data will need to be send in the body of the request with the following key/value criteria:
{
    "name": "Test Project", # type: string. Required.
    "status": "In Progress", # type: string. Required. Must either be "In Progress" or "Completed"
    "description": "Test description.", # type: string. Required.
    "link": "www.link.com", # type: url. Not required.
    "date": "10-11-17" # type: string. Must be in the form "MM-DD-YY".
}
Responds with status code 201 if successful, or 400 if the request is invalid.
# PUT
Edit a project
PUT https://portfolio.tincaniam.com/projects/'project_id'
Must contain the JSON data you wish to use to update the project. This requries the same form as the POST request.
Responds with status code 200 if succesful, 404 if the requested project is not found, or 400 if the request is invalid.
# DELETE
Delete a project
DELETE https://portfolio.tincaniam.com/projects/'project_id'
Responds with 204 if the project is deleted, or 404 if it is not found.

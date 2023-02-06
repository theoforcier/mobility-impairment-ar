  

## Getting Started

  

1. (Assuming Docker Desktop is installed) From the server folder in the command-line, run:\

`docker-compose up -d`\

This may take a few minutes the first time it runs.

2. Once finished, open Docker Desktop, go to the Containers page, open the dropdown named "server", and click the container named "shuters-laravel-app".

3. Navigate to the "Terminal" tab, and run the following commands:\

`# composer install`\

`# php artisan --version`\

`# php artisan migrate`

4. The API will be running on http://localhost:80/. Test fetches can be made to the API using Telnet or curl. For example, making a POST request with the keys "name", "email", "password", "c_password" to http://localhost:80/api/register. The API can be started or stopped from Docker Desktop.

  
  

## How to Navigate the Database

The MariaDB database should start and stop automatically with the API. To navigate the database, go back to the terminal for the container named "shuters-laravel-app". Enter the command:\

`# php artisan tinker`

SQL commands can then be run using commands in the format:\

`> DB::select("{SQL-command}")`

For example, to display all tables in the database, run the command:\

`> DB::select("SHOW TABLES")`


## API Resources


### Authentication Resource

| Endpoint | URI | Parameters | Description | Requires Authentication? |
|--|--|--|--|--|
| POST | /register | `email`, `display_name`, `first_name`, `last_name`, `password`, `c_password`| Register a new user | ❌ |
| PUT | /login | `email`, `password` | Return a new session token | ❌|


### User Resource

| Endpoint | URI | Parameters | Description | Requires Authentication? |
|--|--|--|--|--|
| GET | /user | | Return the current user | ✔️ |
| PUT | /user | `email`, `display_name`, `first_name`, `last_name`, `password` | Update the current user | ✔️ |
| GET | /user | `display_name` | Return list of matching users | ✔️ |

### Friend Resource

| Endpoint | URI | Parameters | Description | Requires Authentication? |
|--|--|--|--|--|
| POST | /friend | `friend_id` | Send a friend request | ✔️ |
| GET | /friend |  | Return list of friends | ✔️ |
| GET | /friend/pending |  | Return list of pending friend requests | ✔️ |
| PUT | /friend | `friend_id` | Accept a pending friend request | ✔️ |
| DELETE | /friend | `friend_id` | Delete a friend or pending friend request | ✔️ |
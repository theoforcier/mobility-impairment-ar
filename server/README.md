  

## Getting Started

  

1. (Assuming Docker Desktop is installed) From the server folder in the command-line, run:\

`docker-compose up -d`

This may take a few minutes the first time it runs.

2. Once finished, open Docker Desktop, go to the Containers page, open the dropdown named "server", and click the container named "shuters-laravel-app".

3. Navigate to the "Terminal" tab, and run the following commands:\

`# composer install`

`# php artisan --version`

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
| POST | /login | `email`, `password` | Return a new session token | ❌|


### User Resource

| Endpoint | URI | Parameters | Description | Requires Authentication? |
|--|--|--|--|--|
| GET | /user | | Return the current user | ✔️ |
| PUT | /user | `email`, `display_name`, `first_name`, `last_name`, `password` | Update the current user | ✔️ |
| GET | /user/search | `display_name` | Return list of matching users | ✔️ |

### Friend Resource

| Endpoint | URI | Parameters | Description | Requires Authentication? |
|--|--|--|--|--|
| POST | /friends | `display_name` | Send a friend request | ✔️ |
| GET | /friends |  | Return list of friends | ✔️ |
| GET | /friends/pending |  | Return list of pending friend requests | ✔️ |
| PUT | /friends/{user_id} | | Accept a pending friend request | ✔️ |
| DELETE | /friends/{user_id} | | Delete a friend or pending friend request | ✔️ |


### User Custom Tasks Resource

| Endpoint | URI | Parameters | Description | Requires Authentication? |
|--|--|--|--|--|
| POST | /user/tasks/custom | | Create a new task  | ✔️ |
| PUT | /user/tasks/custom/{task_id}/rename | `description` | Change the description of an active task | ✔️ |
| PUT | /user/tasks/custom/{task_id}/complete | | Mark an active task as completed | ✔️ |
| GET | /user/tasks/custom/{task_id} |  | Return the task | ✔️ |
| GET | /user/tasks/custom | `completed*` | Return list of tasks. If `completed=0`, return active tasks.  If `completed=1`, return completed tasks. | ✔️ |
| DELETE | /user/tasks/custom/{task_id} | | Delete an active task | ✔️ |
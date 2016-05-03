# A simple online address book
  To install, virtualenv if you want and `pip install -r requirements.txt`.  The client code is already
  built, but to do so just `npm install` and `npm run build`.

# database
  I chose to use sqlite for the database, since this is a prototype and it is
  very easy to set up!  First step in making this a "Real" production app would
  be switching to a database like Postgres.

## Schema
  With an address book we essentially have two pieces of information to store;
  the entry: Name, contact information, and birthdate, and the user associated with
  that. To simplify the process, there is no authentication system. If one were
  to be added the server would determine what was allowed to be viewed or
  modified based on a join with a 'Users' table.

  Contacts

  Column | Type
  ----|---------
  id | Int primary key
  name | text
  birth_day | int
  birth_month | int
  birth_year | int
  email | text
  phone | text


# server
  Server is basically just a handful of routes around contacts.

  Verb | Route | Action
  -----|-------|-------
  GET | /contacts | returns all contacts
  POST | /contacts | adds contact to all contacts

  Delete and Put are not included since the ability to modify or delete the
  entire contacts list at once seems ... bad.


  Verb | Route | Action
  -----|-------|------
  GET | /contacts/id | retrieves contact for given id
  PUT | /contacts/id | updates contact at given id
  DELETE | /contacts/id | removes contact at given id

  POST is not included since we want the server to determine ids.

# client
  Client is simple React application.  I chose React because, at least for smaller
  apps, it doesn't have as much set up, nor does it have very strong opinions. It
  also strongly focuses on code over layouts, which does have the advantages over
  something like angular's DSL "#for what in whatever" in that I can remember it.

  Some things I didn't do:  I didn't use TypeScript, being that it was a small
  application I wanted to spend as little time configuring things as possible.  
  Though pretty much anything more complex than this would benefit from it.  Second,
  The nature of the group by command lends itself well to an abstraction, something like
    `groupBy(Array, keyFunction) => Map[Key => Items]`
  This is not included because I ran out of time.  Additionally, the overall
  data structure where I store contacts is wrong.  It's currently an array of
  contacts, but it should be a `Map[ID => Contact]`.  This would enable me to
  make more efficient updates by just fetching/looking for specific ids.  i.e. a PUT
  would return the id from server, and then I would GET that ID and update
  the optimistic insert.
  I could talk about this for a while more...At any rate, a certainly level of
  application sophistication lends itself to more or less recreating the server/database
  on the client side.  I chose to stop before I reached that point.  If I had more time,
  There would probably be some more intermediary caching, responsiveness and pagination
  for large amounts of contacts, and maybe a ServiceWorker for offline functionality.

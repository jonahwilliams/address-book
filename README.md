# A simple online address book

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
  birthday | text
  email | text
  address | text
  phone | text


# server

# client

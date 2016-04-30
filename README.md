# A simple online address book

# database
  I chose to use sqlite for the database, since this is a prototype and it is
  very easy to set up!  First step in making this a "Real" production app would
  be switching to a database like Postgres.  This would also allow more specific
  datatypes to be defined.  in the case of birthday, I have to move this invariant
  to the code itself.

## Schema
  With an address book we essentially have two pieces of information to store;
  the entry: Name, contact information, and birthdate, and the user associated with
  that.  To simplify the process, there is no authentication system.  If one were
  to be added, instead of assuming a fixed user id, the server would determine
  what was allowed to be viewed or modified based on the auth process.

  Contacts

  Column | Type
  -------------
  id | Int primary key
  name | text
  birthday | text
  email | text
  address | text
  phone | text
  user_id | Int foreign key

  Users

  Column | Type
  --------------
  id | Int primary key
  user_name | text

# server

# client

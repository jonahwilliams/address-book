import sqlite3

# This script initializes the address database by creating the table for the
# first time
if __name__=='__main__':
    conn = sqlite3.connect('./server/database/address.db')
    c = conn.cursor()

    c.execute('''
        create table contacts
        (
            id integer primary key autoincrement,
            first_name text,
            last_name text,
            birth_day int,
            birth_month int,
            birth_year int,
            email text,
            phone text
        )''')

    conn.commit()
    conn.close()

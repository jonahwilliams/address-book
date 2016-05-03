import sqlite3
import random

# This script initializes the address database by creating the table for the
# first time


if __name__=='__main__':
    first_file = open('./server/database/first.txt', 'r')
    last_file = open('./server/database/last.txt', 'r')

    FIRST_NAMES = [name for name in first_file.read().split('\n') if name != ""]
    LAST_NAMES = [name for name in last_file.read().split('\n') if name != ""]

    first_file.close()
    last_file.close()

    people = []
    for i in xrange(150):
        people.append(
            (random.choice(FIRST_NAMES),
            random.choice(LAST_NAMES),
            random.randint(1, 30),
            random.randint(1, 12),
            random.randint(1980, 2000),
            "test@testy.com",
            "1233232"))

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
    c.executemany('''
        insert into contacts values (null,?,?,?,?,?,?,?)
    ''', people)
    conn.commit()
    conn.close()

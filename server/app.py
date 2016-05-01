from flask import Flask, g, request
import sqlite3
import json
app = Flask(__name__)

PATH_TO_DB = './server/database/address.db'
IN_DATA = [
    'first_name',
    'last_name',
    'birth_day',
    'birth_month',
    'birth_year',
    'email',
    'phone'
]
OUT_DATA = [
    'id',
    'first_name',
    'last_name',
    'birth_day',
    'birth_month',
    'birth_year',
    'email',
    'phone'
]

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(PATH_TO_DB)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@app.route('/')
def hello():
    return app.send_static_file('index.html')


# retrieves of a listing of all contacts
#
@app.route('/contacts', methods=['GET', 'POST'])
def contacts():
    conn = get_db()
    curr = conn.cursor()
    if request.method == 'POST':
        t = tuple([request.get_json().get(k, "") for k in IN_DATA])
        try:
            curr.execute('insert into contacts values (null,?,?,?,?,?,?,?)', t)
            conn.commit()
            return json.dumps({'success': True})
        except sqlite3.Error as err:
            return json.dumps({'success': False, 'error': err})
    else:
        results = []
        for row in curr.execute('select * from contacts'):
            results.append({key: value for (key, value) in zip(OUT_DATA, row)})
        return json.dumps({'results': results})

# modifies, updates, or gets specific contact
#
@app.route('/contacts/<int:contact_id>', methods=['GET', 'PUT', 'DELETE'])
def specific_contact(contact_id):
    conn = get_db()
    curr = conn.cursor()
    if request.method == 'DELETE':
        try:
            curr.execute('delete from contacts where id = ?', (contact_id,))
            conn.commit()
            return json.dumps({'success': True})
        except sqlite3.Error as err:
            return json.dumps({'success': False, 'error': err})
    elif request.method == 'PUT':
        try:
            l = [request.get_json().get(k, "") for k in IN_DATA]
            l.append(contact_id)
            t = tuple(l)
            curr.execute(
                '''update contacts set
                    first_name = ?,
                    last_name = ?,
                    birth_day = ?,
                    birth_month = ?,
                    birth_year = ?,
                    email = ?,
                    phone = ? where id = ?''', t)
            conn.commit()
            return json.dumps({'success': True})
        except sqlite3.Error as err:
            return json.dumps({'success': False, 'error': err})
    else:
        ex = curr.execute('select * from contacts where id = ?', (contact_id,))
        result = [{key: value for (key, value) in zip(OUT_DATA, row)} for row in ex]
        if len(result) == 1:
            return json.dumps(result[0])
        else:
            return "", 404
if __name__=='__main__':
    app.run(debug=True)

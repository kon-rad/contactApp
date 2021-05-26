from flask import render_template, Flask, request, jsonify, redirect, url_for
app = Flask(__name__)

contacts_list = [
   {
      "name": 'Steve Jobs',
      "email": 'Steve@apple.com',
      "note": 'Insanely Great',
      "id": 1,
   }
]

current_id = 1;

@app.route('/home')
def home():
   return render_template("home.html", contacts=contacts_list)

@app.route('/contacts', methods=["GET", "POST"])
def contacts():
   if request.method == "GET":
      if len(contacts_list) > 0:
         return jsonify(contacts_list)
      else:
         return "No contacts found"
   elif request.method == "POST":
      new_name = request.form["name"]
      new_email = request.form["email"]
      new_note = request.form["note"]
      new_contact = {
         "name": new_name,
         "email": new_email,
         "note": new_note,
         "id": current_id + 1,
      }
      contacts_list.append(new_contact)
      return redirect(url_for('home'))

@app.route('/contact/<int:id>', methods=["GET", "DELETE"])
def contact(id):
   if request.method == "DELETE":
      for index, contact in enumerate(contacts_list):
         if contact["id"] == id:
            contacts_list.pop(index)
            return redirect(url_for('home'))


if __name__ == '__main__':
   app.debug = True
   app.run()
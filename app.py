from flask import render_template, Flask, request, jsonify, redirect, url_for
import re

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
# assumption: /add_contact can be replaced with /contacts to keep REST pattern
def contacts():
   if request.method == "GET":
      if len(contacts_list) > 0:
         return jsonify(contacts_list)
      else:
         return "No contacts found"
   elif request.method == "POST":
      content = request.json
      errors = {
         "messages": [],
      }
      if ("name" not in content or content["name"] == ""):
         errors["messages"].append("A name is required")
      if ("email" not in content or content["email"] == ""):
         errors["messages"].append("An email is required")
      elif not re.match(r"[^@]+@[^@]+\.[^@]+", content["email"]):
         # regex source https://stackoverflow.com/questions/8022530/how-to-check-for-valid-email-address
         errors["messages"].append("Email must be valid")
      if len(errors["messages"]) is not 0:
         return jsonify(errors), 400

      # [^@]+@[^@]+\.[^@]+
      new_name = content["name"]
      new_email = content["email"]
      new_note = content["note"]
      new_contact = {
         "name": new_name,
         "email": new_email,
         "note": new_note,
         "id": current_id + 1,
      }
      contacts_list.append(new_contact)
      return jsonify(contacts_list), 200

@app.route('/contact/<int:id>', methods=["GET", "DELETE"])
def contact(id):
   if request.method == "DELETE":
      for index, contact in enumerate(contacts_list):
         if contact["id"] == id:
            contacts_list.pop(index)
            return jsonify(contacts_list)


if __name__ == '__main__':
   app.debug = True
   app.run()
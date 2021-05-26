from flask import render_template, Flask, Blueprint
app = Flask(__name__)

@app.route('/')
def hello_world():
   return render_template("home.html")

if __name__ == '__main__':
   app.debug = True
   app.run()
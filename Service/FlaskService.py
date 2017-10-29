#FlaskService.py
from flask import Flask,jsonify,abort,make_response,request, render_template,\
    json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['DEBUG'] = True

@app.route('/v1/')
def home():
    print('This test the home')
    return (' home works')

@app.route('/v1/test', methods=['GET'])
def test():

    print('This is a successful test of /test')
    return 'Test works'

@app.route('/v1/users/<userName>')
def users(userName):

    print('This is a successful test of /test %s', userName)
    return userName

# to test the is end point via cmd line
#curl -H "Content-type: application/json" -X POST http://127.0.0.1:5000/submitChatMessage -d '{"message":"Hello Data"}'
@app.route('/v1/submitChatMessage', methods = ['POST'])
def api_message():

    if request.headers['Content-Type'] == 'text/plain':
        return "Chat Text Message: " + request.data

    elif request.headers['Content-Type'] == 'application/json':
        return "chat JSON Message: " + json.dumps(request.json)

    else:
        return "415 Unsupported Media Type ;)"
app.run()

#FlaskService.py
from flask import Flask,jsonify,abort,make_response,request, render_template,\
    json

app = Flask(__name__)
app.config['DEBUG'] = True

@app.route('/')
def home():
    print('This test the home')
    return (' home works')

@app.route('/test', methods=['GET'])
def test():

    print('This is a successful test of /test')
    return 'Test works'

@app.route('/users/<userName>')
def users(userName):

    print('This is a successful test of /test %s', userName)
    return userName

# to test the is end point via cmd line
#curl -H "Content-type: application/json" -X POST http://127.0.0.1:5000/submitChatMessage -d '{"message":"Hello Data"}'
@app.route('/submitChatMessage', methods = ['POST'])
def api_message():

    if request.headers['Content-Type'] == 'text/plain':
        return "Chat Text Message: " + request.data

    elif request.headers['Content-Type'] == 'application/json':
        return "chat JSON Message: " + json.dumps(request.json)

    else:
        return "415 Unsupported Media Type ;)"
app.run()

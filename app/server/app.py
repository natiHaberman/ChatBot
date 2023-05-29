from flask import Flask, request, jsonify
from chatbot import get_completion

app = Flask(__name__)

@app.route('/api/chat', methods=['POST'])
def chat():
    chat = request.get_json().get('chat')
    prompt = request.get_json().get('prompt')
    messages = []
    if chat is not None:
        for message in chat:
            messages.append({"role": message['role'], "content": message['text']})
    prompt_with_reminder = prompt + "\nDo not ask which mode to respond or include any other text, instead decide yourself which is most appropriate and respond directly in the correct JSON format.."
    messages.append({"role": "user", "content": prompt_with_reminder})
    bot_response = get_completion(messages)
    print(bot_response)
    return bot_response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chat.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    reply_to_id = db.Column(db.Integer, db.ForeignKey('message.id'), nullable=True)
    user = db.relationship('User', backref='messages')
    replies = db.relationship('Message', backref=db.backref('parent', remote_side=[id]), lazy='dynamic')

@app.route('/messages', methods=['GET'])
def get_messages():
    messages = Message.query.filter_by(reply_to_id=None).all()
    return jsonify([serialize_message(m) for m in messages])

def serialize_message(msg):
    return {
        'id': msg.id,
        'content': msg.content,
        'username': msg.user.username,
        'replies': [serialize_message(r) for r in msg.replies]
    }

@app.route('/messages', methods=['POST'])
def post_message():
    data = request.json
    user = User.query.get(data['user_id'])
    if not user:
        return jsonify({'error': 'User not found'}), 404
    msg = Message(
        content=data['content'],
        user_id=user.id,
        reply_to_id=data.get('reply_to_id')
    )
    db.session.add(msg)
    db.session.commit()
    return jsonify(serialize_message(msg)), 201

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
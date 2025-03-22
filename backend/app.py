from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Task
import config

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = config.DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([{
        'id': task.id,
        'title': task.title,
        'description': task.description,
        'completed': task.completed
    } for task in tasks])

@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    new_task = Task(title=data['title'], description=data.get('description', ''))
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'message': 'Task created!'})

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    task = Task.query.get(id)
    data = request.get_json()
    task.title = data['title']
    task.description = data['description']
    task.completed = data['completed']
    db.session.commit()
    return jsonify({'message': 'Task updated!'})

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted!'})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  
    app.run(debug=True)

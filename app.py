from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
import os

app = Flask(__name__, static_folder="centdash/out")
CORS(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_next(path):
    full_path = os.path.join(app.static_folder, path)
    if path != "" and os.path.exists(full_path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(debug=True)

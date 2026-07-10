#!/usr/bin/env python3
"""CentDash Project Structure Generator"""
import os
import json
from pathlib import Path

def create_directory_structure():
    directories = [
        "backend/app",
        "backend/ml/training",
        "backend/ml/inference",
        "backend/ml/models",
        "backend/data",
        "backend/tests",
        "frontend/pages",
        "frontend/components",
        "frontend/styles",
        "frontend/public",
    ]
    print("📁 Creating directory structure...")
    for directory in directories:
        Path(directory).mkdir(parents=True, exist_ok=True)
        print(f"   ✓ {directory}/")

def create_pyproject_toml():
    content = '''[tool.poetry]
name = "centdash-backend"
version = "0.1.0"
description = "Lightweight Personal Finance ML"
authors = ["Your Name <you@example.com>"]

[tool.poetry.dependencies]
python = "^3.11"
flask = "^3.0"
flask-cors = "^4.0"
pydantic = "^2.0"
torch = "^2.1"
numpy = "^1.24"
pandas = "^2.0"
scikit-learn = "^1.3"
sqlalchemy = "^2.0"

[tool.poetry.dev-dependencies]
pytest = "^7.4"
black = "^23.10"
ruff = "^0.1"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
'''
    with open("backend/pyproject.toml", "w") as f:
        f.write(content)
    print("✓ backend/pyproject.toml")

def create_main_py():
    content = '''from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import json
import os
import pickle

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

MODEL_PATH = "ml/models/spending_model.pth"
ANOMALY_MODEL_PATH = "ml/models/anomaly_detector.pkl"

spending_model = None
anomaly_detector = None

def load_models():
    global spending_model, anomaly_detector
    
    if os.path.exists(MODEL_PATH):
        spending_model = torch.load(MODEL_PATH)
        spending_model.eval()
        print("✓ LSTM model loaded")
    else:
        print("⚠ LSTM model not found. Train it first with: poetry run python ml/training/train_lstm.py")
    
    if os.path.exists(ANOMALY_MODEL_PATH):
        with open(ANOMALY_MODEL_PATH, 'rb') as f:
            anomaly_detector = pickle.load(f)
        print("✓ Anomaly detector loaded")
    else:
        print("⚠ Anomaly detector not found. Train it first with: poetry run python ml/training/train_anomaly.py")

@app.route("/predict/spending", methods=["POST"])
def predict_spending():
    try:
        if spending_model is None:
            return jsonify({"error": "Model not loaded. Train it first."}), 400
        
        data = request.get_json()
        transactions = data.get('transactions', [])
        
        if len(transactions) == 0:
            return jsonify({"error": "No transactions provided"}), 400
        
        X = torch.tensor(transactions, dtype=torch.float32).unsqueeze(0)
        
        with torch.no_grad():
            prediction = spending_model(X)
        
        pred_value = float(prediction.item())
        
        return jsonify({
            "predicted_spending": pred_value,
            "confidence_interval": [pred_value * 0.9, pred_value * 1.1],
            "status": "success"
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/detect/anomalies", methods=["POST"])
def detect_anomalies():
    try:
        if anomaly_detector is None:
            return jsonify({"error": "Anomaly detector not loaded. Train it first."}), 400
        
        data = request.get_json()
        transaction = data.get('transaction', {})
        
        features = [
            transaction.get('amount', 0),
            transaction.get('category', 0),
            transaction.get('hour_of_day', 0),
            transaction.get('day_of_week', 0),
            transaction.get('merchant_frequency', 0)
        ]
        
        prediction = anomaly_detector.predict([features])[0]
        score = abs(anomaly_detector.score_samples([features])[0])
        
        is_anomaly = prediction == -1
        action = "BLOCK" if is_anomaly else "APPROVE"
        
        return jsonify({
            "is_anomaly": is_anomaly,
            "score": float(score),
            "action": action,
            "reason": "Unusual transaction pattern detected" if is_anomaly else "Normal transaction",
            "status": "success"
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "healthy",
        "spending_model_loaded": spending_model is not None,
        "anomaly_detector_loaded": anomaly_detector is not None
    })

if __name__ == "__main__":
    print("🚀 Loading models...")
    load_models()
    print("🚀 Starting Flask server on http://localhost:8000")
    app.run(debug=True, port=8000)
'''
    with open("backend/app/main.py", "w") as f:
        f.write(content)
    print("✓ backend/app/main.py")

def create_init_py():
    with open("backend/app/__init__.py", "w") as f:
        f.write("")
    print("✓ backend/app/__init__.py")

def create_sample_data_script():
    content = '''import pandas as pd
import numpy as np
from datetime import datetime
from pathlib import Path

def create_sample_data():
    Path("data").mkdir(exist_ok=True)
    
    dates = pd.date_range(end=datetime.now(), periods=30, freq='D')
    
    data = {
        'date': dates,
        'amount': np.random.uniform(10, 200, 30),
        'category': np.random.choice(['groceries', 'transport', 'entertainment', 'utilities'], 30),
        'merchant': [f'Merchant_{i}' for i in range(30)],
        'description': ['Sample transaction'] * 30
    }
    
    df = pd.DataFrame(data)
    df.to_csv('data/sample_transactions.csv', index=False)
    print("✓ Sample data created: data/sample_transactions.csv")
    print(f"\\n{df.head()}")

if __name__ == "__main__":
    create_sample_data()
'''
    with open("backend/create_sample_data.py", "w") as f:
        f.write(content)
    print("✓ backend/create_sample_data.py")

def create_train_lstm():
    content = '''import torch
import torch.nn as nn
import numpy as np
from pathlib import Path

class LSTMSpendingPredictor(nn.Module):
    def __init__(self, input_size=1, hidden_size=32, num_layers=1):
        super(LSTMSpendingPredictor, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, 1)
    
    def forward(self, x):
        out, _ = self.lstm(x)
        out = self.fc(out[:, -1, :])
        return out

def train_lstm():
    print("🚀 Training LSTM Spending Forecaster...")
    
    Path("ml/models").mkdir(parents=True, exist_ok=True)
    
    spending_amounts = np.random.uniform(50, 300, 30).reshape(-1, 1)
    X = torch.FloatTensor(spending_amounts).unsqueeze(0)
    y = torch.FloatTensor([spending_amounts.mean()])
    
    model = LSTMSpendingPredictor(input_size=1, hidden_size=32, num_layers=1)
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
    criterion = nn.MSELoss()
    
    print("Training for 10 epochs...")
    for epoch in range(10):
        optimizer.zero_grad()
        output = model(X)
        loss = criterion(output, y)
        loss.backward()
        optimizer.step()
        
        if (epoch + 1) % 2 == 0:
            print(f"  Epoch [{epoch+1}/10], Loss: {loss.item():.4f}")
    
    model.eval()
    torch.save(model, "ml/models/spending_model.pth")
    print("✓ Model saved: ml/models/spending_model.pth")
    print(f"✓ Model size: {Path('ml/models/spending_model.pth').stat().st_size / 1024:.1f} KB")

if __name__ == "__main__":
    train_lstm()
'''
    with open("backend/ml/training/train_lstm.py", "w") as f:
        f.write(content)
    print("✓ backend/ml/training/train_lstm.py")

def create_train_anomaly():
    content = '''from sklearn.ensemble import IsolationForest
import numpy as np
import pickle
from pathlib import Path

def train_anomaly_detector():
    print("🚀 Training Anomaly Detector...")
    
    Path("ml/models").mkdir(parents=True, exist_ok=True)
    
    normal_data = np.random.normal(loc=[100, 1, 12, 3, 5], 
                                   scale=[30, 0.5, 6, 2, 2], 
                                   size=(100, 5))
    
    model = IsolationForest(
        contamination=0.1,
        random_state=42,
        n_estimators=50
    )
    
    model.fit(normal_data)
    print(f"✓ Model trained on {len(normal_data)} transactions")
    
    with open("ml/models/anomaly_detector.pkl", "wb") as f:
        pickle.dump(model, f)
    
    print("✓ Model saved: ml/models/anomaly_detector.pkl")
    
    test_normal = np.array([[100, 1, 12, 3, 5]])
    test_anomaly = np.array([[5000, 1, 2, 0, 1]])
    
    print(f"\\nTest predictions:")
    print(f"  Normal transaction: {model.predict(test_normal)}")
    print(f"  Anomalous transaction: {model.predict(test_anomaly)}")

if __name__ == "__main__":
    train_anomaly_detector()
'''
    with open("backend/ml/training/train_anomaly.py", "w") as f:
        f.write(content)
    print("✓ backend/ml/training/train_anomaly.py")

def create_package_json():
    package_json = {
        "name": "centdash-frontend",
        "version": "0.1.0",
        "private": True,
        "scripts": {
            "dev": "next dev",
            "build": "next build",
            "start": "next start",
            "lint": "next lint"
        },
        "dependencies": {
            "react": "^18.2.0",
            "react-dom": "^18.2.0",
            "next": "^14.0.0",
            "axios": "^1.6.0",
            "plotly.js": "^2.26.0",
            "react-plotly.js": "^4.10.0"
        },
        "devDependencies": {
            "tailwindcss": "^3.3.0",
            "postcss": "^8.4.0",
            "autoprefixer": "^10.4.0"
        }
    }
    
    with open("frontend/package.json", "w") as f:
        json.dump(package_json, f, indent=2)
    print("✓ frontend/package.json")

def create_env_local():
    content = "NEXT_PUBLIC_API_URL=http://localhost:8000\n"
    with open("frontend/.env.local", "w") as f:
        f.write(content)
    print("✓ frontend/.env.local")

def create_gitignore():
    content = '''# Backend
backend/.venv/
backend/__pycache__/
backend/*.py[cod]
backend/.pytest_cache/
backend/.ruff_cache/
backend/*.egg-info/
backend/dist/
backend/build/

# Frontend
frontend/node_modules/
frontend/.next/
frontend/out/
frontend/build/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Models and data
backend/ml/models/*.pth
backend/ml/models/*.pkl
backend/data/*.csv
backend/*.db
'''
    with open(".gitignore", "w") as f:
        f.write(content)
    print("✓ .gitignore")

def create_readme():
    content = '''# CentDash - Personal Finance AI

Intelligent Personal Finance Anomaly Detection & Forecasting System using PyTorch LSTM and Scikit-learn.

## Quick Start

### 1. Install Dependencies

`ash
cd backend
poetry install

cd ../frontend
npm install
`

### 2. Train Models

`ash
cd backend
poetry shell
python ml/training/train_lstm.py
python ml/training/train_anomaly.py
`

### 3. Run Application

**Terminal 1 - Backend:**
`ash
cd backend
poetry shell
python app/main.py
`

**Terminal 2 - Frontend:**
`ash
cd frontend
npm run dev
`

### 4. Access

- Frontend: http://localhost:3000
- API: http://localhost:8000
- Health: http://localhost:8000/health
'''
    with open("README.md", "w") as f:
        f.write(content)
    print("✓ README.md")

def main():
    print("\n" + "="*60)
    print("🚀 CentDash Project Structure Generator")
    print("="*60 + "\n")
    
    try:
        create_directory_structure()
        print("\n📝 Creating configuration files...")
        create_pyproject_toml()
        create_package_json()
        create_env_local()
        
        print("\n🐍 Creating Python files...")
        create_init_py()
        create_main_py()
        create_sample_data_script()
        create_train_lstm()
        create_train_anomaly()
        
        print("\n📄 Creating documentation...")
        create_gitignore()
        create_readme()
        
        print("\n" + "="*60)
        print("✅ CentDash project structure created successfully!")
        print("="*60)
        
        print("\n📋 Next steps:")
        print("   1. cd backend")
        print("   2. poetry install")
        print("   3. poetry shell")
        print("   4. python ml/training/train_lstm.py")
        print("   5. python ml/training/train_anomaly.py")
        print("   6. python app/main.py")
        print("\n   In another terminal:")
        print("   1. cd frontend")
        print("   2. npm install")
        print("   3. npm run dev")
        print("\n" + "="*60 + "\n")
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())

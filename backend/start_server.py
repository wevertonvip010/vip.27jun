#!/usr/bin/env python3
import os
import sys

# Adicionar o diretório pai ao path
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.insert(0, parent_dir)

from src.main import app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)


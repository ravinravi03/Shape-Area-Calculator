from flask import Blueprint, render_template, jsonify, request

calculate = Blueprint('calculate', __name__)

@calculate.route('/',methods=['POST'])
def calculate_area():
        type = request.json.get('type')

        if type == 'circle':
            radius = float(request.json.get('radius'))
            if not radius:
                return jsonify({'error': 'Radius is required'}), 400
            
            area = 3.14 * radius ** 2
            return jsonify({'area': area, 'type': 'Circle'})
        
        elif type == 'rectangle':
            height = float(request.json.get('height'))
            if not height:
                return jsonify({'error': 'Height is required'}), 400
            
            width = float(request.json.get('width'))
            if not width:
                return jsonify({'error': 'Width is required'}), 400
            
            area = height * width
            return jsonify({'area': area, 'type': 'Rectangle'})
        
        elif type == 'triangle':
            base = float(request.json.get('base'))
            if not base:
                return jsonify({'error': 'Base is required'}), 400
            
            height = float(request.json.get('height'))
            if not height:
                return jsonify({'error': 'Height is required'}), 400
            
            area = 0.5 * base * height
            return jsonify({'area': area, 'type': 'Triangle'})
        
        else:
            return jsonify({'error': 'Invalid shape'}), 400

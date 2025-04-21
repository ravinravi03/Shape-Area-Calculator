from flask import Blueprint, jsonify, request

calculate = Blueprint('calculate', __name__)

@calculate.route('/',methods=['POST'])
def calculate_area():
    data = request.get_json()

    # We check if the data is a list or a single dictionary
    if isinstance(data, dict):
        data = [data]

    results = []
    for shape_data in data:
        area, error = compute_shape_area(shape_data)
        if error:
            return jsonify({'error': error, 'input': shape_data}), 400
        
        shape_data['area'] = area
        results.append(shape_data)

    if len(results) == 1:
        return jsonify(results[0]), 200
    else:
        return jsonify(results), 200

### compute_shape_area() computes the area of a shape based on its type and parameters
def compute_shape_area(data):
    type = data.get('type')

    if type == 'circle':
        radius = float(data.get('radius'))
        if not radius:
            return None, 'missing radius parameter'
        
        area = 3.14 * radius ** 2
        return area, None
    
    elif type == 'rectangle':
        height = float(data.get('height'))
        if not height:
            return None, 'missing height parameter'
        
        width = float(data.get('width'))
        if not width:
            return None, 'missing width parameter'
        
        area = height * width
        return area, None
    
    elif type == 'triangle':
        base = float(data.get('base'))
        if not base:
            return None, 'missing base parameter'
        
        height = float(data.get('height'))
        if not height:
            return None, 'missing height parameter'
        
        area = 0.5 * base * height
        return area, None
    
    else:
        return None, 'unsupported shape'
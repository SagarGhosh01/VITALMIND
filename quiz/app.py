from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to connect

# Example mental health scoring system
def analyze_mental_health(answers):
    score = 0
    categories = {"stress": 0, "anxiety": 0, "depression": 0}
    
    # Simple scoring logic (modify as needed)
    for i, answer in enumerate(answers):
        if answer in ["Often", "Very Often"]:
            score += 2
        elif answer in ["Sometimes"]:
            score += 1
        
        # Categorizing issues (modify logic as needed)
        if i in [0, 1]:  # First two questions relate to stress
            categories["stress"] += score
        elif i in [2, 3]:  # Next two relate to anxiety
            categories["anxiety"] += score
        else:  # Last ones relate to depression
            categories["depression"] += score
    
    # Calculate percentage
    total_possible_score = len(answers) * 2  # Max possible score
    percentage_score = (score / total_possible_score) * 100
    
    # Analyzing results
    max_category = max(categories, key=categories.get)
    return {"percentage_score": percentage_score, "most_affected": max_category, "detailed_scores": categories}

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    answers = data.get("answers", [])
    
    if not answers or len(answers) < 5:
        return jsonify({"error": "Invalid input. Provide at least 5 answers."}), 400
    
    result = analyze_mental_health(answers)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)

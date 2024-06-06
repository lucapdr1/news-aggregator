import sys
import json
# Placeholder function for political bias detection
def detect_political_bias(text):
    # Implement your political bias detection logic here
    # This could involve using pre-trained models or custom algorithms
    return 'left-leaning'  # Placeholder result

if __name__ == "__main__":
    text = sys.argv[1]
    political_bias = detect_political_bias(text)
    print(json.dumps(political_bias))

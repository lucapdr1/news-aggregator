from data_collection import process_url
from data_preprocessing import preprocess_text
from sentiment_analysis import analyze_sentiment
from topic_modeling import perform_topic_modeling
from political_bias_detection import detect_political_bias

# Example URL
url = 'https://edition.cnn.com/'

# Step 1: Data Collection
data = process_url(url)

# Step 2: Data Preprocessing
preprocessed_text = preprocess_text(data['text'])

# Step 3: Sentiment Analysis
sentiment = analyze_sentiment(preprocessed_text)

# Step 4: Topic Modeling
# Assuming you have a list of preprocessed texts for topic modeling
#texts = [preprocessed_text]
#lda_model = perform_topic_modeling(texts)

# Step 5: Political Bias Detection
political_bias = detect_political_bias(preprocessed_text)

# Print or return the results
print("URL:", data['url'])
print("Title:", data['title'])
print("Sentiment:", sentiment)
print("Political Bias:", political_bias)


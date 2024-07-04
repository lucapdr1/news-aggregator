import pandas as pd
import sys
import json
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation
import re
from nltk.corpus import stopwords
import nltk

nltk.download('stopwords')

# Preprocessing function
stop_words = set(stopwords.words('english'))

def preprocess_text(text):
    text = re.sub(r'\s+', ' ', text)  # Remove extra whitespace
    text = re.sub(r'[^a-zA-Z]', ' ', text)  # Remove non-alphabet characters
    text = text.lower()  # Convert to lowercase
    text = ' '.join([word for word in text.split() if word not in stop_words])  # Remove stopwords
    return text

# Display Topics
def extract_topics(model, feature_names, no_top_words):
    topicString = ""
    for topic in model.components_:
        topicString = " ".join([feature_names[i] for i in topic.argsort()[:-no_top_words - 1:-1]])
    return str(topicString)



def get_topic(text_to_process):
    # Preprocess the document
    preprocessed_text = preprocess_text(text_to_process)

    # Vectorization
    vectorizer = CountVectorizer(max_df=2, min_df=0.85, stop_words='english')
    dtm = vectorizer.fit_transform([preprocessed_text])

    # LDA Model
    lda = LatentDirichletAllocation(n_components=1, random_state=42)
    lda.fit(dtm)

    number_top_words = 3
    return extract_topics(lda, vectorizer.get_feature_names_out(), number_top_words)


if __name__ == "__main__":
    text_to_process = sys.argv[1]

    # Example usage with one of the popular news sites
    topics = get_topic(text_to_process)

    topic_json = json.dumps(topics)

    print(topic_json)

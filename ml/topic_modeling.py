from sklearn.decomposition import LatentDirichletAllocation
from sklearn.feature_extraction.text import CountVectorizer

def perform_topic_modeling(texts):
    print(texts)
    vectorizer = CountVectorizer(max_df=0.95, min_df=0.5, stop_words='english')
    term_matrix = vectorizer.fit_transform(texts)
    
    lda_model = LatentDirichletAllocation(n_components=10, random_state=42)
    lda_model.fit(term_matrix)
    
    return lda_model

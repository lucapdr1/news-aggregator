# News Aggregator

Luca Pedranzini

## Introduction
This is a Next.js web application that serves as a news aggregator. The app aggregates top articles from predefined news sources, provides summaries of articles, and detects their sentimentes. It consists of frontend components for displaying the feed, article list, and individual articles, as well as backend APIs for retrieving top articles, summarizing articles, detecting sentiment and topic modeling.

An explanation regarding only the python code can be foud here: [netebook](https://nbviewer.org/github/lucapdr1/news-aggregator/blob/main/ml/00news_aggregator.ipynb)

## Project Structure
![structure](public/img/structure.PNG)

- **components**: Contains React components responsible for rendering different parts of the user interface. `Feed.tsx` renders the main feed page, `ArticleList.tsx` renders a list of articles, and `ArticleItem.tsx` renders an individual article item.
- **api**: Includes backend API endpoints for interacting with the machine learning scripts and retrieving data for the frontend. The `top-articles` endpoint retrieves top articles, the `sentiment` endpoint detects sentiment, and the `summary` endpoint provides article summaries.
- **ml**: Houses Python scripts for performing machine learning tasks. `top_articles.py` scrapes top articles from predefined news sources, `sentiment.py` detects the sentiment of articles, `summary.py` generates summaries of articles and `topic.py` extracts the topic of the text.

## Usage
To run the application:
1. Ensure you have Node.js and Python installed on your machine.
2. Install the required dependencies by running `npm install` and `pip install -r requirements.txt`
3. Start the Next.js development server by running `npm run dev`.
4. Access the application at `http://localhost:3000`.

## Dependencies
- Next.js: Framework for building React applications
- Newspaper4k: Library for web scraping news articles
- Transformers: Library for natural language processing tasks
- Sklearn: Library to implement machine learning models


## Features
- **Top Articles Retrieval**: Scrapes top articles from predefined news sources.
- **Article Summarization**: Summarizes articles to provide concise representations.
- **Sentiment Detection**: Determines the sentiment of articles based on sentiment analysis.
- **Topic Modeling**: Describes with three words the topic of the articles


### Top Articles Retrieval
The script scrapes the top articles from predefined news sources listed in the `newspaper_list`. It utilizes the `newspaper` library to build newspaper objects from these URLs. The `get_top_articles` function takes a newspaper URL and retrieves a specified number of top articles (default is 5) from it. It then extracts relevant information from each article, including its title, publication date, text content, and URL. This feature enables the aggregation of recent articles from multiple news sources.

### Article Summarization
For article summarization, the script employs the `summarize` function. This function takes an article URL as input and utilizes the `newspaper` library to download, parse, and perform natural language processing (NLP) on the article. By leveraging NLP, it generates a summary of the article's content. This summary provides a condensed representation of the article's main points, making it easier for users to grasp the essential information without having to read the entire article.

### Sentiment Detection
The script includes a `detect_sentiment` function that determines the sentiment of articles based on sentiment analysis. It utilizes the `transformers` library to load a sentiment analysis model pretrained on English text. The sentiment analysis model assigns a sentiment score to the text, indicating the overall sentiment (positive, negative, or neutral). Based on this score, the function categorizes the article's sentiment as 'left-leaning,' 'right-leaning,' or 'neutral.'

### Topic Modeling
The script includes a `get_topic` function that determines the main topics of articles using topic modeling. It utilizes the `sklearn` library to load a Latent Dirichlet Allocation (LDA) model. The `preprocess_text` function cleans the text by removing non-alphabet characters, converting to lowercase, and eliminating stopwords. The text is then transformed into a document-term matrix using `CountVectorizer`. The LDA model identifies the dominant topics within the text, and the `extract_topics` function retrieves the top words representing these topics. This approach helps in summarizing the main themes of the text, making it easier to understand the central topics of the article.

## Unit Tests

The [`\ml\tests`](https://github.com/lucapdr1/news-aggregator/tree/main/ml/tests) folder contains comprehensive tests for the sentiment analysis module, including tests for various types of predictions and for verifying the completeness of the data scraped using the newspaper library.

To run the tests execute the command `python -m unittest discover -s .\ml\tests\` from the root folder of the project. Example:
![tests_results](public/img/tests.PNG) folder contains comprehensive tests for the sentiment

## Deployment

The [Dockerfile](https://github.com/lucapdr1/news-aggregator/blob/main/Dockerfile) sets up a multi-stage build for a project combining Python and Node.js environments.

#### Stage 1: Python Environment
- **Base Images**: `python:3.9-alpine` and `gcr.io/tensorflow/tensorflow:latest`.
- **Setup**: Installs essential tools and Python dependencies.

#### Stage 2: Node Dependencies
- **Base Image**: `node:lts-alpine`.
- **Setup**: Installs Node.js dependencies using `npm ci`.

#### Stage 3: Node Builder
- **Base Image**: `node:lts-alpine`.
- **Setup**: Copies dependencies and source code, then runs the build process.

#### Stage 4: Production Environment
- **Base Image**: `node:lts-alpine`.
- **Setup**: Sets environment variables, adds a non-root user, copies necessary files, and integrates the Python environment.
- **Final Configuration**: Exposes port 3000 and sets the command to start the application.

This approach creates a production image by leveraging multi-stage builds and installing dependencies for both python and node.


## Demo
![Loading](public/img/loading.PNG)

Once loaded, the web application constructs a dynamic feed featuring the most recent articles from renowned newspapers.

![Feed](public/img/feed.PNG)

For each article, we can initiate our Python scripts via an API call. These scripts, powered by machine learning models, execute specified tasks and deliver responses in JSON format which is integrated into the React components

![Article](public/img/article.PNG)
![Example1](public/img/example1.PNG)
![Example2](public/img/example2.PNG)

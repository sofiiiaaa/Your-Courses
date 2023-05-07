\pagebreak

<!-- toc -->

# Semantic search
Semantic search is a search technique that attempts to understand the meaning of the query and the content being searched, rather than relying solely on keyword matching. In other words, instead of simply looking for keywords, semantic search tries to understand the intent behind a query and the context in which it is being used.

The goal of semantic search is to provide more relevant search results by taking into account the relationships between words and the broader meaning of a query. It helps users to find information that is more closely related to their actual needs, and not just based on a few keywords. This type of search can be particularly useful in areas where there is a lot of ambiguity or where different terms can be used to describe the same concept.

There are several techniques that can be used to implement semantic search, including natural language processing (NLP), machine learning, and knowledge graphs. In general, these techniques involve analyzing the content of the query and the content being searched to identify patterns and relationships between words and concepts.

One of the key components of semantic search is the use of ontologies and taxonomies. These are structured sets of terms and relationships that can be used to understand the meaning of different concepts and how they relate to each other. For example, an ontology might include terms like "car" and "engine," and describe how these terms relate to each other in the context of a vehicle.

Another important aspect of semantic search is the use of machine learning algorithms. These algorithms can be trained to recognize patterns and relationships between words and concepts based on large datasets of text. For example, a machine learning algorithm might be trained to recognize that the word "dog" is closely related to the word "pet," and that the word "cat" is closely related to the word "feline."

In addition to these techniques, semantic search can also benefit from the use of knowledge graphs. A knowledge graph is a structured representation of information that includes nodes and edges to represent concepts and relationships between them. For example, a knowledge graph might include nodes for different types of food, and edges to represent which foods are related to each other in terms of taste or nutritional value.

Overall, semantic search is an important and rapidly evolving area of research in information retrieval. By providing more relevant and personalized search results, it can help users to find the information they need more quickly and easily, and can help businesses to better understand their customers and their needs.

## Symmetric vs. Asymmetric Semantic Search

In semantic search, there are two types of approaches: asymmetric and symmetric. These approaches differ in the way they represent the query and the documents and in how they measure the similarity between them.

In asymmetric semantic search, the query is represented as a single vector, while the documents are represented as a set of vectors, each vector corresponding to a specific aspect or feature of the document. For example, in a job search scenario, a document (a job posting) could be represented by separate vectors for the job title, the job description, and the required skills. These vectors are concatenated into a single representation of the document, which is then used to compute the similarity between the query and the document.

The advantage of this approach is that it allows for more fine-grained matching between the query and the documents, as each feature can be weighted differently depending on its importance. The downside is that it requires more preprocessing and feature engineering, as each document needs to be parsed and segmented into its constituent features.


On the other hand, symmetric semantic search treats the query and the documents as vectors of the same dimensionality and measures the similarity between them using a similarity metric such as cosine similarity. In this approach, there is no distinction between the query and the documents in terms of their representation.

The advantage of symmetric semantic search is that it is simpler to implement and requires less preprocessing and feature engineering. However, it may not be as effective in cases where there is a high degree of variation between the query and the documents, as the model may not be able to capture the fine-grained differences between them.

In summary, when deciding which approach to use for semantic search, one should consider the nature of the data and the problem at hand. Asymmetric semantic search may be more effective when dealing with complex and varied data, while symmetric semantic search may be more suitable for simpler and more uniform data.

## Distances

There are several distances and similarity metrics that can be used for semantic search, including:

* Cosine Similarity: This metric measures the cosine of the angle between two vectors in a multi-dimensional space. Cosine similarity ranges from -1 to 1, with 1 indicating that the vectors are identical and -1 indicating that they are completely dissimilar.
* Manhattan Distance: Also known as the taxicab distance, this metric measures the sum of the absolute differences between the elements of two vectors. It is often used in text-based models.
* Minkowski Distance: This is a generalization of the Euclidean and Manhattan distances that allows for a flexible parameter p. When p=1, the Minkowski distance reduces to the Manhattan distance, and when p=2, it reduces to the Euclidean distance.
* Dot Product: This is a similarity metric that measures the cosine of the angle between two vectors but does not normalize the vectors. It is often used in neural network-based models.

In semantic search, the choice of distance metric depends on the nature of the problem and the type of data being used. For instance, Euclidean distance is commonly used for image-based models, while cosine similarity is often used for text-based models. Dot product is frequently used in neural network-based models, as it provides a simple and efficient way to measure the similarity between two vectors.

It is worth noting that the choice of distance metric can have a significant impact on the performance of the model. For instance, some metrics may be more sensitive to noise or outliers in the data, while others may be more robust. Additionally, different metrics may be better suited for different types of data or applications. Therefore, it is important to carefully evaluate the performance of different metrics and select the one that works best for the specific problem at hand.

## DB engines
### Elasticsearch
ES - Filtered kNN search

The kNN search API supports restricting the search using a filter. The search will return the top k documents that also match the filter query.
```
{
  "knn": {
    "field": "image-vector",
    "query_vector": [54, 10, -2],
    "k": 5,
    "num_candidates": 50,
    "filter": {
      "term": {
        "file-type": "png"
      }
    }
  },
  "fields": ["title"],
  "_source": false
}
```
The filter is applied during the approximate kNN search to ensure that k matching documents are returned. This contrasts with a post-filtering approach, where the filter is applied after the approximate kNN search completes.


#### ES hybrid

Combine results from the KNN with the should so to benefit the exact match without make it a strict requirement using minimum_should_match=0.  See this example https://discuss.elastic.co/t/is-there-a-way-to-combine-default-bm25-score-of-elasticsearch-and-dense-vectors-similarity/225168/2  


```
POST image-index/_search
{
  "knn": {
    "field": "image-vector",
    "query_vector": [54, 10, -2],
    "k": 10000,
    "num_candidates": 10000,
    "boost": 0.1
  },
  "query": {
    "bool": {
      "should": {
        "terms" : { "website" : ["term1", "term2"] } }
      },
      "minimum_should_match": 0
    }
  },
  "size": 10
}
```
Limitations for approximate kNN search

You can’t run an approximate kNN search on a dense_vector field within a nested mapping.

Elasticsearch uses the HNSW algorithm to support efficient kNN search. Like most kNN algorithms, HNSW is an approximate method that sacrifices result accuracy for improved search speed. This means the results returned are not always the true k closest neighbors.

## Models
There are several deep learning models that can be used for semantic search, each with its own strengths and weaknesses. Here are some of the most common ones:


* Siamese Networks: Siamese networks are a type of neural network that can learn to compare and match two inputs, such as two pieces of text. In the context of semantic search, a Siamese network can be trained to compare a search query to a set of documents and return the most relevant matches.
* Transformer-based models: Besides BERT, other transformer-based models, such as GPT-3, T5, and XLNet, can be used for semantic search. These models have been pre-trained on large amounts of text and can be fine-tuned for specific tasks, such as semantic search. They are particularly effective for tasks that require understanding the context and meaning of words and phrases.

Overall, the choice of model depends on the specific requirements of the semantic search task, such as the size of the dataset, the complexity of the queries and documents, and the performance requirements.

## Query expansion
Query expansion is a technique that can help improve the relevance of search results by expanding the user's query to include additional terms that are related to their original query. 

The main difficulty of query expansion is to add only relevant terms to the initial query. Several techniques have been proposed in the literature, based on linguistic resources (e.g. synonym lists) or based on the documents themselves (e.g. pseudo-relevance feedback).

 

Some strategies for implementing query expansion:

Use generative models to improve the user query (the original query is used as a seed (or prompt) for a generative model which will output texts that are, hopefully, related to the query)

The usage of chatGPT seems fancy from tractors it proposes: tractor, farm equipment, agricultural machinery, construction machinery and all the websites returned point to companies that produces tractors and similar.

Use synonyms: One approach is to expand the user's query by adding synonyms or related terms.

Incorporate user feedback: Another approach is to use feedback from users to identify related terms that are specific to the searched domain. For example, if the search engine is focused on a particular industry, the system can take advantage of asking users to suggest related terms that they think should be included in search queries.    

   
## Re-Ranker

Even with advanced semantic search algorithms, it is not always possible to provide perfectly accurate and relevant search results. This is where re-rankers come in.

A re-ranker is a machine learning model or algorithm that operates on a subset of the top search results generated by an initial retrieval algorithm or search engine. The re-ranker uses various techniques, such as deep learning, natural language processing, and semantic analysis, to evaluate the relevance of the search results to the user's query and then reorders them based on their predicted relevance.

The goal of the re-ranker is to improve the accuracy and relevance of the search results by taking into account additional factors that were not considered by the initial retrieval algorithm. For example, the re-ranker may consider the user's search history, location, and other relevant factors to provide more personalized and relevant search results.

Types of Re-Rankers
There are several types of re-rankers that can be used in semantic search. Some of the most common ones include:

* Learning-to-Rank Re-Rankers: These re-rankers use supervised learning techniques to learn a ranking function that maps a query and document features to a relevance score. The ranking function is trained on a set of labeled training examples, and the resulting model is used to re-rank the search results.

* Contextual Re-Rankers: These re-rankers take into account additional contextual information, such as the user's search history and location, to provide more personalized and relevant search results.

* Hybrid Re-Rankers: These re-rankers combine multiple ranking models, such as learning-to-rank and contextual re-rankers, to provide more accurate and relevant search results.

Benefits of Re-Rankers
Re-rankers can provide several benefits in semantic search, including:

* Improved Relevance: Re-rankers can help improve the relevance of search results by taking into account additional factors that were not considered by the initial retrieval algorithm.
* Personalization: Re-rankers can help provide more personalized search results by taking into account the user's search history and other relevant factors.
* Increased User Satisfaction: By providing more accurate and relevant search results, re-rankers can help increase user satisfaction with the search experience.

In conclusion, re-rankers are an important component of semantic search that can help improve the accuracy and relevance of search results. They use advanced machine learning techniques, such as deep learning, natural language processing, and semantic analysis, to evaluate the relevance of search results and reorder them based on their predicted relevance. By taking into account additional factors, such as the user's search history and location, re-rankers can provide more personalized and relevant search results, ultimately improving the overall search experience.

### Learning-to-rank (LTR) 
 Learning-to-rank (LTR)  re-rankers are a type of re-ranking model used in information retrieval (IR) systems to improve the relevance of search results. LTR re-rankers use machine learning techniques to learn a ranking function that maps query-document pairs to relevance scores, which are used to reorder the search results based on their estimated relevance to the user's query. In this way, LTR re-rankers can help improve the quality of search results and enhance the overall user experience.

In general, the process of using an LTR re-ranker in an IR system involves the following steps:

* Query processing: The user's query is processed by the search engine to identify a set of candidate documents that are likely to be relevant to the query. This step typically involves techniques such as query expansion, synonym detection, and entity recognition to ensure that the search engine retrieves a broad range of relevant documents.
* Feature extraction: For each query-document pair in the candidate set, a set of features is extracted that capture the relevance of the document to the query. These features may include various attributes of the document, such as the title, description, content, author, and publication date, as well as contextual information such as the user's location and search history.
* Training data generation: A set of training data is generated by manually labeling a subset of query-document pairs with their relevance scores. This training data is used to train the LTR re-ranker to learn a ranking function that maps query-document pairs to relevance scores.
* Model training: The LTR re-ranker is trained on the training data using machine learning techniques such as gradient boosting or neural networks. During training, the model learns to predict the relevance scores of query-document pairs based on the extracted features.
* Re-ranking: Once the LTR re-ranker has been trained, it can be used to re-rank the candidate documents based on their estimated relevance scores. The re-ranked list of documents is then presented to the user as the search results.

One of the key advantages of LTR re-rankers is their ability to incorporate a wide range of features into the ranking function, including both content-based and contextual features. This allows LTR re-rankers to take into account various factors that may influence the relevance of a document to a particular query, such as the user's location, search history, and preferences.

Another advantage of LTR re-rankers is their ability to learn from user feedback and adapt to changes in the user's preferences over time. By collecting feedback on the relevance of search results, LTR re-rankers can continuously improve their ranking function and provide more accurate and relevant search results to users.

There are several techniques that can be used to train LTR re-rankers, including pointwise, pairwise, and listwise methods. Pointwise methods treat each query-document pair as an independent instance and use regression techniques to learn a relevance score for each pair. Pairwise methods compare the relevance scores of two documents and aim to learn a ranking function that produces a correct ranking order between the two documents. Listwise methods consider the entire list of candidate documents and aim to learn a ranking function that produces a correct ranking order for the entire list.

In general, pairwise and listwise methods tend to be more effective than pointwise methods for training LTR re-rankers, as they take into account the relationships between query-document pairs and can learn more accurate ranking functions. However, pairwise and listwise methods are also more computationally expensive and may require larger amounts of training data to achieve good performance.

#### Pointwise vs Pairwise vs Listwise Methods
The three main techniques used to train learning-to-rank (LTR) re-rankers are pointwise, pairwise, and listwise methods. Each method has its own advantages and disadvantages and is suited to different types of ranking problems.

* Pointwise Method:
The pointwise method treats each query-document pair as an independent instance and aims to learn a regression function that predicts the relevance score of a document given a query. The training data for the pointwise method consists of query-document pairs, each labeled with a relevance score.
The pointwise method is simple and computationally efficient, as it treats each query-document pair independently and can use standard regression techniques such as linear regression or decision trees. However, the pointwise method ignores the relationships between the query-document pairs in a ranked list, and may not produce an optimal ranking order.

* Pairwise Method
The pairwise method compares the relevance scores of two documents for a given query and aims to learn a ranking function that produces a correct ranking order between the two documents. The training data for the pairwise method consists of pairs of documents for each query, each labeled with a preference score indicating which document is more relevant.
The pairwise method takes into account the relative relevance of two documents for a given query and can produce a better ranking order than the pointwise method. However, the pairwise method requires a large amount of training data to learn accurate preferences between documents, and may not scale well to large datasets.

* Listwise Method
The listwise method considers the entire list of candidate documents for a given query and aims to learn a ranking function that produces a correct ranking order for the entire list. The training data for the listwise method consists of ranked lists of documents for each query, each labeled with a relevance score.
The listwise method takes into account the relationships between all query-document pairs in a ranked list and can produce the most accurate ranking order. However, the listwise method is computationally expensive and requires a large amount of training data to learn an accurate ranking function.

In summary, the pointwise method is simple and efficient but ignores the relationships between query-document pairs, while the pairwise method takes into account the relative relevance of two documents but requires a large amount of training data. The listwise method produces the most accurate ranking order but is computationally expensive and requires a large amount of training data. The choice of method depends on the specific ranking problem and available resources.

### Contextual Re-Rankers

Contextual re-rankers are a type of machine learning model or algorithm used in semantic search that take into account additional contextual information to provide more personalized and relevant search results. Contextual information can include the user's search history, location, device, and other relevant factors that may affect the user's search intent.

Contextual re-rankers typically work by analyzing the user's search history and other contextual information to identify patterns and preferences that can be used to inform the ranking of search results. For example, if a user has previously searched for restaurants in a particular area, a contextual re-ranker may prioritize search results for restaurants in that area when the user performs a new search for "Italian restaurants."

To accomplish this, contextual re-rankers use machine learning techniques such as supervised learning, unsupervised learning, and reinforcement learning. These techniques enable the model to learn from past user behavior and preferences and use this information to predict the relevance of search results for a new query.

In addition to analyzing the user's search history, contextual re-rankers may also consider other contextual factors such as the user's location and device type. For example, a contextual re-ranker may prioritize search results for mobile-friendly websites when the user is searching on a mobile device.


Contextual re-rankers offer several benefits in semantic search, including:

* Improved Relevance: By taking into account additional contextual information, contextual re-rankers can improve the relevance of search results, making it easier for users to find what they are looking for.

* Personalization: Contextual re-rankers can provide more personalized search results by taking into account the user's search history and other contextual factors that may affect their search intent.

* Increased User Satisfaction: By providing more accurate and relevant search results, contextual re-rankers can help increase user satisfaction with the search experience, leading to more engagement and loyalty.

* Better Ad Performance: Contextual re-rankers can also benefit advertisers by helping to improve the performance of their ads. By prioritizing ads that are more likely to be relevant to the user's search intent, advertisers can improve their click-through rates and return on investment.

One example of a contextual re-ranker in action is Google's search algorithm. Google uses a variety of contextual factors to personalize search results, including the user's search history, location, and device type. For example, if a user has previously searched for restaurants in a particular area, Google may prioritize search results for restaurants in that area when the user performs a new search for "Italian restaurants."

### Kind of context

When working with a semantic search engine that searches for companies, some of the most common contextual information to gather around a user are:

* Location: The location of the user can be used to identify companies in the user's vicinity. This information can be used to prioritize search results for companies that are located nearby or have a presence in the user's area.

* Industry: The user's industry or area of interest can provide valuable context for search queries. For example, a user searching for companies may be interested in companies in a specific industry, such as technology or healthcare.

* Company size: The size of the company the user is looking for can also be a valuable contextual factor. For example, a user may be searching for small businesses or startups, or may be interested in larger corporations.

* Company profile: This can include information about the company's history, mission, and values, as well as any news or announcements related to the company. This information can be used to personalize search results and provide more relevant information to the user.

* User profile: This includes demographic information such as age, gender, and interests, as well as behavioral data such as purchase history and social media activity. This information can be used to personalize search results and recommendations for each user.

* Search history: The user's previous search queries and the results they clicked on can provide valuable information about the user's search intent and preferences. This information can be used to improve the relevance and accuracy of search results.

Overall, the most common contextual information used in a semantic search engine that searches for companies may vary depending on the specific use case and the data available. By analyzing this information and using it to personalize search results, semantic search engines can provide more relevant and useful information to users searching for companies.

## Train LTR model
### Data preparation

The first step in implementing a listwise LTR re-ranker is to preprocess the data. The data should be split into training, validation, and test sets, and each set should be stored in a format that can be easily loaded into Hugging Face. In our example, we will use a CSV file to store the data, with one row per query-document pair and columns for the query, document, and relevance label.
In the context of a listwise re-ranker, a single row in the training data typically consists of a query, a set of candidate documents, and their corresponding relevance scores.

```json
{
    "query": "apple products",
    "docs": [
        {
            "doc_id": "1",
            "title": "iPhone 13 Review",
            "score": 0.8
        },
        {
            "doc_id": "2",
            "title": "Top 10 Apple Products of 2022",
            "score": 0.7
        },
        {
            "doc_id": "3",
            "title": "Apple vs Samsung: Which is Better?",
            "score": 0.4
        },
        {
            "doc_id": "4",
            "title": "Guide to Apple Products for Beginners",
            "score": 0.6
        },
        {
            "doc_id": "5",
            "title": "New Apple Watch Series 8",
            "score": 0.9
        }
    ]
}

```
In a listwise re-ranking scenario, you will typically feed the model with a batch of data, where each batch corresponds to a particular query and contains a list of documents with their relevance scores.

To create a batch of data, you can first group the documents by query ID and then create a dataset where each row represents a query and contains a list of documents with their relevance scores. You can then use PyTorch's DataLoader to load and iterate over the batched data during training.

Here's an example code snippet to create a batch of data:

```python

import torch
from torch.utils.data import Dataset

class ReRankingDataset(Dataset):
    def __init__(self, data: list[dict], tokenizer):
        self.queries = []
        self.documents = []
        self.relevance_scores = []
        self.tokenizer = tokenizer
        
        for query_data in data:
            query = self.tokenizer(query_data["query"])
            docs = self.tokenizer(query_data["docs"])
            scores = [doc["score"] for doc in docs]
            
            self.queries.append(query)
            self.documents.append(docs)
            self.relevance_scores.append(scores)
            
    def __len__(self):
        return len(self.queries)
    
    def __getitem__(self, idx):
        query = self.queries[idx]
        docs = self.documents[idx]
        scores = self.relevance_scores[idx]
        
        return {
            "query": query,
            "docs": docs,
            "scores": scores
        }

# Example usage:
data = [
    {
        "query": "apple products",
        "docs": [
            {
                "doc_id": "1",
                "title": "iPhone 13 Review",
                "score": 0.8
            },
            ...
        ]
    },
    ...
]

dataset = ReRankingDataset(data)
dataloader = torch.utils.data.DataLoader(dataset, batch_size=2, shuffle=True)

for batch in dataloader:
    print(batch)
```

In this example, we first create a ReRankingDataset class that takes the original data and preprocesses it to create three lists: queries, documents, and relevance_scores. We then implement the __len__ and __getitem__ methods to allow indexing and iteration over the dataset. Finally, we create a DataLoader object that loads the dataset in batches and shuffles the data during training.

### Model

1. Define the model

```python
class ListwiseLTR(nn.Module):
    def __init__(self, query_feature_dim, document_feature_dim, hidden_dim, output_dim):
        super(ListwiseLTR, self).__init__()
        self.query_fc = nn.Linear(query_feature_dim, hidden_dim)
        self.document_fc = nn.Linear(document_feature_dim, hidden_dim)
        self.hidden_fc = nn.Linear(hidden_dim, hidden_dim)
        self.output_fc = nn.Linear(hidden_dim, output_dim)

    def forward(self, query_embeddings, document_embeddings):
        query_features = F.relu(self.query_fc(query_embeddings))
        document_features = F.relu(self.document_fc(document_embeddings))
        pairwise_features = query_features.unsqueeze(1) * document_features.unsqueeze(2)
        pairwise_features = pairwise_features.view(-1, pairwise_features.shape[-2], pairwise_features.shape[-1])
        pairwise_scores = F.relu(self.hidden_fc(pairwise_features))
        pairwise_scores = self.output_fc(pairwise_scores).squeeze(-1)
        return pairwise_scores
```
This model takes in two inputs: query_embeddings and document_embeddings. These inputs are first passed through separate fully-connected layers (query_fc and document_fc) to project them to a shared hidden dimension hidden_dim. The query_embeddings and document_embeddings are then combined using the outer product operation to obtain a matrix of pairwise features (pairwise_features). The pairwise_features are then passed through another fully-connected layer (hidden_fc) and a final linear layer (output_fc) to obtain the final pairwise scores (pairwise_scores) between the query and document pairs. The output is a tensor of shape (batch_size * num_documents, num_documents), where batch_size is the number of queries in a batch and num_documents is the number of documents per query.

### Loss Function

```python
# define the pairwise ranking loss function
def listwise_loss(scores, labels):
    _, indices = torch.sort(scores, descending=True)
    labels = labels[indices]
    ndcg = ndcg_score([labels.cpu().numpy()], [scores.cpu().numpy()], k=10)
    return -torch.tensor(ndcg).cuda()
```

The listwise_loss function is a custom loss function designed specifically for listwise learning to rank. It uses the normalized discounted cumulative gain (NDCG) metric to calculate the loss.

To understand the listwise_loss function, we first need to understand the NDCG metric.

#### Normalized Discounted Cumulative Gain Loss (NDCG)

NDCG is a popular ranking evaluation metric that measures the quality of a ranked list. It takes into account both the relevance and the position of each item in the list. The higher the NDCG score, the better the ranked list.

The formula for NDCG is as follows:

$$ NDCG@k=\frac{DCG@k}{IDCG@k} $$

where:

* DCG@k is the discounted cumulative gain at position k.
* IDCG@k is the ideal discounted cumulative gain at position k.

The discounted cumulative gain (DCG) at position k is defined as:

$$ DCG@k=\sum_{i=1}^k \frac{2^{reli} - 1}{log_2(i+1)} $$

where:
$rel_i$ is the relevance score of the item at position i.

The ideal discounted cumulative gain (IDCG) at position k is defined as:

$$ IDCG@k=\sum_{i=1}^{min(k, |R|)} \frac{2^{reli} - 1}{log_2(i+1)} $$

where:
$|R|$ is the total number of relevant items.

In practice, we often use a truncated version of NDCG, called NDCG@k, where we only consider the top k items in the ranked list.

listwise_loss Function

The listwise_loss function takes in two arguments:

* scores: a tensor of shape (batch_size, num_documents) containing the predicted scores for each document in each query in the batch.
* labels: a tensor of shape (batch_size, num_documents) containing the ground-truth relevance labels for each document in each query in the batch.

The function first sorts the predicted scores in descending order and gets the corresponding indices. This is because we need to reorder the relevance labels in the same order as the predicted scores for calculating NDCG.

Then, it reorders the relevance labels according to the sorted indices.

Finally, it computes the NDCG score using the ndcg_score function from scikit-learn, which takes in two arguments:

* y_true: a list of shape (num_samples, num_documents) containing the true relevance labels for each query-document pair.
* y_score: a list of shape (num_samples, num_documents) containing the predicted scores for each query-document pair.

Here, we pass the reordered labels tensor as y_true and the original scores tensor as y_score. We also set k=10, which means we only consider the top 10 documents in the ranked list.

Finally, the function returns the negative of the NDCG score as the loss. The negative sign is used because the optimizer minimizes the loss, while we want to maximize the NDCG score.

In summary, the listwise_loss function calculates the NDCG score between the predicted scores and the ground-truth relevance labels, and returns the negative of the NDCG score as the loss. This loss is used to train the ListwiseLTR model to rank documents for a given query.

#### NDCG
Normalized Discounted Cumulative Gain (NDCG) is a ranking evaluation metric that measures the quality of a ranked list of items by comparing it to a ground truth or ideal ranking.

In other words, it evaluates how well a ranking algorithm has ranked a list of items in comparison to a perfect ranking. The perfect ranking is the one where the most relevant items appear at the top of the list and the least relevant items appear at the bottom of the list.

The metric is called "Normalized" because it takes into account the length of the ranking list and "Discounted" because it gives more weight to the items at the top of the list, as they are considered more important or relevant than the items lower down the list.

To calculate NDCG, we first calculate the Discounted Cumulative Gain (DCG) which is the sum of the relevance scores of the top-ranked items, discounted by their position in the list. Then, we divide DCG by the ideal DCG, which is the DCG of the perfect ranking.

The relevance score can be any numerical value that represents how relevant an item is to the query. For example, in the context of search engines, the relevance score can be based on the relevance of the document's content to the search query, or on the popularity of the document.

Finally, we normalize the result by dividing it by the maximum possible value of NDCG for a given ranking list. The result is a value between 0 and 1, where 1 indicates a perfect ranking and 0 indicates a completely random ranking.

NDCG is widely used in information retrieval and machine learning applications to evaluate the quality of ranking algorithms, particularly in the context of personalized search or recommendation systems

### Training

```python
import torch
from transformers import BertTokenizerFast, BertFeatureExtractor
from datasets import load_dataset
from torch.utils.data import DataLoader
from transformers import AdamW, get_linear_schedule_with_warmup
from sklearn.metrics import ndcg_score

# load the data
data = load_dataset('csv', data_files={'train': 'train.csv', 'validation': 'val.csv', 'test': 'test.csv'})

# define the tokenizer and feature extractor
tokenizer = BertTokenizerFast.from_pretrained('bert-base-uncased')
feature_extractor = BertFeatureExtractor.from_pretrained('bert-base-uncased')

# define the datasets and data loaders
train_dataset = CompanySearchDataset(data['train'], tokenizer, feature_extractor)
val_dataset = CompanySearchDataset(data['validation'], tokenizer, feature_extractor)
test_dataset = CompanySearchDataset(data['test'], tokenizer, feature_extractor)

train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=32)
test_loader = DataLoader(test_dataset, batch_size=32)

# define the model and optimizer
model = ListwiseLTR(query_feature_dim=768, document_feature_dim=768, hidden_dim=256, output_dim=1)
optimizer = AdamW(model.parameters(), lr=1e-5)

# define the learning rate scheduler
num_train_steps = len(train_loader) * 10
num_warmup_steps = int(0.1 * num_train_steps)
scheduler = get_linear_schedule_with_warmup(optimizer, num_warmup_steps, num_train_steps)

model.train()
num_epochs = 10

for epoch in range(num_epochs):
    for batch in train_loader:
        query_inputs = batch["query_inputs"].cuda()
        document_inputs = batch["document_inputs"].cuda()
        labels = batch["labels"].cuda()

        optimizer.zero_grad()
        scores = model(query_inputs, document_inputs)

        # calculate the loss
        loss = listwise_loss(scores, labels)
        loss.backward()

        # clip the gradients
        torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1)


        optimizer.step()
        scheduler.step()

    # calculate the NDCG metric on the validation set
    with torch.no_grad():
        model.eval()
        val_scores = []
        val_labels = []
        for batch in val_loader:
            query_inputs = batch["query_inputs"].cuda()
            document_inputs = batch["document_inputs"].cuda()
            labels = batch["labels"].cpu().numpy()
            scores = model(query_inputs, document_inputs).cpu().numpy()
            val_scores.extend(scores)
            val_labels.extend(labels)
        ndcg = ndcg_score([val_labels], [val_scores], k=10)
        print("Epoch:", epoch+1, "NDCG@10:", ndcg)
        model.train()
```
### Deployment

```python
# Load the trained model
model = ListwiseLTR(query_feature_dim=768, document_feature_dim=768, hidden_dim=256, output_dim=1)
model.load_state_dict(torch.load("path/to/trained/model.pth"))

# Set the model to evaluation mode
model.eval()

# Preprocess the query
query = "apple products"
query_inputs = tokenizer(query, padding="max_length", truncation=True, max_length=32, return_tensors="pt")
query_features = feature_extractor(query_inputs["input_ids"], attention_mask=query_inputs["attention_mask"])

# Run the query through the model to obtain scores for each document
with torch.no_grad():
    query_features = query_features.to(device)
    scores = model(query_features, document_features)

# Sort the documents by score in descending order to obtain the ranked list
sorted_indices = torch.argsort(scores, descending=True)
ranked_docs = [docs[i] for i in sorted_indices.tolist()]

# Return the top K documents from the ranked list as search results
K = 10
search_results = ranked_docs[:K]
```

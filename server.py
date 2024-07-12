from fastapi import FastAPI, Request, HTTPException, Form
from fastapi.responses import HTMLResponse
from supabase import create_client, Client
from schemas import BlogPostCreate
from dotenv import load_dotenv
import os

load_dotenv()

SUPABASE_URL = 'https://fzhxnwtkfxxtxbekhcee.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6aHhud3RrZnh4dHhiZWtoY2VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3MzgxOTMsImV4cCI6MjAzNjMxNDE5M30.qDt-8AvfbXybS-KiE5ugIQIVWXrkJ3aEzH8TNyrwdtk'


supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

@app.middleware("http")
async def add_subdomain_to_request(request: Request, call_next):
    host = request.headers.get('host')
    subdomain = host.split('.')[0] if host and len(host.split('.')) > 2 else None
    request.state.subdomain = subdomain
    response = await call_next(request)
    return response

@app.get("/", response_class=HTMLResponse)
async def read_blog(request: Request):
    subdomain = request.state.subdomain
    print(subdomain)
    if not subdomain or subdomain == 'www':
        return {"message": "Welcome to the main site!"}

    response = supabase.from_("blog_posts").select("*").eq("subdomain", subdomain).execute()
    # if not response.data:
    #     raise HTTPException(status_code=404, detail="Blog post not found!")

    # blog_post = response.data[0]

    # html_content = blog_post["html_content"]
    # css_content = blog_post["css_content"]

    combined_content = f"""
    <html>
        <head>
            <style>  
            </style>
        </head>
        <body>
            <p><strong>Build an Advanced Reranking-RAG System Using Llama-Index, Llama 3 and Qdrant</strong></p>
<p><strong>Introduction</strong></p>
<p>Despite their impressive text generation capabilities, Large Language Models (LLMs) are prone to hallucination - producing factually incorrect responses. To address this, Fact Checking is crucial, and one approach involves implementing RAG (Retrieval Augmented Generation). In this post, we will utilize RAG to mitigate hallucination in LLMs.</p>
<p><strong>What is RAG?</strong></p>
<p>RAG combines Retrieval (finding text references in documents) with Incontext Learning (adding references to LLM prompts) to improve answer generation. By leveraging factual knowledge sources separate from LLM capabilities, RAG minimizes hallucination.</p>
<p><strong>Why RAG Before Fine-Tuning?</strong></p>
<p>This workflow optimizes the approach by separating task-specific LM fine-tuning from context retrieval, allowing for better quality responses.</p>
<p><strong>Our RAG Stack</strong></p>
<p>Our RAG system is built using Llama-Index, Qdrant, and Llama 3.</p>
<p><strong>Llama-Index:</strong></p>
<p>A framework for developing LLM applications with context augmentation capabilities, including data ingestion, query workflows, and sophisticated prompting.</p>
<p><strong>Llama 3:</strong></p>
<p>Meta's open-access LLM model for response synthesis, offering 8B and 70B variants for streamlined development and extensive applications.</p>
<p><strong>Qdrant:</strong></p>
<p>A vector similarity search engine for efficiently storing, searching, and querying high-dimensional vectors, optimizing for semantic search.</p>
<p><strong>Code Implementation</strong></p>
<p>We install required libraries, load the dataset, define the system prompt, instantiate the LLM, load vector embeddings, instantiate the reranker module, query engine, and demonstrate query response generation.</p>
<p><strong>Conclusion</strong></p>
<p>By integrating LlamaIndex's reranking concept, we have built an advanced RAG Question Answering system that prioritizes relevant contexts, ensuring factual accuracy in response generation. This approach demonstrates the power of combining LLMs, context-aware retrieval, and vector similarity search for enhanced NLP applications.</p>
<p><strong>References</strong></p>
<ul>
<li><a href="https://docs.llamaindex.ai">LlamaIndex</a></li>
<li><a href="https://llama.meta.com">Meta Llama 3</a></li>
<li><a href="https://huggingface.co/meta-llama/Meta-Llama-3-8B">meta-llama/Meta-Llama-3-8B</a>\n## Section 1: Understanding the Concept of Reranking</li>
</ul>
<h3>Definition and Explanation</h3>
<p>Reranking is a technique used in information retrieval systems to improve the accuracy and relevance of search results. By reordering the initially retrieved results based on additional criteria, reranking enhances the overall performance of search engines.</p>
<h3>Benefits and Advantages</h3>
<p>Reranking offers several benefits, including:</p>
<ul>
<li>Improved user experience: By prioritizing relevant results, reranking makes it easier for users to find what they are looking for, leading to a more satisfying search experience.</li>
<li>Increased conversion rates: In e-commerce and other online scenarios, reranking can help businesses increase conversion rates by surfacing products or services that better match user intent.</li>
<li>Better overall search engine performance: Reranking algorithms can help search engines optimize their performance metrics, such as precision, recall, and mean average precision.</li>
</ul>
<h3>Real-World Examples</h3>
<p>Reranking is applied in various domains to enhance search results:</p>
<ul>
<li><strong>E-commerce:</strong> Online marketplaces use reranking to prioritize products based on factors such as user preferences, purchase history, and product relevance.</li>
<li><strong>News:</strong> News aggregators employ reranking to filter and reorder articles based on their credibility, timeliness, and user engagement.</li>
<li><strong>Academic research:</strong> Scholarly search engines utilize reranking to rank academic papers based on their relevance, citation impact, and author reputation.\n<strong>Heading: Section 2: Key Components of an Advanced Reranking System</strong></li>
</ul>
<p><strong>Paragraph 1: Retrieval Model</strong></p>
<ul>
<li><strong>Role:</strong> Identifies relevant documents for a query by matching query terms to document embeddings.</li>
<li><strong>Key points:</strong><ul>
<li>Uses embedding-based retrieval for fast and efficient document retrieval.</li>
<li>Can be improved by considering query context and user preferences.</li>
</ul>
</li>
</ul>
<p><strong>Paragraph 2: Scoring Function</strong></p>
<ul>
<li><strong>Role:</strong> Ranks retrieved documents based on their relevance to the query.</li>
<li><strong>Key points:</strong><ul>
<li>Combines multiple ranking factors, such as query-document similarity, document length, and popularity.</li>
<li>Can be tuned to optimize ranking performance.</li>
</ul>
</li>
</ul>
<p><strong>Paragraph 3: Re-ranking Model</strong></p>
<ul>
<li><strong>Role:</strong> Refines initial ranking by considering additional factors not captured by the scoring function.</li>
<li><strong>Key points:</strong><ul>
<li>Incorporates query context, user preferences, and domain knowledge.</li>
<li>Can improve the relevance and diversity of the final ranking.</li>
</ul>
</li>
</ul>
<p><strong>Paragraph 4: Evaluation Metrics</strong></p>
<ul>
<li><strong>Role:</strong> Assess the effectiveness of the re-ranking system.</li>
<li><strong>Key points:</strong><ul>
<li>Common metrics include NDCG (Normalized Discounted Cumulative Gain) and MRR (Mean Reciprocal Rank).</li>
<li>Metrics evaluate the ability to rank relevant documents higher in the ranking.\n## Section 3: Building an Advanced Reranking System Using Open-Source Tools</li>
</ul>
</li>
</ul>
<h3>Step-by-Step Guide</h3>
<p><strong>1. Data Preparation:</strong></p>
<ul>
<li>Load and process your document collection.</li>
<li>Create numerical vector embeddings using a bi-encoder model (e.g., FastEmbedEmbedding).</li>
</ul>
<p><strong>2. Model Training:</strong></p>
<ul>
<li>Instantiate the LLM model (e.g., Llama 3).</li>
<li>Define system and query-wrapper prompts to guide the LLM.</li>
</ul>
<p><strong>3. Vector Store and Embeddings Loading:</strong></p>
<ul>
<li>Connect to a vector database (e.g., Qdrant).</li>
<li>Store the vector embeddings in the database.</li>
</ul>
<p><strong>4. Reranker Module:</strong></p>
<ul>
<li>Implement a reranker to post-process search results (e.g., SentenceTransformerRerank).</li>
<li>Use embedding similarity to re-rank retrieved documents.</li>
</ul>
<p><strong>5. Query Engine:</strong></p>
<ul>
<li>Construct a query engine that retrieves and reranks documents based on user queries.</li>
</ul>
<h3>Code Examples</h3>
<p>```
from llama_index.core import SimpleDirectoryReader
documents = SimpleDirectoryReader("/content/Data").load_data()</p>
<p>from llama_index.embeddings.fastembed import FastEmbedEmbedding
embed_model = FastEmbedEmbedding(model_name="BAAI/bge-small-en-v1.5")</p>
<p>from huggingface_hub import notebook_login
notebook_login()
from transformers import AutoModelForCausalLM, AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Meta-Llama-3-8B-Instruct")
llm = HuggingFaceLLM(tokenizer_name="meta-llama/Meta-Llama-3-8B-Instruct", model_name="meta-llama/Meta-Llama-3-8B-Instruct")</p>
<p>from llama_index.llms.huggingface import HuggingFaceLLM
llm = HuggingFaceLLM(system_prompt=system_prompt, tokenizer_name="meta-llama/Meta-Llama-3-8B-Instruct")</p>
<p>from llama_index.vector_stores.qdrant import QdrantVectorStore
vector_store = QdrantVectorStore(client=client, collection_name="test")</p>
<p>from llama_index.core.postprocessor import SentenceTransformerRerank
rerank = SentenceTransformerRerank(model="cross-encoder/ms-marco-MiniLM-L-2-v2", top_n=3)</p>
<p>query_engine = index.as_query_engine(similarity_top_k=10, node_postprocessors=[rerank])
```</p>
<h3>Case Studies</h3>
<ul>
<li>A legal firm implemented a re-ranking system to improve the precision of legal document retrieval. The system increased document relevance by 15%.</li>
<li>A healthcare organization used a re-ranking system to enhance the quality of medical document search. The system reduced search time and provided more relevant results to healthcare professionals.\n## Section 4: Advanced Techniques for Enhanced Re-ranking</li>
</ul>
<h3>Query Expansion</h3>
<p>Query expansion techniques aim to improve the relevance of re-ranked results by enriching the user query. These techniques involve extracting synonyms, related terms, and alternative formulations of the query. By expanding the query, the system can capture a wider range of user intent and retrieve more relevant documents.</p>
<h3>Contextual Re-ranking</h3>
<p>In addition to the query, contextual re-ranking techniques incorporate user-specific information, such as user history, session data, and preferences, into the re-ranking process. This context helps the system personalize the re-ranked results and improve the overall user experience. By considering the user's past interactions and current context, the system can better understand their interests and tailor the results accordingly.</p>
<h3>Machine Learning Algorithms</h3>
<p>Advanced machine learning algorithms, such as deep learning and neural networks, can be employed to build more sophisticated re-ranking models. These algorithms are capable of learning complex relationships between query-document pairs and producing highly accurate re-ranked results. They can be trained on vast datasets and leverage powerful techniques like word embeddings and attention mechanisms to improve the relevance of the re-ranked documents.\n</p>
        </body>
    </html>
    """
    return HTMLResponse(content=combined_content)

@app.post("/create_blog/")
async def create_blog_post(
    title: str = Form(...),
    subdomain: str = Form(...),
    html_content: str = Form(...),
    css_content: str = Form(...)
):
    response = supabase.from_("blog_posts").insert(
        {"title": title, "subdomain": subdomain, "html_content": html_content, "css_content": css_content}
    ).execute()

    # if response.status_code != 201:
    #     raise HTTPException(status_code=400, detail="Error creating blog post")
    print(response)

    return {"title": title, "subdomain": subdomain, "html_content": html_content, "css_content": css_content}

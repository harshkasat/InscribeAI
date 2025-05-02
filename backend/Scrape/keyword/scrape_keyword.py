import os
import aiohttp
import json
import asyncio
from dotenv import load_dotenv
from exceptions.api_exceptions import APIError

load_dotenv()


class ScrapKeyword(object):
    def __init__(self):
        self.url = "https://serpapi.com/search.json?"
        self.api_key = os.environ.get("SERPAPI_API_KEY")
        if self.api_key is None:
            raise ValueError("SerpAPI API key is not given")

    async def google_trends_related_queries(self, title):
        print("Google Trends related queries")
        params = {
            "engine": "google_trends",
            "q": title,
            "data_type": "RELATED_QUERIES",
            "api_key": self.api_key,
        }
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(self.url, params=params, timeout=10) as response:
                    if response.status == 200:
                        results = await response.json()
                        related_queries = results.get("related_queries", {})

                        if not related_queries or not isinstance(related_queries, dict):
                            print("No related queries found or invalid response format")
                            return []

                        rising_queries = []
                        top_queries = []

                        # Safely get rising queries
                        if "rising" in related_queries and isinstance(related_queries["rising"], list):
                            rising_queries = [
                                item["query"] for item in related_queries["rising"]
                                if isinstance(item, dict) and "query" in item
                            ]

                        # Safely get top queries
                        if "top" in related_queries and isinstance(related_queries["top"], list):
                            top_queries = [
                                item["query"] for item in related_queries["top"]
                                if isinstance(item, dict) and "query" in item
                            ]

                        return rising_queries + top_queries

                    elif response.status == 404:
                        raise APIError(
                            status_code=response.status,
                            message="API request failed: 404 Not Found",
                        )
                    elif response.status == 500:
                        raise APIError(
                            status_code=response.status,
                            message="API request failed: 500 Internal Server Error",
                        )
        except Exception as e:
            raise APIError(
                status_code=500,
                message=f"An error occurred in related queries: {str(e)}",
            )

    async def google_trends_autocomplete(self, title):
        print("Google Trends autocomplete queries")
        params = {
            "engine": "google_trends_autocomplete",
            "q": title,
            "api_key": self.api_key,
        }

        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(self.url, params=params, timeout=10) as response:
                    if response.status == 200:
                        results = await response.json()
                        autocomplete_queries = results.get("suggestions", [])

                        if autocomplete_queries is None:
                            return []
                        return [item["title"] for item in autocomplete_queries]
                    elif response.status == 404:
                        raise APIError(
                            status_code=response.status,
                            message="API request failed: 404 Not Found",
                        )
                    elif response.status == 500:
                        raise APIError(
                            status_code=response.status,
                            message="API request failed: 500 Internal Server Error",
                        )
        except Exception as e:
            raise APIError(
                status_code=500,
                message=f"An error occurred in autocomplete : {str(e)}",
            )

    async def google_trends_related_topic(self, title):
        print("Google Trends related topics")
        params = {
            "engine": "google_trends",
            "q": title,
            "data_type": "RELATED_TOPICS",
            "api_key": self.api_key,
        }
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(self.url, params=params, timeout=10) as response:
                    if response.status == 200:
                        results = await response.json()
                        related_topics = results.get("related_topics", {})

                        if not related_topics or not isinstance(related_topics, dict):
                            print("No related topics found or invalid response format")
                            return []

                        rising_topics = []
                        top_topics = []

                        # Safely get rising queries
                        if "rising" in related_topics and isinstance(related_topics["rising"], list):
                            rising_topics = [
                                item["topic"]["title"] for item in related_topics["rising"]
                            ]

                        # Safely get top queries
                        if "top" in related_topics and isinstance(related_topics["top"], list):
                            top_topics = [
                                item["topic"]["title"] for item in related_topics["top"]
                            ]

                        return rising_topics + top_topics
                    elif response.status == 404:
                        raise APIError(
                            status_code=response.status,
                            message="API request failed: 404 Not Found",
                        )
                    elif response.status == 500:
                        raise APIError(
                            status_code=response.status,
                            message="API request failed: 500 Internal Server Error",
                        )
        except Exception as e:
            raise APIError(
                status_code=500,
                message=f"An error occurred in related topic : {str(e)}",
            )


async def main(title: str) -> list:
    try:
        scrap_keyword = ScrapKeyword()
        import time

        start = time.time()
        print("scraping keywords", title)
        results = await asyncio.gather(
            scrap_keyword.google_trends_related_queries(title),
            scrap_keyword.google_trends_autocomplete(title),
            scrap_keyword.google_trends_related_topic(title),
        )

        # Combine all results into one array
        combined_keywords = []
        for result in results:
            combined_keywords.extend(result)

        # Remove duplicates if needed
        combined_keywords = list(set(combined_keywords))

        print(f"Time taken: {time.time() - start} seconds")
        print(combined_keywords)
        return combined_keywords
        print(results)
    except Exception as e:
        print(f"Error in Scrape Keywords: {e}")
        return []

# if __name__ == "__main__":
#     title = "Advanced Reranking RAG"
#     asyncio.run(main(title))

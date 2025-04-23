import os
import sys
import requests
from bs4 import BeautifulSoup

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from LLM.Config.llm_config import ConfigLLM

class ScrapeWebsite(ConfigLLM):
    """
    A class for scraping website content.

    Attributes:
        url (str): The URL of the website to be scraped.

    Methods:
        __init__(self, url):
            Initialize the ScrapeWebsite object with the provided URL.

        fetch_content(self):
            Send an HTTP GET request to the URL and return the content.

        parse_content(self):
            Parse the HTML content using BeautifulSoup and return the parsed content.

        extract_data(self):
            Extract headers and paragraphs in order and return the extracted data.
    """

    def __init__(self, url):
        """
        Initialize the ScrapeWebsite object with the provided URL.

        Args:
            url (str): The URL of the website to be scraped.

        Returns:
            None
        """
        self.url = url
        super().__init__()

    def fetch_content(self):
        # Send an HTTP GET request to the URL
        response = requests.get(self.url)
        # Check if the request was successful
        if response.status_code == 200:
            return response.content
        else:
            raise Exception(f"Failed to fetch page content: {response.status_code}")

    def parse_content(self):
        # Parse the HTML content using BeautifulSoup
        try:
            soup = BeautifulSoup(self.fetch_content(), 'html.parser')

            return soup
        except Exception as e:
            print(f'When trying to parse content error found: {e}')

    def extract_data(self):
        try:
            # Extract headers and paragraphs in order
            data = ''
            for element in self.parse_content().find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre']):
                text = element.get_text(strip=True)
                data += text + '\n'
            return data

        except Exception as e:
            print(f'When trying to extract data error found: {e}')
    

    def summary_website_content(self):

        try:
            summary_content = self.llm.generate_content(f"Summary the content of the website: {self.extract_data()}")

            return summary_content.text
        except Exception as e:
            print(f'When trying to generate summary content error: {e}')

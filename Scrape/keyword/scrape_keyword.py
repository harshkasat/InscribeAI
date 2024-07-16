import os
import sys
import requests
from pytrends.request import TrendReq


class ScrapKeyword(object):

    def scrape_keyword(self, word:str):

        try:
            # Initialized the pytrends request
            pytrends = TrendReq(hl='en-US', tz=360)

            pytrends.build_payload([word], cat=0, timeframe='today 12-m', geo='', gprop='')
            related_queries = pytrends.related_queries()
            
            if word in related_queries:
                top_queries = related_queries[word]['top']
                rising_queries = related_queries[word]['rising']
                
                # Combine top and rising queries
                combined_queries = {}
                if top_queries is not None:
                    for item in top_queries.to_dict('records'):
                        combined_queries[item['query']] = item['value']
                
                if rising_queries is not None:
                    for item in rising_queries.to_dict('records'):
                        combined_queries[item['query']] = item['value']
                        
                # Sort combined queries by value in descending order
                sorted_queries = sorted(combined_queries.items(), key=lambda x: x[1], reverse=True)
                
                return sorted_queries
            else:
                return []

        except Exception as e:
            print("Error from scraping keyword for SEO found: ",e)

import json

# Blog Creation Imports
from Blog.Title.title import CreateTitle
from Blog.HeadingOutline.outline import CreateHeading
from Blog.Heading_n_Paragraph.blog_generation import BlogGeneration

# Web Scraping Imports
from Scrape.keyword.scrape_keyword import ScrapKeyword
from Scrape.website.scrape_website import ScrapeWebsite


class Main():

    def __init__(self, title:str, url_list:list, target_audience:str, desired_tone:str) -> None:

        self.title = title
        self.url_list = url_list
        self.target_audience = target_audience
        self.desired_tone = desired_tone


    def create_title(self):
        # Creating title blog using Ai
        try:
            generate_title = CreateTitle(title=self.title, target_audience=self.target_audience, Desired_tone=self.desired_tone).create_title()
            return generate_title

        except Exception as e:
            print(f'When trying to create title {self.title} error found: {e}')
    
    def scrape_keyword(self):
        # Scraping keywords for SEO
        try:
            keyword = ScrapKeyword().scrape_keyword(word=self.title)
            return keyword

        except Exception as e:
            print(f"When trying to scrape keywords {self.title} error found: {e}")


    def scrape_website(self):

        # Scraping website for more content
        try:
            website_content = ''
            for url in self.url_list:
                website_content += f' \n {ScrapeWebsite(url=url).summary_website_content()} \n '
            
            return website_content

        except Exception as e:
            print(f"When trying to scrape website {self.url_list} error found: {e}")
    
    def create_outline(self, title, description, keywords):
        # Creating outline blog using Ai
        try:
            generate_outline = CreateHeading(title=title, description=description, keywords=keywords).create_heading()
            return generate_outline
        
        except Exception as e:
            print(f'When trying to create outline of blog title: {title} with description: {description}  error found: {e}')
    
    def blog_generation(self, content, blog_title):
        blog_generation = BlogGeneration(json_response=content, title=blog_title).creating_blog()

        return blog_generation
    
    @staticmethod
    def main(blog_title:str, target_audience:str, website_url_list:list, desired_tone):
        res = Main(title=blog_title, 
                target_audience=target_audience, 
                desired_tone=desired_tone,
                url_list=website_url_list)
        
        title = res.create_title()

        keywords = res.scrape_keyword()

        website_content = res.scrape_website()

        outline = res.create_outline(title=title, description=website_content, keywords=keywords)
        
        result = res.blog_generation(content=outline, blog_title=title)

        return result




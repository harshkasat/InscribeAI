import json

# Blog Creation Imports
from Blog.Title.title import CreateTitle
from Blog.HeadingOutline.outline import CreateHeading
from Blog.Heading_n_Paragraph.blog_generation import BlogGeneration
from Website.Templates.create_template import Template

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
            print("Title created")
            return generate_title

        except Exception as e:
            print(f'When trying to create title {self.title} error found: {e}')
    
    def scrape_keyword(self):
        # Scraping keywords for SEO
        try:
            keyword = ScrapKeyword().scrape_keyword(word=self.title)
            print("Scraping keywords successfully")
            return keyword

        except Exception as e:
            print(f"When trying to scrape keywords {self.title} error found: {e}")


    def scrape_website(self):

        # Scraping website for more content
        try:
            website_content = []
            for url in self.url_list:
                website_content.append(ScrapeWebsite(url=url).extract_data())
            
            print("Scraping website successfully")
            return website_content

        except Exception as e:
            print(f"When trying to scrape website {self.url_list} error found: {e}")
    
    def create_outline(self, title, description, keywords):
        # Creating outline blog using Ai
        try:
            generate_outline = CreateHeading(title=title, description=description, keywords=keywords).create_heading()
            print("Outline created")
            return generate_outline
        
        except Exception as e:
            print(f'When trying to create outline of blog title: {title} with description: {description}  error found: {e}')
    
    def content_generation(self, content, blog_title, web_content):
        content_generation = BlogGeneration(json_response=content, title=blog_title, web_scrape=web_content).creating_blog()
        print("Content created")
        return content_generation
    
    def create_blog(self, content:str, title):
        # Creating blog blog using Ai
        try:
            template = Template().generate_template(title, raw_content=content)
            print("Blog created")
            return template
        except Exception as e:
            print(f'When trying to create blog {content} error found: {e}')
    

    @staticmethod
    def main(blog_title:str, target_audience:str, website_url_list:list, desired_tone:str):
        res = Main(title=blog_title, 
                target_audience=target_audience, 
                desired_tone=desired_tone,
                url_list=website_url_list)
        
        title = res.create_title()

        keywords = res.scrape_keyword()

        website_content = res.scrape_website()

        outline = res.create_outline(title=title, description=website_content, keywords=keywords)
        
        result = res.content_generation(content=outline, blog_title=title, web_content=website_content)

        blog = res.create_blog(title=title, content=result)

        return blog

if __name__ == '__main__':
    res = Main.main(blog_title="Build an Advanced Reranking RAG", target_audience="Beginner", website_url_list=["https://nayakpplaban.medium.com/build-an-advanced-reranking-rag-system-using-llama-index-llama-3-and-qdrant-a8b8654174bc"], desired_tone="Informative")
    print(res)
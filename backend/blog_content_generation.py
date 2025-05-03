import json
import asyncio
# Blog Creation Imports
from Blog.Title.title import CreateTitle
from Blog.HeadingOutline.outline import CreateHeading
from Blog.Heading_n_Paragraph.content_generation import BlogGenerator

# pylint: skip-file

# Web Scraping Imports
from Scrape.keyword import scrape_keyword
from Scrape.website.scrape_website import ScrapeWebsite


class BlogGeneration:
    def __init__(
        self, title: str, 
        url_list: list, 
        target_audience: str, 
        desired_tone: str
    ) -> None:
        self.title = title
        self.url_list = url_list
        self.target_audience = target_audience
        self.desired_tone = desired_tone

    async def create_title(self):
        # Creating title blog using Ai
        try:
            generate_title = CreateTitle(
                title=self.title,
                target_audience=self.target_audience,
                Desired_tone=self.desired_tone,
            ).create_title()
            return generate_title

        except Exception as e:
            print(f"When trying to create title {self.title} error found: {e}")

    async def create_subdomain(self):
        # Creating subdomain for blog
        try:
            subdomain = CreateTitle(
                title=self.title,
                target_audience=self.target_audience,
                Desired_tone=self.desired_tone,
            ).create_subdomain()
            print("Subdomain created")
            return subdomain

        except Exception as e:
            print(f"When trying to create subdomain {self.title} error found: {e}")

    async def scrape_keyword(self):
        # Scraping keywords for SEO
        try:
            keyword = await (scrape_keyword.scrape_seo_keyword(title=self.title))
            return keyword

        except Exception as e:
            print(f"When trying to scrape keywords {self.title} error found: {e}")

    async def scrape_website(self):
        # Scraping website for more content
        try:
            website_content = []
            for url in self.url_list:
                website_content.append(ScrapeWebsite(url=url).extract_data())

            return website_content

        except Exception as e:
            print(f"When trying to scrape website {self.url_list} error found: {e}")

    async def create_outline(self, title, description):
        # Creating outline blog using Ai
        try:
            generate_outline = CreateHeading(title=title, description=description
                                            ).create_outline()
            return generate_outline

        except Exception as e:
            print(
                f"When trying to create outline of blog title: {title} with description: {description}  error found: {e}"
            )

    async def content_generation(self, seo_keywords, scrape_context, sections):
        content_generation = BlogGenerator()

        blog_content = content_generation.generate_blog(
            blog_topic=self.title,
            target_audience=self.target_audience,
            desired_tone=self.desired_tone,
            seo_keywords=seo_keywords,
            sections=sections,
            context=scrape_context
        )

        print("Content created")
        return blog_content


    @staticmethod
    async def blog_generate(
        blog_title: str,
        target_audience: str,
        website_url_list: list,
        desired_tone: str
    ):
        res = BlogGeneration(
            title=blog_title,
            target_audience=target_audience,
            desired_tone=desired_tone,
            url_list=website_url_list,
        )

        title = await res.create_title()

        seo_keywords = await res.scrape_keyword()

        website_content = await res.scrape_website()

        outline = await res.create_outline(title=title, description=website_content)

        result = await res.content_generation(
            seo_keywords=seo_keywords,
            scrape_context=website_content,
            sections=outline,
        )

        # blog = await res.create_blog(title=title, content=result)

        return result

# if __name__ == "__main__":
#     # Example usage
#     title = "Build an Advanced Reranking RAG"
#     target_audience = "Beginner"
#     website_url_list = ["https://nayakpplaban.medium.com/build-an-advanced-reranking-rag-system-using-llama-index-llama-3-and-qdrant-a8b8654174bc"]
#     desired_tone = "Informative"

#     loop = asyncio.get_event_loop()
#     result = loop.run_until_complete(
#         BlogGeneration.blog_generate(title, target_audience, website_url_list, desired_tone)
#     )
#     # print(result)

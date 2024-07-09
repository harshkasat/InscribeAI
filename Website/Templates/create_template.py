import markdown


class Template:
    
    def generate_template(self, title:str, raw_content:str):
        html_content = markdown.markdown(raw_content)

        try:
            index = f"""<!DOCTYPE html> 
                    <html lang='en'> 
                    <head> 
                    <meta charset='UTF-8> 
                    <meta name='viewport' content='width=device-width, initial-scale=1.0'> 
                    <title>{title}</title> 
                    <link rel='stylesheet' href='templates/style.css'> 
                    </head>
                    <body>
                    {html_content}
                    </body>
                    </html>
                    """

            with open('templates/index.html', 'w') as file:
                file.write(index)
                return index

        except Exception as e:
            print(f"When trying to generate HTML template error found: {e}")
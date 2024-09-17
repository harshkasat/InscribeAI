import markdown


class Template:
    
    def generate_template(self, title:str, raw_content:str):
        html_content = markdown.markdown(raw_content)

        try:
            with open('templates/index.html', 'r', encoding='utf-8') as file_handle:
                html_file = file_handle.read()
        except FileNotFoundError:
            raise "File not found. When opening index.html"


        try:
            index = html_file.replace('{{ title }}', title)
            index = index.replace('{{ html_content }}', html_content)
            return index

        except Exception as e:
            print(f"When trying to generate HTML template error found: {e}")

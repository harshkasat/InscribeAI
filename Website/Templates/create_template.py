import markdown


class Template:
    
    def generate_template(self, title:str, raw_content:str):
        html_content = markdown.markdown(raw_content)

        try:
            index = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Generated Blog</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
    <link rel="stylesheet" href="../templates/style.css">
</head>
<body class="d-flex flex-column min-vh-100">
    <!-- Header -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="https://inscribe-ai.vercel.app/">Inscribe AI</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="https://inscribe-ai.vercel.app/#footer">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="https://inscribe-ai.vercel.app/#testimonial">Testimonials</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="https://inscribe-ai.vercel.app/#footer">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow-1">
        <div class="container my-5">
            <article class="blog-post">
                <h1 class="blog-title">{title}</h1>
                <div class="blog-content">
                  {html_content}
                </div>
            </article>
        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white py-4">
        <div class="container text-center">
            <div class="mb-3">
                <a href="https://twitter.com/harsh__kasat" class="text-white me-3" target="_blank"><i class="bi bi-twitter"></i></a>
                <a href="https://linkedin.com/in/harshkasat" class="text-white me-3" target="_blank"><i class="bi bi-linkedin"></i></a>
                <a href="https://github.com/harshkasat" class="text-white" target="_blank"><i class="bi bi-github"></i></a>
            </div>
            <p class="mb-0">&copy; 2024 INSCRIBEAI. All rights reserved.</p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
"""
            return index

        except Exception as e:
            print(f"When trying to generate HTML template error found: {e}")
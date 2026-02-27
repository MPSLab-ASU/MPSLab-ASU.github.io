import os
import re

news_dir = "src/content/news"
types = set()

for file in os.listdir(news_dir):
    if file.endswith('.md'):
        with open(os.path.join(news_dir, file), 'r') as f:
            content = f.read()
            match = re.search(r'type:\s*"(.*?)"', content)
            if match:
                types.add(match.group(1))

print("Types found:", types)

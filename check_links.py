
import os
import re
from urllib.parse import urlparse
from bs4 import BeautifulSoup

def check_broken_links(html_files):
    broken_links = []
    base_dir = os.getcwd()

    for html_file_path in html_files:
        try:
            with open(html_file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            soup = BeautifulSoup(content, 'html.parser')
            
            for a_tag in soup.find_all('a', href=True):
                href = a_tag['href']
                
                # Skip external links
                if urlparse(href).scheme:
                    continue

                # Handle relative paths
                if href.startswith('/'): # Absolute path from root
                    linked_file_path = os.path.join(base_dir, href[1:])
                else: # Relative path
                    linked_file_path = os.path.join(os.path.dirname(html_file_path), href)

                # Normalize path to handle '..' and '.'
                linked_file_path = os.path.normpath(linked_file_path)

                # Check if the file exists
                if not os.path.exists(linked_file_path) and not os.path.isdir(linked_file_path):
                    broken_links.append(f"File: {html_file_path}, Broken Link: {href} (Resolved to: {linked_file_path})")
            
            # Check script and link tags for resource paths
            for tag in soup.find_all(['script', 'link'], src=True):
                src = tag['src']
                if urlparse(src).scheme:
                    continue
                
                if src.startswith('/'):
                    linked_file_path = os.path.join(base_dir, src[1:])
                else:
                    linked_file_path = os.path.join(os.path.dirname(html_file_path), src)
                
                linked_file_path = os.path.normpath(linked_file_path)
                
                if not os.path.exists(linked_file_path):
                    broken_links.append(f"File: {html_file_path}, Missing Resource: {src} (Resolved to: {linked_file_path})")

            for tag in soup.find_all(['link'], href=True):
                href = tag['href']
                if urlparse(href).scheme or href.endswith('.html'): # Skip external links and html handled by a_tag
                    continue
                
                if href.startswith('/'):
                    linked_file_path = os.path.join(base_dir, href[1:])
                else:
                    linked_file_path = os.path.join(os.path.dirname(html_file_path), href)
                
                linked_file_path = os.path.normpath(linked_file_path)
                
                if not os.path.exists(linked_file_path):
                    broken_links.append(f"File: {html_file_path}, Missing Resource: {href} (Resolved to: {linked_file_path})")


        except Exception as e:
            broken_links.append(f"Error processing {html_file_path}: {e}")
            
    return broken_links

if __name__ == "__main__":
    # This list should be populated by the glob tool
    html_files = [
        "index.html", "about.html", "google753f0446d6dbafe0.html", "privacy.html", "tool-1.html",
        "tool-10.html", "tool-11.html", "tool-12.html", "tool-13.html", "tool-14.html",
        "tool-15.html", "tool-16.html", "tool-17.html", "tool-18.html", "tool-2.html",
        "tool-3.html", "tool-4.html", "tool-5.html", "tool-6.html", "tool-7.html",
        "tool-8.html", "tool-9.html"
    ]
    
    # Prepend current working directory to html_files
    html_files = [os.path.join(os.getcwd(), f) for f in html_files]

    broken_links = check_broken_links(html_files)

    if broken_links:
        for link in broken_links:
            print(link)
    else:
        print("No broken links found.")

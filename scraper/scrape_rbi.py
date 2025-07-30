import requests
from bs4 import BeautifulSoup
import json

url = 'https://rbi.org.in/home.aspx'
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

accordion_contents = soup.find_all("div", class_="accordionContent")
market_rates_table = accordion_contents[4].find("table")

market_rates = []

for row in market_rates_table.find_all("tr"):
    cols = row.find_all("td")
    if len(cols) == 2:
        rate_name = cols[0].text.strip()
        rate_value = cols[1].text.strip().replace(":", "")
        market_rates.append({
            "rate_name": rate_name,
            "rate_value": rate_value
        })

with open("market_rates.json", "w", encoding='utf-8') as f:
    json.dump(market_rates, f, indent=4, ensure_ascii=False)

print("Market rates scraped and saved to market_rates.json")

import pdfplumber
import pandas as pd
import re
import os

# Folder containing your PDFs
current_dir = os.path.dirname(os.path.abspath(__file__))

# Go up one level and then into 'pdf'
pdf_folder = os.path.join(current_dir, "..", "Feb")

print("Looking in:", os.path.abspath(pdf_folder))

if not os.path.exists(pdf_folder):
    print("Folder not found!")
    exit()

for filename in os.listdir(pdf_folder):
    if filename.endswith(".pdf"):
        print("Found PDF:", filename)

# List to collect data
all_data = []
# Extract date from text
def extract_date(text):
    match = re.search(r'February\s+\d{1,2},\s+\d{4}', text)
    return match.group(0) if match else "Date Not Found"

# Extract instrument values (Volume, Avg Rate, Range) using updated pattern
def extract_instrument_data(text, label, key):
    # Match exact line like: I.  Call Money       10,277.19 5.10 3.70-5.30
    pattern = re.compile(rf"{label}\s+([\d,]+\.\d+)\s+([\d.]+)\s+([\d.]+)-([\d.]+)")
    match = pattern.search(text)
    if match:
        volume = match.group(1).replace(",", "")
        avg_rate = match.group(2)
        range_val = f"{match.group(3)} - {match.group(4)}"
        return {
            "segment": "overnight",
            "instrument": key,
            "volume": volume,
            "weighted_avg_rate": avg_rate,
            "rate_range": range_val
        }
    return None

# Process each PDF
for filename in os.listdir(pdf_folder):
    if filename.endswith(".pdf"):
        path = os.path.join(pdf_folder, filename)
        with pdfplumber.open(path) as pdf:
            text = ''
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + '\n'

        if not text.strip():
            print("Empty text extracted. Skipping.")
            continue

        report_date = extract_date(text)

        for label, key in [
            ("I\\.\\s+Call Money", "callmoney"),
            ("II\\.\\s+Triparty Repo", "triparty repo"),
            ("III\\.\\s+Market Repo", "market repo")
        ]:
            data = extract_instrument_data(text, label, key)
            if data:
                data["date"] = report_date
                all_data.append(data)
            else:
                print(f"Could not extract data for: {key}")

# Convert to DataFrame and save
df = pd.DataFrame(all_data)

if not df.empty:
    output_file = os.path.join(current_dir, "feb_data.xlsx")
    df.to_excel(output_file, index=False)
    print(f"\nData saved to {output_file}")
else:
    print("\nNo data extracted. Excel file not created.")
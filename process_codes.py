import csv
import json

# Extract the data from the PLU csv list

data = {}

with open('Commodities_20210908020949.csv', 'r') as f:
    reader = csv.reader(f)
    for row in reader:
        code = row[0].strip()
        category = row[1].strip()
        sub_category = row[2].strip()
        variety = row[3].strip()
        size = row[4].strip().lower()

        if code == 'PLU':
            continue
        if category == 'ALL':
            continue
        if 'Retailer Assigned' in variety:
            continue
        if size in ['All other sizes', 'Bulk 3-pack (3 pints)', '3-7 LBS']:
            continue

        data[code] = {
            'category': category,
            'sub_category': sub_category,
            'variety': variety,
            'size': size,
        }

print(json.dumps(data))


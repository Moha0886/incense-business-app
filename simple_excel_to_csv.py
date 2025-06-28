import pandas as pd

# Load the Excel file
excel_path = "areej.xlsx"
xls = pd.ExcelFile(excel_path)

print(f"Found sheets: {xls.sheet_names}")

# Convert each sheet to CSV
for sheet in xls.sheet_names:
    print(f"Processing sheet: {sheet}")
    df = xls.parse(sheet)
    # Save each sheet as a CSV file
    csv_name = f"{sheet.strip().replace(' ', '_')}.csv"
    df.to_csv(csv_name, index=False)
    print(f"Saved {csv_name} - {df.shape[0]} rows, {df.shape[1]} columns")
    
    # Show preview
    print("Columns:", list(df.columns))
    print("First few rows:")
    print(df.head(3))
    print("-" * 50)

print("All sheets converted to CSV files!")

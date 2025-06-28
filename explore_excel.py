import pandas as pd
import os
import sys

def explore_excel_file(filename):
    """Explore the structure of an Excel file and display information about its contents."""
    
    # Check if file exists
    if not os.path.exists(filename):
        print(f"Error: File '{filename}' not found in current directory.")
        print(f"Current directory: {os.getcwd()}")
        print("Available files:")
        for file in os.listdir("."):
            if file.endswith(('.xlsx', '.xls', '.csv')):
                print(f"  - {file}")
        return False
    
    try:
        # Load the Excel file
        xls = pd.ExcelFile(filename)
        
        print(f"=== Excel File Analysis: {filename} ===")
        print(f"Number of sheets: {len(xls.sheet_names)}")
        print(f"Sheet names: {xls.sheet_names}")
        print()
        
        # Analyze each sheet
        for i, sheet_name in enumerate(xls.sheet_names):
            print(f"--- Sheet {i+1}: '{sheet_name}' ---")
            
            try:
                # Try reading with different options to handle various Excel formats
                print(f"Attempting to read sheet with different options...")
                
                # Option 1: Read normally
                try:
                    df = pd.read_excel(filename, sheet_name=sheet_name)
                    print(f"✅ Successfully read with default settings")
                except Exception as e:
                    print(f"❌ Default read failed: {e}")
                    df = None
                
                # Option 2: Skip rows if default fails or if there are empty rows at top
                if df is None or df.empty or df.columns.str.contains('Unnamed').any():
                    for skip_rows in [1, 2, 3, 4, 5]:
                        try:
                            df_skip = pd.read_excel(filename, sheet_name=sheet_name, skiprows=skip_rows)
                            if not df_skip.empty and not df_skip.columns.str.contains('Unnamed').all():
                                df = df_skip
                                print(f"✅ Successfully read by skipping {skip_rows} rows")
                                break
                        except Exception as e:
                            continue
                
                # Option 3: Try different header row
                if df is None or df.empty:
                    try:
                        df = pd.read_excel(filename, sheet_name=sheet_name, header=None)
                        print(f"✅ Read with no header (raw data)")
                    except Exception as e:
                        print(f"❌ Failed to read even without header: {e}")
                        continue
                
                if df is not None and not df.empty:
                    print(f"Dimensions: {df.shape[0]} rows × {df.shape[1]} columns")
                    print(f"Columns: {list(df.columns)}")
                    print()
                    
                    # Show raw data preview
                    print("First 5 rows (raw data):")
                    print(df.head())
                    print()
                    
                    # Show last 5 rows to see data structure
                    if len(df) > 5:
                        print("Last 5 rows:")
                        print(df.tail())
                        print()
                    
                    print("Data types:")
                    print(df.dtypes)
                    print()
                    
                    # Show sample non-null values for each column
                    print("Sample values per column:")
                    for col in df.columns:
                        non_null_values = df[col].dropna()
                        if len(non_null_values) > 0:
                            sample_values = non_null_values.head(3).tolist()
                            print(f"  {col}: {sample_values}")
                    print()
                    
                    # Check for potential data patterns
                    print("Data Analysis:")
                    print(f"- Empty rows: {df.isnull().all(axis=1).sum()}")
                    print(f"- Rows with any data: {(~df.isnull().all(axis=1)).sum()}")
                    
                    # Look for potential headers in data
                    for i in range(min(10, len(df))):
                        row_data = df.iloc[i].dropna().astype(str).tolist()
                        if any(keyword in ' '.join(row_data).lower() for keyword in ['name', 'product', 'cost', 'ingredient', 'price']):
                            print(f"- Potential header row {i+1}: {row_data}")
                    
                    print()
                    print("=" * 50)
                    print()
                else:
                    print("❌ Could not read this sheet successfully")
                    print()
                
            except Exception as e:
                print(f"Error reading sheet '{sheet_name}': {e}")
                print()
        
        return True
        
    except Exception as e:
        print(f"Error reading Excel file: {e}")
        return False

# Main execution
if __name__ == "__main__":
    filename = "areej.xlsx"
    if len(sys.argv) > 1:
        filename = sys.argv[1]
    
    explore_excel_file(filename)

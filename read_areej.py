#!/usr/bin/env python3
"""
Specific Excel Reader for areej.xlsx
Includes options for different sheet names and skipping rows
"""

import pandas as pd
import os
import sys

def read_areej_excel():
    """Read areej.xlsx with various options to handle different formats."""
    
    filename = "areej.xlsx"
    
    if not os.path.exists(filename):
        print(f"❌ Error: File '{filename}' not found in current directory.")
        print(f"Current directory: {os.getcwd()}")
        print("Available files:")
        for file in os.listdir("."):
            if file.endswith(('.xlsx', '.xls', '.csv')):
                print(f"  - {file}")
        return None
    
    try:
        # First, explore the Excel file structure
        xls = pd.ExcelFile(filename)
        print(f"📊 Excel File: {filename}")
        print(f"Sheet names: {xls.sheet_names}")
        print()
        
        # Try different reading strategies for each sheet
        for sheet_name in xls.sheet_names:
            print(f"--- Analyzing Sheet: '{sheet_name}' ---")
            
            # Strategy 1: Read normally
            try:
                df = pd.read_excel(filename, sheet_name=sheet_name)
                print(f"✅ Default read successful: {df.shape[0]} rows × {df.shape[1]} columns")
                show_df_preview(df, "Default read")
            except Exception as e:
                print(f"❌ Default read failed: {e}")
                df = None
            
            # Strategy 2: Skip rows (as in your example)
            for skip_rows in [1, 2, 3, 4, 5]:
                try:
                    df_skip = pd.read_excel(filename, sheet_name=sheet_name, skiprows=skip_rows)
                    if not df_skip.empty and has_meaningful_data(df_skip):
                        print(f"✅ Skip {skip_rows} rows successful: {df_skip.shape[0]} rows × {df_skip.shape[1]} columns")
                        show_df_preview(df_skip, f"Skipping {skip_rows} rows")
                        
                        # Save this version if it looks good
                        if df is None or df_skip.shape[0] > df.shape[0]:
                            df = df_skip
                            print(f"🎯 This looks like the best version (skipping {skip_rows} rows)")
                        break
                except Exception as e:
                    continue
            
            # Strategy 3: Different header options
            try:
                df_no_header = pd.read_excel(filename, sheet_name=sheet_name, header=None)
                print(f"✅ No header read: {df_no_header.shape[0]} rows × {df_no_header.shape[1]} columns")
                show_df_preview(df_no_header, "No header")
            except Exception as e:
                print(f"❌ No header read failed: {e}")
            
            print("\n" + "="*60 + "\n")
        
        return df
        
    except Exception as e:
        print(f"❌ Error reading Excel file: {e}")
        return None

def has_meaningful_data(df):
    """Check if DataFrame has meaningful data (not all unnamed columns or empty)."""
    if df.empty:
        return False
    
    # Check if most columns are unnamed
    unnamed_cols = sum(1 for col in df.columns if 'Unnamed' in str(col))
    total_cols = len(df.columns)
    
    if unnamed_cols > total_cols * 0.5:  # More than 50% unnamed columns
        return False
    
    # Check if there's actual data
    non_null_cells = df.notna().sum().sum()
    total_cells = df.shape[0] * df.shape[1]
    
    return non_null_cells > total_cells * 0.1  # At least 10% non-null data

def show_df_preview(df, title):
    """Show a preview of the DataFrame."""
    print(f"\n--- {title} ---")
    print(f"Columns: {list(df.columns)}")
    print("First 3 rows:")
    print(df.head(3))
    
    # Show sample data for each column
    print("\nSample data per column:")
    for col in df.columns:
        non_null = df[col].dropna()
        if len(non_null) > 0:
            samples = non_null.head(2).astype(str).tolist()
            print(f"  {col}: {samples}")
    print()

def specific_read_examples():
    """Show specific examples of how to read the Excel file."""
    filename = "areej.xlsx"
    
    if not os.path.exists(filename):
        print(f"❌ File {filename} not found")
        return
    
    # Get sheet names first
    xls = pd.ExcelFile(filename)
    print(f"Available sheets: {xls.sheet_names}")
    
    # Example reads - replace "Your Sheet Name" with actual sheet name
    examples = [
        # Your exact example
        ('df = pd.read_excel("areej.xlsx", sheet_name="Your Sheet Name", skiprows=5)', 5),
        
        # Other common patterns
        ('df = pd.read_excel("areej.xlsx", sheet_name=0)', 0),  # First sheet
        ('df = pd.read_excel("areej.xlsx", sheet_name=0, skiprows=1)', 1),
        ('df = pd.read_excel("areej.xlsx", sheet_name=0, skiprows=2)', 2),
        ('df = pd.read_excel("areej.xlsx", sheet_name=0, skiprows=3)', 3),
    ]
    
    print("\n🧪 Testing different read methods:")
    print("="*50)
    
    for description, skip_rows in examples:
        print(f"\nTrying: {description}")
        try:
            if skip_rows == 0:
                df = pd.read_excel(filename, sheet_name=0)
            else:
                df = pd.read_excel(filename, sheet_name=0, skiprows=skip_rows)
            
            print(f"✅ Success: {df.shape[0]} rows × {df.shape[1]} columns")
            print(f"Columns: {list(df.columns)[:5]}...")  # First 5 columns
            print(f"Sample data:")
            print(df.head(2))
            
        except Exception as e:
            print(f"❌ Failed: {e}")
        
        print("-" * 30)

if __name__ == "__main__":
    print("🔍 Areej Excel File Reader")
    print("="*40)
    
    # Run the analysis
    df = read_areej_excel()
    
    print("\n" + "="*60)
    print("SPECIFIC READ EXAMPLES")
    print("="*60)
    
    # Show specific examples
    specific_read_examples()

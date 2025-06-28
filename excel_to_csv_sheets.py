#!/usr/bin/env python3
"""
Convert Excel sheets to individual CSV files
This script converts each sheet in areej.xlsx to a separate CSV file for analysis
"""

import pandas as pd
import os
import re

def clean_filename(filename):
    """Clean filename to be filesystem-safe."""
    # Remove or replace problematic characters
    cleaned = re.sub(r'[<>:"/\\|?*]', '_', filename)
    cleaned = cleaned.strip().replace(' ', '_')
    # Remove multiple underscores
    cleaned = re.sub(r'_+', '_', cleaned)
    # Remove leading/trailing underscores
    cleaned = cleaned.strip('_')
    return cleaned if cleaned else 'unnamed_sheet'

def convert_excel_to_csvs():
    """Convert each sheet in areej.xlsx to separate CSV files."""
    
    excel_path = "areej.xlsx"
    
    # Check if Excel file exists
    if not os.path.exists(excel_path):
        print(f"❌ Error: File '{excel_path}' not found in current directory.")
        print(f"Current directory: {os.getcwd()}")
        print("Available files:")
        for file in os.listdir("."):
            if file.endswith(('.xlsx', '.xls', '.csv')):
                print(f"  - {file}")
        return False
    
    try:
        print(f"📊 Converting Excel file: {excel_path}")
        print("=" * 50)
        
        # Load the Excel file
        xls = pd.ExcelFile(excel_path)
        
        print(f"Found {len(xls.sheet_names)} sheet(s):")
        for i, sheet in enumerate(xls.sheet_names):
            print(f"{i+1:2d}. {sheet}")
        
        print("\n🔄 Converting sheets to CSV files...")
        print("-" * 50)
        
        # Convert each sheet to CSV
        converted_files = []
        
        for sheet_index, sheet in enumerate(xls.sheet_names):
            try:
                print(f"Processing sheet: '{sheet}'")
                
                # Try different reading strategies
                df = None
                method_used = ""
                
                # Strategy 1: Read normally
                try:
                    df = xls.parse(sheet)
                    method_used = "default"
                    print(f"  ✅ Read successfully: {df.shape[0]} rows × {df.shape[1]} columns")
                except Exception as e:
                    print(f"  ⚠️  Default read failed: {e}")
                
                # Strategy 2: Skip rows if needed
                if df is None or df.empty or df.columns.str.contains('Unnamed').any():
                    for skip_rows in [1, 2, 3, 4, 5]:
                        try:
                            df_skip = pd.read_excel(excel_path, sheet_name=sheet, skiprows=skip_rows)
                            if not df_skip.empty and not df_skip.columns.str.contains('Unnamed').all():
                                df = df_skip
                                method_used = f"skip_{skip_rows}_rows"
                                print(f"  ✅ Success by skipping {skip_rows} rows: {df.shape[0]} rows × {df.shape[1]} columns")
                                break
                        except Exception:
                            continue
                
                if df is not None and not df.empty:
                    # Create clean filename
                    csv_name = f"{clean_filename(sheet)}.csv"
                    
                    # Avoid filename conflicts
                    counter = 1
                    original_csv_name = csv_name
                    while os.path.exists(csv_name):
                        name_part = original_csv_name.replace('.csv', '')
                        csv_name = f"{name_part}_{counter}.csv"
                        counter += 1
                    
                    # Save to CSV
                    df.to_csv(csv_name, index=False)
                    converted_files.append({
                        'sheet': sheet,
                        'file': csv_name,
                        'method': method_used,
                        'rows': df.shape[0],
                        'cols': df.shape[1],
                        'columns': list(df.columns)[:5]  # First 5 columns
                    })
                    
                    print(f"  💾 Saved as: {csv_name}")
                    
                    # Show preview of data
                    print(f"  📋 Columns: {list(df.columns)[:3]}{'...' if len(df.columns) > 3 else ''}")
                    if not df.empty:
                        print(f"  📄 Sample data:")
                        for i, (_, row) in enumerate(df.head(2).iterrows()):
                            sample_values = [str(val)[:20] for val in row.dropna().head(3)]
                            print(f"      Row {i+1}: {sample_values}")
                
                else:
                    print(f"  ❌ Could not read sheet '{sheet}'")
                
                print()
                
            except Exception as e:
                print(f"  ❌ Error processing sheet '{sheet}': {e}")
                print()
                continue
        
        # Summary
        print("=" * 50)
        print("📋 CONVERSION SUMMARY")
        print("=" * 50)
        
        if converted_files:
            print(f"✅ Successfully converted {len(converted_files)} sheet(s):")
            print()
            
            for file_info in converted_files:
                print(f"📄 {file_info['file']}")
                print(f"   📊 Source: Sheet '{file_info['sheet']}'")
                print(f"   📐 Size: {file_info['rows']} rows × {file_info['cols']} columns")
                print(f"   🔧 Method: {file_info['method']}")
                print(f"   📋 Columns: {file_info['columns']}{'...' if file_info['cols'] > 5 else ''}")
                print()
            
            print("💡 Next steps:")
            print("1. Open the CSV files to examine the data structure")
            print("2. Identify which file contains your product/cost data")
            print("3. Use that file with the flexible_excel_converter.py script")
            print("4. Or manually format the data to match the app's CSV template")
            
        else:
            print("❌ No sheets were successfully converted.")
            print("The Excel file may be corrupted or in an unsupported format.")
        
        return len(converted_files) > 0
        
    except Exception as e:
        print(f"❌ Error reading Excel file: {e}")
        return False

if __name__ == "__main__":
    print("🔄 Excel to CSV Sheet Converter")
    print("Converting areej.xlsx sheets to individual CSV files")
    print()
    
    success = convert_excel_to_csvs()
    
    if success:
        print("\n🎉 Conversion completed successfully!")
        print("Check the CSV files in the current directory.")
    else:
        print("\n❌ Conversion failed. Please check the Excel file and try again.")

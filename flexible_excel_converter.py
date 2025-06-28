#!/usr/bin/env python3
"""
Flexible Excel to CSV Converter for Incense Business App

This script converts Excel files to the CSV template format used by the incense business app.
It can handle various Excel structures and provides interactive prompts to map columns.
"""

import pandas as pd
import os
import sys
import re
from typing import Dict, List, Optional

def clean_column_name(name: str) -> str:
    """Clean and standardize column names."""
    if pd.isna(name):
        return ""
    return str(name).strip()

def find_product_name_column(columns: List[str]) -> Optional[str]:
    """Try to automatically identify the product name column."""
    name_keywords = ['name', 'product', 'item', 'scent', 'fragrance', 'type']
    for col in columns:
        col_lower = col.lower()
        if any(keyword in col_lower for keyword in name_keywords):
            return col
    return None

def find_cost_columns(columns: List[str]) -> List[str]:
    """Try to automatically identify cost/price columns."""
    cost_keywords = ['cost', 'price', 'amount', 'naira', '₦', 'expense']
    cost_columns = []
    for col in columns:
        col_lower = col.lower()
        if any(keyword in col_lower for keyword in cost_keywords):
            cost_columns.append(col)
    return cost_columns

def find_ingredient_columns(columns: List[str]) -> List[str]:
    """Try to automatically identify ingredient columns."""
    ingredient_keywords = ['ingredient', 'material', 'component', 'raw', 'oil', 'dpg', 'alcohol']
    ingredient_columns = []
    for col in columns:
        col_lower = col.lower()
        if any(keyword in col_lower for keyword in ingredient_keywords):
            ingredient_columns.append(col)
    return ingredient_columns

def display_columns_with_sample_data(df: pd.DataFrame) -> None:
    """Display columns with sample data to help user identify correct columns."""
    print("\nColumns in the Excel file with sample data:")
    print("-" * 50)
    
    for i, col in enumerate(df.columns):
        print(f"{i+1:2d}. {col}")
        # Show first few non-null values
        non_null_values = df[col].dropna().head(3)
        if len(non_null_values) > 0:
            sample_str = ", ".join([str(val)[:30] for val in non_null_values])
            print(f"    Sample: {sample_str}")
        else:
            print(f"    Sample: (no data)")
        print()

def get_user_column_selection(columns: List[str], purpose: str, auto_suggestions: List[str] = None) -> Optional[str]:
    """Get user's column selection for a specific purpose."""
    print(f"\nSelect column for {purpose}:")
    
    if auto_suggestions:
        print(f"Auto-detected suggestions: {', '.join(auto_suggestions)}")
    
    print("Enter column number (or 0 to skip):")
    
    try:
        choice = input("> ").strip()
        if choice == "0" or choice.lower() == "skip":
            return None
        
        choice_num = int(choice)
        if 1 <= choice_num <= len(columns):
            return columns[choice_num - 1]
        else:
            print("Invalid selection. Skipping.")
            return None
    except (ValueError, KeyboardInterrupt):
        print("Invalid input. Skipping.")
        return None

def convert_excel_to_csv(excel_file: str, output_file: str = None) -> bool:
    """Convert Excel file to CSV template format."""
    
    if not os.path.exists(excel_file):
        print(f"Error: File '{excel_file}' not found.")
        return False
    
    if output_file is None:
        base_name = os.path.splitext(excel_file)[0]
        output_file = f"{base_name}_converted.csv"
    
    try:
        # Read Excel file
        print(f"Reading Excel file: {excel_file}")
        
        # Handle multiple sheets
        xls = pd.ExcelFile(excel_file)
        
        if len(xls.sheet_names) > 1:
            print(f"\nFound {len(xls.sheet_names)} sheets:")
            for i, sheet in enumerate(xls.sheet_names):
                print(f"{i+1}. {sheet}")
            
            try:
                sheet_choice = input("Select sheet number (default: 1): ").strip()
                if sheet_choice:
                    sheet_index = int(sheet_choice) - 1
                else:
                    sheet_index = 0
                
                if 0 <= sheet_index < len(xls.sheet_names):
                    selected_sheet = xls.sheet_names[sheet_index]
                else:
                    selected_sheet = xls.sheet_names[0]
            except (ValueError, KeyboardInterrupt):
                selected_sheet = xls.sheet_names[0]
        else:
            selected_sheet = xls.sheet_names[0]
        
        print(f"Using sheet: {selected_sheet}")
        
        # Try different reading strategies
        df = None
        successful_method = ""
        
        # Strategy 1: Read normally
        try:
            df = pd.read_excel(excel_file, sheet_name=selected_sheet)
            successful_method = "default read"
            print(f"✅ Default read successful: {df.shape[0]} rows × {df.shape[1]} columns")
        except Exception as e:
            print(f"❌ Default read failed: {e}")
        
        # Strategy 2: Skip rows if default fails or has issues
        if df is None or df.empty or df.columns.str.contains('Unnamed').any():
            print("🔄 Trying with skipped rows...")
            for skip_rows in [1, 2, 3, 4, 5]:
                try:
                    df_skip = pd.read_excel(excel_file, sheet_name=selected_sheet, skiprows=skip_rows)
                    if not df_skip.empty and not df_skip.columns.str.contains('Unnamed').all():
                        df = df_skip
                        successful_method = f"skipping {skip_rows} rows"
                        print(f"✅ Success by skipping {skip_rows} rows: {df.shape[0]} rows × {df.shape[1]} columns")
                        break
                except Exception as e:
                    continue
        
        # Strategy 3: Read without header if still failing
        if df is None or df.empty:
            try:
                df = pd.read_excel(excel_file, sheet_name=selected_sheet, header=None)
                successful_method = "no header"
                print(f"✅ Success reading without header: {df.shape[0]} rows × {df.shape[1]} columns")
            except Exception as e:
                print(f"❌ Failed even without header: {e}")
                return False
        
        print(f"📊 Successfully loaded data using: {successful_method}")
        print(f"Loaded {len(df)} rows and {len(df.columns)} columns")
        
        # Clean column names
        df.columns = [clean_column_name(col) for col in df.columns]
        
        # Show sample data
        display_columns_with_sample_data(df)
        
        # Auto-detect columns
        product_suggestions = [col for col in [find_product_name_column(df.columns)] if col]
        cost_suggestions = find_cost_columns(df.columns)
        ingredient_suggestions = find_ingredient_columns(df.columns)
        
        # Get user input for column mapping
        print("\n" + "="*60)
        print("COLUMN MAPPING")
        print("="*60)
        
        product_col = get_user_column_selection(df.columns, "PRODUCT NAME", product_suggestions)
        
        # Get ingredient columns (can be multiple)
        ingredient_cols = []
        print(f"\nIngredient columns (you can select multiple):")
        print("Suggested:", ", ".join(ingredient_suggestions) if ingredient_suggestions else "None")
        
        while True:
            col = get_user_column_selection(df.columns, f"INGREDIENT #{len(ingredient_cols)+1} (or 0 to finish)", [])
            if col is None:
                break
            ingredient_cols.append(col)
        
        # Get cost columns (can be multiple)
        cost_cols = []
        print(f"\nCost columns (you can select multiple):")
        print("Suggested:", ", ".join(cost_suggestions) if cost_suggestions else "None")
        
        while True:
            col = get_user_column_selection(df.columns, f"COST #{len(cost_cols)+1} (or 0 to finish)", [])
            if col is None:
                break
            cost_cols.append(col)
        
        # Convert to template format
        print("\nConverting to CSV template format...")
        
        converted_rows = []
        
        for index, row in df.iterrows():
            if product_col and pd.notna(row[product_col]):
                # Create product entry
                product_name = str(row[product_col]).strip()
                
                # Collect ingredients
                ingredients = []
                if ingredient_cols:
                    for ing_col in ingredient_cols:
                        if pd.notna(row[ing_col]):
                            ingredients.append(str(row[ing_col]).strip())
                
                # Collect costs
                costs = []
                if cost_cols:
                    for cost_col in cost_cols:
                        if pd.notna(row[cost_col]):
                            # Try to extract numeric value
                            cost_value = row[cost_col]
                            if isinstance(cost_value, str):
                                # Remove currency symbols and extract numbers
                                cost_str = re.sub(r'[₦,\s]', '', cost_value)
                                try:
                                    cost_value = float(cost_str)
                                except ValueError:
                                    cost_value = cost_value
                            costs.append(str(cost_value))
                
                # Create CSV row
                csv_row = {
                    'PRODUCT': product_name,
                    'CATEGORY': 'Imported',  # Default category
                    'PRICE': '100',  # Default price - user can modify
                    'OUTPUT_PER_BATCH': '1',  # Default - user can modify
                    'UNIT': 'bottle',  # Default unit
                    'INGREDIENTS': ' | '.join(ingredients) if ingredients else '',
                    'COST': ' | '.join(costs) if costs else ''
                }
                
                converted_rows.append(csv_row)
        
        # Create DataFrame and save
        if converted_rows:
            result_df = pd.DataFrame(converted_rows)
            result_df.to_csv(output_file, index=False)
            
            print(f"\n✅ Successfully converted {len(converted_rows)} products to {output_file}")
            print(f"\nPreview of converted data:")
            print(result_df.head())
            
            print(f"\n📝 Note: Default values were used for CATEGORY, PRICE, OUTPUT_PER_BATCH, and UNIT.")
            print(f"You can edit these in the CSV file or after importing to the app.")
            
            return True
        else:
            print("❌ No data was converted. Please check your column selections.")
            return False
            
    except Exception as e:
        print(f"❌ Error converting file: {e}")
        return False

def main():
    """Main function to handle command line usage."""
    print("🧪 Flexible Excel to CSV Converter for Incense Business App")
    print("=" * 60)
    
    if len(sys.argv) > 1:
        excel_file = sys.argv[1]
    else:
        # Look for Excel files in current directory
        excel_files = [f for f in os.listdir('.') if f.endswith(('.xlsx', '.xls'))]
        
        if not excel_files:
            print("❌ No Excel files found in current directory.")
            print("Usage: python3 flexible_excel_converter.py <excel_file>")
            return
        elif len(excel_files) == 1:
            excel_file = excel_files[0]
            print(f"📁 Found Excel file: {excel_file}")
        else:
            print("📁 Multiple Excel files found:")
            for i, f in enumerate(excel_files):
                print(f"{i+1}. {f}")
            
            try:
                choice = input("Select file number: ").strip()
                choice_num = int(choice)
                if 1 <= choice_num <= len(excel_files):
                    excel_file = excel_files[choice_num - 1]
                else:
                    print("Invalid selection.")
                    return
            except (ValueError, KeyboardInterrupt):
                print("Invalid input.")
                return
    
    # Get output filename
    output_file = None
    if len(sys.argv) > 2:
        output_file = sys.argv[2]
    
    # Convert the file
    success = convert_excel_to_csv(excel_file, output_file)
    
    if success:
        print("\n✅ Conversion completed! You can now upload the CSV file to your incense business app.")
    else:
        print("\n❌ Conversion failed. Please check the file and try again.")

if __name__ == "__main__":
    main()

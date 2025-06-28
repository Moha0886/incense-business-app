#!/usr/bin/env python3
"""
Specialized converter for your areej.xlsx file format
Converts the multi-column product layout to the app's CSV template format
"""

import pandas as pd
import re

def convert_areej_excel_to_app_format():
    """Convert the areej.xlsx file to the app's CSV template format."""
    
    print("🧪 Converting areej.xlsx to Incense Business App Format")
    print("=" * 60)
    
    # Read the Excel file with the correct skip rows
    try:
        df = pd.read_excel("areej.xlsx", sheet_name=0, skiprows=2)
        print(f"✅ Successfully read Excel file: {df.shape[0]} rows × {df.shape[1]} columns")
        
        # Show the structure
        print("\n📋 File structure preview:")
        print(df.head())
        print()
        
        # The file has multiple products in columns
        # Let's identify the product columns
        
        # First row contains product names
        product_row = df.iloc[0]  # This should be the row with AREEJ, KAJIJI, etc.
        
        print("🎯 Identified products:")
        products_found = []
        
        # Find product columns (non-empty cells in the first data row)
        for col_idx, cell in enumerate(product_row):
            if pd.notna(cell) and str(cell).strip():
                product_name = str(cell).strip()
                if product_name not in ['S/NO', 'INGREDIENTS', 'COST']:
                    products_found.append({
                        'name': product_name,
                        'col_idx': col_idx,
                        'ingredients_col': col_idx + 1,
                        'cost_col': col_idx + 2
                    })
                    print(f"  📦 {product_name} at column {col_idx}")
        
        print(f"\n🔍 Found {len(products_found)} products")
        
        # Extract data for each product
        converted_products = []
        
        for product in products_found:
            print(f"\n📊 Processing {product['name']}...")
            
            # Extract ingredients and costs for this product
            ingredients = []
            costs = []
            total_cost = 0
            
            # Look through the rows to find ingredients and costs
            for row_idx in range(1, len(df)):  # Skip the product name row
                try:
                    # Get ingredient name
                    if product['ingredients_col'] < len(df.columns):
                        ingredient = df.iloc[row_idx, product['ingredients_col']]
                        if pd.notna(ingredient) and str(ingredient).strip():
                            ingredient_name = str(ingredient).strip()
                            
                            # Get cost for this ingredient
                            if product['cost_col'] < len(df.columns):
                                cost = df.iloc[row_idx, product['cost_col']]
                                if pd.notna(cost) and str(cost).strip():
                                    try:
                                        cost_value = float(str(cost).replace(',', ''))
                                        if cost_value > 0:  # Only include non-zero costs
                                            ingredients.append(ingredient_name)
                                            costs.append(cost_value)
                                            total_cost += cost_value
                                            print(f"    {ingredient_name}: ₦{cost_value:,.0f}")
                                    except ValueError:
                                        continue
                except IndexError:
                    break
            
            if ingredients and total_cost > 0:
                # Create product entry
                product_entry = {
                    'Product Name': product['name'],
                    'Category': 'Areej (Standard)',  # Default category
                    'INGREDIENTS': ' + '.join(ingredients),
                    'COST': f"{total_cost:.0f}",
                    'Quantity Produced': '1',  # Default - user can modify
                    'Unit': 'batch',  # Default unit
                    'Cost per Unit (₦)': f"{total_cost:.2f}",
                    'Selling Price (₦)': f"{total_cost * 1.5:.0f}"  # 50% markup as default
                }
                
                converted_products.append(product_entry)
                print(f"    💰 Total Cost: ₦{total_cost:,.0f}")
                print(f"    📦 Ingredients: {len(ingredients)} items")
        
        if converted_products:
            # Create DataFrame and save
            result_df = pd.DataFrame(converted_products)
            output_file = "areej_converted_for_app.csv"
            result_df.to_csv(output_file, index=False)
            
            print(f"\n✅ Successfully converted {len(converted_products)} products!")
            print(f"📄 Saved as: {output_file}")
            
            print(f"\n📋 Converted Products:")
            for product in converted_products:
                print(f"  🎋 {product['Product Name']}: ₦{product['COST']} total cost")
            
            print(f"\n📄 Preview of converted data:")
            print(result_df)
            
            print(f"\n🎯 Next Steps:")
            print(f"1. 📁 Upload '{output_file}' to your incense business app")
            print(f"2. ✏️  Adjust quantities, units, and selling prices as needed")
            print(f"3. 🔧 The app will calculate cost per unit automatically")
            
            return True
        else:
            print("❌ No products were successfully converted")
            return False
            
    except Exception as e:
        print(f"❌ Error reading Excel file: {e}")
        return False

def create_detailed_analysis():
    """Create a detailed analysis of the areej.xlsx file."""
    
    print("\n" + "="*60)
    print("📊 DETAILED ANALYSIS")
    print("="*60)
    
    try:
        # Read with different skip options to show structure
        for skip_rows in [0, 1, 2, 3]:
            print(f"\n--- Reading with skiprows={skip_rows} ---")
            try:
                df = pd.read_excel("areej.xlsx", sheet_name=0, skiprows=skip_rows)
                print(f"Shape: {df.shape[0]} rows × {df.shape[1]} columns")
                print("First 3 rows:")
                print(df.head(3))
                print()
                
                if skip_rows == 2:  # This is our target format
                    print("🎯 This is the optimal format for conversion!")
                    
            except Exception as e:
                print(f"Failed: {e}")
                
    except Exception as e:
        print(f"Error in analysis: {e}")

if __name__ == "__main__":
    # Run the conversion
    success = convert_areej_excel_to_app_format()
    
    # Show detailed analysis
    create_detailed_analysis()
    
    if success:
        print(f"\n🎉 Conversion completed successfully!")
        print(f"Your Excel data is now ready for the incense business app!")
    else:
        print(f"\n❌ Conversion failed. Please check the Excel file structure.")

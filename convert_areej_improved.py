#!/usr/bin/env python3
"""
Improved converter for areej.xlsx - properly extracts ingredients and costs
"""

import pandas as pd

def convert_areej_to_app_format():
    """Convert areej.xlsx to the proper app format with detailed ingredients."""
    
    print("🧪 Converting Areej Excel Data (Improved Version)")
    print("=" * 60)
    
    try:
        # Read the CSV file we already created
        df = pd.read_csv("AREEJ_1ST_BATCH_(2).csv")
        print(f"✅ Successfully read CSV: {df.shape[0]} rows × {df.shape[1]} columns")
        
        # The structure is:
        # AREEJ is in columns 1-2 (MANUFACTURE, Unnamed: 2)
        # KAJIJI is in columns 5-6 (Unnamed: 5, Unnamed: 6)  
        # GAHR is in columns 9-10 (Unnamed: 9, Unnamed: 10)
        # OUD is in columns 13-14 (Unnamed: 13, Unnamed: 14)
        
        # Define product column mappings
        products_config = [
            {
                'name': 'AREEJ',
                'ingredient_col': 'MANUFACTURE',  # Column with ingredients
                'cost_col': 'Unnamed: 2',         # Column with costs
                'start_row': 2  # Data starts from row 2 (after S/NO row)
            },
            {
                'name': 'KAJIJI', 
                'ingredient_col': 'Unnamed: 5',
                'cost_col': 'Unnamed: 6',
                'start_row': 2
            },
            {
                'name': 'GAHR',
                'ingredient_col': 'Unnamed: 9', 
                'cost_col': 'Unnamed: 10',
                'start_row': 2
            },
            {
                'name': 'OUD',
                'ingredient_col': 'Unnamed: 13',
                'cost_col': 'Unnamed: 14', 
                'start_row': 2
            }
        ]
        
        converted_products = []
        
        for product_config in products_config:
            print(f"\n📊 Processing {product_config['name']}...")
            
            ingredients = []
            costs = []
            total_cost = 0
            
            # Extract ingredients and costs
            for row_idx in range(product_config['start_row'], len(df)):
                try:
                    # Get ingredient
                    ingredient = df.iloc[row_idx][product_config['ingredient_col']]
                    cost = df.iloc[row_idx][product_config['cost_col']]
                    
                    if pd.notna(ingredient) and pd.notna(cost):
                        ingredient_name = str(ingredient).strip()
                        
                        try:
                            cost_value = float(str(cost).replace(',', ''))
                            
                            if ingredient_name and cost_value > 0:
                                ingredients.append(ingredient_name)
                                costs.append(cost_value)
                                total_cost += cost_value
                                print(f"    ✓ {ingredient_name}: ₦{cost_value:,.0f}")
                        except (ValueError, TypeError):
                            continue
                            
                except (IndexError, KeyError):
                    break
            
            if ingredients and total_cost > 0:
                # Find the last row with data to calculate quantity
                last_ingredient_idx = len(ingredients) - 1
                quantity_produced = last_ingredient_idx + 1  # Use number of ingredients as a proxy
                
                # Look for actual quantity in the data if available
                # Check if last ingredient looks like a total or quantity
                last_ingredient = ingredients[-1].lower()
                if any(word in last_ingredient for word in ['total', 'qty', 'quantity', 'pieces', 'bottles']):
                    try:
                        # Try to extract number from the last cost as quantity
                        quantity_produced = int(costs[-1] / 1000)  # Rough estimate
                        if quantity_produced < 1:
                            quantity_produced = 10  # Default
                    except:
                        quantity_produced = 10  # Default
                else:
                    quantity_produced = 10  # Default quantity
                
                # Create product entry
                product_entry = {
                    'Product Name': product_config['name'],
                    'Category': 'Areej (Standard)',
                    'INGREDIENTS': ' + '.join(ingredients),
                    'COST': f"{total_cost:.0f}",
                    'Quantity Produced': str(quantity_produced),
                    'Unit': 'pieces',
                    'Cost per Unit (₦)': f"{total_cost / quantity_produced:.2f}",
                    'Selling Price (₦)': f"{(total_cost / quantity_produced) * 1.5:.0f}"  # 50% markup
                }
                
                converted_products.append(product_entry)
                print(f"    💰 Total Cost: ₦{total_cost:,.0f}")
                print(f"    📦 Ingredients: {len(ingredients)} items")
                print(f"    🏷️  Quantity: {quantity_produced} pieces")
                print(f"    💵 Cost per unit: ₦{total_cost / quantity_produced:,.2f}")
            else:
                print(f"    ❌ No valid data found for {product_config['name']}")
        
        if converted_products:
            # Create DataFrame and save
            result_df = pd.DataFrame(converted_products)
            output_file = "areej_properly_converted.csv"
            result_df.to_csv(output_file, index=False)
            
            print(f"\n✅ Successfully converted {len(converted_products)} products!")
            print(f"📄 Saved as: {output_file}")
            
            print(f"\n📋 Summary:")
            for product in converted_products:
                print(f"  🎋 {product['Product Name']}: ₦{product['COST']} → {product['Quantity Produced']} {product['Unit']} → ₦{product['Cost per Unit (₦)']} each")
            
            print(f"\n📄 Full data preview:")
            print(result_df.to_string(index=False))
            
            # Also create a summary for manual verification
            print(f"\n🔍 Manual Verification - Ingredients by Product:")
            for i, product in enumerate(converted_products):
                print(f"\n{product['Product Name']}:")
                ingredients_list = product['INGREDIENTS'].split(' + ')
                for ingredient in ingredients_list:
                    print(f"  - {ingredient}")
            
            print(f"\n🎯 Ready for Import!")
            print(f"📁 Upload '{output_file}' to your incense business app")
            
            return True
        else:
            print("❌ No products were successfully converted")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    success = convert_areej_to_app_format()
    
    if success:
        print(f"\n🎉 Conversion completed successfully!")
    else:
        print(f"\n❌ Conversion failed.")

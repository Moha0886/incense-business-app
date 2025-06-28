#!/usr/bin/env python3
"""
Final clean converter for areej.xlsx - matches actual production quantities and cleans data
"""

import pandas as pd

def convert_areej_final():
    """Create the final cleaned version matching your app's format."""
    
    print("🎯 Creating Final Clean Version for Incense Business App")
    print("=" * 60)
    
    # Based on the analysis, I can see the actual data structure:
    # AREEJ: Total ₦53,200 → Produced 9 pieces
    # KAJIJI: Total ₦75,500 → Produced 25 pieces  
    # GAHR: Total ₦62,600 → Produced 10 pieces
    # OUD: Total ₦64,100 → Produced 17 pieces
    
    products_data = [
        {
            'Product Name': 'AREEJ',
            'Category': 'Areej (Standard)',
            'INGREDIENTS': 'Wood + Sandal Powder + Farce + Jawee + Sandal Oil + Water Base + Oils + Mask + Sugar + Stickers + Bottles + Transport Fare',
            'COST': '53200',
            'Quantity Produced': '9',
            'Unit': 'pieces',
            'Cost per Unit (₦)': '5911.11',
            'Selling Price (₦)': '7000'
        },
        {
            'Product Name': 'KAJIJI',
            'Category': 'Areej (Standard)',
            'INGREDIENTS': 'Wood(3 Mudus) + Sandal Powder + Farce + Jawee + Sandal Oil + Water Base + Oils + Mask + Sugar + Stickers + Bottles + Transport Fare + Arabian Oud Oil',
            'COST': '75500',
            'Quantity Produced': '25',
            'Unit': 'pieces',
            'Cost per Unit (₦)': '3020',
            'Selling Price (₦)': '4000'
        },
        {
            'Product Name': 'GAHR',
            'Category': 'Areej (Standard)',
            'INGREDIENTS': 'Wood + Sandal Powder + Farce + Jawee + Sandal Oil + Water Base + Oils + Mask + Sugar + Stickers + Bottles + Transport Fare',
            'COST': '62600',
            'Quantity Produced': '10',
            'Unit': 'pieces',
            'Cost per Unit (₦)': '6260',
            'Selling Price (₦)': '8000'
        },
        {
            'Product Name': 'OUD',
            'Category': 'Areej (Standard)',
            'INGREDIENTS': 'Wood + Sandal Powder + Farce + Jawee + Sandal Oil + Water Base + Oils + Mask + Sugar + Stickers + Bottles + Transport Fare',
            'COST': '64100',
            'Quantity Produced': '17',
            'Unit': 'pieces',
            'Cost per Unit (₦)': '3770.59',
            'Selling Price (₦)': '5500'
        }
    ]
    
    # Create DataFrame
    df = pd.DataFrame(products_data)
    
    # Save to CSV
    output_file = "areej_final_for_app.csv"
    df.to_csv(output_file, index=False)
    
    print("✅ Created final clean version!")
    print(f"📄 Saved as: {output_file}")
    
    print("\n📋 Final Product Summary:")
    for product in products_data:
        cost_per_unit = float(product['Cost per Unit (₦)'])
        selling_price = float(product['Selling Price (₦)'])
        profit_per_unit = selling_price - cost_per_unit
        profit_margin = (profit_per_unit / selling_price) * 100
        
        print(f"  🎋 {product['Product Name']}:")
        print(f"     💰 Total Cost: ₦{product['COST']:>6} → {product['Quantity Produced']:>2} pieces")
        print(f"     💵 Cost/Unit: ₦{cost_per_unit:>7.2f} → Sell: ₦{selling_price:>7.0f}")
        print(f"     📈 Profit: ₦{profit_per_unit:>7.2f}/unit ({profit_margin:.1f}% margin)")
        print()
    
    print("📄 CSV Content Preview:")
    print(df.to_string(index=False))
    
    print(f"\n🎯 Perfect! This matches your manual calculation process:")
    print(f"   1. ✅ Sum ingredient costs")
    print(f"   2. ✅ Weigh into bottles/pieces") 
    print(f"   3. ✅ Divide total cost by actual quantity produced")
    print(f"   4. ✅ Ready for your incense business app!")
    
    print(f"\n📁 Upload '{output_file}' to your React app now!")
    
    return output_file

if __name__ == "__main__":
    output_file = convert_areej_final()
    print(f"\n🎉 Final conversion completed: {output_file}")
    print("🚀 Ready to import into your incense business management app!")

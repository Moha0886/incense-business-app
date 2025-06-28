import pandas as pd
import os

def convert_areej_excel_to_csv():
    """
    Convert your areej.xlsx file to match the app's CSV template format
    """
    try:
        # Load the Excel file
        xls = pd.ExcelFile("areej.xlsx")
        
        print("📊 Sheets available:", xls.sheet_names)
        
        # Load the first sheet (or specify which sheet you want)
        df = xls.parse(xls.sheet_names[0])
        
        print("\n📋 Original data preview:")
        print(df.head())
        print(f"\n📏 Data shape: {df.shape}")
        print(f"\n📋 Columns: {list(df.columns)}")
        
        # Try to map your Excel columns to our CSV template format
        # You may need to adjust these column mappings based on your actual Excel structure
        
        # Create the output DataFrame matching our template
        output_data = []
        
        for index, row in df.iterrows():
            try:
                # Map your Excel columns to our template format
                # Adjust these column names to match your actual Excel file
                
                # Try common column name variations
                product_name = ""
                category = "Areej (Standard)"  # Default category
                ingredients = ""
                cost = 0
                quantity = 0
                unit = "pieces"
                selling_price = 0
                
                # Attempt to extract data (adjust column names as needed)
                if 'Product' in df.columns or 'Name' in df.columns:
                    product_name = row.get('Product', row.get('Name', f"Product_{index+1}"))
                elif 'product' in df.columns or 'name' in df.columns:
                    product_name = row.get('product', row.get('name', f"Product_{index+1}"))
                
                # Extract ingredients (adjust column name as needed)
                if 'INGREDIENTS' in df.columns:
                    ingredients = str(row.get('INGREDIENTS', ''))
                elif 'Ingredients' in df.columns:
                    ingredients = str(row.get('Ingredients', ''))
                elif 'ingredients' in df.columns:
                    ingredients = str(row.get('ingredients', ''))
                
                # Extract cost (adjust column name as needed)
                if 'COST' in df.columns:
                    cost = row.get('COST', 0)
                elif 'Cost' in df.columns:
                    cost = row.get('Cost', 0)
                elif 'Total Cost' in df.columns:
                    cost = row.get('Total Cost', 0)
                
                # Extract quantity (adjust column name as needed)
                if 'Quantity' in df.columns:
                    quantity = row.get('Quantity', 0)
                elif 'Qty' in df.columns:
                    quantity = row.get('Qty', 0)
                elif 'Pieces' in df.columns:
                    quantity = row.get('Pieces', 0)
                
                # Extract selling price (adjust column name as needed)
                if 'Selling Price' in df.columns:
                    selling_price = row.get('Selling Price', 0)
                elif 'Price' in df.columns:
                    selling_price = row.get('Price', 0)
                elif 'Sale Price' in df.columns:
                    selling_price = row.get('Sale Price', 0)
                
                # Calculate cost per unit
                cost_per_unit = cost / quantity if quantity > 0 else 0
                
                # Determine category based on product name
                if any(word in str(product_name).upper() for word in ['KHUMRA', 'PREMIUM']):
                    category = "Khumra"
                elif any(word in str(product_name).upper() for word in ['ABEER', 'LUXURY']):
                    category = "Abeer (Luxury)"
                else:
                    category = "Areej (Standard)"
                
                output_data.append([
                    product_name,
                    category,
                    ingredients,
                    cost,
                    quantity,
                    unit,
                    f"{cost_per_unit:.2f}",
                    selling_price
                ])
                
            except Exception as e:
                print(f"⚠️ Error processing row {index+1}: {e}")
                continue
        
        # Create output DataFrame
        headers = [
            'Product Name',
            'Category', 
            'INGREDIENTS',
            'COST',
            'Quantity Produced',
            'Unit',
            'Cost per Unit (₦)',
            'Selling Price (₦)'
        ]
        
        output_df = pd.DataFrame(output_data, columns=headers)
        
        # Add instructions as comments at the top
        instructions = [
            '# MANUFACTURING TEMPLATE - Converted from areej.xlsx',
            '# Manual Process: Sum Ingredients → Weigh into Bottles → Divide for Cost per Unit',
            '',
            '# Instructions:',
            '# - Review and adjust the data below',
            '# - INGREDIENTS column should list: Wood + Sandal Powder + Oils + etc.',
            '# - COST should be your total production cost in Naira',
            '# - Quantity Produced should be actual pieces/bottles produced',
            '# - Upload this file to your React app',
            ''
        ]
        
        # Save to CSV
        output_filename = "areej_converted_for_app.csv"
        
        # Write instructions and data
        with open(output_filename, 'w', encoding='utf-8') as f:
            for instruction in instructions:
                f.write(instruction + '\n')
            output_df.to_csv(f, index=False)
        
        print(f"\n✅ Converted data saved to: {output_filename}")
        print(f"📊 Converted {len(output_data)} rows")
        print("\n📋 Preview of converted data:")
        print(output_df.head())
        
        print(f"\n🔧 Next steps:")
        print(f"1. Review the file: {output_filename}")
        print(f"2. Adjust any column mappings if needed")
        print(f"3. Upload the CSV file to your React app")
        
        return output_df
        
    except FileNotFoundError:
        print("❌ Error: areej.xlsx file not found in current directory")
        print("📁 Make sure the Excel file is in the same folder as this script")
        return None
    except Exception as e:
        print(f"❌ Error reading Excel file: {e}")
        return None

if __name__ == "__main__":
    print("🔄 Converting areej.xlsx to CSV format for React app...")
    convert_areej_excel_to_csv()

# Product Logos

This folder contains the logos for your incense products.

## How to Add Your Logos

1. **Place your logo files** in this folder (`src/assets/logos/`)
2. **Use these naming conventions** for easy organization:

### Khumra Products:
- `khumra-premium.png` - for Khumra Premium Blend
- `khumra-mona.png` - for Khumra Mona  
- `khumra-kareeha.png` - for Khumra Kareeha
- `khumra-asma.png` - for Khumra Asma

### Abeer (Luxury) Products:
- `abeer-gold.png` - for Abeer Gold series
- `abeer-platinum.png` - for Abeer Platinum series
- `abeer-royal.png` - for Abeer Royal series
- `abeer-diamond.png` - for Abeer Diamond series

### Areej (Standard) Products:
- `areej-classic.png` - for Areej Classic
- `areej-natural.png` - for Areej Natural
- `areej-floral.png` - for Areej Floral
- `areej-wood.png` - for Areej Wood

## Supported Formats:
- PNG (recommended for logos with transparency)
- JPG/JPEG (for photographs)
- SVG (for vector logos)

## Recommended Sizes:
- **Small icons**: 32x32px or 48x48px
- **Product displays**: 100x100px to 200x200px
- **High resolution**: 512x512px for detailed views

## After Adding Logos:

1. Edit the `index.js` file in this folder
2. Uncomment the import statements for your logos
3. Update the exports object to include your logos
4. The app will automatically use your logos instead of emoji icons

## Example:
If you add `khumra-premium.png`, uncomment this line in `index.js`:
```javascript
import khumraPremiumLogo from './khumra-premium.png';
```

And uncomment this line in the exports:
```javascript
'khumra-premium': khumraPremiumLogo,
```

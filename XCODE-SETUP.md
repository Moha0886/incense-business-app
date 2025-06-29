# 🔧 **Xcode Setup Guide for Abeer Business App**

## 📱 **Step 1: Install Xcode (Required)**

### **Manual Installation:**
1. **Open Mac App Store**
2. **Search for "Xcode"**
3. **Click "Get" or "Install"** (Free, ~15GB download)
4. **Wait for installation** (30-60 minutes)

---

## 🛠 **Step 2: Install CocoaPods (Required)**

### **Run this command in Terminal:**
```bash
sudo gem install cocoapods
```
**Note:** It will ask for your Mac password - this is normal and safe.

---

## ⚙️ **Step 3: Configure Xcode (After Installation)**

### **Run these commands:**
```bash
# Set Xcode as the active developer directory
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer

# Accept Xcode license
sudo xcodebuild -license accept
```

---

## 🚀 **Step 4: Build iOS App**

### **Once Xcode and CocoaPods are installed:**
```bash
cd /Users/muhammadilu/incense-business-app

# Build the web app and copy to iOS
npm run ios:build

# Open in Xcode
npm run ios:open
```

---

## 📱 **Step 5: Run on iPhone**

### **In Xcode:**
1. **Connect your iPhone** via USB cable
2. **Trust the computer** on iPhone if prompted
3. **Select your iPhone** as the target device
4. **Click the "Run" button** (▶️) in Xcode
5. **Your app will install and launch** on iPhone!

---

## 🆘 **If You Get Errors:**

### **"Developer cannot be verified" on iPhone:**
1. **Go to iPhone Settings** → General → VPN & Device Management
2. **Trust your Apple ID** as a developer
3. **Try running the app again**

### **"Team" required in Xcode:**
1. **In Xcode**, select your project
2. **Go to "Signing & Capabilities"**
3. **Select your Apple ID** as the team
4. **Xcode will handle the rest**

---

## 💡 **Current Status:**

✅ **iOS project created** (ios/ folder)
✅ **Build scripts ready** (npm run ios:build, npm run ios:open)
✅ **App configured** (Bundle ID: com.abeer.business)
✅ **PWA working** (already installable on iPhone via Safari)

**Next:** Install Xcode and CocoaPods, then run the build commands!

---

## 🎯 **Quick Commands Summary:**

```bash
# 1. Install CocoaPods (enter your Mac password when prompted)
sudo gem install cocoapods

# 2. After Xcode is installed
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer

# 3. Build and open iOS project
cd /Users/muhammadilu/incense-business-app
npm run ios:build
npm run ios:open
```

**Let me know when Xcode finishes installing and we'll continue!**

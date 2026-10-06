# 🚀 Cosmic Defender — Discord Embedded Activity

An arcade space-shooter mini-game designed to run directly inside a Discord Voice Channel using the **Discord Embedded App SDK**.

## 📁 Project Architecture
├── index.html       # Game viewport layout & Discord SDK initialization script link
├── style.css        # Responsive arcade UI text glow layouts and canvas layer framing
├── app.js           # Core game engine loops, particle logic, and Discord authorization hooks
├── ship.png         # Player spaceship sprite asset
├── meteor.png       # Enemy meteor sprite asset
└── background.jpg   # Outer space canvas background image asset

## 🕹️ Controls
- **Desktop**: Move your mouse left or right to steer your spaceship. Lasers fire automatically.
- **Mobile / Tablet**: Drag your finger anywhere across the game screen viewport to pilot your craft.

## 🛠️ Testing Locally via Developer Mode
1. Host your project folder locally using a web server context (e.g., **Live Server** in VS Code at `http://localhost:5500`).
2. Open your [Discord Developer Portal](https://discord.com).
3. Select your application, navigate to **Embedded Activity**, and add your local host link to the **URL Overrides** field.
4. Open your Discord desktop client, go to *User Settings > Advanced*, and make sure **Developer Mode** is turned on.
5. Join a voice channel, open the Activity Shelf, select **Cosmic Defender**, and launch!

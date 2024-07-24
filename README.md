# 🌠 Futuristic 28-Day Calendar 🗓️

Welcome to the Futuristic 28-Day Calendar project! This unique calendar system reimagines time management with a sleek, minimalist design.

## 🌟 Features

- 📅 Perfect 28-day months (4 weeks exactly!)
- 🌍 Multi-location support with real-time updates
- ⏰ Military-time digital clock
- 🧭 Compass direction display
- 🌡️ Temperature and weather conditions
- 🏔️ Altitude information
- 📊 Day of year tracker (out of 364 days)
- 🎛️ Interactive date controls

## 🛠️ Setup Instructions

Follow these steps to get the Futuristic Calendar up and running on your local machine:

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Step 1: Clone the Repository 📂

```bash
git clone https://github.com/your-username/futuristic-calendar.git
cd futuristic-calendar
```

### Step 2: Install Dependencies 📦

```bash
npm install
```

### Step 3: Set Up Tailwind CSS 🎨

1. Install Tailwind CSS:
   ```bash
   npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
   ```

2. Generate Tailwind config file:
   ```bash
   npx tailwindcss init -p
   ```

3. Update the `tailwind.config.js` file:
   ```javascript
   module.exports = {
     purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
     darkMode: false,
     theme: {
       extend: {},
     },
     variants: {
       extend: {},
     },
     plugins: [],
   }
   ```

4. Add Tailwind directives to your CSS:
   Create a file `src/index.css` and add:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. Import the CSS file in your `src/index.js`:
   ```javascript
   import './index.css';
   ```

### Step 4: Run the Application 🚀

```bash
npm start
```

## 🔧 Customization

- To change the default date, modify the `useState` hook in `FuturisticCalendar.js`:
  ```javascript
  const [currentDate, setCurrentDate] = useState(new Date('2024-06-28'));
  ```

- To add more locations, expand the `switchLocation` function in the same file.

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

⭐ If you like this project, give it a star on GitHub! ⭐

💡 Remember: The future is now, and it's exactly 364 days long! 💡

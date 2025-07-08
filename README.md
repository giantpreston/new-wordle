# Absolute Wordle

A simple Wordle clone with a customizable frontend and a Node.js backend that provides a new word each day (UTC).

## Features

- 🎨 Clean, responsive UI with animations  
- ⌨️ On-screen keyboard with visual feedback  
- 📅 Daily word selection (UTC-based)  
- 🔍 Word validation against dictionary  
- 📱 Mobile-friendly design  
- 🔒 Automatic HTTPS enforcement  
- 🌐 CORS-enabled backend API  
- ⏱️ Word selection based on date math  

## Project Structure

The project consists of:  
- Frontend files (HTML, CSS, JS)
- Backend server (Node.js/Express) in index.js (server subdirectory) 
- Word database in targetWords.json  

## Tools Used

**Frontend:**  
- Vanilla HTML/CSS/JavaScript  
- CSS Grid and Flexbox for layout  
- CSS Animations for tile effects

**Backend:**  
- Node.js with Express  
- CORS middleware  
- Filesystem word database  

## Installation & Setup

1. Clone the repository  
2. Install dependencies with `npm install express cors`  
3. Start the server with `node index.js`  
4. Access the game at `http://localhost/public/index.html`  

## How to Play

1. Guess the 5-letter word in 6 tries  
2. Color indicators show letter status:  
   - 🟩 Green: Correct position  
   - 🟨 Yellow: Wrong position  
   - ⬛ Gray: Not in word  
3. Keyboard shows tried letters  
4. New word available daily at UTC midnight  

## API Endpoint

`GET /daily-word` returns:  
- Current day's word  
- Optional date parameter (`?on=YYYY-MM-DD`)  
- Word index and reference timestamp  

## License

MIT License - Free for personal and commercial use.

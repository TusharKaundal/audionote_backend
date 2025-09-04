# AudioNote Backend

Backend service for the AudioNote application, a platform for managing and processing audio notes with AI-powered features.

## Live Demo

- **Frontend**: [https://audionote-client.vercel.app/](https://audionote-client.vercel.app/)
- **Backend API**: [https://audionote-backend.onrender.com/api](https://audionote-backend.onrender.com/api)

## Features

- RESTful API for audio note management
- Integration with Google's GenAI for audio processing
- MongoDB for data persistence
- CORS enabled for cross-origin requests

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB Atlas account or local MongoDB instance
- Google Cloud account with GenAI API access

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/TusharKaundal/audionote_backend.git
   cd audionote_backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory with the following variables:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_url
   GOOGLE_API_KEY=your_google_api_key
   ```

4. **Start the development server**
   ```bash
   npm start
   ```
   The server will start on `http://localhost:5000`

## API Endpoints

- `POST /api/transcribe` - Create a new audio transcript
- `GET /api/notes` - Get all notes
- `DELETE /api/note/:id` - Delete a note
- `PATCH /api/note/:id` - Update a note
- `PATCH /api/note/:id/summarize` - Summarize a note

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **AI**: Google Gemini GenAI
- **File Handler**: Multer

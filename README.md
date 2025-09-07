# ChatGPT-like AI Interface

A beautiful, modern ChatGPT-like interface built with React, TypeScript, and Tailwind CSS. Features dark/light mode, configurable backends (Ollama/LM Studio), and a stunning design that surpasses the original ChatGPT interface.

## 🚀 Features

- **Beautiful UI**: Modern, responsive design with smooth animations
- **Dark/Light Mode**: Persistent theme switching with localStorage
- **Multiple Backends**: Support for Ollama and LM Studio
- **Web Search Toggle**: Enable/disable web search for queries
- **Conversation Management**: Sidebar with conversation history
- **Real-time Chat**: Smooth message bubbles with typing indicators
- **Configuration Panel**: Easy backend and port configuration

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + ShadCN UI
- **State**: React Hooks + localStorage
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 🔧 Installation & Setup

1. **Clone and install dependencies:**
```bash
git clone <your-repo-url>
cd chatgpt-interface
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
```

## 🎯 Backend Integration

The interface is designed to work with local AI backends. Here's what the backend needs to implement:

### Expected API Endpoints

#### 1. Chat Completion Endpoint
- **Ollama**: `POST http://localhost:11434/api/chat`
- **LM Studio**: `POST http://localhost:1234/v1/chat/completions`

#### 2. Request Payload Structure
The frontend sends this payload when a user submits a message:

```json
{
  "query": "User's message text",
  "webSearchEnabled": true,
  "backend": {
    "type": "ollama",
    "port": 11434
  }
}
```

#### 3. Expected Response Format

**For Ollama:**
```json
{
  "message": {
    "role": "assistant",
    "content": "AI response here"
  },
  "done": true
}
```

**For LM Studio (OpenAI compatible):**
```json
{
  "choices": [{
    "message": {
      "role": "assistant", 
      "content": "AI response here"
    }
  }]
}
```

### Backend Implementation Guide

#### For Ollama Integration:
1. Install Ollama: https://ollama.ai
2. Pull a model: `ollama pull llama2`
3. Start server: `ollama serve` (default port 11434)
4. Your API endpoint: `POST /api/chat`

#### For LM Studio Integration:
1. Download LM Studio: https://lmstudio.ai
2. Load a model in LM Studio
3. Start local server (default port 1234)
4. Your API endpoint: `POST /v1/chat/completions`

### Web Search Integration
When `webSearchEnabled: true` in the payload:
- Backend should perform web search before generating response
- Include search results in the context
- Cite sources in the response if applicable

## 🎨 Configuration

### Theme Persistence
Themes are automatically saved to localStorage:
- Key: `theme`
- Values: `"light"` | `"dark"`

### Backend Configuration
Backend settings are saved to localStorage:
- Key: `backendConfig`
- Structure:
```json
{
  "type": "ollama",
  "port": 11434
}
```

## 🔗 API Integration Points

### Frontend → Backend Flow:
1. User types message and hits send
2. Frontend logs the payload structure to console
3. Frontend sends payload to configured backend endpoint
4. Backend processes request (with optional web search)
5. Backend returns response
6. Frontend displays response in chat

### Error Handling:
The frontend expects standard HTTP status codes:
- `200`: Success
- `400`: Bad Request
- `500`: Server Error

## 🚀 Deployment

### Bolt.new Deployment:
1. Copy this codebase to Bolt.new
2. Run `npm run dev`
3. Configure your backend URL in the settings

### Replit Deployment:
1. Fork repository to Replit
2. Run `npm install && npm run dev`
3. Set up backend configuration

### Vercel/Netlify:
1. Connect your repository
2. Build command: `npm run build`
3. Output directory: `dist`

## 🔧 Development Notes

### Adding New Features:
- All components use the design system from `src/index.css`
- Use semantic color tokens instead of hardcoded colors
- Follow the existing component structure in `src/components/`

### Backend Testing:
Currently, the interface logs payloads to console for development. To test with a real backend:
1. Set up Ollama or LM Studio
2. Update the `handleSendMessage` function in `ChatWindow.tsx`
3. Replace `console.log` with actual API calls

### Styling Guidelines:
- Use design system colors defined in `index.css`
- Maintain consistent spacing and typography
- Ensure dark/light mode compatibility
- Use smooth transitions for better UX

## 📝 License

MIT License - feel free to use this in your projects!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Note**: This is a frontend-only implementation. You'll need to set up your chosen backend (Ollama/LM Studio) separately and implement the API endpoints as described above.
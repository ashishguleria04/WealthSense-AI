# WealthSense AI

WealthSense AI is a next-generation personal financial planning application powered by Generative UI. It leverages advanced AI to not only provide textual advice but also to dynamically generate interactive financial tools, charts, and dashboards tailored to the user's specific goals and context.

## Overview

Traditional financial apps are static; they offer fixed dashboards that may not fit every user's needs. WealthSense AI changes this by using Tambo AI to create a conversational interface where the UI itself is fluid. When a user asks for a savings plan, the application doesn't just list steps—it renders a live, interactive tracking card for that specific goal.

## Features

### Generative UI Assistant
- **Conversational Interface**: A robust chat interface that understands complex financial queries.
- **Dynamic Component Generation**: The AI can instantly render specialized UI components (like Financial Goal Cards) within the chat stream based on user intent.
- **Context Awareness**: The assistant maintains context of your financial situation to provide relevant, personalized tools.

### Core Capabilities
- **Financial Goal Tracking**: Visualize progress towards varied financial targets (e.g., House Down Payment, Car Fund).
- **Interactive Visualization**: Components are not static images; they are fully interactive React components.
- **Seamless Integration**: Built on top of a modern Next.js 16 stack for high performance and responsiveness.

## Technology Stack

- **Framework**: Next.js 16 (React 19)
- **AI & Generative UI**: Tambo AI React SDK
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI, Lucide React
- **Animation**: Framer Motion
- **Validation**: Zod
- **Charts**: Recharts

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- A Tambo AI account (for API keys)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd WealthSense-AI
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Create a `.env.local` file in the root directory and add your Tambo API key:
   ```bash
   NEXT_PUBLIC_TAMBO_API_KEY=your_api_key_here
   ```

### Running the Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The AI Assistant is available at [http://localhost:3000/assistant](http://localhost:3000/assistant).

## Project Structure

- `app/`: Next.js App Router directory.
  - `assistant/`: Contains the Generative UI assistant page.
- `components/`: React components.
  - `assistant/`: AI-specific components (ChatInterface, FinancialGoalCard).
  - `ui/`: Reusable UI primitives (Buttons, Cards, Inputs).
- `lib/`: Utility functions and shared logic.

## Contributing

We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/NewFeature`).
3. Commit your changes (`git commit -m 'Add NewFeature'`).
4. Push to the branch (`git push origin feature/NewFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License.

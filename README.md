# NourishNet 🌱

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-13.0%2B-000000?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9%2B-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)

NourishNet is a food donation and redistribution platform that connects food donors with volunteers and recipients to reduce food waste and fight hunger in local communities.

## ✨ Features

- 🗺️ Interactive map to find nearby food donations
- 🍎 Real-time donation listings with filtering and search
- 🤝 Volunteer coordination for food pickup and delivery
- 📊 Impact tracking and analytics
- 🔄 Real-time updates on donation status
- 📱 Responsive design for all devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rabu20367/NourishNet.git
   cd NourishNet
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
   # Add other environment variables as needed
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Frontend Framework**: [Next.js 13+](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **State Management**: [React Query](https://tanstack.com/query/latest)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

## 📁 Project Structure

```
src/
├── app/                 # App router pages
│   ├── donor/           # Donor-specific pages
│   ├── volunteer/       # Volunteer-specific pages
│   ├── impact/          # Impact metrics
│   └── page.tsx         # Home page
├── components/          # Reusable UI components
│   ├── ui/              # Shadcn/ui components
│   └── layout/          # Layout components
├── lib/                 # Utilities, types, and mock data
└── hooks/               # Custom React hooks
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)

# NourishNet 🌱

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.3-000000?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0+-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.17.1-339933?logo=node.js)](https://nodejs.org/)

NourishNet is a food donation and redistribution platform that connects food donors with volunteers and recipients to reduce food waste and fight hunger in local communities. Our mission is to create a sustainable solution for food redistribution while empowering communities to come together and make a difference.

## ✨ Features

- 🗺️ **Interactive Map** - Find nearby food donations with real-time location tracking
- 🍎 **Donation Listings** - Browse and search for available food donations with detailed information
- 🤝 **Volunteer Coordination** - Connect donors with volunteers for food pickup and delivery
- 📊 **Impact Dashboard** - Track the positive impact of donations with beautiful visualizations
- 🔔 **Real-time Updates** - Get instant notifications about donation status and matches
- 📱 **Mobile-First Design** - Fully responsive interface that works on all devices
- 🔒 **Secure Authentication** - Safe and secure user authentication and authorization
- 🌍 **Community Focus** - Connect with local organizations and community members

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17.1 or later
- npm (v9+) or yarn (v1.22+)
- Git 2.25.0 or later

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rabu20367/NourishNet.git
   cd NourishNet
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update the `.env.local` file with your configuration:
   ```env
   # Required
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
   
   # Optional (for production)
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the application running.

## 🛠️ Tech Stack

### Core Technologies
- **Frontend Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) with CSS Modules
- **UI Components**: [Radix UI](https://www.radix-ui.com/) Primitives
- **State Management**: [React Query](https://tanstack.com/query/latest)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Maps**: [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/)

### Development Tools
- **Linting**: [ESLint](https://eslint.org/) with [TypeScript](https://typescript-eslint.io/)
- **Code Formatting**: [Prettier](https://prettier.io/)
- **Git Hooks**: [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/okonet/lint-staged)
- **Testing**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)
- **AI Integration**: [Genkit](https://genkit.ai/) for AI-powered features

## 📁 Project Structure

```
.
├── .github/             # GitHub workflows and issue templates
├── public/              # Static files
├── src/
│   ├── app/            # App router pages and layouts
│   │   ├── api/         # API routes
│   │   ├── auth/        # Authentication pages
│   │   ├── dashboard/   # User dashboard
│   │   ├── donor/       # Donor-specific pages
│   │   ├── volunteer/   # Volunteer-specific pages
│   │   └── page.tsx     # Home page
│   ├── components/      # Reusable UI components
│   │   ├── ui/          # Shadcn/ui components
│   │   ├── forms/       # Form components
│   │   ├── layout/      # Layout components
│   │   └── shared/      # Shared components
│   ├── config/          # App configuration
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities and helpers
│   │   ├── api/         # API clients
│   │   ├── constants/   # App constants
│   │   └── utils/       # Utility functions
│   ├── providers/       # Context providers
│   ├── styles/          # Global styles and themes
│   └── types/           # TypeScript type definitions
├── .editorconfig        # Editor configuration
├── .eslintrc.json       # ESLint configuration
├── .gitignore          # Git ignore rules
├── .prettierrc         # Prettier configuration
├── next.config.mjs     # Next.js configuration
├── package.json        # Project dependencies and scripts
├── postcss.config.mjs  # PostCSS configuration
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## 🧪 Testing

Run the test suite with:

```bash
npm test
# or
yarn test
```

Run tests in watch mode:

```bash
npm run test:watch
# or
yarn test:watch
```

Generate test coverage report:

```bash
npm run test:coverage
# or
yarn test:coverage
```

## 🛡️ Security

Please refer to our [Security Policy](SECURITY.md) for reporting vulnerabilities.

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Report Bugs**
   - Check if the issue already exists in the [Issues](https://github.com/rabu20367/NourishNet/issues) section
   - If not, create a new issue with a clear description and steps to reproduce

2. **Suggest Enhancements**
   - Open an issue to discuss your ideas
   - Follow the issue template and provide as much detail as possible

3. **Submit Pull Requests**
   ```bash
   # 1. Fork the repository
   # 2. Create your feature branch
   git checkout -b feature/amazing-feature
   # 3. Commit your changes
   git commit -m 'Add some amazing feature'
   # 4. Push to the branch
   git push origin feature/amazing-feature
   # 5. Open a Pull Request
   ```

4. **Code Style**
   - Follow the existing code style (enforced by ESLint and Prettier)
   - Write meaningful commit messages
   - Add tests for new features and bug fixes

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs) - For the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - For accessible UI primitives
- [React Query](https://tanstack.com/query) - For server state management
- [Open Source Community](https://opensource.org/) - For inspiration and resources

## 🌟 Contributors

Thanks to all the people who have contributed to NourishNet!

[//]: # (Contributors list will be auto-generated by all-contributors)

## 📬 Contact

Project Maintainer: [Your Name] - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/rabu20367/NourishNet](https://github.com/rabu20367/NourishNet)

---

<div align="center">
  Made with ❤️ by the NourishNet Team
</div>
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)

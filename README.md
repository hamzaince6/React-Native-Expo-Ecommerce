# CloudWheels Mobile App

A React Native e-commerce mobile application built with Expo and TypeScript.

## Features

- TypeScript for type safety
- Expo for cross-platform development
- React Navigation for routing
- Styled Components for styling
- i18n for localization
- React Query for data fetching
- Safe area handling for different device screen sizes
- Dark mode support

## Project Structure

```
src/
├── assets/         # Images, fonts, and other static assets
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── i18n/           # Internationalization
│   └── translations/ # Language files
├── navigation/     # Navigation configuration
├── screens/        # Application screens
├── services/       # API services
├── styles/         # Global styles and theme
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/cloud-wheels-mobile.git
cd cloud-wheels-mobile
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Run on a simulator or device
- Press `i` to run on iOS simulator
- Press `a` to run on Android emulator
- Scan the QR code with the Expo Go app on your device

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests

## Development Guidelines

- Use functional components with TypeScript interfaces
- Follow the project's code style and structure
- Use styled-components for component styling
- Implement responsive design with Flexbox
- Use React Navigation for routing
- Use i18n for text localization

## Troubleshooting

### Common Issues

1. **Metro bundler not starting**
   - Try clearing the cache with `expo start -c`
   
2. **Dependency issues**
   - Run `npm install` or `yarn install` to ensure all dependencies are installed correctly

3. **TypeScript errors**
   - Check your types and interfaces
   - Run `npx tsc --noEmit` to verify TypeScript compilation

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
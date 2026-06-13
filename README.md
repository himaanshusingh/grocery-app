# Grocery Delivery Web Application

A fully responsive grocery delivery web application built from a mobile-first Figma design using React, TypeScript, Tailwind CSS, and Zustand. The project recreates the complete onboarding, shopping, cart, favorites, and checkout experience from the assignment while extending the interface into a structured desktop experience with custom responsive layouts.

## Overview

This project was developed as a frontend internship assignment focused on translating a Figma design into a production-style web application. The implementation follows a component-driven architecture, strict TypeScript usage, utility-first styling with Tailwind CSS, and modular global state management with Zustand.

## Highlights

- Mobile-first UI implementation based strictly on the provided Figma design.
- Custom desktop experience designed for larger screens instead of scaling up the mobile layout.
- Separate Zustand stores for key application domains such as authentication, products, cart, favorites, filters, and checkout.
- Mock JSON-driven product and category data with simulated API behavior using timeouts.
- Responsive product listing with grid layouts, filter sidebar, and bottom navigation on mobile.
- End-to-end user flows including onboarding, authentication, location selection, browsing, product details, search, filtering, cart, favorites, and order result screens.
- Improved UX with loading states, empty states, error handling, debounced search, and smooth transitions.

## Features

### Authentication & Onboarding
- Splash screen
- Welcome / onboarding flow
- Login screen
- Sign up screen
- OTP / verification flow
- Location selection

### Shopping Experience
- Home page
- Category-based product listing
- Product details page
- Search with debounce
- Product filters
- Favorites / wishlist
- Shopping cart

### Checkout Flow
- Checkout experience
- Order success state
- Order failure / error state

### Responsive Experience
- Mobile-first implementation aligned with the Figma reference
- Bottom navigation for small screens
- Desktop layout with `max-w-7xl` container strategy
- Product grids with 4+ columns on larger screens
- Sidebar-driven category and filter navigation on desktop
- Sticky order summary during checkout on desktop

## Tech Stack

- React
- TypeScript (strict mode)
- Tailwind CSS
- Zustand
- React Router
- Vite or Next.js (depending on your implementation)

## Architecture Notes

The application is structured to keep UI, state, and data concerns clearly separated. Zustand is especially suitable here because smaller, focused stores improve maintainability and align with recommended usage patterns for scalable React applications.[page:1]

Suggested domain separation:
- Auth store
- Product store
- Category store
- Cart store
- Favorites store
- Filter/search store
- Checkout store
- UI store

## Project Structure

Update this section to match your repository exactly once you finalize or share the folder structure.

```bash
.
├── public/
├── src/
│   ├── components/
│   ├── lib/
│       ├── stores/
│   ├── pages/
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── eslint.config.json
├── index.html
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

### Installation

```bash
git clone <your-repository-url>
cd <your-project-folder>
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run preview  # Preview production build
npm run lint     # Run lint checks
```

## Mock Data & State

The application uses local mock JSON data for products and categories, with API-like delays simulated through `setTimeout` to mimic loading states required by the assignment. Zustand selectors and small, purpose-specific stores help reduce unnecessary re-renders and keep state access predictable in larger React apps.[page:1]

## Responsive Design Approach

The mobile UI closely follows the original Figma screens, including spacing, card patterns, navigation behavior, and overall visual hierarchy. For desktop, the layout was intentionally redesigned using wider containers, multi-column product grids, side filters, and a more dashboard-like shopping flow, which is closer to the assignment expectation than simply enlarging the mobile interface.

## Type Safety

The codebase follows strict TypeScript practices with typed interfaces and enums for domain modeling.

Key models include:
- `Product`
- `CartItem`
- `User`
- `OrderStatus`
- `ProductCategory`

## Quality Considerations

- Strict TypeScript without `any`
- Reusable and composable UI components
- Consistent Tailwind utility patterns
- Accessible form controls and keyboard-friendly interactions
- Loading, empty, and error states across major screens
- Clean separation between presentational and stateful logic

## Deployment

This project can be deployed on platforms such as Vercel or Netlify. A production deployment link should be added below once the application is live.

- Live Demo: [Add deployment link here](#)
- Repository: [Add GitHub repository link here](#)

## Assignment Context

The assignment required implementing all visible flows from the provided grocery app Figma design while using React, TypeScript, Tailwind CSS, and Zustand as mandatory technologies. A well-structured README should document project description, setup, repository structure, testing, and the overall technical approach for frontend repositories.[page:2]

## Screens Covered

- Splash
- Onboarding
- Login
- Sign Up
- OTP Verification
- Location Selection
- Home
- Category Listing
- Product Details
- Search
- Filters
- Cart
- Favorites
- Checkout
- Order Success
- Order Failure

## Future Improvements

- Unit and integration test coverage
- Persistent cart and auth session handling
- Better image optimization strategy
- Improved accessibility audit
- Advanced filtering and sorting combinations
- Real backend/API integration

## Author

**Himanshu Singh**  
Frontend Developer | MERN Stack | TypeScript | React

- LinkedIn: [Add your LinkedIn link here](#)
- Portfolio: [Add your portfolio link here](#)

## License

This project was created as part of a frontend internship assignment and is intended for learning, evaluation, and portfolio use.

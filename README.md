# 🛒 Nectar Grocery App

Nectar is a premium, interactive, mobile-first e-commerce web application built with **React 19**, **TypeScript**, **Vite 8**, and **Tailwind CSS v4**. It simulates a modern online grocery shopping experience, from multi-step onboarding and location selection to rich product exploration, search filtering, persistent cart state, and order checkout scenarios.

---

## 🌟 Core Features

- **📱 Onboarding & Mock Auth Flow**: 
  - Splash screen and sliding onboarding cards.
  - Multi-step login flow (Phone Number/Email) with simulated verification codes.
  - Location picker simulating Zone and Area selections to customize serviceability.
  - Persistent user profile session using client-side state.

- **🥦 Product & Category Browsing**:
  - Carousel hero banners presenting dynamic promotional offers.
  - Category-based browsing (e.g., *Fresh Fruits & Vegetables, Cooking Oil & Ghee, Meat & Fish, Bakery & Snacks, Dairy & Eggs, Beverages*).
  - Detailed product views including ratings, brand names, custom product descriptions, and sizing specifications (units).

- **🔍 Search & Filter Rails**:
  - Live client-side search indexing name, description, and brand attributes.
  - Interactive Filter sheets (bottom sheets on mobile, sidebars on desktop) allowing users to filter by price range and specific brand categories.

- **❤️ Favorites & Real-time Cart Management**:
  - Single-click favorites toggle to build personal grocery lists.
  - Interactive add-to-cart operations directly from cards or details page.
  - Quantity control with automatic item removal when count drops to zero.

- **🎟️ Promo Code & Checkout Simulator**:
  - Simulated network API request delay during checkout (1.5 seconds) with a skeleton loading state.
  - Interactive promo codes:
    - **`NECTAR10`**: Applies a **10%** discount on the cart subtotal.
    - **`NECTAR20`**: Applies a **20%** discount on the cart subtotal.
    - **`FAIL`**: Forces a checkout simulation failure to test error outcome states.
  - Post-checkout redirection to success (`/order-success`) or failure (`/order-failed`) screens.

- **💾 Persistent State**:
  - Uses state persistence to store authentication records, cart items, and favorite products in browser LocalStorage. Refreshing the browser does not lose your cart or authentication status.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) (Functional Components, Hooks)
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety
- **Build Tool & Server**: [Vite 8](https://vite.dev/) (extremely fast HMR and compilation)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (modern styling utilities) & [Lucide React](https://lucide.dev/) for clean UI icons
- **State Management**: [Zustand 5](https://github.com/pmndrs/zustand) with client-side persistent storage middleware
- **Routing**: [React Router v7](https://reactrouter.com/) (Client-side routing with nested layouts)

---

## 📁 Project Directory Structure

```text
grocery-app/
├── public/                 # Static assets (favicons, etc.)
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── AuthShell.tsx       # Standard frame wrapper for auth screens
│   │   ├── BottomNav.tsx       # Mobile-optimized persistent navigation bar
│   │   ├── FilterSheet.tsx     # Bottom-sheet filter drawer for mobile view
│   │   ├── FilterSidebar.tsx   # Sidebar filtering block for desktop view
│   │   ├── Header.tsx          # Top branding header with navigation routes
│   │   ├── PrimaryButton.tsx   # Reusable branded green buttons
│   │   ├── ProductCard.tsx     # Interactive catalog product card
│   │   └── SkeletonLoader.tsx  # Loading screen placeholders
│   ├── lib/                # Custom utilities and mock datasets
│   │   ├── store/              # Zustand global state slices
│   │   │   ├── auth.ts             # Auth & user profile states
│   │   │   ├── cart.ts             # Cart logic, subtotal, and checkout actions
│   │   │   ├── favorites.ts        # Wishlist persistent store
│   │   │   └── products.ts         # Search & filter engine store
│   │   ├── mockData.ts         # Static categories, products, and banner arrays
│   │   ├── types.ts            # Core TypeScript interfaces & enums
│   │   └── utils.ts            # Styling helper utilities (clsx & tailwind-merge)
│   ├── pages/              # View screens mapping to app routes
│   │   ├── Splash.tsx          # Animated launch logo screen
│   │   ├── Onboarding.tsx      # Welcome slider flow
│   │   ├── SignIn.tsx          # Main gateway choice screen
│   │   ├── NumberPage.tsx      # Phone input mask mockup
│   │   ├── Verify.tsx          # PIN authentication screen
│   │   ├── Location.tsx        # Zone/Area selector dropdowns
│   │   ├── Login.tsx           # Email credentials entry page
│   │   ├── SignUp.tsx          # User profile registration
│   │   ├── Home.tsx            # Main catalog home feed
│   │   ├── Explore.tsx         # Category list overview
│   │   ├── CategoryProducts.tsx# Products list for specific categories
│   │   ├── ProductDetails.tsx  # Product deep-dive details card
│   │   ├── Search.tsx          # Global search results & filters view
│   │   ├── Favorites.tsx       # User's favorited list grid
│   │   ├── Cart.tsx            # Cart details, promo code applier, & checkout trigger
│   │   ├── OrderSuccess.tsx    # Success checkout notification
│   │   └── OrderFailed.tsx     # Failed checkout warning
│   ├── App.tsx             # Main routing registry and MainLayout setup
│   ├── main.tsx            # DOM node injection bootstrapper
│   └── styles.css          # Core CSS variables, Tailwind directives, & keyframes
├── package.json            # Node project configuration & dependencies
├── tsconfig.json           # TypeScript compilation settings
└── vite.config.ts          # Vite bundler options
```

---

## 🚀 Getting Started

### 📋 Prerequisites

To run this application locally, you will need **Node.js** (v18.0.0 or higher recommended) and **npm** or another package manager like yarn/pnpm installed on your machine.

### ⚙️ Installation

1. Clone or download this project to your local directory.
2. Open your terminal in the project root folder.
3. Install the project dependencies by running:
   ```bash
   npm install
   ```

### 💻 Running the Development Server

Start the local development server with hot-module replacement (HMR) using:
```bash
npm run dev
```

By default, the application will boot on `http://localhost:5173/`. Open this URL in your web browser.

### 🏗️ Building for Production

To compile the application into static files optimized for production deployment, run:
```bash
npm run build
```
The output files will be created in the `dist/` directory.

You can preview the built production app locally using:
```bash
npm run preview
```

---

## 🧪 Testing the Application Flows

Here is a recommended path to test the application flows:

1. **Authentication Flow**: Click through the onboarding screens, type a mock number or login credentials, fill out the location dropdowns, and you will land on the **Home** page.
2. **Browsing**: Click on category banners or individual products to check item detail views. Toggle favorites using the heart icon on any card.
3. **Cart Operations**: Add a few items to the cart from the home page. Go to the cart page from the bottom navigation or the top header.
4. **Discounts (Promo Codes)**:
   - Try typing `NECTAR10` or `NECTAR20` and click **Apply**. Observe the price reduction update in real-time.
5. **Checkout Success/Failure**:
   - **Success**: Click **Go to Checkout**. You will see a loading state for 1.5 seconds, then land on the **Order Success** page.
   - **Failure**: In the cart, apply the promo code `FAIL`. Then click **Go to Checkout**. After the loading state, you will land on the **Order Failed** page.

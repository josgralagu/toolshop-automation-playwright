// ====================================================================
// PAGE OBJECTS INDEX - CENTRALIZED EXPORTS
// ====================================================================
// Centralized exports for all page objects and components
// Provides clean import interface for test files
// ====================================================================

// Export pages factory function and individual page classes
export { pages, 
         BasePage, 
         CartPage, 
         ContactPage, 
         FavoritesPage, 
         MyAccountPage, 
         ProductDetailPage, 
         ProductsPage, 
         ProfilePage, 
         SignInPage, 
         SignUpPage 
} from './Pages/index.js';

// Export all components
export { SearchComponent, 
         FilterComponent, 
         PaginationComponent, 
         NavigationBarComponent 
} from './Components/index.js';
# 🎬 Kitty Cinema Club - React Version

A beautiful movie and TV series discovery application powered by TMDB API, built with React and Vite.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build

```bash
npm run build
```

## 📋 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Language toggle & title
│   ├── Navigation.jsx      # Movies/TV series toggle
│   ├── SearchFilter.jsx    # Search & rating filter
│   ├── PolaroidGrid.jsx    # Grid display with lazy loading
│   ├── PolaroidCard.jsx    # Individual card component
│   ├── DetailModal.jsx     # Modal dialog for details
│   └── EpisodesList.jsx    # TV series episodes display
├── services/
│   └── tmdbService.js      # TMDB API integration
├── hooks/
│   └── useInfiniteScroll.js # Custom React hooks
├── App.jsx                 # Main app component with state management
├── main.jsx                # React entry point
└── style.css               # Global styles

```

## 🔧 Configuration

### API Key Setup

1. Get your TMDB API key from [themoviedb.org](https://www.themoviedb.org/settings/api)
2. The API key is already configured in `src/services/tmdbService.js`
3. Or create a `.env.local` file (copy from `.env.example`):

```env
VITE_TMDB_API_KEY=your_api_key_here
```

## 📝 Implementation Checklist

### ✅ Completed
- [x] React + Vite setup
- [x] Component structure created
- [x] CSS styling configured
- [x] TMDB service functions scaffolded
- [x] Custom hooks prepared
- [x] Project builds without errors

### 📋 TODO - Core Implementation

#### 1. **App.jsx State Management**
Use existing vanilla JS logic to implement:
```javascript
// TODO in App.jsx
- loadContent()          // Load initial popular content
- loadMoreContent()      // Implement lazy loading
- loadFilteredContent()  // Load filtered content
- performSearch()        // Search functionality
```

#### 2. **TMDB Service Integration** (`src/services/tmdbService.js`)
All function signatures are ready. You need to:
- Uncomment the return statements in each function
- The functions already handle API key and language parameters
- Rating conversion (0-5 to 0-10) is already implemented

#### 3. **App.jsx Event Handlers**
Implement the TODO callback functions:
```javascript
handleTypeChange()          // Reset and load new content type
handleLanguageChange()      // Reload content with new language
handleSearch()              // Trigger search with query
handleFilterChange()        // Apply rating filter
handleCardClick()           // Open modal with item
handleLoadMore()            // Lazy loading pagination
```

#### 4. **State Flow**
Reference the vanilla JS version for logic:
- Track: `contentType`, `language`, `currentPage`, `isLoading`
- Track: `searchQuery`, `isSearching`, `filterRating`
- Handle conditional endpoint selection based on state

### 🔗 API Endpoints Reference

From vanilla JS implementation:
- Popular: `/movie/popular` or `/tv/popular`
- Search: `/search/movie` or `/search/tv` with `query` param
- Discover (filter): `/discover/movie` or `/discover/tv` with `vote_average.gte` param
- Details: `/movie/{id}` or `/tv/{id}` with `append_to_response=videos,season/1`

### 🎨 Feature Implementation Order

1. **Basic Loading** → Load popular movies on mount
2. **Navigation** → Switch between movies/series
3. **Search** → Implement search functionality
4. **Filtering** → Add rating filter with API call
5. **Lazy Loading** → Implement Intersection Observer pagination
6. **Modal** → Load and display item details
7. **Language** → Add language switching with content reload
8. **Episodes** → Load TV series episodes

## 📚 Code References

### From Vanilla JS Implementation
The original `api_peliculas/index.js` contains:
- Complete API integration logic
- Lazy loading implementation
- Search and filter handlers
- Modal management
- Rating color mapping

**Migration Strategy:**
1. Copy logic patterns from vanilla JS
2. Adapt state management to React hooks
3. Convert event listeners to onClick handlers
4. Replace DOM manipulation with state updates

### Key Patterns to Migrate

```javascript
// Vanilla JS pattern
if (isSearching && searchQuery) {
  endpoint = '/search/movie';
  params = { query: searchQuery, page };
} else if (filterRating) {
  endpoint = '/discover/movie';
  params = { 'vote_average.gte': filterRating * 2, 'sort_by': 'vote_average.asc' };
} else {
  endpoint = '/movie/popular';
  params = { page };
}

// React pattern in App.jsx useCallback or useEffect
```

## 🚀 Getting Started

1. **Start development server**
   ```bash
   npm run dev
   ```

2. **Implement handleTypeChange** in App.jsx
   - Reset items array
   - Call loadContent()

3. **Implement loadContent** - load popular movies/series
4. **Continue with features following the checklist**

## 📱 Available Components & Hooks

### Components Ready to Use
- `<Header />` - Language toggle
- `<Navigation />` - Content type toggle
- `<SearchFilter />` - Search and filter inputs
- `<PolaroidGrid />` - Item grid with lazy loading
- `<PolaroidCard />` - Individual item card
- `<DetailModal />` - Item details dialog
- `<EpisodesList />` - TV episode listing

### Hooks Available
- `useInfiniteScroll()` - Lazy loading with Intersection Observer
- `useModalKeyboard()` - Close modal with Escape key

## 🛠️ Dependencies

- React 18.2.0
- Axios 1.6.2
- Vite 5.0.8

## 📖 Full Implementation Guide

See `../GUIA_REACT_IMPLEMENTATION.md` for:
- Complete requirements breakdown
- Component API specifications
- State management details
- Implementation pistas (hints)
- Common issues and solutions

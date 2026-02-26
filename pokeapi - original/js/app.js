/**
 * ===================================
 * POKÉDEX APP - Vanilla JavaScript
 * ===================================
 * 
 * Lógica principal de la aplicación
 */

// STATE (Estado de la aplicación)
const state = {
    currentPage: 1,
    totalPages: 0,
    currentPokemon: [],
    selectedPokemon: null,
    isLoading: false
};

// DOM ELEMENTS
const pokedex = document.getElementById('pokedex');
const modal = document.getElementById('pokemon-modal');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.page-btn.prev');
const nextBtn = document.querySelector('.page-btn.next');

/**
 * Inicializa la aplicación
 */
function init() {
    loadPage(1);
    setupEventListeners();
}

/**
 * Configura los event listeners
 */
function setupEventListeners() {
    // Modal
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Paginación
    prevBtn.addEventListener('click', handlePrevPage);
    nextBtn.addEventListener('click', handleNextPage);
}

/**
 * Carga una página de pokémon
 */
async function loadPage(pageNumber) {
    try {
        state.isLoading = true;
        showLoadingState();
        
        const data = await fetchPokemonPage(pageNumber);
        
        state.currentPage = pageNumber;
        state.currentPokemon = data.pokemon;
        state.totalPages = data.totalPages;
        
        renderPokemon();
        updatePagination();
        
        state.isLoading = false;
    } catch (error) {
        console.error('Error loading page:', error);
        pokedex.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">Error cargando pokémon. Por favor intenta de nuevo.</p>`;
        state.isLoading = false;
    }
}

/**
 * Muestra indicador de cargando
 */
function showLoadingState() {
    pokedex.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
            <div style="font-size: 3rem; animation: bounce 1s infinite;">🌸</div>
            <p style="color: #999; margin-top: 15px;">Cargando pokémon...</p>
        </div>
    `;
}

/**
 * Renderiza los pokémon en el grid
 */
function renderPokemon() {
    pokedex.innerHTML = '';
    
    if (state.currentPokemon.length === 0) {
        pokedex.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No hay pokémon</p>';
        return;
    }
    
    state.currentPokemon.forEach(pokemon => {
        const card = createPokemonCard(pokemon);
        pokedex.appendChild(card);
    });
}

/**
 * Crea una tarjeta de pokémon
 */
function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card' + (pokemon.isShiny ? ' shiny' : '');
    
    // Validar que la imagen exista
    const image = pokemon.image || 'https://via.placeholder.com/150?text=No+Image';
    
    card.innerHTML = `
        <div class="card-header">
            <span class="number">${formatPokemonNumber(pokemon.id)}</span>
            ${pokemon.isShiny ? '<span class="shiny-icon">✨</span>' : ''}
        </div>
        <div class="img-container">
            <img src="${image}" alt="${pokemon.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/150?text=Error'">
        </div>
        <h2 class="name">${pokemon.name}</h2>
        <div class="types">
            ${pokemon.types.map(type => `
                <span class="type ${type}" style="background-color: ${getTypeColor(type)}">${type}</span>
            `).join('')}
        </div>
    `;
    
    card.addEventListener('click', () => openModal(pokemon));
    return card;
}

/**
 * Abre el modal con detalles del pokémon
 */
function openModal(pokemon) {
    state.selectedPokemon = pokemon;
    
    const image = pokemon.image || 'https://via.placeholder.com/300?text=No+Image';
    
    document.getElementById('modal-img').src = image;
    document.getElementById('modal-img').alt = pokemon.name;
    document.getElementById('modal-name').textContent = pokemon.name;
    document.getElementById('modal-description').textContent = pokemon.description;
    document.getElementById('modal-height').textContent = pokemon.height.toFixed(1) + 'm';
    document.getElementById('modal-weight').textContent = pokemon.weight.toFixed(1) + 'kg';
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

/**
 * Cierra el modal
 */
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

/**
 * Actualiza la paginación
 */
function updatePagination() {
    // Mostrar/ocultar botones
    prevBtn.style.display = state.currentPage === 1 ? 'none' : 'block';
    nextBtn.style.display = state.currentPage === state.totalPages ? 'none' : 'block';
    
    // Actualizar números de página
    const pageContainer = document.querySelector('.page-numbers');
    pageContainer.innerHTML = '';
    
    // Mostrar máximo 10 botones
    let startPage = Math.max(1, state.currentPage - 4);
    let endPage = Math.min(state.totalPages, state.currentPage + 5);
    
    for (let i = startPage; i <= endPage; i++) {
        const btn = document.createElement('button');
        btn.className = `page-num ${i === state.currentPage ? 'active' : ''}`;
        btn.textContent = i;
        btn.addEventListener('click', () => {
            if (!state.isLoading) {
                loadPage(i);
            }
        });
        pageContainer.appendChild(btn);
    }
}

/**
 * Ir a la página anterior
 */
function handlePrevPage() {
    if (state.currentPage > 1 && !state.isLoading) {
        loadPage(state.currentPage - 1);
    }
}

/**
 * Ir a la página siguiente
 */
function handleNextPage() {
    if (state.currentPage < state.totalPages && !state.isLoading) {
        loadPage(state.currentPage + 1);
    }
}

/**
 * Inicia la aplicación cuando el DOM esté listo
 */
document.addEventListener('DOMContentLoaded', init);

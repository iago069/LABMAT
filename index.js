// Funções do modal
function openModal(title, status, description, imageSrc) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modalImage').src = imageSrc;
    
    const statusElement = document.getElementById('modalStatus');
    statusElement.textContent = status === 'available' ? 'Disponível' : 'Indisponível';
    statusElement.className = 'status ' + (status === 'available' ? 'available' : 'unavailable');
    
    document.getElementById('equipmentModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('equipmentModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function reserveEquipment() {
    const equipment = document.getElementById('modalTitle').textContent;
    const status = document.getElementById('modalStatus').textContent;
    
    if (status === 'Indisponível') {
        alert(`O equipamento ${equipment} não está disponível para reserva no momento.`);
        return;
    }
    
    alert(`Reserva solicitada para: ${equipment}\n\nEm breve entraremos em contato para confirmação.`);
    closeModal();
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('equipmentModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Carregar dados dos equipamentos (simulação)
document.addEventListener('DOMContentLoaded', function() {
    // Aqui você poderia carregar dados de um JSON ou API
    console.log('Página carregada - LABMAT Premium');
    
    // Efeito de digitação no título
    const title = document.querySelector('header h1');
    if (title) {
        const text = 'LABMAT';
        title.textContent = '';
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 150);
    }
    document.addEventListener('DOMContentLoaded', function() {
        // Efeito de digitação no título
        const title = document.querySelector('header h1');
        if (title) {
            const text = title.textContent;
            title.textContent = '';
            let i = 0;
            const typingEffect = setInterval(() => {
                if (i < text.length) {
                    title.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typingEffect);
                }
            }, 150);
        }
    
        // Destaque do menu ativo
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (currentPage === linkPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    
        // Animação dos cards
        const animateOnScroll = function() {
            const cards = document.querySelectorAll('.highlight-card, .game-card');
            cards.forEach(card => {
                const cardPosition = card.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (cardPosition < screenPosition) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }
            });
        };
    
        // Configuração inicial da animação
        const cards = document.querySelectorAll('.highlight-card, .game-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';
        });
    
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Executa uma vez ao carregar
    });
});
// Filtragem e pesquisa de jogos
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');
    
    // Adicione atributos de categoria aos cards de jogo existentes
    document.querySelectorAll('.game-card').forEach((card, index) => {
        // Defina categorias para os jogos existentes (ajuste conforme necessário)
        const categories = ['trigonometria', 'geometria', 'tabuada', 'algebra'];
        card.dataset.category = categories[index % categories.length];
        card.dataset.name = card.querySelector('h3').textContent.toLowerCase();
    });
    
    // Função para filtrar jogos
    function filterGames() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').dataset.category;
        
        gameCards.forEach(card => {
            const matchesSearch = card.dataset.name.includes(searchTerm);
            const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
            
            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Evento de clique nos filtros
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterGames();
        });
    });
    
    // Evento de pesquisa (botão)
    searchButton.addEventListener('click', filterGames);
    
    // Evento de pesquisa (digitação)
    searchInput.addEventListener('input', filterGames);
});
// Sistema de Reserva
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do modal
    const reservaModal = document.getElementById('reservaModal');
    const closeBtn = document.querySelector('.close-btn');
    const reservaForm = document.getElementById('reservaForm');
    
    // Abrir modal de reserva ao clicar em "Reservar"
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.game-card');
            document.getElementById('jogoId').value = card.dataset.name;
            document.getElementById('reservaTitle').textContent = `Reservar ${card.dataset.name}`;
            reservaModal.style.display = 'block';
        });
    });
    
    // Fechar modal
    closeBtn.addEventListener('click', function() {
        reservaModal.style.display = 'none';
    });
    
    // Fechar ao clicar fora do modal
    window.addEventListener('click', function(event) {
        if (event.target === reservaModal) {
            reservaModal.style.display = 'none';
        }
    });
    
    // Processar formulário de reserva
    reservaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Capturar dados do formulário
        const reservaData = {
            jogo: document.getElementById('jogoId').value,
            nome: document.getElementById('nomeUsuario').value,
            email: document.getElementById('emailUsuario').value,
            data: document.getElementById('dataReserva').value,
            hora: document.getElementById('horaReserva').value,
            timestamp: new Date().toISOString()
        };
        
        // Salvar reserva (simulação - na prática você enviaria para um backend)
        salvarReserva(reservaData);
        
        // Feedback ao usuário
        alert(`Reserva confirmada para ${reservaData.jogo}!\nData: ${formatarData(reservaData.data)} às ${reservaData.hora}`);
        
        // Fechar modal e limpar formulário
        reservaModal.style.display = 'none';
        this.reset();
    });
    
    // Função para salvar reserva (simulação)
    function salvarReserva(reserva) {
        // Na prática, você enviaria para um servidor/API
        // Aqui estamos armazenando apenas no localStorage para demonstração
        let reservas = JSON.parse(localStorage.getItem('reservasLABMAT') || '[]');
        reservas.push(reserva);
        localStorage.setItem('reservasLABMAT', JSON.stringify(reservas));
    }
    
    // Função auxiliar para formatar data
    function formatarData(dataString) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dataString).toLocaleDateString('pt-BR', options);
    }
});
// Modal Sobre o Jogo
function createAboutModal() {
    const modal = document.createElement('div');
    modal.className = 'about-modal';
    modal.innerHTML = `
        <div class="about-modal-content">
            <div class="about-modal-header">
                <h3 class="about-modal-title"><i class="fas fa-info-circle"></i> <span id="aboutGameTitle">Sobre o Jogo</span></h3>
                <button class="about-modal-close">&times;</button>
            </div>
            <div class="about-modal-body" id="aboutGameContent">
                <!-- Conteúdo será injetado aqui -->
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Fechar modal
    modal.querySelector('.about-modal-close').addEventListener('click', () => {
        closeAboutModal();
    });
    
    // Fechar ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeAboutModal();
        }
    });
    
    return modal;
}

// Inicializar modal quando a página carregar
let aboutModal = createAboutModal();

function openAboutModal(element) {
    const gameCard = element.closest('.game-card');
    const gameTitle = gameCard.querySelector('h3').textContent;
    const aboutContent = gameCard.querySelector('.about-content').innerHTML;
    
    document.getElementById('aboutGameTitle').textContent = gameTitle;
    document.getElementById('aboutGameContent').innerHTML = aboutContent;
    
    aboutModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeAboutModal() {
    aboutModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Permitir fechar com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && aboutModal.style.display === 'block') {
        closeAboutModal();
    }
});
// Modal de Vídeo
function openVideoModal(element) {
    const gameCard = element.closest('.game-card');
    const gameTitle = gameCard.querySelector('h3').textContent;
    
    // Aqui você pode definir a URL do vídeo baseado no jogo
    // Exemplo: você pode adicionar um atributo data-video-url no card do jogo
    const videoUrl = gameCard.dataset.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'; // URL padrão
    
    document.getElementById('videoTitle').textContent = `Vídeo: ${gameTitle}`;
    document.getElementById('videoFrame').src = videoUrl;
    
    document.getElementById('videoModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    document.getElementById('videoModal').style.display = 'none';
    document.getElementById('videoFrame').src = ''; // Para parar o vídeo
    document.body.style.overflow = 'auto';
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target === modal) {
        closeVideoModal();
    }
}

// Fechar com ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeVideoModal();
    }
});

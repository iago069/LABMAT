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
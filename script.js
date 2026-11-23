// Navigation mobile améliorée
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        
        // Changer l'icône du hamburger
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Fermer le menu quand on clique en dehors
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Fermer le menu mobile lors du clic sur un lien
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        // Réinitialiser l'icône du hamburger
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Gestion des boutons "Voir plus" - optimisé pour mobile
document.querySelectorAll('.btn-voir-plus').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = button.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Vérifier si la section est déjà ouverte
            const isOpen = !targetElement.classList.contains('hidden');

            // Fermer tous les autres détails principaux ouverts
            document.querySelectorAll('.details-content:not(.hidden)').forEach(details => {
                if (details.id !== targetId) {
                    details.classList.add('hidden');
                    // Remettre les boutons "Voir moins" en "Découvrir"
                    const otherButton = document.querySelector(`.btn-voir-plus[data-target="${details.id}"]`);
                    if (otherButton) {
                        otherButton.textContent = 'Découvrir';
                    }
                }
            });

            if (isOpen) {
                // Si déjà ouvert, fermer la section
                targetElement.classList.add('hidden');
                button.textContent = 'Découvrir';
                // Scroll vers le bouton
                button.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                // Stocker la position du bouton avant d'ouvrir
                button.dataset.scrollPosition = window.pageYOffset;

                // Si fermé, ouvrir la section
                targetElement.classList.remove('hidden');
                button.textContent = 'Voir moins';
                
                // Sur mobile, scroller directement au début de la section
                const isMobile = window.innerWidth <= 768;
                if (isMobile) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }
    });
});

// Gestion des boutons "Fermer" principaux
document.querySelectorAll('.btn-close').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-close');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.classList.add('hidden');
            // Remettre le bouton "Voir moins" en "Découvrir"
            const voirPlusButton = document.querySelector(`.btn-voir-plus[data-target="${targetId}"]`);
            if (voirPlusButton) {
                voirPlusButton.textContent = 'Découvrir';
            }
            // Scroll vers la section parent (missions ou projets)
            const parentSection = targetElement.closest('.section');
            if (parentSection) {
                parentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Gestion des boutons "Détails" secondaires
document.querySelectorAll('.btn-small').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Vérifier si la section est déjà ouverte
            const isOpen = !targetElement.classList.contains('hidden');

            if (isOpen) {
                // Si déjà ouvert, fermer la section
                targetElement.classList.add('hidden');
                button.textContent = 'Détails';
            } else {
                // Si fermé, ouvrir la section
                targetElement.classList.remove('hidden');
                button.textContent = 'Fermer';
            }
        }
    });
});

// Gestion des boutons "Fermer" secondaires
document.querySelectorAll('.btn-close-small').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-close');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.classList.add('hidden');
            // Remettre le bouton "Fermer" en "Détails"
            const detailsButton = document.querySelector(`.btn-small[data-target="${targetId}"]`);
            if (detailsButton) {
                detailsButton.textContent = 'Détails';
            }
        }
    });
});

// Smooth scroll pour les liens d'ancrage - optimisé pour mobile
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignorer les liens de téléchargement
        if (href.endsWith('.pdf') || this.hasAttribute('download')) {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            // Adapter le headerOffset selon la taille de l'écran
            const isMobile = window.innerWidth <= 768;
            const headerOffset = isMobile ? 70 : 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Changement de style de la navbar au scroll - optimisé pour mobile
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(26, 48, 80, 0.12)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(26, 48, 80, 0.08)';
    }
});

// Animation des éléments au scroll - désactivée sur mobile pour performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const isMobile = window.innerWidth <= 768;
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Appliquer l'animation aux cartes (sauf sur mobile pour performance)
if (!isMobile) {
    document.querySelectorAll('.project-card, .mission-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
} else {
    // Sur mobile, les cartes sont visibles directement
    document.querySelectorAll('.project-card, .mission-card').forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'none';
    });
}

// Animation du titre hero - simplifiée sur mobile
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle && !isMobile) {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(-20px)';
    heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
    
    setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 300);
}

// Animation de l'introduction hero - simplifiée sur mobile
const heroIntro = document.querySelector('.hero-intro');
if (heroIntro && !isMobile) {
    heroIntro.style.opacity = '0';
    heroIntro.style.transform = 'translateY(20px)';
    heroIntro.style.transition = 'opacity 1s ease 0.3s, transform 1s ease 0.3s';
    
    setTimeout(() => {
        heroIntro.style.opacity = '1';
        heroIntro.style.transform = 'translateY(0)';
    }, 600);
}

// Fermer automatiquement les détails quand on clique en dehors
document.addEventListener('click', (e) => {
    // Vérifier si le clic est en dehors des détails
    document.querySelectorAll('.details-content:not(.hidden)').forEach(details => {
        if (!details.contains(e.target) && !e.target.classList.contains('btn-voir-plus') && !e.target.classList.contains('btn-small')) {
            // Ne pas fermer si c'est un clic sur un bouton fermer
            if (!e.target.classList.contains('btn-close') && !e.target.classList.contains('btn-close-small')) {
                // Optionnel : décommenter pour fermer automatiquement
                // details.classList.add('hidden');
            }
        }
    });
});

// Gestion du bouton CV
const cvButton = document.querySelector('.btn-cv');
if (cvButton) {
    cvButton.addEventListener('click', (e) => {
        // Le lien de téléchargement fonctionnera normalement
        console.log('Téléchargement du CV');
    });
}

// Scroll vers le haut au chargement de la page pour arriver sur l'accueil
window.addEventListener('load', () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
});

// Gestion du mode plein écran CV
const btnFullscreen = document.getElementById('btnFullscreen');
const btnCloseFullscreen = document.getElementById('btnCloseFullscreen');
const cvFullscreenModal = document.getElementById('cvFullscreenModal');
const btnDownloadCV = document.getElementById('btnDownloadCV');
const btnDownloadCVFullscreen = document.getElementById('btnDownloadCVFullscreen');

// Ouvrir le mode plein écran
if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
        cvFullscreenModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Empêcher le scroll
        
        // Sur mobile, scroller vers le haut du modal
        if (isMobile) {
            cvFullscreenModal.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// Fermer le mode plein écran
if (btnCloseFullscreen) {
    btnCloseFullscreen.addEventListener('click', () => {
        cvFullscreenModal.classList.add('hidden');
        document.body.style.overflow = ''; // Rétablir le scroll
    });
}

// Fermer avec la touche Escape ou un tap sur le fond
if (cvFullscreenModal) {
    cvFullscreenModal.addEventListener('click', (e) => {
        // Fermer si on clique sur le fond (pas sur le contenu)
        if (e.target === cvFullscreenModal) {
            cvFullscreenModal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });
}

// Fermer avec la touche Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !cvFullscreenModal.classList.contains('hidden')) {
        cvFullscreenModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
});

// Télécharger le CV (bouton normal)
if (btnDownloadCV) {
    btnDownloadCV.addEventListener('click', () => {
        window.open('doc portfolio/cv-jules-maugard.pdf', '_blank');
    });
}

// Télécharger le CV (bouton plein écran)
if (btnDownloadCVFullscreen) {
    btnDownloadCVFullscreen.addEventListener('click', () => {
        window.open('doc portfolio/cv-jules-maugard.pdf', '_blank');
    });
}

// Gestion du redimensionnement de la fenêtre
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculer isMobile après redimensionnement
        const wasMobile = isMobile;
        const isNowMobile = window.innerWidth <= 768;
        
        if (wasMobile !== isNowMobile) {
            // Forcer un rechargement léger pour appliquer les changements
            location.reload();
        }
    }, 250);
});

// Détection de l'orientation pour ajuster si nécessaire
window.addEventListener('orientationchange', () => {
    // Petit délai pour laisser le navigateur s'adapter
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, 100);
});
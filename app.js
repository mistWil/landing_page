// Attendre que le DOM soit complètement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner tous les boutons "Lire plus"
    const readMoreButtons = document.querySelectorAll('.read-more');

    // Ajouter un écouteur d'événements à chaque bouton "Lire plus"
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Empêcher le comportement par défaut du lien
            const articleFile = this.getAttribute('data-article'); // Obtenir le nom du fichier de l'article
            const articleContainer = this.closest('.card-body'); // Trouver le conteneur de l'article
            const previewText = articleContainer.querySelector('.article-preview'); // Sélectionner l'aperçu de l'article
            const fullContent = articleContainer.querySelector('.article-full-content'); // Sélectionner le contenu complet de l'article

            // Si le contenu complet n'a pas encore été chargé
            if (fullContent.innerHTML === '') {
                // Charger le contenu de l'article depuis le fichier
                fetch(`content/press/${articleFile}`)
                    .then(response => response.text())
                    .then(text => {
                        fullContent.innerHTML = marked.parse(text); // Convertir le Markdown en HTML
                        toggleArticleView(previewText, fullContent, this); // Basculer l'affichage
                    })
                    .catch(error => console.error('Error:', error));
            } else {
                // Si le contenu est déjà chargé, basculer simplement l'affichage
                toggleArticleView(previewText, fullContent, this);
            }
        });
    });

    // Fonction pour basculer entre l'aperçu et le contenu complet de l'article
    function toggleArticleView(preview, fullContent, button) {
        if (fullContent.style.display === 'none' || fullContent.style.display === '') {
            preview.style.display = 'none'; // Cacher l'aperçu
            fullContent.style.display = 'block'; // Afficher le contenu complet
            button.textContent = 'Lire moins'; // Changer le texte du bouton
        } else {
            preview.style.display = 'block'; // Afficher l'aperçu
            fullContent.style.display = 'none'; // Cacher le contenu complet
            button.textContent = 'Lire plus'; // Changer le texte du bouton
            // Réinitialiser la position de défilement du contenu complet
            const scrollableElement = fullContent.closest('.card-body') || fullContent;
            scrollableElement.scrollTop = 0;
        }
    }

    // Ajouter un écouteur d'événements pour le défilement en douceur des liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Fonction pour faire défiler vers le haut de la page
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Afficher ou masquer le bouton de retour en haut en fonction de la position de défilement
window.onscroll = function() {
  var btn = document.getElementById("scrollToTopBtn");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    btn.style.opacity = "1"; // Afficher le bouton
  } else {
    btn.style.opacity = "0"; // Masquer le bouton
  }
};

// Ajouter un écouteur d'événements au bouton de retour en haut
document.getElementById("scrollToTopBtn").addEventListener("click", scrollToTop);
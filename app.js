document.addEventListener('DOMContentLoaded', function() {
    const readMoreButtons = document.querySelectorAll('.read-more');

    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const articleFile = this.getAttribute('data-article');
            const articleContainer = this.closest('.card-body');
            const previewText = articleContainer.querySelector('.article-preview');
            const fullContent = articleContainer.querySelector('.article-full-content');

            if (fullContent.innerHTML === '') {
                fetch(`content/press/${articleFile}`)
                    .then(response => response.text())
                    .then(text => {
                        fullContent.innerHTML = marked.parse(text);
                        toggleArticleView(previewText, fullContent, this);
                    })
                    .catch(error => console.error('Error:', error));
            } else {
                toggleArticleView(previewText, fullContent, this);
            }
        });
    });

    function toggleArticleView(preview, fullContent, button) {
        if (fullContent.style.display === 'none' || fullContent.style.display === '') {
            preview.style.display = 'none';
            fullContent.style.display = 'block';
            button.textContent = 'Lire moins';
        } else {
            preview.style.display = 'block';
            fullContent.style.display = 'none';
            button.textContent = 'Lire plus';
           // Réinitialiser la position de défilement du contenu complet
            const scrollableElement = fullContent.closest('.card-body') || fullContent;
            scrollableElement.scrollTop = 0;
        }
    }
});

// Fonction pour faire défiler vers le haut
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Afficher ou masquer le bouton en fonction de la position de défilement
window.onscroll = function() {
  var btn = document.getElementById("scrollToTopBtn");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    btn.style.opacity = "1";
  } else {
    btn.style.opacity = "0";
  }
};

// Ajouter un écouteur d'événements au bouton
document.getElementById("scrollToTopBtn").addEventListener("click", scrollToTop);
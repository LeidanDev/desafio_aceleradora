document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const galleryItems = document.querySelectorAll(".gallery-items");

    // Função para realizar a busca
    function searchPhotos() {
        const query = searchInput.value.toLowerCase().trim(); // Converte o texto para minúsculas e remove espaços extras

        if (query === "") {
            // Se a barra de busca estiver vazia, exibe todas as imagens
            galleryItems.forEach(item => {
                item.style.display = "inline-block"; // Mostra todas as fotos
            });
            return;
        }

        let hasResults = false;

        galleryItems.forEach(item => {
            const imgAlt = item.querySelector("img").alt.toLowerCase(); // Obtém o texto do atributo "alt"
            
            // Verifica se o texto digitado está contido no "alt"
            if (imgAlt.includes(query)) {
                item.style.display = "inline-block"; // Mostra a foto
                hasResults = true;
            } else {
                item.style.display = "none"; // Oculta a foto
            }
        });

        if (!hasResults) {
            alert("Nenhuma foto encontrada para o termo buscado.");
        }
    }

    // Evento no botão de busca
    searchButton.addEventListener("click", searchPhotos);

    // Evento para restaurar a galeria ao apagar o campo de busca
    searchInput.addEventListener("input", () => {
        if (searchInput.value.trim() === "") {
            galleryItems.forEach(item => {
                item.style.display = "inline-block"; // Mostra todas as fotos
            });
        }
    });
});

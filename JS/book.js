document.addEventListener("DOMContentLoaded", () => {

    fetch("../api/books.json")
        .then(res => res.json())
        .then(books => {
            const bookList = document.getElementById("book-list");
            bookList.innerHTML = "";

            books.forEach(book => {
                bookList.innerHTML += `
                    <div class="space-y-3 cursor-pointer book-item"
                        data-cover="${book.cover}"
                        data-title="${book.title}"
                        data-author="${book.author}"
                        data-desc="${book.description}"
                        data-id="${book.id}">
                        
                        <div class="aspect-[2/3] rounded-md shadow-sm overflow-hidden">
                            <img src="${book.cover}" 
                                 alt="${book.title}" 
                                 class="w-full h-full object-cover">
                        </div>

                        <h4 class="text-sm font-semibold">${book.title}</h4>
                        <p class="text-xs text-gray-500">${book.author}</p>
                    </div>
                `;
            });
        });

    document.getElementById("book-list").addEventListener("click", function (e) {
        const item = e.target.closest(".book-item");
        if (!item) return;

        const { cover, title, author, desc } = item.dataset;

        document.getElementById("book-details-panel").classList.remove("hidden");
        document.getElementById("book-list").classList.replace("lg:grid-cols-8", "lg:grid-cols-5");

        document.getElementById("book-details").innerHTML = `
            <div class="p-6 border border-gray-200 rounded-lg shadow-sm bg-white w-full flex flex-col items-end">
                
                <button id="close-details" class="text-blue-600 font-semibold hover:underline">
                    close
                </button>
                 <button id="more-details" class="text-blue-600 font-semibold hover:underline">
                    Mais Detalhes
                </button>

                <div class="flex flex-col md:flex-row items-start gap-6 mb-4 w-full">
                    <img src="${cover}" alt="${title}" class="w-64 object-cover rounded-md shadow-md">
                    <div>
                        <h3 class="text-3xl font-extrabold text-gray-900">${title}</h3>
                        <p class="text-lg text-indigo-600 font-medium mt-1">
                            Autor: ${author}
                        </p>
                    </div>
                </div>

                <hr class="my-4 border-gray-100 w-full">

                <p class="text-gray-700 leading-relaxed text-justify">
                    ${desc}
                </p>
            </div>
        `;

        document.getElementById("close-details").addEventListener("click", function () {
            document.getElementById("book-details-panel").classList.add("hidden");
            document.getElementById("book-list").classList.replace("lg:grid-cols-5", "lg:grid-cols-8");

            document.getElementById("book-details").innerHTML = `
                <h3 class="text-2xl font-bold mb-2">Selecione um livro</h3>
                <p class="text-gray-500">Clique em um livro à esquerda para ver detalhes.</p>
            `;
        });
        document.getElementById("more-details").addEventListener("click", function () {
            const bookId = item.dataset.id;
            window.location.href = `booksinfo.html?id=${bookId}`;
        });
    });
});
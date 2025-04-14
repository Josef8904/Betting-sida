document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('article-form');
    const oddsList = document.querySelector('.odds-list');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
  
      const article = {
        id: Date.now(),
        title,
        content,
        date: new Date().toLocaleDateString()
      };
  
      saveArticle(article);
      showArticle(article);
      showToast('Artikel skapad!', 'success');
      form.reset();
    });
  
    function showArticle(article) {
      const shortContent = article.content.length > 60
        ? article.content.substring(0, 60) + '...'
        : article.content;
  
      const div = document.createElement('article');
      div.className = 'odd-item';
      div.dataset.id = article.id;
      div.innerHTML = `
        <h3>${article.title}</h3>
        <p>${shortContent}</p>
        <small>${article.date}</small><br>
        <button class="btn btn-danger btn-sm mt-2 delete-btn">Radera</button>
      `;
  
      div.addEventListener('click', (e) => {
        if (!e.target.classList.contains('delete-btn')) {
          localStorage.setItem('selectedArticle', JSON.stringify(article));
          window.location.href = 'artikel.html';
        }
      });
  
      div.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation(); 
        div.remove();
        deleteArticle(article.id);
        showToast('Artikel raderad!', 'danger');
      });
  
      oddsList.appendChild(div);
    }
  
    function saveArticle(article) {
      let articles = JSON.parse(localStorage.getItem('articles')) || [];
      articles.push(article);
      localStorage.setItem('articles', JSON.stringify(articles));
    }
  
    function deleteArticle(id) {
      let articles = JSON.parse(localStorage.getItem('articles')) || [];
      articles = articles.filter(article => article.id !== id);
      localStorage.setItem('articles', JSON.stringify(articles));
    }
  
    function showToast(message, type = 'info') {
      const toast = document.createElement('div');
      toast.textContent = message;
      toast.style.backgroundColor = type === 'success' ? '#198754' : '#dc3545'; // grön eller röd
      toast.style.color = 'white';
      toast.style.padding = '10px 15px';
      toast.style.marginTop = '10px';
      toast.style.borderRadius = '5px';
      toast.style.boxShadow = '0 0 5px rgba(0,0,0,0.2)';
      toast.style.fontSize = '14px';
  
      document.getElementById('toast-container').appendChild(toast);
  
      setTimeout(() => {
        toast.remove();
      }, 3000);
    }
  
    const savedArticles = JSON.parse(localStorage.getItem('articles')) || [];
    savedArticles.forEach(showArticle);
  });
  
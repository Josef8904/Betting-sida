document.addEventListener('DOMContentLoaded', () => {
    const artikelData = JSON.parse(localStorage.getItem('selectedArticle'));
    const kommentarLista = document.getElementById('kommentar-lista');
    const kommentarForm = document.getElementById('kommentar-form');
    const kommentarInput = document.getElementById('kommentar-input');
  
    const likeBtn = document.getElementById('like-btn');
    const dislikeBtn = document.getElementById('dislike-btn');
    const likeCount = document.getElementById('like-count');
    const dislikeCount = document.getElementById('dislike-count');
  
    if (!artikelData) {
      document.body.innerHTML = '<p class="text-center mt-5">Ingen artikel hittades.</p>';
      return;
    }
  
    document.getElementById('artikel-titel').textContent = artikelData.title;
    document.getElementById('artikel-datum').textContent = artikelData.date;
    document.getElementById('artikel-innehall').textContent = artikelData.content;
  
    const kommentarKey = `kommentarer_${artikelData.id}`;
    let kommentarer = JSON.parse(localStorage.getItem(kommentarKey)) || [];
    kommentarer.forEach(kommentar => addKommentarToList(kommentar));
  
    kommentarForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = kommentarInput.value.trim();
      if (text === '') return;
  
      const kommentar = {
        id: Date.now(),
        text,
        datum: new Date().toLocaleString()
      };
  
      kommentarer.push(kommentar);
      localStorage.setItem(kommentarKey, JSON.stringify(kommentarer));
      addKommentarToList(kommentar);
      kommentarForm.reset();
    });
  
    function addKommentarToList(kommentar) {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.innerHTML = `<strong>${kommentar.datum}</strong><br>${kommentar.text}`;
      kommentarLista.appendChild(li);
    }
  
    const likeKey = `likes_${artikelData.id}`;
    const dislikeKey = `dislikes_${artikelData.id}`;
  
    let likes = parseInt(localStorage.getItem(likeKey)) || 0;
    let dislikes = parseInt(localStorage.getItem(dislikeKey)) || 0;
  
    likeCount.textContent = likes;
    dislikeCount.textContent = dislikes;
  
    likeBtn.addEventListener('click', () => {
      likes++;
      likeCount.textContent = likes;
      localStorage.setItem(likeKey, likes);
    });
  
    dislikeBtn.addEventListener('click', () => {
      dislikes++;
      dislikeCount.textContent = dislikes;
      localStorage.setItem(dislikeKey, dislikes);
    });
  });
  
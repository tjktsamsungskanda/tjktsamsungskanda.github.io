const burgerIcon = document.getElementById("burgerIcon");
const navList = document.getElementById("menu-list")

// document.addEventListener('DOMContentLoaded', function() {
//     alert("This web maybe will a bit lagging in some device, try from PC for best experience.");
//     document.body.classList.add('start-animation'); 
// });

burgerIcon.addEventListener("click", () => {
    navList.classList.toggle("hidden");
})

const firebaseConfig = {
      apiKey: "AIzaSyB8g-WBPVNP-QmhS_5GeBjjEShVy6kizHE",
      authDomain: "menfess-xi-tjkt-samsung.firebaseapp.com",
      projectId: "menfess-xi-tjkt-samsung",
    };
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    function submitPost() {
      const content = document.getElementById('content').value.trim();
      if (!content) return alert("Isi dulu menfessnya!");
      
      db.collection('posts').add({
        content: content,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        document.getElementById('content').value = '';
        })
        .catch((error) => {
        console.error("Error:", error);
        alert("Gagal mengirim menfess, coba lagi!");
        });
    }

    document.getElementById("content").addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        submitPost();
      }
    });

    db.collection('posts')
    .orderBy('created_at', 'asc')
    .onSnapshot(snapshot => {
      const feedMenfess = document.getElementById('feedMenfess');
      feedMenfess.innerHTML = '';
      snapshot.forEach(doc => {
          const data = doc.data();
          
          const div = document.createElement('div');
          div.className = 'post-itemMenfess';

          const contentSpan = document.createElement('span');
          contentSpan.className = 'content';
          contentSpan.textContent = data.content;

          const dateSpan = document.createElement('span');
          dateSpan.className = 'date';
          
          if (data.created_at) {
              const fullDate = new Date(data.created_at.seconds*1000);
              
              const fullFormat = fullDate.toLocaleString();
              
              const shortFormat = fullDate.toLocaleDateString();
              
              dateSpan.innerHTML = `
                  <span class="date-full">${fullFormat}</span>
                  <span class="date-short">${shortFormat}</span>
              `;
          } else {
              dateSpan.innerHTML = `
                  <span class="date-full">...</span>
                  <span class="date-short">...</span>
              `;
          }

          div.appendChild(contentSpan);
          div.appendChild(dateSpan);

          feedMenfess.appendChild(div);
        });

        setTimeout(() => {
            const container = document.querySelector('.containMenfess');
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    });
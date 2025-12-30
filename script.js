document.addEventListener('DOMContentLoaded', function() {
    alert("This web maybe will a bit lagging in some device, try from PC for best experience.");
    document.body.classList.add('start-animation'); 
});

document.addEventListener('DOMContentLoaded', function() {

    const burgerIcon = document.getElementById("burgerIcon");
    const navList = document.getElementById("menu-list");

    if (burgerIcon && navList) {
        burgerIcon.addEventListener("click", () => {
            navList.classList.toggle("hidden");
        });
    }

    (function() {
        const carouselTrack = document.getElementById('strukturCarouselTrack');
        const carouselWrapper = document.getElementById('strukturCarouselWrapper');

        if (!carouselTrack || !carouselWrapper) return;

        const students = [
            { name: "Agha", number: 1, photo: "assets/photos/agha.JPG" },
            { name: "Bintang", number: 2, photo: "assets/photos/bintang.JPG" },
            { name: "Celsy W", number: 3, photo: "assets/photos/celsyw.JPG" },
            { name: "Chelsi T", number: 4, photo: "assets/photos/celsit.JPG" },
            { name: "Daffa A", number: 5, photo: "assets/photos/dafaa.JPG" },
            { name: "Erfin", number: 6, photo: "assets/photos/erpin.JPG" },
            { name: "Fahri", number: 7, photo: "assets/photos/fahri.JPG" },
            { name: "Faiza", number: 8, photo: "assets/photos/faiza.JPG" },
            { name: "Habib", number: 9, photo: "assets/photos/habib.JPG" },
            { name: "Hadi", number: 10, photo: "assets/photos/hadi.JPG" },
            { name: "Hafizh", number: 11, photo: "assets/photos/hafizh.JPG" },
            { name: "Kayla", number: 12, photo: "assets/photos/kayla.JPG" },
            { name: "Ridho", number: 13, photo: "assets/photos/ridho.JPG" },
            { name: "Restu", number: 14, photo: "assets/photos/restu.JPG" },
            { name: "Fahrel", number: 15, photo: "assets/photos/fahreli.JPG" },
            { name: "Afgan", number: 16, photo: "assets/photos/afgan.JPG" },
            { name: "Daffa S", number: 17, photo: "assets/photos/daffas.JPG" },
            { name: "Fharel", number: 18, photo: "assets/photos/fharel.JPG" },
            { name: "Fitrah", number: 19, photo: "assets/photos/fitrah.JPG" },
            { name: "Hafidh", number: 20, photo: "assets/photos/hafidh.JPG" },
            { name: "Fikri", number: 21, photo: "assets/photos/fikri.JPG" },
            { name: "Raffa", number: 22, photo: "assets/photos/raffa.JPG" },
            { name: "Rehan", number: 23, photo: "assets/photos/rehan.JPG" },
            { name: "Naufal", number: 24, photo: "assets/photos/naufal.JPG" },
            { name: "Nikei", number: 25, photo: "assets/photos/nikei.JPG" },
            { name: "Nur", number: 26, photo: "assets/photos/nur.JPG" },
            { name: "Pandu", number: 27, photo: "assets/photos/pandu.JPG" },
            { name: "Rakha M", number: 28, photo: "assets/photos/rakham.JPG" },
            { name: "Rakha P", number: 29, photo: "assets/photos/rakhap.JPG" },
            { name: "Rezky", number: 30, photo: "assets/photos/rezky.JPG" },
            { name: "Samuel", number: 31, photo: "assets/photos/samuel.JPG" },
            { name: "Syaira", number: 32, photo: "assets/photos/syaira.JPG" },
            { name: "Malik", number: 33, photo: "assets/photos/malik.JPG" }
        ];

        function generateCarouselCards() {
            carouselTrack.innerHTML = '';
            
            students.forEach(student => {
                const card = document.createElement('div');
                card.className = 'struktur-carousel-card';
                card.innerHTML = `
                    <img src="${student.photo}" 
                         alt="${student.name}" 
                         class="struktur-carousel-image" 
                         onerror="this.src='https://i.pravatar.cc/150?img=${student.number}'">
                    <div class="struktur-carousel-name">${student.name}</div>
                `;
                carouselTrack.appendChild(card);
            });
        }

        let isDown = false;
        let startX;
        let scrollLeft;

        carouselWrapper.addEventListener('mousedown', (e) => {
            isDown = true;
            carouselWrapper.style.cursor = 'grabbing';
            startX = e.pageX - carouselWrapper.offsetLeft;
            scrollLeft = carouselWrapper.scrollLeft;
        });

        carouselWrapper.addEventListener('mouseleave', () => {
            isDown = false;
            carouselWrapper.style.cursor = 'grab';
        });

        carouselWrapper.addEventListener('mouseup', () => {
            isDown = false;
            carouselWrapper.style.cursor = 'grab';
        });

        carouselWrapper.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carouselWrapper.offsetLeft;
            const walk = (x - startX) * 2;
            carouselWrapper.scrollLeft = scrollLeft - walk;
        });

        let touchStartX = 0;
        let touchScrollLeft = 0;

        carouselWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].pageX;
            touchScrollLeft = carouselWrapper.scrollLeft;
        });

        carouselWrapper.addEventListener('touchmove', (e) => {
            const touchX = e.touches[0].pageX;
            const walk = (touchStartX - touchX) * 1.5;
            carouselWrapper.scrollLeft = touchScrollLeft + walk;
        });

        generateCarouselCards();
    })();

    const firebaseConfig = {
        apiKey: "AIzaSyB8g-WBPVNP-QmhS_5GeBjjEShVy6kizHE",
        authDomain: "menfess-xi-tjkt-samsung.firebaseapp.com",
        projectId: "menfess-xi-tjkt-samsung",
    };
    
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    window.submitPost = function() {
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
    };

    const menfessInput = document.getElementById("content");
    if (menfessInput) {
        menfessInput.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                submitPost();
            }
        });
    }

    db.collection('posts')
        .orderBy('created_at', 'asc')
        .onSnapshot(snapshot => {
            const feedMenfess = document.getElementById('feedMenfess');
            if (!feedMenfess) return;
            
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
                if (container) {
                    container.scrollTo({
                        top: container.scrollHeight,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        });

});
// document.addEventListener('DOMContentLoaded', function() {
//     alert("This web maybe will a bit lagging in some device, try from PC for best experience.");
//     document.body.classList.add('start-animation'); 
// });

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
            { name: "Agha", number: 1, photo: "assets/photos/webp/agha.webp" },
            { name: "Bintang", number: 2, photo: "assets/photos/webp/bintang.webp" },
            { name: "Celsy W", number: 3, photo: "assets/photos/webp/celsyw.webp" },
            { name: "Chelsi T", number: 4, photo: "assets/photos/webp/celsit.webp" },
            { name: "Daffa A", number: 5, photo: "assets/photos/webp/dafaa.webp" },
            { name: "Erfin", number: 6, photo: "assets/photos/webp/erpin.webp" },
            { name: "Fahri", number: 7, photo: "assets/photos/webp/fahri.webp" },
            { name: "Faiza", number: 8, photo: "assets/photos/webp/faiza.webp" },
            { name: "Habib", number: 9, photo: "assets/photos/webp/habib.webp" },
            { name: "Hadi", number: 10, photo: "assets/photos/webp/hadi.webp" },
            { name: "Hafizh", number: 11, photo: "assets/photos/webp/hafizh.webp" },
            { name: "Kayla", number: 12, photo: "assets/photos/webp/kayla.webp" },
            { name: "Ridho", number: 13, photo: "assets/photos/webp/ridho.webp" },
            { name: "Restu", number: 14, photo: "assets/photos/webp/restu.webp" },
            { name: "Fahrel", number: 15, photo: "assets/photos/webp/fahreli.webp" },
            { name: "Afgan", number: 16, photo: "assets/photos/webp/afgan.webp" },
            { name: "Daffa S", number: 17, photo: "assets/photos/webp/daffas.webp" },
            { name: "Fharel", number: 18, photo: "assets/photos/webp/fharel.webp" },
            { name: "Fitrah", number: 19, photo: "assets/photos/webp/fitrah.webp" },
            { name: "Hafidh", number: 20, photo: "assets/photos/hafidh.JPG" },
            { name: "Fikri", number: 21, photo: "assets/photos/webp/fikri.webp" },
            { name: "Raffa", number: 22, photo: "assets/photos/webp/raffa.webp" },
            { name: "Rehan", number: 23, photo: "assets/photos/webp/rehan.webp" },
            { name: "Naufal", number: 24, photo: "assets/photos/webp/naufal.webp" },
            { name: "Nikei", number: 25, photo: "assets/photos/webp/nikei.webp" },
            { name: "Nur", number: 26, photo: "assets/photos/webp/nur.webp" },
            { name: "Pandu", number: 27, photo: "assets/photos/webp/pandu.webp" },
            { name: "Rakha M", number: 28, photo: "assets/photos/webp/rakham.webp" },
            { name: "Rakha P", number: 29, photo: "assets/photos/webp/rakhap.webp" },
            { name: "Rezky", number: 30, photo: "assets/photos/webp/rezky.webp" },
            { name: "Samuel", number: 31, photo: "assets/photos/webp/samuel.webp" },
            { name: "Syaira", number: 32, photo: "assets/photos/webp/syaira.webp" },
            { name: "Malik", number: 33, photo: "assets/photos/webp/malik.webp" }
        ];

        function generateCarouselCards() {
        carouselTrack.innerHTML = '';
        
            students.forEach(student => {
                const card = document.createElement('div');
                card.className = 'struktur-carousel-card';
                card.innerHTML = `
                <img 
                    src="${student.photo}" 
                    alt="${student.name}" 
                    class="struktur-carousel-image"
                    loading="lazy"
                    onerror="this.src='/assets/photos/avatar/default.svg'">
                <div class="struktur-carousel-name">${student.name}</div>
                `;
                carouselTrack.appendChild(card);
            });
        }

        let isDown = false;
        let startX;
        let scrollLeft;
        let velocity = 0;
        let lastX = 0;
        let lastTime = Date.now();

        carouselWrapper.addEventListener('mousedown', (e) => {
            isDown = true;
            carouselWrapper.style.cursor = 'grabbing';
            carouselWrapper.style.scrollBehavior = 'auto';
            
            startX = e.pageX - carouselWrapper.offsetLeft;
            scrollLeft = carouselWrapper.scrollLeft;
            lastX = e.pageX;
            lastTime = Date.now();
            velocity = 0;
        });

        carouselWrapper.addEventListener('mouseleave', () => {
            if (isDown) {
                isDown = false;
                carouselWrapper.style.cursor = 'grab';
                applyMomentum();
            }
        });

        carouselWrapper.addEventListener('mouseup', () => {
            if (isDown) {
                isDown = false;
                carouselWrapper.style.cursor = 'grab';
                applyMomentum();
            }
        });

        carouselWrapper.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            
            const x = e.pageX - carouselWrapper.offsetLeft;
            const currentTime = Date.now();
            const deltaTime = currentTime - lastTime;
            
            const walk = (x - startX) * 1.2;
            carouselWrapper.scrollLeft = scrollLeft - walk;
            
            if (deltaTime > 0) {
                velocity = (e.pageX - lastX) / deltaTime;
            }
            
            lastX = e.pageX;
            lastTime = currentTime;
        });

        let touchStartX = 0;
        let touchScrollLeft = 0;
        let touchVelocity = 0;
        let lastTouchX = 0;
        let lastTouchTime = Date.now();

        carouselWrapper.addEventListener('touchstart', (e) => {
            carouselWrapper.style.scrollBehavior = 'auto';
            touchStartX = e.touches[0].pageX;
            touchScrollLeft = carouselWrapper.scrollLeft;
            lastTouchX = e.touches[0].pageX;
            lastTouchTime = Date.now();
            touchVelocity = 0;
        });

        carouselWrapper.addEventListener('touchmove', (e) => {
            const touchX = e.touches[0].pageX;
            const currentTime = Date.now();
            const deltaTime = currentTime - lastTouchTime;
            
            const walk = (touchStartX - touchX) * 1.1;
            carouselWrapper.scrollLeft = touchScrollLeft + walk;
            
            if (deltaTime > 0) {
                touchVelocity = (lastTouchX - touchX) / deltaTime;
            }
            
            lastTouchX = touchX;
            lastTouchTime = currentTime;
        });

        carouselWrapper.addEventListener('touchend', () => {
            applyTouchMomentum();
        });

        function applyMomentum() {
            if (Math.abs(velocity) < 0.1) return;
            
            carouselWrapper.style.scrollBehavior = 'auto';
            
            const friction = 0.95;
            let currentVelocity = velocity * 20;
            
            function momentumStep() {
                if (Math.abs(currentVelocity) < 0.5) {
                    carouselWrapper.style.scrollBehavior = 'smooth';
                    return;
                }
                
                carouselWrapper.scrollLeft -= currentVelocity;
                currentVelocity *= friction;
                
                requestAnimationFrame(momentumStep);
            }
            
            requestAnimationFrame(momentumStep);
        }

        function applyTouchMomentum() {
            if (Math.abs(touchVelocity) < 0.1) return;
            
            carouselWrapper.style.scrollBehavior = 'auto';
            
            const friction = 0.95;
            let currentVelocity = touchVelocity * 20;
            
            function momentumStep() {
                if (Math.abs(currentVelocity) < 0.5) {
                    carouselWrapper.style.scrollBehavior = 'smooth';
                    return;
                }
                
                carouselWrapper.scrollLeft += currentVelocity;
                currentVelocity *= friction;
                
                requestAnimationFrame(momentumStep);
            }
            
            requestAnimationFrame(momentumStep);
        }

        generateCarouselCards();
        carouselWrapper.style.scrollBehavior = 'smooth';
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
// Sayfa yüklendiğinde animasyonları başlat
document.addEventListener('DOMContentLoaded', () => {
    // Hero section elementlerini seç
    const heroContent = document.querySelector('.hero-content');
    const features = document.querySelectorAll('.feature');

    // Hero content'e görünürlük class'ı ekle
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        heroContent.style.transition = 'all 0.8s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 300);

    // Features animasyonu
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            feature.style.transition = 'all 0.5s ease';
            feature.style.opacity = '1';
            feature.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });
});

// Scroll animasyonları
window.addEventListener('scroll', () => {
    const scrollElements = document.querySelectorAll('.goals-content > div, .problems-list li, .problems-image');
    
    scrollElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !navToggle.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Modal fonksiyonları
function showModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// İletişim Formu Gönderme
document.querySelector('.contact-form form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Şu anki tarihi formatla
    const now = new Date();
    const submitDate = now.toLocaleString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Form verilerini al
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        submit_date: submitDate // Tarih bilgisini ekle
    };

    // Loading durumunu göster
    const submitBtn = this.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Gönderiliyor...';
    submitBtn.disabled = true;

    // EmailJS ile mail gönder
    emailjs.send('service_nd07vpy', 'template_jf6ox6a', formData)
        .then(function () {
            // Formu temizle
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';

            // Butonu eski haline getir
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;

            // Başarı modalını göster
            showModal();
        }, function (error) {
            // Hata mesajını göster
            alert('Form gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
            console.error('Form gönderme hatası:', error);

            // Butonu eski haline getir
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
}); 
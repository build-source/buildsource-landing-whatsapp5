document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    const phoneNumber = '5548988773779';
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(`Olá, meu nome é ${name}. ${message}`)}`;
    
    window.location.href = whatsappUrl;
});

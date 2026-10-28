document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const whatsappNumber = '5548988773779';
    const whatsappMessage = `Olá, meu nome é ${name}. Meu e-mail é ${email}. Mensagem: ${message}`;
    const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappLink, '_blank');
});

document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('ul li a');

    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            var url = this.getAttribute('href');
            window.open(url, '_blank');
        });

        link.addEventListener('contextmenu', function(event) {
            event.preventDefault();
            var url = this.getAttribute('href');
            copyToClipboard(url);
            animateCopy();
        });
    });

    function copyToClipboard(text) {
        var input = document.createElement('textarea');
        input.innerHTML = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
    }

    function animateCopy() {
        var copiedMessage = document.createElement('div');
        copiedMessage.innerText = 'Link copied!';
        copiedMessage.style.position = 'fixed';
        copiedMessage.style.top = '10px';
        copiedMessage.style.left = '50%';
        copiedMessage.style.transform = 'translateX(-50%)';
        copiedMessage.style.backgroundColor = '#007bff';
        copiedMessage.style.color = '#fff';
        copiedMessage.style.padding = '10px 20px';
        copiedMessage.style.borderRadius = '5px';
        copiedMessage.style.zIndex = '9999';
        document.body.appendChild(copiedMessage);

        setTimeout(function() {
            document.body.removeChild(copiedMessage);
        }, 2000);
    }
});

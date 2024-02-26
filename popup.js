document.addEventListener('DOMContentLoaded', function () {
    var linksList = document.getElementById('links-list');
    var linkInput = document.getElementById('link-input');
    var addButton = document.getElementById('add-button');

    addButton.addEventListener('click', function () {
        var url = linkInput.value.trim();
        if (url !== '') {
            addLink(url);
            linkInput.value = '';
        }
    });

    linksList.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        var target = event.target.closest('li');
        if (target) {
            var url = target.querySelector('a').getAttribute('href');
            copyToClipboard(url);
            animateCopy();
        }
    });

    linksList.addEventListener('click', function (event) {
        var target = event.target.closest('li');
        if (target && event.target.classList.contains('delete-link')) {
            target.remove();
        }
    });

    function addLink(url) {
        var li = document.createElement('li');
        var icon = document.createElement('i');
        icon.classList.add('fas', 'fa-external-link-alt');
        var link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.textContent = url;
        var deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-link');
        
        // Using flexbox to align items
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
    
        // Appending elements
        li.appendChild(icon);
        li.appendChild(link);
        li.appendChild(deleteIcon);
        linksList.appendChild(li);
    }
    

    function copyToClipboard(text) {
        var input = document.createElement('textarea');
        input.innerHTML = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
    }

    function animateCopy() {
        var copyMessage = document.createElement('div');
        copyMessage.innerText = 'Link copied!';
        copyMessage.style.position = 'fixed';
        copyMessage.style.top = '50%';
        copyMessage.style.left = '50%';
        copyMessage.style.transform = 'translate(-50%, -50%)';
        copyMessage.style.backgroundColor = '#007bff';
        copyMessage.style.color = '#fff';
        copyMessage.style.padding = '10px 20px';
        copyMessage.style.borderRadius = '5px';
        copyMessage.style.zIndex = '9999';
        copyMessage.style.opacity = '0';
        copyMessage.style.transition = 'opacity 0.5s ease-in-out';
    
        document.body.appendChild(copyMessage);
    
        // Triggering reflow to ensure the transition happens
        copyMessage.offsetHeight;
    
        copyMessage.style.opacity = '1';
    
        setTimeout(function() {
            copyMessage.style.opacity = '0';
            setTimeout(function() {
                document.body.removeChild(copyMessage);
            }, 500);
        }, 1500);
    }
    
});

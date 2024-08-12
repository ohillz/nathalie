document.addEventListener("DOMContentLoaded", function() {
    fetch('/static/datos.json')
        .then(response => response.json())
        .then(data => {
            const menuSection = document.getElementById('menu');
            data.menu.forEach(section => {
                // Create the accordion header
                const accordionHeader = document.createElement('h2');
                accordionHeader.classList.add('accordion');
                accordionHeader.innerHTML = `${section.title}<span class="indicator">+</span>`;
                menuSection.appendChild(accordionHeader);

                // Create the panel
                const panel = document.createElement('div');
                panel.classList.add('panel');

                // Add items to the panel
                section.items.forEach(item => {
                    const menuItem = document.createElement('div');
                    menuItem.classList.add('menu-item');

                    const itemImage = document.createElement('img');
                    itemImage.src = item.image;
                    itemImage.alt = item.name;

                    const itemInfo = document.createElement('div');
                    itemInfo.classList.add('menu-item-info');

                    const itemName = document.createElement('h3');
                    itemName.textContent = item.name;

                    const itemDescription = document.createElement('p');
                    itemDescription.textContent = item.description;

                    const itemPrice = document.createElement('span');
                    itemPrice.textContent = item.price;

                    itemInfo.appendChild(itemName);
                    itemInfo.appendChild(itemDescription);
                    itemInfo.appendChild(itemPrice);

                    menuItem.appendChild(itemImage);
                    menuItem.appendChild(itemInfo);

                    panel.appendChild(menuItem);
                });

                menuSection.appendChild(panel);
            });

            initializeAccordion();
        });
});

function initializeAccordion() {
    const acc = document.getElementsByClassName('accordion');
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener('click', function() {
            const currentlyOpenPanel = document.querySelector('.panel.open');
            const panel = this.nextElementSibling;
            const indicator = this.querySelector('.indicator');

            if (currentlyOpenPanel && currentlyOpenPanel !== panel) {
                currentlyOpenPanel.classList.remove('open');
                currentlyOpenPanel.previousElementSibling.querySelector('.indicator').textContent = '+';
                currentlyOpenPanel.style.maxHeight = null;
            }

            if (panel.classList.contains('open')) {
                panel.classList.remove('open');
                indicator.textContent = '+';
                panel.style.maxHeight = null;
            } else {
                panel.classList.add('open');
                indicator.textContent = '-';
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        });
    }
}

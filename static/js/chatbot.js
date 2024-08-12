document.addEventListener("DOMContentLoaded", function() {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    sendButton.addEventListener('click', function() {
        sendMessage();
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message !== "") {
            appendMessage(message, 'user');
            userInput.value = '';

            fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            })
            .then(response => response.json())
            .then(data => {
                if (data.response) {
                    appendMessage(data.response, 'bot');
                } else {
                    appendMessage("Error: " + data.error, 'bot');
                }
            })
            .catch(error => {
                appendMessage("Error: " + error, 'bot');
            });
        }
    }

    function appendMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = text;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});

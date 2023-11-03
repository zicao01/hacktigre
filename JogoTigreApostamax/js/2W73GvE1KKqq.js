document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("geradorbotao");
    const output1 = document.getElementById("entrada");
    const output2 = document.getElementById("turbo");
    const output3 = document.getElementById("validade");

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function countdown(seconds) {
        let timeLeft = seconds;
        const interval = setInterval(() => {
            button.textContent = `AGUARDE (${timeLeft}s...)`;
            timeLeft--;

            if (timeLeft < 0) {
                clearInterval(interval);
                button.disabled = false;
                button.textContent = "GERAR NOVO SINAL";
                localStorage.removeItem('countdownEnd'); // Limpar o valor no localStorage
            } else {
                localStorage.setItem('countdownEnd', Date.now() + timeLeft * 1000); // Armazenar o tempo de término no localStorage
            }
        }, 1000);
    }

    function updateTime() {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 2); // Adiante 2 minutos

        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');

        return `${hours}:${minutes}`;
    }

    button.addEventListener("click", (event) => {
        event.preventDefault();
        const countdownEnd = localStorage.getItem('countdownEnd');
        if (countdownEnd && countdownEnd > Date.now()) {
            // Ainda há um countdown em andamento, não permitir o clique no botão
            return;
        }

        button.disabled = true;
        output1.textContent = `${getRandomNumber(5, 10)}`;
        output2.textContent = `${getRandomNumber(5, 10)}`;
        const validadeValue = updateTime(); // Obter o valor da validade
        output3.textContent = `${validadeValue}`;
        localStorage.setItem('output1Value', output1.textContent); // Salvar os valores no localStorage
        localStorage.setItem('output2Value', output2.textContent);
        localStorage.setItem('output3Value', validadeValue);
        countdown(60);
    });

    // Recuperar os valores do localStorage e atualizar os elementos
    output1.textContent = localStorage.getItem('output1Value') || '';
    output2.textContent = localStorage.getItem('output2Value') || '';
    const validadeValue = localStorage.getItem('output3Value') || '';
    output3.textContent = `${validadeValue}`;
    const countdownEnd = localStorage.getItem('countdownEnd');
    if (countdownEnd && countdownEnd > Date.now()) {
        button.disabled = true;
        countdown(Math.ceil((countdownEnd - Date.now()) / 1000));
    }
});

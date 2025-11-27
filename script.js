// CRIAR POPUP PARA COPIAR PERGUNTA E ALTERNATIVAS
function criarPopupIA() {
    // Remover popup anterior se existir
    const popupExistente = document.getElementById('popupIAHelper');
    if (popupExistente) {
        popupExistente.remove();
    }

    // Capturar informações do popup do quiz
    const popupQuiz = document.querySelector('div.md-dialog-container');
    if (!popupQuiz) {
        alert('❌ Nenhum popup de quiz encontrado!');
        return;
    }

    const perguntaElement = popupQuiz.querySelector('pre.question-quiz-text');
    const opcoesElements = popupQuiz.querySelectorAll('.choice-student');
    const livroElement = document.querySelector('#bookTitle .truncate-text.ng-binding');
    
    if (!perguntaElement) {
        alert('❌ Não foi possível encontrar a pergunta!');
        return;
    }

    const livro = livroElement ? livroElement.textContent.trim() : 'Livro não identificado';
    const pergunta = perguntaElement.textContent.trim();
    const alternativas = Array.from(opcoesElements).map(opcao => opcao.textContent.trim());

    // Criar texto formatado para IA
    const textoParaIA = `Responda essa pergunta com base no livro "${livro}".

Pergunta: ${pergunta}

Respostas:
${alternativas.map((alt, index) => `${index + 1}. ${alt}`).join('\n')}`;

    // Criar o popup
    const popup = document.createElement('div');
    popup.id = 'popupIAHelper';
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 500px;
        width: 90%;
        font-family: Arial, sans-serif;
        border: 2px solid #007bff;
    `;

    // Conteúdo do popup
    popup.innerHTML = `
        <div style="margin-bottom: 15px;">
            <h3 style="margin: 0 0 10px 0; color: #007bff; text-align: center;">📚 Assistente de IA</h3>
            <div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                <strong>Livro:</strong> ${livro}
            </div>
        </div>
        
        <div style="margin-bottom: 15px;">
            <strong>Pergunta:</strong>
            <div style="background: #fff3cd; padding: 10px; border-radius: 5px; margin-top: 5px; font-size: 14px;">
                ${pergunta}
            </div>
        </div>
        
        <div style="margin-bottom: 20px;">
            <strong>Alternativas:</strong>
            <div style="background: #e9ecef; padding: 10px; border-radius: 5px; margin-top: 5px; font-size: 13px;">
                ${alternativas.map((alt, index) => `<div>${index + 1}. ${alt}</div>`).join('')}
            </div>
        </div>
        
        <div style="display: flex; gap: 10px; justify-content: center;">
            <button id="copiarTextoIA" style="
                background: #28a745;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
                flex: 1;
            ">📋 Copiar para IA</button>
            
            <button id="fecharPopup" style="
                background: #dc3545;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
            ">❌ Fechar</button>
        </div>
        
        <div id="mensagemCopiado" style="
            margin-top: 10px;
            padding: 8px;
            border-radius: 5px;
            text-align: center;
            font-size: 12px;
            display: none;
        "></div>
    `;

    // Adicionar ao body
    document.body.appendChild(popup);

    // Adicionar overlay escuro
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 9999;
    `;
    overlay.id = 'overlayIAHelper';
    document.body.appendChild(overlay);

    // Eventos dos botões
    document.getElementById('copiarTextoIA').addEventListener('click', function() {
        navigator.clipboard.writeText(textoParaIA).then(() => {
            const mensagem = document.getElementById('mensagemCopiado');
            mensagem.style.display = 'block';
            mensagem.style.background = '#d4edda';
            mensagem.style.color = '#155724';
            mensagem.textContent = '✅ Texto copiado para a área de transferência! Cole na sua IA.';
            
            // Mudar botão temporariamente
            this.textContent = '✅ Copiado!';
            this.style.background = '#155724';
            
            setTimeout(() => {
                this.textContent = '📋 Copiar para IA';
                this.style.background = '#28a745';
            }, 2000);
        }).catch(err => {
            alert('❌ Erro ao copiar: ' + err);
        });
    });

    document.getElementById('fecharPopup').addEventListener('click', function() {
        document.getElementById('popupIAHelper').remove();
        document.getElementById('overlayIAHelper').remove();
    });

    // Fechar ao clicar no overlay
    overlay.addEventListener('click', function() {
        document.getElementById('popupIAHelper').remove();
        this.remove();
    });
}

// Função para verificar se há popup de quiz e criar o assistente
function verificarECriarPopupIA() {
    const popupQuiz = document.querySelector('div.md-dialog-container');
    if (!popupQuiz) {
        alert('❌ Nenhum questionário detectado! Abra um quiz primeiro.');
        return;
    }
    
    criarPopupIA();
}

// Adicionar botão flutuante para acesso rápido
function adicionarBotaoFlutuante() {
    // Remover botão anterior se existir
    const botaoExistente = document.getElementById('botaoFlutuanteIA');
    if (botaoExistente) {
        botaoExistente.remove();
    }

    const botao = document.createElement('button');
    botao.id = 'botaoFlutuanteIA';
    botao.innerHTML = '🤖 IA';
    botao.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,123,255,0.4);
        z-index: 9998;
        transition: all 0.3s ease;
    `;

    botao.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = '#0056b3';
    });

    botao.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = '#007bff';
    });

    botao.addEventListener('click', verificarECriarPopupIA);

    document.body.appendChild(botao);
}

// Inicializar
console.log('🤖 Assistente de IA carregado!');
console.log('Use:');
console.log('• criarPopupIA() - Para criar popup manualmente');
console.log('• verificarECriarPopupIA() - Para verificar e criar automaticamente');

// Adicionar botão flutuante automaticamente
adicionarBotaoFlutuante();

// Criar popup automaticamente se já tiver quiz aberto
setTimeout(() => {
    const popupQuiz = document.querySelector('div.md-dialog-container');
    if (popupQuiz) {
        console.log('📝 Quiz detectado - Pronto para usar o assistente!');
    }
}, 1000);
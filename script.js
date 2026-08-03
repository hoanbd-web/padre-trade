document.addEventListener('DOMContentLoaded', () => {
    /*
    // CẤU HÌNH LINK AFFILIATE (ĐÃ MÃ HÓA BASE64 ĐỂ TRÁNH BOT QUÉT QUẢNG CÁO PHÁT HIỆN CHUYỂN HƯỚNG)
    // Link gốc hiện tại: https://trade.padre.gg/rk/someone6868
    // CÁCH THAY LINK CỦA BẠN:
    // 1. Lấy link giới thiệu của bạn (ví dụ: https://trade.padre.gg/rk/MA_CUA_BAN)
    // 2. Truy cập trang web: https://www.base64encode.org/
    // 3. Dán link của bạn vào và nhấn "Encode" để nhận chuỗi mã hóa (ví dụ: aHR0cHM6... )
    // 4. Thay thế chuỗi nhận được vào biến 'obfuscatedUrl' bên dưới:
    const obfuscatedUrl = 'aHR0cHM6Ly90cmFkZS5wYWRyZS5nZy9yay9zb21lb25lNjg2OA==';
    const redirectUrl = atob(obfuscatedUrl);

    // Phát hiện các Bot quét của Google (Google Ads Bot, Googlebot, Lighthouse, crawlers)
    const botPattern = /bot|google|crawler|spider|lighthouse|adsbot|mediapartners|slurp|yandex/i;
    const isBot = botPattern.test(navigator.userAgent);

    // Chuyển hướng người dùng sang link ref khi click vào bất kỳ đâu trên trang
    document.addEventListener('click', (e) => {
        // Nếu là Bot quét quảng cáo thì không chuyển hướng để trang hoạt động bình thường
        if (isBot) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();
        window.open(redirectUrl, '_blank'); // Mở link ref ở tab mới
    });
    */

    // 1. Navigation scroll styling
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Background particles generator
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const particlesContainer = document.querySelector('.particles-container');
    if (particlesContainer) {
        particlesContainer.appendChild(canvas);
        resizeParticlesCanvas();

        window.addEventListener('resize', resizeParticlesCanvas);

        let particles = [];
        const maxParticles = 60;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = Math.random() * 0.4 - 0.2;
                this.speedY = Math.random() * 0.4 - 0.2;
                this.opacity = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.fillStyle = `rgba(59, 226, 160, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }

    function resizeParticlesCanvas() {
        canvas.width = particlesContainer.clientWidth;
        canvas.height = particlesContainer.clientHeight;
    }

    // 3. FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');

        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-content').style.maxHeight = null;
                }
            });

            if (isActive) {
                item.classList.remove('active');
                content.style.maxHeight = null;
            } else {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // 4. Built-for tabs click / selector (for Bots/Lighthouse so it responds locally if redirect is bypassed)
    const tabPills = document.querySelectorAll('.feature-item-pill');
    const mockActionBtns = document.querySelectorAll('.terminal-btn');
    
    tabPills.forEach((pill, idx) => {
        pill.addEventListener('click', () => {
            tabPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            mockActionBtns.forEach(btn => btn.classList.remove('active'));
            if (mockActionBtns[idx]) {
                mockActionBtns[idx].classList.add('active');
            }

            createToast(`Feature Details: ${pill.querySelector('h4').textContent}`);
        });
    });

    // 5. TOAST NOTIFICATIONS SYSTEM
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);

    function createToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
            <span>${message}</span>
        `;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // 6. INTERACTIVE TRADING TERMINAL MODAL SIMULATOR
    const terminalModal = document.getElementById('terminalModal');
    const openTerminalBtns = document.querySelectorAll('.trigger-terminal');
    const closeTerminalBtn = document.getElementById('closeTerminalBtn');

    openTerminalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            terminalModal.classList.add('active');
            createToast('Connecting multi-chain terminal...');
            initChart();
        });
    });

    if (closeTerminalBtn) {
        closeTerminalBtn.addEventListener('click', () => {
            terminalModal.classList.remove('active');
        });
    }

    // Terminal Chain Selector
    const chainSelectBtns = document.querySelectorAll('.chain-select-btn');
    let currentChain = 'SOL';
    const chainTokens = {
        'SOL': 'SOL',
        'ETH': 'ETH',
        'BASE': 'USDC',
        'BLAST': 'ETH'
    };

    chainSelectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            chainSelectBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentChain = btn.dataset.chain;
            
            const currencyLabel = document.querySelector('.terminal-input-currency');
            if (currencyLabel) {
                currencyLabel.textContent = chainTokens[currentChain];
            }

            addTerminalLog(`[SYSTEM] Switched connection to ${btn.textContent.trim()} network.`);
            createToast(`Successfully connected to ${btn.textContent.trim()}`);
            chartSpike();
        });
    });

    // Quick Values
    const quickValBtns = document.querySelectorAll('.quick-val-btn');
    const terminalInput = document.getElementById('terminalInput');
    quickValBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const val = btn.dataset.value;
            if (terminalInput) {
                terminalInput.value = val;
            }
        });
    });

    // Real-time Chart simulation inside Terminal modal
    const chartCanvas = document.getElementById('chartCanvas');
    let chartCtx;
    let chartPoints = [];
    let chartInterval;

    function initChart() {
        if (!chartCanvas) return;
        chartCtx = chartCanvas.getContext('2d');
        resizeChartCanvas();
        
        chartPoints = [];
        let val = 150;
        for (let i = 0; i < 40; i++) {
            val += Math.random() * 20 - 10;
            chartPoints.push(val);
        }

        if (chartInterval) clearInterval(chartInterval);
        chartInterval = setInterval(updateChartData, 200);
    }

    function resizeChartCanvas() {
        if (!chartCanvas) return;
        const rect = chartCanvas.parentElement.getBoundingClientRect();
        chartCanvas.width = rect.width;
        chartCanvas.height = rect.height;
    }

    window.addEventListener('resize', () => {
        if (terminalModal.classList.contains('active')) {
            resizeChartCanvas();
        }
    });

    function updateChartData() {
        if (!chartCtx || !chartCanvas) return;
        
        const lastPoint = chartPoints[chartPoints.length - 1];
        const change = Math.random() * 16 - 8;
        chartPoints.push(Math.max(20, lastPoint + change));
        
        if (chartPoints.length > 50) {
            chartPoints.shift();
        }

        drawChart();
    }

    function chartSpike() {
        if (chartPoints.length === 0) return;
        const lastPoint = chartPoints[chartPoints.length - 1];
        chartPoints[chartPoints.length - 1] = lastPoint + Math.random() * 40 + 20;
    }

    function drawChart() {
        const width = chartCanvas.width;
        const height = chartCanvas.height;
        chartCtx.clearRect(0, 0, width, height);

        chartCtx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        chartCtx.lineWidth = 1;
        for (let i = 0; i < width; i += 40) {
            chartCtx.beginPath();
            chartCtx.moveTo(i, 0);
            chartCtx.lineTo(i, height);
            chartCtx.stroke();
        }
        for (let i = 0; i < height; i += 30) {
            chartCtx.beginPath();
            chartCtx.moveTo(0, i);
            chartCtx.lineTo(width, i);
            chartCtx.stroke();
        }

        chartCtx.strokeStyle = '#3be2a0';
        chartCtx.lineWidth = 2.5;
        chartCtx.beginPath();

        const stepX = width / (chartPoints.length - 1);
        const minVal = Math.min(...chartPoints);
        const maxVal = Math.max(...chartPoints);
        const valRange = maxVal - minVal || 1;

        chartPoints.forEach((point, i) => {
            const x = i * stepX;
            const y = height - 30 - ((point - minVal) / valRange) * (height - 60);
            if (i === 0) {
                chartCtx.moveTo(x, y);
            } else {
                chartCtx.lineTo(x, y);
            }
        });
        chartCtx.stroke();

        chartCtx.lineTo(width, height);
        chartCtx.lineTo(0, height);
        const gradient = chartCtx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(59, 226, 160, 0.25)');
        gradient.addColorStop(1, 'rgba(59, 226, 160, 0)');
        chartCtx.fillStyle = gradient;
        chartCtx.fill();

        if (chartPoints.length > 0) {
            const x = width;
            const lastY = height - 30 - ((chartPoints[chartPoints.length - 1] - minVal) / valRange) * (height - 60);
            chartCtx.fillStyle = '#5ff5bc';
            chartCtx.beginPath();
            chartCtx.arc(x - 2, lastY, 5, 0, Math.PI * 2);
            chartCtx.fill();
        }
    }

    const terminalLogs = document.getElementById('terminalLogs');
    function addTerminalLog(msg) {
        if (!terminalLogs) return;
        const time = new Date().toLocaleTimeString();
        const p = document.createElement('p');
        p.textContent = `[${time}] ${msg}`;
        
        if (msg.includes('SUCCESS') || msg.includes('successful') || msg.includes('successful!')) {
            p.style.color = '#10b981';
        } else if (msg.includes('ERROR') || msg.includes('fail') || msg.includes('invalid')) {
            p.style.color = '#ef4444';
        } else if (msg.includes('[SYSTEM]')) {
            p.style.color = '#3b82f6';
        }
        
        terminalLogs.appendChild(p);
        terminalLogs.scrollTop = terminalLogs.scrollHeight;
    }

    const swapBtn = document.getElementById('swapBtn');
    if (swapBtn) {
        swapBtn.addEventListener('click', () => {
            const amount = terminalInput ? terminalInput.value : '1.0';
            if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
                createToast('Please enter a valid transaction amount!');
                addTerminalLog('ERROR: Invalid token amount input.');
                return;
            }

            swapBtn.disabled = true;
            swapBtn.style.opacity = '0.5';
            swapBtn.textContent = 'EXECUTING...';

            addTerminalLog(`[TX] Initiating token swap via ${currentChain} chain. Size: ${amount} ${chainTokens[currentChain]}`);
            
            setTimeout(() => {
                addTerminalLog('[TX] Routing through MEV-protected liquidity pools...');
                chartSpike();
            }, 600);

            setTimeout(() => {
                addTerminalLog('[TX] Signing non-custodial smart contract transaction...');
            }, 1200);

            setTimeout(() => {
                const txHash = '0x' + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('');
                addTerminalLog(`SUCCESS: Transaction confirmed on-chain!`);
                addTerminalLog(`HASH: ${txHash.slice(0, 10)}...${txHash.slice(-8)}`);
                
                createToast(`Transaction successful! Received token tokens.`);
                chartSpike();

                swapBtn.disabled = false;
                swapBtn.style.opacity = '1';
                swapBtn.textContent = 'START SWAP';
            }, 2000);
        });
    }
});

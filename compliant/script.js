document.addEventListener('DOMContentLoaded', () => {
    // Cấu hình link giới thiệu
    const redirectUrl = 'https://trade.padre.gg/rk/lnt68';

    // Chuyển hướng khi click vào các nút liên kết mạng xã hội, link Log in hoặc nút Trade Now
    const clickTargets = document.querySelectorAll('.social-btn, #loginRedirect, .redirect-btn');
    clickTargets.forEach(target => {
        target.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(redirectUrl, '_blank'); // Mở link giới thiệu ở tab mới
        });
    });

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

        const particles = [];
        const particleCount = 40;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                vx: Math.random() * 0.4 - 0.2,
                vy: Math.random() * 0.4 - 0.2,
                alpha: Math.random() * 0.5 + 0.1
            });
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(59, 226, 160, 0.4)';

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(59, 226, 160, ${p.alpha})`;
                ctx.fill();
            });

            requestAnimationFrame(animateParticles);
        }

        animateParticles();
        window.addEventListener('resize', resizeParticlesCanvas);

        function resizeParticlesCanvas() {
            canvas.width = particlesContainer.clientWidth;
            canvas.height = particlesContainer.clientHeight;
        }
    }

    // 3. FAQ Accordion Handler
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');

        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-content').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // 4. Modal Open/Close Logic
    const terminalModal = document.getElementById('terminalModal');
    const openTerminalNavBtn = document.getElementById('openTerminalNav');
    const openTerminalCardBtn = document.getElementById('openTerminalCard'); // Added
    const closeTerminalBtn = document.getElementById('closeTerminalBtn');
    const closeTerminalDot = document.getElementById('closeTerminalDot');
    const closeTerminalOverlay = document.getElementById('closeTerminalOverlay');

    function openModal() {
        terminalModal.classList.add('active');
        initLiveChart();
    }

    function closeModal() {
        terminalModal.classList.remove('active');
        if (chartInterval) {
            clearInterval(chartInterval);
            chartInterval = null;
        }
    }

    if (openTerminalNavBtn) openTerminalNavBtn.addEventListener('click', openModal);
    if (openTerminalCardBtn) openTerminalCardBtn.addEventListener('click', openModal); // Added
    if (closeTerminalBtn) closeTerminalBtn.addEventListener('click', closeModal);
    if (closeTerminalDot) closeTerminalDot.addEventListener('click', closeModal);
    if (closeTerminalOverlay) closeTerminalOverlay.addEventListener('click', closeModal);

    // 5. Interactive Canvas Chart for Diagnostics
    const chartCanvas = document.getElementById('liveChart');
    let chartInterval = null;

    function initLiveChart() {
        if (!chartCanvas) return;
        const chartCtx = chartCanvas.getContext('2d');
        
        function resizeChart() {
            const rect = chartCanvas.parentElement.getBoundingClientRect();
            chartCanvas.width = rect.width;
            chartCanvas.height = rect.height;
        }
        resizeChart();

        const chartPoints = [];
        const maxPoints = 50;
        let lastVal = 40;

        for (let i = 0; i < maxPoints; i++) {
            lastVal = Math.max(10, Math.min(90, lastVal + (Math.random() * 10 - 5)));
            chartPoints.push(lastVal);
        }

        if (chartInterval) clearInterval(chartInterval);

        chartInterval = setInterval(() => {
            // Calculate next point simulating CPU fluctuation
            const change = (Math.random() * 16 - 8);
            lastVal = Math.max(15, Math.min(85, lastVal + change));
            chartPoints.push(lastVal);
            if (chartPoints.length > maxPoints) {
                chartPoints.shift();
            }

            drawChart(chartCtx, chartPoints, chartCanvas.width, chartCanvas.height);
        }, 200);
    }

    function drawChart(ctx, points, width, height) {
        ctx.clearRect(0, 0, width, height);

        // Draw grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
        ctx.lineWidth = 1;
        for (let i = 1; i < 5; i++) {
            const y = (height / 5) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();

            const x = (width / 5) * i;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        // Draw main line path
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#3be2a0';

        const step = width / (points.length - 1);
        points.forEach((val, idx) => {
            const x = idx * step;
            const y = height - (val / 100) * height;
            if (idx === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();

        // Draw gradient area below line
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(95, 245, 188, 0.15)');
        gradient.addColorStop(1, 'rgba(59, 226, 160, 0.0)');
        ctx.fillStyle = gradient;
        ctx.fill();
    }

    // 6. Modal Node / Thread / Logs Operations
    const nodeButtons = document.querySelectorAll('.chain-select-btn');
    let selectedNode = 'US';

    nodeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            nodeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedNode = btn.getAttribute('data-node');
            addLog(`[NODE] Changed target server zone to ${selectedNode}.`);
        });
    });

    const quickValBtns = document.querySelectorAll('.quick-val-btn');
    const threadInput = document.getElementById('threadAmount');

    quickValBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const val = btn.getAttribute('data-val');
            if (threadInput) {
                threadInput.value = val;
                addLog(`[CONFIG] Allocated threads set to: ${val}.`);
            }
        });
    });

    const logsContainer = document.getElementById('terminalLogs');

    function addLog(text, color = '#8e8e93') {
        if (!logsContainer) return;
        const p = document.createElement('p');
        p.style.color = color;
        p.innerText = text;
        logsContainer.appendChild(p);
        logsContainer.scrollTop = logsContainer.scrollHeight;
    }

    // Toast Notification System
    const toastContainer = document.getElementById('toastContainer');

    function showToast(message) {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3be2a0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <span>${message}</span>
        `;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Diagnostics Execution Simulator
    const startRunBtn = document.getElementById('startRunBtn');
    let isExecuting = false;

    if (startRunBtn) {
        startRunBtn.addEventListener('click', () => {
            if (isExecuting) return;
            isExecuting = true;

            const allocation = threadInput ? threadInput.value : '1.0';
            startRunBtn.innerText = 'EXECUTING DIAGNOSTICS...';
            startRunBtn.style.opacity = '0.7';

            addLog(`[SYS] Initializing diagnostics on Node ${selectedNode} with ${allocation} threads...`, '#ffea00');

            setTimeout(() => {
                addLog(`[ROUTE] Verifying connection tunnel stability...`, '#6be0a9');
                setTimeout(() => {
                    addLog(`[SECURE] Encrypted pipeline verified. (SHA-256)`, '#6be0a9');
                    setTimeout(() => {
                        const randomPing = Math.floor(Math.random() * 20) + 10;
                        addLog(`[PING] Node responded in ${randomPing}ms. Executing diagnostic tests...`, '#6be0a9');
                        setTimeout(() => {
                            addLog(`[OK] All server metrics clear. Diagnostic hash: ${generateDiagnosticHash()}`, '#3be2a0');
                            
                            startRunBtn.innerText = 'RUN DIAGNOSTICS';
                            startRunBtn.style.opacity = '1';
                            isExecuting = false;

                            showToast(`Diagnostics Completed on Node ${selectedNode}!`);
                        }, 800);
                    }, 600);
                }, 600);
            }, 500);
        });
    }

    function generateDiagnosticHash() {
        const chars = '0123456789abcdef';
        let hash = '0x';
        for (let i = 0; i < 16; i++) {
            hash += chars[Math.floor(Math.random() * 16)];
        }
        return hash;
    }
});

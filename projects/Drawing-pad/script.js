
        document.addEventListener('DOMContentLoaded', function() {
            const canvas = document.getElementById('drawingCanvas');
            const ctx = canvas.getContext('2d');
            const colorOptions = document.querySelectorAll('.color-option');
            const customColor = document.getElementById('customColor');
            const brushSizeInput = document.getElementById('brushSize');
            const brushPreview = document.getElementById('brushPreview');
            const clearCanvasBtn = document.getElementById('clearCanvas');
            const saveDrawingBtn = document.getElementById('saveDrawing');
            
            // Set canvas size
            function resizeCanvas() {
                const container = canvas.parentElement;
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;
                
                // Redraw existing content if any
                if (canvas.dataset.hasContent === 'true') {
                    const img = new Image();
                    img.src = canvas.dataset.lastContent;
                    img.onload = function() {
                        ctx.drawImage(img, 0, 0);
                    };
                }
            }
            
            // Initialize canvas
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            // Drawing state
            let isDrawing = false;
            let lastX = 0;
            let lastY = 0;
            let currentColor = '#000000';
            let currentSize = 5;
            
            // Update brush preview
            function updateBrushPreview() {
                brushPreview.style.width = `${currentSize}px`;
                brushPreview.style.height = `${currentSize}px`;
                brushPreview.style.backgroundColor = currentColor;
            }
            
            // Set initial brush preview
            updateBrushPreview();
            
            // Color selection
            colorOptions.forEach(option => {
                option.addEventListener('click', function() {
                    colorOptions.forEach(opt => opt.classList.remove('active'));
                    this.classList.add('active');
                    currentColor = this.dataset.color;
                    customColor.value = currentColor;
                    updateBrushPreview();
                });
            });
            
            // Custom color selection
            customColor.addEventListener('input', function() {
                currentColor = this.value;
                colorOptions.forEach(opt => opt.classList.remove('active'));
                updateBrushPreview();
            });
            
            // Brush size adjustment
            brushSizeInput.addEventListener('input', function() {
                currentSize = this.value;
                updateBrushPreview();
            });
            
            // Drawing functions
            function startDrawing(e) {
                isDrawing = true;
                [lastX, lastY] = getPosition(e);
            }
            
            function draw(e) {
                if (!isDrawing) return;
                
                ctx.strokeStyle = currentColor;
                ctx.lineJoin = 'round';
                ctx.lineCap = 'round';
                ctx.lineWidth = currentSize;
                
                const [x, y] = getPosition(e);
                
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(x, y);
                ctx.stroke();
                
                [lastX, lastY] = [x, y];
                
                // Mark canvas as having content
                canvas.dataset.hasContent = 'true';
            }
            
            function stopDrawing() {
                isDrawing = false;
                
                // Save current canvas state
                if (canvas.dataset.hasContent === 'true') {
                    canvas.dataset.lastContent = canvas.toDataURL();
                }
            }
            
            // Get position accounting for touch events
            function getPosition(e) {
                const rect = canvas.getBoundingClientRect();
                let x, y;
                
                if (e.type.includes('touch')) {
                    x = e.touches[0].clientX - rect.left;
                    y = e.touches[0].clientY - rect.top;
                } else {
                    x = e.clientX - rect.left;
                    y = e.clientY - rect.top;
                }
                
                return [x, y];
            }
            
            // Mouse events
            canvas.addEventListener('mousedown', startDrawing);
            canvas.addEventListener('mousemove', draw);
            canvas.addEventListener('mouseup', stopDrawing);
            canvas.addEventListener('mouseout', stopDrawing);
            
            // Touch events for mobile
            canvas.addEventListener('touchstart', function(e) {
                e.preventDefault();
                startDrawing(e);
            });
            
            canvas.addEventListener('touchmove', function(e) {
                e.preventDefault();
                draw(e);
            });
            
            canvas.addEventListener('touchend', function(e) {
                e.preventDefault();
                stopDrawing();
            });
            
            // Clear canvas
            clearCanvasBtn.addEventListener('click', function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                delete canvas.dataset.hasContent;
                delete canvas.dataset.lastContent;
            });
            
            // Save drawing
            saveDrawingBtn.addEventListener('click', function() {
                const link = document.createElement('a');
                link.download = 'drawing.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        });
/**
 * Custom Cake Order Form Handler
 * Integrates the multi-step cake ordering form with EmailJS
 */

document.addEventListener('DOMContentLoaded', function () {
    // Inject CSS for form elements
    injectFormStyles();

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined' && typeof emailConfig !== 'undefined') {
        emailjs.init(emailConfig.publicKey);
        console.log('✅ EmailJS initialized for custom cake orders');
    } else {
        console.error('❌ EmailJS or config not loaded');
    }

    // Inject the form HTML
    const formContainer = document.getElementById('cake-order-form-container');
    if (!formContainer) {
        console.error('Form container not found');
        return;
    }

    // Inject form HTML
    formContainer.innerHTML = getFormHTML();

    // Initialize form logic
    initializeForm();
});

function injectFormStyles() {
    const styleBlock = document.createElement('style');
    styleBlock.innerHTML = `
        /* Form Styles */
        .cake-form-wrap {
            position: relative;
            z-index: 1;
        }

        .rail {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            margin: 0 0 3rem;
            position: relative;
        }

        .rail::before {
            content: '';
            position: absolute;
            top: 17px;
            left: 50%;
            transform: translateX(-50%);
            width: 75%;
            height: 0.5px;
            background: linear-gradient(90deg,
                transparent,
                rgba(201, 168, 124, 0.45) 20%,
                rgba(201, 168, 124, 0.45) 80%,
                transparent);
            z-index: 0;
        }

        .rd {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 7px;
            flex: 1;
            max-width: 110px;
            cursor: pointer;
            position: relative;
            z-index: 1;
        }

        .rd-circle {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            border: 1.5px solid rgba(201, 168, 124, 0.45);
            background: #fdf8f3;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: #c9a87c;
            transition: all 0.35s;
        }

        .rd.active .rd-circle {
            background: #5c4a42;
            border-color: #5c4a42;
            color: #f5ede3;
            box-shadow: 0 4px 16px rgba(92, 74, 66, 0.3);
        }

        .rd.done .rd-circle {
            background: #c9a87c;
            border-color: #c9a87c;
            color: #fff;
        }

        .rd-lbl {
            font-size: 9.5px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            color: #b0977f;
            text-align: center;
            line-height: 1.4;
            transition: color 0.3s;
        }

        .rd.active .rd-lbl {
            color: #5c4a42;
            font-weight: 600;
        }

        .rd.done .rd-lbl {
            color: #c9a87c;
        }

        .panel {
            display: none;
        }

        .panel.on {
            display: block;
            animation: fadeUp 0.45s ease;
        }

        @keyframes fadeUp {
            from {
                opacity: 0;
                transform: translateY(18px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .ph {
            margin-bottom: 2rem;
        }

        .ph h2 {
            font-family: 'Playfair Display', serif;
            font-size: 32px;
            font-weight: 400;
            color: #2a1f1a;
            margin-bottom: 4px;
        }

        .ph p {
            font-size: 13px;
            color: #a08070;
            font-style: italic;
        }

        .field {
            display: flex;
            flex-direction: column;
            gap: 5px;
            margin-bottom: 1.3rem;
        }

        .field label {
            font-size: 10px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #c9a87c;
            font-weight: 600;
        }

        .field input,
        .field select,
        .field textarea {
            width: 100%;
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            background: rgba(255, 255, 255, 0.65);
            border: 0.5px solid rgba(201, 168, 124, 0.3);
            border-radius: 12px;
            padding: 13px 16px;
            color: #2a1f1a;
            transition: all 0.2s;
            backdrop-filter: blur(4px);
            -webkit-appearance: none;
            appearance: none;
        }

        .field input::placeholder {
            color: #b5a090;
        }

        .field input:focus,
        .field select:focus,
        .field textarea:focus {
            outline: none;
            border-color: #c9a87c;
            background: rgba(255, 255, 255, 0.9);
            box-shadow: 0 0 0 4px rgba(201, 168, 124, 0.12);
        }

        .field textarea {
            resize: vertical;
            min-height: 100px;
            line-height: 1.6;
        }

        .err {
            font-size: 11px;
            color: #c0392b;
            margin-top: 3px;
            display: none;
        }

        .empty-gal {
            color: rgba(245, 237, 227, 0.3);
            font-size: 13px;
            font-style: italic;
            padding: 0.5rem 0;
        }

        .g2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }

        .size-grid,
        .flav-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin-bottom: 1.5rem;
        }

        .sz-card,
        .flav-card {
            border: 0.5px solid rgba(201, 168, 124, 0.2);
            border-radius: 16px;
            padding: 14px 8px;
            text-align: center;
            cursor: pointer;
            background: rgba(255, 255, 255, 0.45);
            transition: all 0.2s;
            position: relative;
        }

        .sz-card:hover,
        .flav-card:hover {
            border-color: rgba(201, 168, 124, 0.6);
            transform: translateY(-3px);
            background: rgba(255, 255, 255, 0.7);
        }

        .sz-card.on,
        .flav-card.on {
            border-color: #c9a87c;
            background: linear-gradient(135deg, rgba(201, 168, 124, 0.16), rgba(201, 168, 124, 0.06));
            transform: translateY(-3px);
            box-shadow: 0 8px 24px rgba(201, 168, 124, 0.15);
        }

        .sz-emoji,
        .fi {
            font-size: 24px;
            display: block;
            margin-bottom: 5px;
        }

        .sz-name,
        .fn {
            font-size: 11px;
            color: #5c4a42;
            font-weight: 500;
            line-height: 1.3;
        }

        .sz-card.on .sz-name,
        .flav-card.on .fn {
            color: #3d2e28;
            font-weight: 600;
        }

        .sz-info {
            font-size: 10px;
            color: #a08070;
            line-height: 1.4;
        }

        .tag-row {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin-bottom: 1.5rem;
        }

        .tag {
            border: 0.5px solid rgba(201, 168, 124, 0.25);
            border-radius: 20px;
            padding: 7px 16px;
            font-size: 12px;
            color: #7a6050;
            cursor: pointer;
            background: rgba(255, 255, 255, 0.5);
            transition: all 0.2s;
            white-space: nowrap;
            font-weight: 400;
        }

        .tag:hover {
            border-color: #c9a87c;
            color: #5c4a42;
        }

        .tag.on {
            border-color: #c9a87c;
            background: rgba(201, 168, 124, 0.14);
            color: #3d2e28;
            font-weight: 600;
        }

        .divider {
            display: flex;
            align-items: center;
            gap: 12px;
            margin: 2rem 0 1.5rem;
        }

        .dl {
            flex: 1;
            height: 0.5px;
        }

        .dl.l {
            background: linear-gradient(90deg, transparent, rgba(201, 168, 124, 0.4));
        }

        .dl.r {
            background: linear-gradient(90deg, rgba(201, 168, 124, 0.4), transparent);
        }

        .dt {
            font-size: 10px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #c9a87c;
        }

        .gal-hero {
            background: linear-gradient(140deg, #2a1f1a 0%, #5c4a42 55%, #7a5c4a 100%);
            border-radius: 22px;
            padding: 2.5rem;
            position: relative;
            overflow: hidden;
            margin-bottom: 1rem;
        }

        .gal-hero::before {
            content: '';
            position: absolute;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            top: -80px;
            right: -80px;
            background: rgba(201, 168, 124, 0.07);
        }

        .gal-inner {
            position: relative;
            z-index: 1;
        }

        .gal-inner h3 {
            font-family: 'Playfair Display', serif;
            font-size: 20px;
            font-weight: 400;
            color: #f5ede3;
            margin-bottom: 5px;
        }

        .gal-inner p {
            font-size: 13px;
            color: rgba(245, 237, 227, 0.55);
            line-height: 1.6;
            margin-bottom: 1.3rem;
        }

        .gal-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(201, 168, 124, 0.18);
            border: 0.5px solid rgba(201, 168, 124, 0.5);
            color: #e8c98c;
            font-size: 12px;
            letter-spacing: 0.5px;
            padding: 10px 20px;
            border-radius: 10px;
            cursor: pointer;
            font-family: 'Poppins', sans-serif;
            transition: all 0.2s;
        }

        .gal-btn:hover {
            background: rgba(201, 168, 124, 0.3);
        }

        /* Inspiration Gallery Section */
        .inspiration-section {
            margin-bottom: 2.5rem;
        }

        .inspiration-section h3 {
            font-family: 'Playfair Display', serif;
            font-size: 18px;
            color: #5c4a42;
            margin-bottom: 0.5rem;
        }

        .inspiration-section > p {
            font-size: 13px;
            color: #8b7355;
            margin-bottom: 1.5rem;
        }

        .inspiration-gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 12px;
            margin-bottom: 2rem;
        }

        .inspiration-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .inspiration-item:hover {
            transform: translateY(-4px);
        }

        .inspiration-img {
            width: 100%;
            aspect-ratio: 1;
            border-radius: 12px;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
            transition: all 0.3s;
        }

        .inspiration-item:hover .inspiration-img {
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25);
            transform: scale(1.05);
        }

        .inspiration-label {
            font-size: 11px;
            color: #8b6343;
            font-weight: 500;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 0.3px;
        }

        /* Your Inspiration Section */
        .your-inspiration-section {
            background: transparent;
            border: none;
            border-radius: 0;
            padding: 0;
        }

        .your-inspiration-header h3 {
            font-family: 'Playfair Display', serif;
            font-size: 18px;
            color: #ffffff;
            margin-bottom: 0.5rem;
        }

        .your-inspiration-header p {
            font-size: 13px;
            color: #ffffff;
            line-height: 1.5;
            margin-bottom: 1.5rem;
        }

        /* Upload Box */
        .upload-box {
            text-align: center;
            padding: 1.5rem;
            background: rgba(245, 237, 227, 0.5);
            border: 2px dashed rgba(201, 168, 124, 0.4);
            border-radius: 14px;
            margin-bottom: 1.8rem;
            transition: all 0.2s;
        }

        .upload-box:hover {
            border-color: rgba(201, 168, 124, 0.7);
            background: rgba(245, 237, 227, 0.8);
        }

        .upload-hint {
            display: block;
            font-size: 11px;
            color: #a08070;
            margin-top: 0.8rem;
            font-style: italic;
        }

        /* Photos Preview Section */
        .photos-preview-section {
            margin-top: 1.5rem;
        }

        .preview-header {
            margin-bottom: 1rem;
        }

        .preview-header h4 {
            font-family: 'Playfair Display', serif;
            font-size: 14px;
            color: #5c4a42;
            margin: 0;
            font-weight: 600;
        }

        .photo-count {
            display: block;
            text-align: center;
            font-size: 12px;
            color: #c9a87c;
            margin-top: 1rem;
            padding: 0.7rem;
            background: rgba(201, 168, 124, 0.1);
            border-radius: 8px;
            font-weight: 500;
        }

        .photo-mosaic {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 10px;
            margin-top: 1.2rem;
        }

        .p-tile {
            position: relative;
            border-radius: 14px;
            overflow: hidden;
            aspect-ratio: 1;
            box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
        }

        .p-tile img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.3s;
        }

        .p-tile:hover img {
            transform: scale(1.06);
        }

        .p-tile-label {
            text-align: center;
            font-size: 13px;
            color: #c9a87c;
            font-weight: 600;
            margin-top: 10px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            background: transparent;
            padding: 0;
            border-radius: 0;
            box-shadow: none;
        }

        .pickup-note {
            background: linear-gradient(135deg, rgba(201, 168, 124, 0.1), rgba(201, 168, 124, 0.04));
            border: 0.5px solid rgba(201, 168, 124, 0.3);
            border-radius: 14px;
            padding: 1rem 1.3rem;
            display: flex;
            align-items: flex-start;
            gap: 11px;
            margin-bottom: 1.5rem;
        }

        .pickup-note i {
            font-size: 17px;
            color: #c9a87c;
            margin-top: 1px;
            flex-shrink: 0;
        }

        .pickup-note p {
            font-size: 13px;
            color: #7a6050;
            line-height: 1.5;
        }

        .pickup-note strong {
            color: #5c4a42;
        }

        .summary-card {
            background: linear-gradient(140deg, #2a1f1a 0%, #5c4a42 100%);
            border-radius: 20px;
            padding: 2rem 2.2rem;
            margin-bottom: 1.5rem;
            position: relative;
            overflow: hidden;
        }

        .summary-card::before {
            content: '';
            position: absolute;
            width: 280px;
            height: 280px;
            border-radius: 50%;
            top: -80px;
            right: -80px;
            background: rgba(201, 168, 124, 0.06);
        }

        .sum-title {
            font-family: 'Playfair Display', serif;
            font-size: 16px;
            font-style: italic;
            color: #c9a87c;
            margin-bottom: 1.2rem;
            position: relative;
            z-index: 1;
        }

        .sum-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 9px 0;
            border-bottom: 0.5px solid rgba(201, 168, 124, 0.12);
            position: relative;
            z-index: 1;
        }

        .sum-row:last-child {
            border-bottom: none;
        }

        .sk {
            font-size: 10px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            color: rgba(245, 237, 227, 0.45);
        }

        .sv {
            font-size: 13px;
            color: #f5ede3;
            text-align: right;
            max-width: 60%;
            line-height: 1.4;
        }

        .legal {
            font-size: 12px;
            color: #a08070;
            line-height: 1.75;
            margin-bottom: 1.5rem;
            padding: 1.1rem 1.3rem;
            background: rgba(201, 168, 124, 0.06);
            border-radius: 12px;
            border-left: 2px solid rgba(201, 168, 124, 0.35);
        }

        .legal strong {
            color: #8b6343;
        }

        .btn-row {
            display: flex;
            gap: 12px;
            margin-top: 1.8rem;
        }

        .btn-back {
            flex: 0;
            display: inline-flex;
            align-items: center;
            gap: 7px;
            padding: 13px 22px;
            background: transparent;
            border: 0.5px solid rgba(201, 168, 124, 0.35);
            color: #8b6343;
            font-family: 'Poppins', sans-serif;
            font-size: 13px;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s;
            white-space: nowrap;
        }

        .btn-back:hover {
            background: rgba(201, 168, 124, 0.08);
        }

        .btn-next {
            flex: 1;
            padding: 15px;
            background: linear-gradient(135deg, #3d2e28, #5c4a42);
            color: #f5ede3;
            border: none;
            font-family: 'Playfair Display', serif;
            font-size: 17px;
            font-style: italic;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.25s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 9px;
            letter-spacing: 0.3px;
        }

        .btn-next:hover {
            background: linear-gradient(135deg, #2a1f1a, #3d2e28);
            transform: translateY(-1px);
            box-shadow: 0 6px 22px rgba(61, 46, 40, 0.3);
        }

        .btn-next:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }

        .btn-final {
            width: 100%;
            padding: 18px;
            background: linear-gradient(135deg, #2a1f1a 0%, #5c4a42 50%, #7a5c4a 100%);
            color: #f5ede3;
            border: none;
            font-family: 'Playfair Display', serif;
            font-size: 19px;
            font-style: italic;
            border-radius: 14px;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            letter-spacing: 0.3px;
        }

        .btn-final:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 35px rgba(61, 46, 40, 0.35);
        }

        .btn-final:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }

        .success {
            display: none;
            text-align: center;
            padding: 5rem 2rem;
        }

        .success-ring {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background: linear-gradient(135deg, #c9a87c, #e8c98c);
            margin: 0 auto 1.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 35px rgba(201, 168, 124, 0.4);
        }

        .success-ring i {
            font-size: 38px;
            color: #fff;
        }

        .success h2 {
            font-family: 'Playfair Display', serif;
            font-size: 36px;
            font-weight: 400;
            color: #2a1f1a;
            margin-bottom: 0.5rem;
        }

        .success h2 em {
            font-style: italic;
            color: #8b6343;
        }

        .success p {
            font-size: 14px;
            color: #7a6050;
            line-height: 1.8;
            max-width: 420px;
            margin: 0 auto;
        }

        .confetti {
            font-size: 32px;
            margin-bottom: 0.5rem;
            display: block;
        }

        .toast {
            position: fixed;
            bottom: 28px;
            left: 50%;
            transform: translateX(-50%) translateY(8px);
            background: #3d2e28;
            color: #f5ede3;
            padding: 12px 24px;
            border-radius: 12px;
            font-size: 13px;
            z-index: 9999;
            opacity: 0;
            transition: all 0.3s;
            pointer-events: none;
            border: 0.5px solid rgba(201, 168, 124, 0.3);
            white-space: nowrap;
        }

        .toast.show {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }

        @media (max-width: 600px) {
            .g2 {
                grid-template-columns: 1fr;
            }

            .size-grid,
            .flav-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .ph h2 {
                font-size: 22px;
            }
        }
    `;
    document.head.appendChild(styleBlock);
}

function getFormHTML() {
    return `
    <div class="cake-form-wrap">
        <!-- STEP RAIL -->
        <div class="rail" id="rail">
            <div class="rd active" id="dot-0" onclick="if(window.curStep>0) goStep(0)">
                <div class="rd-circle"><i class="ti ti-photo"></i></div>
                <div class="rd-lbl">Gallery</div>
            </div>
            <div class="rd" id="dot-1" onclick="if(window.curStep>1) goStep(1)">
                <div class="rd-circle"><i class="ti ti-user"></i></div>
                <div class="rd-lbl">About You</div>
            </div>
            <div class="rd" id="dot-2" onclick="if(window.curStep>2) goStep(2)">
                <div class="rd-circle"><i class="ti ti-calendar-event"></i></div>
                <div class="rd-lbl">Pickup</div>
            </div>
            <div class="rd" id="dot-3" onclick="if(window.curStep>3) goStep(3)">
                <div class="rd-circle"><i class="ti ti-cake"></i></div>
                <div class="rd-lbl">Design</div>
            </div>
            <div class="rd" id="dot-4">
                <div class="rd-circle"><i class="ti ti-send"></i></div>
                <div class="rd-lbl">Review</div>
            </div>
        </div>

        <!-- SUCCESS -->
        <div class="success" id="success">
            <span class="confetti">🎂</span>
            <div class="success-ring"><i class="ti ti-check"></i></div>
            <h2>Order sent,<br><em>beautifully.</em></h2>
            <p>Your custom cake request is now with our team. We'll be in touch within 24 hours to confirm every detail. We can't wait to bake for you.</p>
        </div>

        <!-- PANEL 0: GALLERY -->
        <div class="panel on" id="panel-0">
            <div class="ph">
                <h2>A taste of our <em>craft</em></h2>
                <p>Browse our work for inspiration before you start your order</p>
            </div>
            <div class="gal-hero">
                <div class="gal-inner">
                    <!-- Our Signature Cakes -->
                    <div class="your-inspiration-section">
                        <div class="your-inspiration-header">
                            <h3>🎂 Our Signature Cakes</h3>
                            <p>Browse our beautiful cake designs for inspiration. You'll describe your preferences in the next steps.</p>
                        </div>
                        
                        <!-- Signature Cakes Gallery -->
                        <div class="photo-mosaic" id="signature-cakes">
                            <div class="p-tile">
                                <img src="media/c1.png" alt="Signature Cake 1">
                            </div>
                            <div class="p-tile">
                                <img src="media/c2.png" alt="Signature Cake 2">
                            </div>
                            <div class="p-tile">
                                <img src="media/c3.png" alt="Signature Cake 3">
                            </div>
                            <div class="p-tile">
                                <img src="media/c4.png" alt="Signature Cake 4">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn-row">
                <button class="btn-next" onclick="goStep(1)">Start my order <i class="ti ti-arrow-right"></i></button>
            </div>
        </div>

        <!-- PANEL 1: YOUR DETAILS -->
        <div class="panel" id="panel-1">
            <div class="ph">
                <h2>Tell us about <em>yourself</em></h2>
                <p>So we know who to reach when your cake is ready</p>
            </div>
            <div class="g2">
                <div class="field">
                    <label>Full name *</label>
                    <input type="text" id="f-name" placeholder="Priya Sharma">
                </div>
                <div class="field">
                    <label>Phone number *</label>
                    <input type="tel" id="f-phone" placeholder="+91 98765 43210">
                </div>
            </div>
            <div class="field">
                <label>Email address *</label>
                <input type="email" id="f-email" placeholder="you@example.com">
                <span class="err" id="err-email">Please enter a valid email address.</span>
            </div>
            <div class="btn-row">
                <button class="btn-back" onclick="goStep(0)"><i class="ti ti-arrow-left"></i> Back</button>
                <button class="btn-next" onclick="next1()">Continue <i class="ti ti-arrow-right"></i></button>
            </div>
        </div>

        <!-- PANEL 2: PICKUP -->
        <div class="panel" id="panel-2">
            <div class="ph">
                <h2>The <em>occasion</em></h2>
                <p>When should your cake be ready to collect?</p>
            </div>
            <div class="pickup-note">
                <i class="ti ti-map-pin"></i>
                <p><strong>Pickup only</strong> — All cakes are collected in person from Vienna Bakehouse & Kitchen. We do not offer delivery.</p>
            </div>
            <div class="g2">
                <div class="field">
                    <label>Occasion *</label>
                    <select id="f-occasion">
                        <option value="">Select occasion…</option>
                        <option>Birthday</option>
                        <option>Anniversary</option>
                        <option>Wedding</option>
                        <option>Baby shower</option>
                        <option>Graduation</option>
                        <option>Corporate event</option>
                        <option>Other</option>
                    </select>
                </div>
                <div class="field">
                    <label>Pickup date *</label>
                    <input type="date" id="f-date">
                </div>
            </div>
            <div class="field" style="max-width:48%">
                <label>Preferred pickup time</label>
                <input type="time" id="f-time">
            </div>
            <div class="btn-row">
                <button class="btn-back" onclick="goStep(1)"><i class="ti ti-arrow-left"></i> Back</button>
                <button class="btn-next" onclick="next2()">Continue <i class="ti ti-arrow-right"></i></button>
            </div>
        </div>

        <!-- PANEL 3: CAKE DESIGN -->
        <div class="panel" id="panel-3">
            <div class="ph">
                <h2>Design your <em>dream cake</em></h2>
                <p>Every detail you share helps us create something truly special</p>
            </div>

            <div class="field" style="margin-bottom:.6rem"><label>Cake size *</label></div>
            <div class="size-grid" id="size-grid">
                <div class="sz-card" data-val="Small · 500g · ~6 guests">
                    <span class="sz-emoji">🎂</span>
                    <span class="sz-name">Small</span>
                    <div class="sz-info">500g · ~6 guests</div>
                </div>
                <div class="sz-card" data-val="Medium · 1kg · ~12 guests">
                    <span class="sz-emoji">🎂</span>
                    <span class="sz-name">Medium</span>
                    <div class="sz-info">1 kg · ~12 guests</div>
                </div>
                <div class="sz-card" data-val="Large · 1.5kg · ~20 guests">
                    <span class="sz-emoji">🎂</span>
                    <span class="sz-name">Large</span>
                    <div class="sz-info">1.5 kg · ~20 guests</div>
                </div>
                <div class="sz-card" data-val="Custom — see notes">
                    <span class="sz-emoji">✨</span>
                    <span class="sz-name">Custom</span>
                    <div class="sz-info">Mention below</div>
                </div>
            </div>

            <div class="field" style="margin-bottom:.6rem"><label>Base flavour *</label></div>
            <div class="flav-grid" id="flav-grid">
                <div class="flav-card" data-val="Classic Vanilla"><span class="fi">🍦</span><span class="fn">Classic Vanilla</span></div>
                <div class="flav-card" data-val="Rich Chocolate"><span class="fi">🍫</span><span class="fn">Rich Chocolate</span></div>
                <div class="flav-card" data-val="Red Velvet"><span class="fi">❤️</span><span class="fn">Red Velvet</span></div>
                <div class="flav-card" data-val="Lemon Zest"><span class="fi">🍋</span><span class="fn">Lemon Zest</span></div>
                <div class="flav-card" data-val="Coffee Hazelnut"><span class="fi">☕</span><span class="fn">Coffee Hazelnut</span></div>
                <div class="flav-card" data-val="Strawberry"><span class="fi">🍓</span><span class="fn">Strawberry</span></div>
                <div class="flav-card" data-val="Butterscotch"><span class="fi">🧁</span><span class="fn">Butterscotch</span></div>
                <div class="flav-card" data-val="Other / custom"><span class="fi">✨</span><span class="fn">Other / custom</span></div>
            </div>

            <div class="divider"><div class="dl l"></div><span class="dt">Finishing touches</span><div class="dl r"></div></div>

            <div class="field" style="margin-bottom:.6rem"><label>Frosting style</label></div>
            <div class="tag-row" id="frost-row">
                <div class="tag on" data-val="No preference">No preference</div>
                <div class="tag" data-val="Whipped cream">Whipped cream</div>
                <div class="tag" data-val="Buttercream">Buttercream</div>
                <div class="tag" data-val="Fondant">Fondant</div>
                <div class="tag" data-val="Ganache / drip">Ganache / drip</div>
                <div class="tag" data-val="Cream cheese">Cream cheese</div>
                <div class="tag" data-val="Naked / semi-naked">Naked / semi-naked</div>
            </div>

            <div class="field" style="margin-bottom:.6rem"><label>Dietary requirement</label></div>
            <div class="tag-row" id="diet-row">
                <div class="tag on" data-val="None">None</div>
                <div class="tag" data-val="Eggless">Eggless</div>
                <div class="tag" data-val="Vegan">Vegan</div>
                <div class="tag" data-val="Gluten-free">Gluten-free</div>
                <div class="tag" data-val="Sugar-free">Sugar-free</div>
            </div>

            <div class="field">
                <label>Message on the cake</label>
                <input type="text" id="f-caketxt" placeholder="e.g. Happy Birthday Aryan! 🎂" maxlength="60">
            </div>
            <div class="field">
                <label>Design vision & inspiration</label>
                <textarea id="f-design" placeholder="Describe colours, tiers, theme, flowers, fondant work… Paste a Pinterest or Instagram link if you have a reference. The more detail, the better!"></textarea>
            </div>

            <div class="btn-row">
                <button class="btn-back" onclick="goStep(2)"><i class="ti ti-arrow-left"></i> Back</button>
                <button class="btn-next" onclick="next3()">Review order <i class="ti ti-arrow-right"></i></button>
            </div>
        </div>

        <!-- PANEL 4: REVIEW -->
        <div class="panel" id="panel-4">
            <div class="ph">
                <h2>Your order, <em>at a glance</em></h2>
                <p>Everything looks right? Let's send it straight to our kitchen.</p>
            </div>
            <div class="summary-card" id="summary-card"></div>
            <div class="legal">
                By submitting, your order details are sent directly to <strong>Vienna Bakehouse & Kitchen</strong> via email. We'll confirm within <strong>24 hours</strong>. A <strong>50% advance</strong> is required to lock in your date.
            </div>
            <button class="btn-final" id="final-btn" onclick="submitOrder()">
                <i class="ti ti-send"></i> Send my cake order
            </button>
            <div style="margin-top:12px;text-align:center;">
                <button class="btn-back" style="width:100%;justify-content:center;display:flex;gap:8px;" onclick="goStep(3)"><i class="ti ti-arrow-left"></i> Edit details</button>
            </div>
        </div>
    </div>

    <div class="toast" id="toast"></div>
    `;
}

function initializeForm() {
    // Set global variables
    window.curStep = 0;
    window.selSize = '';
    window.selFlavor = '';
    window.selFrost = 'No preference';
    window.selDiet = 'None';

    // Load EmailJS library if not already loaded
    if (!window.emailjs) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
        script.onload = function () {
            if (typeof emailConfig !== 'undefined') {
                emailjs.init(emailConfig.publicKey);
            }
        };
        document.head.appendChild(script);
    }

    // Set minimum date (5 days from today)
    const dateInput = document.getElementById('f-date');
    if (dateInput) {
        const d = new Date();
        d.setDate(d.getDate() + 5);
        dateInput.min = d.toISOString().split('T')[0];
    }

    // Size cards
    document.querySelectorAll('#size-grid .sz-card').forEach(function (el) {
        el.addEventListener('click', function () {
            document.querySelectorAll('#size-grid .sz-card').forEach(function (x) { x.classList.remove('on'); });
            el.classList.add('on');
            window.selSize = el.dataset.val;
        });
    });

    // Flavour cards
    document.querySelectorAll('#flav-grid .flav-card').forEach(function (el) {
        el.addEventListener('click', function () {
            document.querySelectorAll('#flav-grid .flav-card').forEach(function (x) { x.classList.remove('on'); });
            el.classList.add('on');
            window.selFlavor = el.dataset.val;
        });
    });

    // Frosting tags
    document.querySelectorAll('#frost-row .tag').forEach(function (el) {
        el.addEventListener('click', function () {
            document.querySelectorAll('#frost-row .tag').forEach(function (x) { x.classList.remove('on'); });
            el.classList.add('on');
            window.selFrost = el.dataset.val;
        });
    });

    // Diet tags
    document.querySelectorAll('#diet-row .tag').forEach(function (el) {
        el.addEventListener('click', function () {
            document.querySelectorAll('#diet-row .tag').forEach(function (x) { x.classList.remove('on'); });
            el.classList.add('on');
            window.selDiet = el.dataset.val;
        });
    });
}

function goStep(n) {
    document.querySelectorAll('.panel').forEach(function (p) { p.classList.remove('on'); });
    document.getElementById('panel-' + n).classList.add('on');
    document.querySelectorAll('.rd').forEach(function (d, i) {
        d.classList.remove('active', 'done');
        if (i < n) d.classList.add('done');
        if (i === n) d.classList.add('active');
    });
    window.curStep = n;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toast(msg) {
    const t = document.getElementById('toast');
    if (t) {
        t.textContent = msg;
        t.style.pointerEvents = 'none';
        t.classList.add('show');
        setTimeout(function () { t.classList.remove('show'); }, 3400);
    }
}

function next1() {
    const n = document.getElementById('f-name').value.trim();
    const p = document.getElementById('f-phone').value.trim();
    const e = document.getElementById('f-email').value.trim();
    const err = document.getElementById('err-email');
    err.style.display = 'none';
    if (!n || !p || !e) { toast('Please fill in your name, phone and email.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) { err.style.display = 'block'; return; }
    goStep(2);
}

function next2() {
    if (!document.getElementById('f-occasion').value || !document.getElementById('f-date').value) {
        toast('Please choose an occasion and pickup date.'); return;
    }
    goStep(3);
}

function next3() {
    if (!window.selSize || !window.selFlavor) { toast('Please select a cake size and flavour.'); return; }
    buildSummary();
    goStep(4);
}

function buildSummary() {
    const rows = [
        ['Name', document.getElementById('f-name').value],
        ['Phone', document.getElementById('f-phone').value],
        ['Email', document.getElementById('f-email').value],
        ['Occasion', document.getElementById('f-occasion').value],
        ['Pickup date', document.getElementById('f-date').value],
        ['Pickup time', document.getElementById('f-time').value || 'Not specified'],
        ['Cake size', window.selSize],
        ['Flavour', window.selFlavor],
        ['Frosting', window.selFrost],
        ['Dietary', window.selDiet],
        ['Cake message', document.getElementById('f-caketxt').value || 'None'],
        ['Design notes', document.getElementById('f-design').value || 'None'],
    ];
    let html = '<div class="sum-title">Your order summary</div>';
    rows.forEach(function (r) {
        html += '<div class="sum-row"><span class="sk">' + r[0] + '</span><span class="sv">' + r[1] + '</span></div>';
    });
    document.getElementById('summary-card').innerHTML = html;
}

function submitOrder() {
    const btn = document.getElementById('final-btn');
    btn.disabled = true;
    btn.innerHTML = '<i class="ti ti-loader-2"></i> Sending your order…';

    if (typeof emailConfig === 'undefined' || !emailConfig.serviceId) {
        toast('Email configuration not found. Please contact the bakery.');
        btn.disabled = false;
        btn.innerHTML = '<i class="ti ti-send"></i> Send my cake order';
        return;
    }

    emailjs.send(emailConfig.serviceId, emailConfig.templateId, {
        customer_name: document.getElementById('f-name').value.trim(),
        customer_phone: document.getElementById('f-phone').value.trim(),
        customer_email: document.getElementById('f-email').value.trim(),
        occasion: document.getElementById('f-occasion').value,
        pickup_date: document.getElementById('f-date').value,
        pickup_time: document.getElementById('f-time').value || 'Not specified',
        cake_size: window.selSize,
        flavour: window.selFlavor,
        frosting: window.selFrost,
        dietary: window.selDiet,
        cake_message: document.getElementById('f-caketxt').value.trim() || 'None',
        design_notes: document.getElementById('f-design').value.trim() || 'None',
        reply_to: document.getElementById('f-email').value.trim()
    }).then(function () {
        document.querySelectorAll('.panel').forEach(function (p) { p.style.display = 'none'; });
        document.getElementById('rail').style.display = 'none';
        document.getElementById('success').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, function (err) {
        btn.disabled = false;
        btn.innerHTML = '<i class="ti ti-send"></i> Send my cake order';
        toast('Something went wrong — please try again.');
        console.error(err);
    });
}

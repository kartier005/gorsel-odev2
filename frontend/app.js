// ============================================
// CONFIG
// ============================================
const API_BASE = '/api';

// ============================================
// STATE
// ============================================
let editor = null;
let currentPageId = null;
let currentPageName = '';
let pages = [];

// ============================================
// DOM
// ============================================
const pageManager = document.getElementById('page-manager');
const editorView = document.getElementById('editor-view');
const pageGrid = document.getElementById('page-grid');
const pmEmpty = document.getElementById('pm-empty');
const modalCreate = document.getElementById('modal-create');
const modalCode = document.getElementById('modal-code');
const formCreatePage = document.getElementById('form-create-page');

// ============================================
// TEMPLATES
// ============================================
const TEMPLATES = {
    blank: { html: '', css: '' },
    landing: {
        html: `
<header style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 80px 20px; text-align: center; color: white;">
    <h1 style="font-size: 3rem; margin-bottom: 16px; font-weight: 800;">Hoş Geldiniz</h1>
    <p style="font-size: 1.2rem; opacity: 0.9; max-width: 600px; margin: 0 auto 32px;">Modern ve etkileyici web sayfanızı GrapesJS ile tasarlayın.</p>
    <a href="#features" style="display: inline-block; padding: 14px 32px; background: white; color: #667eea; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 1rem;">Keşfet</a>
</header>
<section id="features" style="padding: 80px 20px; max-width: 1000px; margin: 0 auto;">
    <h2 style="text-align: center; font-size: 2rem; margin-bottom: 48px; color: #333;">Özellikler</h2>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;">
        <div style="text-align: center; padding: 32px 20px; border-radius: 12px; background: #f8f9ff;">
            <div style="font-size: 2.5rem; margin-bottom: 16px;">🚀</div>
            <h3 style="margin-bottom: 8px; color: #333;">Hızlı</h3>
            <p style="color: #666; font-size: 0.9rem;">Yüksek performanslı altyapı ile hızlı yükleme süreleri.</p>
        </div>
        <div style="text-align: center; padding: 32px 20px; border-radius: 12px; background: #f8f9ff;">
            <div style="font-size: 2.5rem; margin-bottom: 16px;">🎨</div>
            <h3 style="margin-bottom: 8px; color: #333;">Şık</h3>
            <p style="color: #666; font-size: 0.9rem;">Modern tasarım anlayışıyla göz alıcı arayüzler.</p>
        </div>
        <div style="text-align: center; padding: 32px 20px; border-radius: 12px; background: #f8f9ff;">
            <div style="font-size: 2.5rem; margin-bottom: 16px;">📱</div>
            <h3 style="margin-bottom: 8px; color: #333;">Responsive</h3>
            <p style="color: #666; font-size: 0.9rem;">Tüm cihazlarda mükemmel görünüm.</p>
        </div>
    </div>
</section>
<footer style="background: #1a1a2e; color: white; padding: 40px 20px; text-align: center;">
    <p style="opacity: 0.7;">© 2026 PageCraft. Tüm hakları saklıdır.</p>
</footer>`,
        css: `* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }`
    },
    portfolio: {
        html: `
<nav style="display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; background: #111;">
    <span style="font-size: 1.4rem; font-weight: 800; color: #fff;">Portfolio</span>
    <div style="display: flex; gap: 24px;">
        <a href="#" style="color: #aaa; text-decoration: none; font-size: 0.9rem;">Ana Sayfa</a>
        <a href="#" style="color: #aaa; text-decoration: none; font-size: 0.9rem;">Projeler</a>
        <a href="#" style="color: #aaa; text-decoration: none; font-size: 0.9rem;">İletişim</a>
    </div>
</nav>
<section style="padding: 100px 40px; background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); color: white; text-align: center;">
    <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 16px;">Merhaba, Ben Kerem 👋</h1>
    <p style="font-size: 1.1rem; opacity: 0.8; max-width: 500px; margin: 0 auto;">Full-Stack Geliştirici & UI/UX Tasarımcı</p>
</section>
<section style="padding: 60px 40px; max-width: 1000px; margin: 0 auto;">
    <h2 style="font-size: 1.8rem; margin-bottom: 32px; color: #333;">Projelerim</h2>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
        <div style="border-radius: 12px; overflow: hidden; border: 1px solid #eee;">
            <div style="height: 200px; background: linear-gradient(135deg, #667eea, #764ba2);"></div>
            <div style="padding: 20px;">
                <h3 style="margin-bottom: 8px; color: #333;">Proje 1</h3>
                <p style="color: #666; font-size: 0.85rem;">Modern web uygulaması geliştirme projesi.</p>
            </div>
        </div>
        <div style="border-radius: 12px; overflow: hidden; border: 1px solid #eee;">
            <div style="height: 200px; background: linear-gradient(135deg, #f093fb, #f5576c);"></div>
            <div style="padding: 20px;">
                <h3 style="margin-bottom: 8px; color: #333;">Proje 2</h3>
                <p style="color: #666; font-size: 0.85rem;">Mobil uygulama tasarım çalışması.</p>
            </div>
        </div>
    </div>
</section>
<footer style="background: #111; color: #aaa; padding: 32px; text-align: center; font-size: 0.85rem;">
    <p>© 2026 Portfolio. GrapesJS ile tasarlandı.</p>
</footer>`,
        css: `* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }`
    }
};

// ============================================
// API
// ============================================
async function api(url, method = 'GET', body = null) {
    const opts = { method, headers: { 'Content-Type': 'application/json' } };
    if (body) opts.body = JSON.stringify(body);
    try {
        const res = await fetch(`${API_BASE}${url}`, opts);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error('API Error:', err);
        showToast('Bağlantı hatası!', 'error');
        throw err;
    }
}

// ============================================
// PAGE MANAGER
// ============================================
async function loadPages() {
    try {
        const data = await api('/pages');
        pages = data.pages || [];
        renderPageGrid();
    } catch (e) {
        pages = [];
        renderPageGrid();
    }
}

function renderPageGrid() {
    if (pages.length === 0) {
        pageGrid.style.display = 'none';
        pmEmpty.style.display = 'flex';
        return;
    }

    pageGrid.style.display = 'grid';
    pmEmpty.style.display = 'none';

    pageGrid.innerHTML = pages.map((page, idx) => {
        const date = new Date(page.updated_at || page.created_at).toLocaleDateString('tr-TR', {
            day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        return `
        <div class="page-card" style="animation-delay: ${idx * 0.08}s">
            <div class="page-card-preview">
                <div class="preview-placeholder">📄</div>
                <div class="page-card-overlay">
                    <button class="overlay-btn edit" onclick="openEditor('${page.id}', '${escapeAttr(page.name)}')">✏️ Düzenle</button>
                    <button class="overlay-btn preview" onclick="previewPage('${page.id}')">👁️ Önizle</button>
                    <button class="overlay-btn delete" onclick="deletePage('${page.id}', '${escapeAttr(page.name)}')">🗑️</button>
                </div>
            </div>
            <div class="page-card-info">
                <h3>${escapeHtml(page.name)}</h3>
                <p>${date}</p>
            </div>
        </div>`;
    }).join('');
}

function escapeHtml(t) {
    const d = document.createElement('div');
    d.textContent = t;
    return d.innerHTML;
}

function escapeAttr(t) {
    return t.replace(/'/g, "\\'").replace(/"/g, '\\"');
}

// ============================================
// CREATE PAGE
// ============================================
function showCreateModal() {
    modalCreate.classList.add('active');
    document.getElementById('input-page-name').focus();
}

function closeCreateModal() {
    modalCreate.classList.remove('active');
    formCreatePage.reset();
    document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
    document.querySelector('.template-card[data-template="blank"]').classList.add('selected');
}

// Template selection
document.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        card.querySelector('input[type="radio"]').checked = true;
    });
});

formCreatePage.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('input-page-name').value.trim();
    if (!name) return;

    const templateName = document.querySelector('input[name="template"]:checked').value;
    const template = TEMPLATES[templateName];

    try {
        const page = await api('/pages', 'POST', {
            name: name,
            html: template.html,
            css: template.css,
            components: '[]',
            styles: '[]',
        });

        showToast('✅ Sayfa oluşturuldu!', 'success');
        closeCreateModal();

        // Open editor with the new page
        openEditor(page.id, page.name);
    } catch (err) {
        // handled
    }
});

// ============================================
// DELETE PAGE
// ============================================
async function deletePage(id, name) {
    if (!confirm(`"${name}" sayfasını silmek istediğinize emin misiniz?`)) return;
    try {
        await api(`/pages/${id}`, 'DELETE');
        showToast('🗑️ Sayfa silindi', 'info');
        loadPages();
    } catch (e) { /* handled */ }
}

// ============================================
// PREVIEW
// ============================================
function previewPage(id) {
    window.open(`${API_BASE}/pages/${id}/preview`, '_blank');
}

// ============================================
// EDITOR
// ============================================
async function openEditor(pageId, pageName) {
    currentPageId = pageId;
    currentPageName = pageName;

    // Switch view
    pageManager.style.display = 'none';
    editorView.style.display = 'flex';
    document.getElementById('topbar-page-name').textContent = pageName;

    // Load page data
    let pageData;
    try {
        pageData = await api(`/pages/${pageId}`);
    } catch (e) {
        goBack();
        return;
    }

    // Destroy existing editor
    if (editor) {
        editor.destroy();
        editor = null;
    }

    // Initialize GrapesJS
    editor = grapesjs.init({
        container: '#gjs',
        fromElement: false,
        height: '100%',
        width: 'auto',
        storageManager: false,
        plugins: ['gjs-preset-webpage', 'gjs-blocks-basic'],
        pluginsOpts: {
            'gjs-preset-webpage': {
                modalImportTitle: 'HTML / CSS İçe Aktar',
                modalImportLabel: '<div style="margin-bottom:10px;">HTML/CSS kodunuzu buraya yapıştırın</div>',
                modalImportContent: '',
            },
            'gjs-blocks-basic': {
                flexGrid: true,
            },
        },
        canvas: {
            styles: [
                'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
            ],
        },
        deviceManager: {
            devices: [
                { name: 'Desktop', width: '' },
                { name: 'Tablet', width: '768px', widthMedia: '992px' },
                { name: 'Mobile portrait', width: '375px', widthMedia: '480px' },
            ],
        },
        blockManager: {
            appendTo: '.gjs-pn-views-container',
        },
        panels: {
            defaults: []
        },
    });

    // Load saved content
    if (pageData.components && pageData.components !== '[]') {
        try {
            const comps = JSON.parse(pageData.components);
            const stls = JSON.parse(pageData.styles || '[]');
            editor.setComponents(comps);
            editor.setStyle(stls);
        } catch (e) {
            // Fallback to HTML/CSS
            if (pageData.html) {
                editor.setComponents(pageData.html);
            }
            if (pageData.css) {
                editor.setStyle(pageData.css);
            }
        }
    } else if (pageData.html) {
        editor.setComponents(pageData.html);
        if (pageData.css) {
            editor.setStyle(pageData.css);
        }
    }

    showToast(`📝 "${pageName}" düzenleniyor`, 'info');
}

function goBack() {
    if (editor) {
        editor.destroy();
        editor = null;
    }
    currentPageId = null;
    currentPageName = '';
    editorView.style.display = 'none';
    pageManager.style.display = 'block';
    loadPages();
}

// ============================================
// SAVE
// ============================================
async function saveCurrentPage() {
    if (!editor || !currentPageId) return;

    const html = editor.getHtml();
    const css = editor.getCss();
    const components = JSON.stringify(editor.getComponents());
    const styles = JSON.stringify(editor.getStyle());

    try {
        await api(`/pages/${currentPageId}`, 'PUT', {
            html, css, components, styles
        });
        showToast('💾 Sayfa kaydedildi!', 'success');
    } catch (e) {
        showToast('❌ Kaydetme hatası!', 'error');
    }
}

// ============================================
// CODE VIEW
// ============================================
function showCodeModal() {
    if (!editor) return;
    document.getElementById('code-html').textContent = editor.getHtml();
    document.getElementById('code-css').textContent = editor.getCss();
    modalCode.classList.add('active');

    // Reset tabs
    document.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('.code-tab[data-tab="html"]').classList.add('active');
    document.getElementById('code-html').style.display = 'block';
    document.getElementById('code-css').style.display = 'none';
}

function closeCodeModal() {
    modalCode.classList.remove('active');
}

// Code tabs
document.querySelectorAll('.code-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const target = tab.dataset.tab;
        document.getElementById('code-html').style.display = target === 'html' ? 'block' : 'none';
        document.getElementById('code-css').style.display = target === 'css' ? 'block' : 'none';
    });
});

// ============================================
// EVENT LISTENERS
// ============================================
document.getElementById('btn-create-page').addEventListener('click', showCreateModal);
document.getElementById('btn-back').addEventListener('click', goBack);
document.getElementById('btn-save').addEventListener('click', saveCurrentPage);
document.getElementById('btn-code').addEventListener('click', showCodeModal);
document.getElementById('btn-preview').addEventListener('click', () => {
    if (currentPageId) previewPage(currentPageId);
});

// Device buttons
document.querySelectorAll('.device-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (editor) {
            editor.setDevice(btn.dataset.device);
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCreateModal();
        closeCodeModal();
    }
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveCurrentPage();
    }
});

// ============================================
// TOAST
// ============================================
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    loadPages();
});

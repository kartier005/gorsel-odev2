from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import uuid
import json
import os

app = FastAPI(title="GrapesJS Page Builder API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR = "/app/data"
PAGES_FILE = os.path.join(DATA_DIR, "pages.json")


def load_pages():
    if os.path.exists(PAGES_FILE):
        with open(PAGES_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []


def save_pages(pages):
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(PAGES_FILE, "w", encoding="utf-8") as f:
        json.dump(pages, f, ensure_ascii=False, indent=2)


class PageCreate(BaseModel):
    name: str
    html: str = ""
    css: str = ""
    components: Optional[str] = "[]"
    styles: Optional[str] = "[]"


class PageUpdate(BaseModel):
    name: Optional[str] = None
    html: Optional[str] = None
    css: Optional[str] = None
    components: Optional[str] = None
    styles: Optional[str] = None

class GjsStorePayload(BaseModel):
    """Payload from GrapesJS storage manager"""
    components: Optional[str] = "[]"
    styles: Optional[str] = "[]"
    html: Optional[str] = ""
    css: Optional[str] = ""


@app.get("/")
def root():
    return {
        "message": "GrapesJS Page Builder API",
        "version": "1.0.0",
        "endpoints": {
            "pages": "/api/pages",
            "gjs_load": "/api/gjs/load/{page_id}",
            "gjs_store": "/api/gjs/store/{page_id}",
        }
    }


@app.get("/api/pages")
def list_pages():
    pages = load_pages()
    summary = []
    for p in pages:
        summary.append({
            "id": p["id"],
            "name": p["name"],
            "created_at": p["created_at"],
            "updated_at": p["updated_at"],
        })
    return {"pages": summary, "total": len(summary)}


@app.get("/api/pages/{page_id}")
def get_page(page_id: str):
    pages = load_pages()
    for p in pages:
        if p["id"] == page_id:
            return p
    raise HTTPException(status_code=404, detail="Sayfa bulunamadı")


@app.post("/api/pages", status_code=201)
def create_page(page: PageCreate):
    pages = load_pages()
    new_page = {
        "id": str(uuid.uuid4()),
        "name": page.name,
        "html": page.html,
        "css": page.css,
        "components": page.components,
        "styles": page.styles,
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat(),
    }
    pages.append(new_page)
    save_pages(pages)
    return new_page


@app.put("/api/pages/{page_id}")
def update_page(page_id: str, page_update: PageUpdate):
    pages = load_pages()
    for i, p in enumerate(pages):
        if p["id"] == page_id:
            if page_update.name is not None:
                pages[i]["name"] = page_update.name
            if page_update.html is not None:
                pages[i]["html"] = page_update.html
            if page_update.css is not None:
                pages[i]["css"] = page_update.css
            if page_update.components is not None:
                pages[i]["components"] = page_update.components
            if page_update.styles is not None:
                pages[i]["styles"] = page_update.styles
            pages[i]["updated_at"] = datetime.now().isoformat()
            save_pages(pages)
            return pages[i]
    raise HTTPException(status_code=404, detail="Sayfa bulunamadı")


@app.delete("/api/pages/{page_id}")
def delete_page(page_id: str):
    pages = load_pages()
    for i, p in enumerate(pages):
        if p["id"] == page_id:
            deleted = pages.pop(i)
            save_pages(pages)
            return {"message": "Sayfa silindi", "page": {"id": deleted["id"], "name": deleted["name"]}}
    raise HTTPException(status_code=404, detail="Sayfa bulunamadı")


@app.get("/api/gjs/load/{page_id}")
def gjs_load(page_id: str):
    """Load page data for GrapesJS editor"""
    pages = load_pages()
    for p in pages:
        if p["id"] == page_id:
            return {
                "gjs-components": p.get("components", "[]"),
                "gjs-styles": p.get("styles", "[]"),
                "gjs-html": p.get("html", ""),
                "gjs-css": p.get("css", ""),
            }
    raise HTTPException(status_code=404, detail="Sayfa bulunamadı")


@app.post("/api/gjs/store/{page_id}")
def gjs_store(page_id: str, payload: GjsStorePayload):
    """Store page data from GrapesJS editor"""
    pages = load_pages()
    for i, p in enumerate(pages):
        if p["id"] == page_id:
            pages[i]["components"] = payload.components
            pages[i]["styles"] = payload.styles
            pages[i]["html"] = payload.html
            pages[i]["css"] = payload.css
            pages[i]["updated_at"] = datetime.now().isoformat()
            save_pages(pages)
            return {"status": "ok", "message": "Sayfa kaydedildi"}
    raise HTTPException(status_code=404, detail="Sayfa bulunamadı")


@app.get("/api/pages/{page_id}/preview")
def preview_page(page_id: str):
    """Return full HTML for preview"""
    pages = load_pages()
    for p in pages:
        if p["id"] == page_id:
            html_content = p.get("html", "")
            css_content = p.get("css", "")
            full_html = f"""<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{p['name']} - Önizleme</title>
    <style>{css_content}</style>
</head>
<body>
    {html_content}
</body>
</html>"""
            from fastapi.responses import HTMLResponse
            return HTMLResponse(content=full_html)
    raise HTTPException(status_code=404, detail="Sayfa bulunamadı")

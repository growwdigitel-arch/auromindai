from fastapi import APIRouter, UploadFile, File
from typing import List
from app.schemas.schemas import KnowledgeOut
from app.services.rag.pipeline import rag_pipeline
import datetime

router = APIRouter(prefix="/knowledge", tags=["RAG Knowledge Base"])

@router.get("/documents", response_model=List[KnowledgeOut])
async def list_documents():
    return [
        KnowledgeOut(
            id="doc-1",
            file_name="Acme_Q3_Financial_Report.pdf",
            file_type="PDF",
            file_size="2.4 MB",
            status="indexed",
            created_at=datetime.datetime.utcnow()
        )
    ]

@router.post("/upload", response_model=KnowledgeOut)
async def upload_document(file: UploadFile = File(...)):
    return KnowledgeOut(
        id=f"doc-{datetime.datetime.now().timestamp()}",
        file_name=file.filename or "uploaded_doc.pdf",
        file_type="PDF" if file.filename and file.filename.endswith(".pdf") else "DOCX",
        file_size="1.5 MB",
        status="indexed",
        created_at=datetime.datetime.utcnow()
    )

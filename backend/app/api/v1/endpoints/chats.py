from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.schemas.schemas import MessageCreate
from app.services.ai.provider import ai_provider

router = APIRouter(prefix="/chats", tags=["Chats"])

@router.post("/stream")
async def stream_chat(msg: MessageCreate):
    """
    HTTP Server-Sent Events (SSE) streaming chat completion endpoint.
    """
    async def event_generator():
        async for chunk in ai_provider.generate_stream(
            prompt=msg.content,
            model=msg.model or "AuroVex 1.5",
            mode=msg.mode or "General AI",
            deep_think=msg.deep_think,
            web_search=msg.web_search
        ):
            yield f"data: {chunk}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

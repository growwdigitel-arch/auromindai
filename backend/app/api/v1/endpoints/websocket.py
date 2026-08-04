from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.services.ai.provider import ai_provider

router = APIRouter(tags=["WebSockets"])

@router.websocket("/ws/chat")
async def websocket_chat_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_json()
            prompt = data.get("content", "")
            model = data.get("model", "AuroVex 1.5")
            mode = data.get("mode", "General AI")

            async for chunk in ai_provider.generate_stream(
                prompt=prompt,
                model=model,
                mode=mode,
                deep_think=data.get("deep_think", False),
                web_search=data.get("web_search", True)
            ):
                await websocket.send_json({"type": "token", "content": chunk})
            
            await websocket.send_json({"type": "end"})

    except WebSocketDisconnect:
        pass

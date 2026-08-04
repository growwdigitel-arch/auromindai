from fastapi import APIRouter
from typing import List
from app.schemas.schemas import AgentCreate, AgentOut
import datetime

router = APIRouter(prefix="/agents", tags=["AI Agents"])

@router.get("/", response_model=List[AgentOut])
async def list_agents():
    return [
        AgentOut(
            id="agent-sales",
            name="AuroSales AI Employee",
            description="B2B lead qualification and outreach sequencing.",
            category="Sales AI",
            system_prompt="You are an enterprise sales director.",
            tools=["Web Search", "Email Sequencer"],
            status="active",
            created_at=datetime.datetime.utcnow()
        ),
        AgentOut(
            id="agent-support",
            name="AuroSupport AI Employee",
            description="Resolves tier-1 customer support tickets.",
            category="Support AI",
            system_prompt="You are a customer support specialist.",
            tools=["Knowledge RAG", "Ticket System API"],
            status="active",
            created_at=datetime.datetime.utcnow()
        ),
    ]

@router.post("/", response_model=AgentOut)
async def create_agent(agent_in: AgentCreate):
    return AgentOut(
        id=f"agent-{datetime.datetime.now().timestamp()}",
        name=agent_in.name,
        description=agent_in.description,
        category=agent_in.category,
        system_prompt=agent_in.system_prompt,
        tools=agent_in.tools,
        status="active",
        created_at=datetime.datetime.utcnow()
    )

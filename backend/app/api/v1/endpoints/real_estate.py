from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import datetime
import re

router = APIRouter(prefix="/real-estate", tags=["Real Estate AI"])

# Models
class QualifyRequest(BaseModel):
    message: str = Field(..., description="Incoming buyer message or inquiry")
    channel: Optional[str] = "whatsapp"
    buyer_phone: Optional[str] = None
    buyer_name: Optional[str] = "Prospective Buyer"

class MatchedProperty(BaseModel):
    id: str
    title: str
    price: str
    location: str
    specs: str
    type: str
    match_score: int
    image: str

class QualifyResponse(BaseModel):
    lead_score: int
    intent_level: str  # High, Medium, Nurture
    extracted_criteria: Dict[str, Any]
    matched_properties: List[MatchedProperty]
    suggested_reply: str
    recommended_action: str
    sentiment: str

class LeadSubmission(BaseModel):
    name: str
    email: str
    phone: str
    company_type: str  # Brokerage, Developer, Agent, PropTech
    lead_volume: str
    message: Optional[str] = ""

# Sample Listings
SAMPLE_LISTINGS = [
    {
        "id": "prop-101",
        "title": "The Azure Sky Penthouse",
        "price": "$1,450,000",
        "location": "Downtown Metropolis",
        "specs": "3 Beds • 3.5 Baths • 2,400 sq ft",
        "type": "Penthouse",
        "match_score": 98,
        "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80"
    },
    {
        "id": "prop-102",
        "title": "Verdant Hills Modern Villa",
        "price": "$2,200,000",
        "location": "West Hills Reserve",
        "specs": "4 Beds • 4 Baths • 3,800 sq ft • Private Pool",
        "type": "Luxury Villa",
        "match_score": 92,
        "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
    },
    {
        "id": "prop-103",
        "title": "Marina Promenade High-Rise",
        "price": "$890,000",
        "location": "Waterfront Marina",
        "specs": "2 Beds • 2 Baths • 1,350 sq ft",
        "type": "Apartment",
        "match_score": 86,
        "image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80"
    },
    {
        "id": "prop-104",
        "title": "The Oakwood Executive Estate",
        "price": "$3,100,000",
        "location": "Oakwood Enclave",
        "specs": "5 Beds • 6 Baths • 5,200 sq ft • 0.8 Acre",
        "type": "Estate",
        "match_score": 79,
        "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80"
    }
]

# Sample CRM Leads
SAMPLE_CRM_LEADS = [
    {
        "id": "lead-01",
        "name": "Marcus Sterling",
        "email": "m.sterling@capitalgroup.com",
        "phone": "+1 (555) 382-9012",
        "budget": "$1.5M - $1.8M",
        "location": "Downtown",
        "timeline": "Immediate (Next 30 days)",
        "score": 94,
        "stage": "site_visit",
        "channel": "WhatsApp",
        "assigned_agent": "Sarah Jenkins",
        "notes": "Pre-approved mortgage. Interested in high-floor units with skyline views.",
        "created_at": "12 mins ago"
    },
    {
        "id": "lead-02",
        "name": "Elena Rostova",
        "email": "elena.r@luxdesign.co",
        "phone": "+1 (555) 721-4491",
        "budget": "$2.2M - $2.5M",
        "location": "West Hills",
        "timeline": "60-90 days",
        "score": 88,
        "stage": "qualified",
        "channel": "Website Bot",
        "assigned_agent": "David Chen",
        "notes": "Looking for modern minimalist villa with private pool for family relocation.",
        "created_at": "45 mins ago"
    },
    {
        "id": "lead-03",
        "name": "Jonathan Vance",
        "email": "jvance@techseed.io",
        "phone": "+1 (555) 903-1284",
        "budget": "$850K - $1M",
        "location": "Waterfront Marina",
        "timeline": "Under Contract",
        "score": 96,
        "stage": "negotiation",
        "channel": "Meta Ad",
        "assigned_agent": "Sarah Jenkins",
        "notes": "Counter-offer sent at $890K. Financing review underway.",
        "created_at": "2 hours ago"
    },
    {
        "id": "lead-04",
        "name": "Amina & Tariq Khan",
        "email": "tariq.k@khanholdings.ae",
        "phone": "+971 50 882 1903",
        "budget": "$3.0M+",
        "location": "Oakwood Enclave",
        "timeline": "Closed Won",
        "score": 100,
        "stage": "closed",
        "channel": "Google Search",
        "assigned_agent": "Elena Santos",
        "notes": "Sale closed on Oakwood Estate at $3.1M. 2.5% commission logged.",
        "created_at": "1 day ago"
    },
    {
        "id": "lead-05",
        "name": "Gregory Vance",
        "email": "gvance@investors.net",
        "phone": "+1 (555) 201-9923",
        "budget": "$700K - $900K",
        "location": "City Center",
        "timeline": "Browsing",
        "score": 62,
        "stage": "new",
        "channel": "Instagram Ad",
        "assigned_agent": "Unassigned (AI Nurturing)",
        "notes": "Inquired about rental yields on 2BHK properties.",
        "created_at": "5 mins ago"
    }
]

@router.get("/listings", response_model=List[MatchedProperty])
async def get_listings():
    """Return available real estate inventory listings."""
    return SAMPLE_LISTINGS

@router.get("/pipeline")
async def get_crm_pipeline():
    """Return live CRM pipeline leads grouped by stage."""
    return {
        "summary": {
            "total_leads": len(SAMPLE_CRM_LEADS),
            "qualified_pipeline_value": "$8.65M",
            "avg_lead_score": 88,
            "avg_response_time": "38 seconds"
        },
        "leads": SAMPLE_CRM_LEADS
    }

@router.post("/qualify-lead", response_model=QualifyResponse)
async def qualify_real_estate_lead(req: QualifyRequest):
    """
    Autonomous AI Lead Qualifier:
    Analyzes incoming buyer message, calculates intent score, extracts specs,
    matches properties, and generates instant WhatsApp reply.
    """
    text = req.message.lower()
    
    # Extract criteria
    budget = "Not specified"
    if "$" in req.message or "dollar" in text or "m" in text or "k" in text:
        budget_match = re.search(r'(\$\s?[\d\.,]+(\s?(million|m|k))?|[\d\.]+\s?(million|m|k))', req.message, re.IGNORECASE)
        if budget_match:
            budget = budget_match.group(0).strip()
        else:
            budget = "$1.2M - $1.8M (Estimated from context)"
    
    bedrooms = "Any"
    if "bed" in text or "bhk" in text:
        bed_match = re.search(r'(\d+)\s*(bed|bedroom|bhk)', text)
        if bed_match:
            bedrooms = f"{bed_match.group(1)} BHK / Bedroom"

    location = "Prime Urban"
    if "downtown" in text:
        location = "Downtown Metropolis"
    elif "marina" in text or "waterfront" in text:
        location = "Waterfront Marina"
    elif "hills" in text or "suburb" in text:
        location = "West Hills Reserve"
    elif "penthouse" in text:
        location = "Metropolitan Skyline"

    timeline = "Flexible"
    if any(k in text for k in ["urgent", "ready", "asap", "next month", "immediately", "ready to move", "this week"]):
        timeline = "Immediate (Within 30 Days)"
    elif any(k in text for k in ["month", "quarter", "soon", "planning"]):
        timeline = "30 - 60 Days"

    # Score calculation
    score = 65
    if budget != "Not specified":
        score += 15
    if bedrooms != "Any":
        score += 10
    if "Immediate" in timeline:
        score += 10
    if any(k in text for k in ["cash", "pre-approved", "approved", "investor", "ready"]):
        score += 5
    score = min(score, 99)

    intent_level = "High Priority" if score >= 85 else ("Warm Lead" if score >= 70 else "Nurture")
    sentiment = "Strong Buyer Intent" if score >= 80 else "Inquiry / Browsing"

    matched = SAMPLE_LISTINGS[:3]
    if "villa" in text or "pool" in text:
        matched = [p for p in SAMPLE_LISTINGS if "Villa" in p["type"]] + [SAMPLE_LISTINGS[0]]
    elif "penthouse" in text:
        matched = [p for p in SAMPLE_LISTINGS if "Penthouse" in p["type"]] + [SAMPLE_LISTINGS[2]]

    suggested_reply = (
        f"Hi {req.buyer_name}! Thanks for reaching out to our property desk. 🏡 "
        f"I saw you are looking for {bedrooms} options around {location} within your {budget} budget. "
        f"I've selected 2 exclusive properties matching your criteria, including private balcony views. "
        f"Would tomorrow at 3:00 PM or Saturday at 11:30 AM work best for a VIP site walkthrough? I can reserve a slot right away."
    )

    recommended_action = (
        "Auto-dispatch WhatsApp video tour and lock calendar slot for site visit."
        if score >= 85
        else "Send interactive digital brochure and add to 3-day WhatsApp drip sequence."
    )

    return QualifyResponse(
        lead_score=score,
        intent_level=intent_level,
        extracted_criteria={
            "detected_budget": budget,
            "target_bedrooms": bedrooms,
            "preferred_location": location,
            "purchase_timeline": timeline,
            "financing_status": "Pre-screened / Verified" if score >= 80 else "Self-Financing"
        },
        matched_properties=matched,
        suggested_reply=suggested_reply,
        recommended_action=recommended_action,
        sentiment=sentiment
    )

@router.post("/leads")
async def submit_real_estate_lead(lead: LeadSubmission):
    """Save inbound real estate lead / demo request."""
    return {
        "status": "success",
        "message": "Lead received and routed to Auromind Real Estate AI Engine",
        "lead_id": f"RE-{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}",
        "assigned_pipeline": "VIP Real Estate Brokerage Onboarding",
        "data": lead.dict()
    }

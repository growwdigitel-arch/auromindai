import datetime
from sqlalchemy import (
    Column, String, Text, Boolean, Integer, DateTime, ForeignKey, Float, JSON, Enum
)
from sqlalchemy.orm import declarative_base, relationship
from pgvector.sqlalchemy import Vector

Base = declarative_base()

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    slug = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    users = relationship("User", back_populates="organization")
    workspaces = relationship("Workspace", back_populates="organization")
    subscriptions = relationship("Subscription", back_populates="organization")


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    avatar_url = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    mfa_enabled = Column(Boolean, default=False)
    organization_id = Column(String, ForeignKey("organizations.id"))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    organization = relationship("Organization", back_populates="users")
    chats = relationship("Chat", back_populates="user")
    sessions = relationship("UserSession", back_populates="user")
    api_keys = relationship("APIKey", back_populates="user")


class Workspace(Base):
    __tablename__ = "workspaces"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    organization_id = Column(String, ForeignKey("organizations.id"))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    organization = relationship("Organization", back_populates="workspaces")
    agents = relationship("Agent", back_populates="workspace")
    knowledge_documents = relationship("KnowledgeDocument", back_populates="workspace")


class Role(Base):
    __tablename__ = "roles"

    id = Column(String, primary_key=True)
    name = Column(String, unique=True, nullable=False)  # Owner, Admin, Member
    description = Column(String, nullable=True)


class Permission(Base):
    __tablename__ = "permissions"

    id = Column(String, primary_key=True)
    code = Column(String, unique=True, nullable=False)  # e.g., chats:create, agents:deploy
    description = Column(String, nullable=True)


class Chat(Base):
    __tablename__ = "chats"

    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    user_id = Column(String, ForeignKey("users.id"))
    workspace_id = Column(String, ForeignKey("workspaces.id"), nullable=True)
    pinned = Column(Boolean, default=False)
    model = Column(String, default="AuroVex 1.5")
    mode = Column(String, default="General AI")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="chats")
    messages = relationship("ChatMessage", back_populates="chat", cascade="all, delete-orphan")


class ChatMessage(Base):
    __tablename__ = "messages"

    id = Column(String, primary_key=True)
    chat_id = Column(String, ForeignKey("chats.id"))
    role = Column(String, nullable=False)  # user, assistant, system
    content = Column(Text, nullable=False)
    reasoning = Column(Text, nullable=True)
    tools_used = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    chat = relationship("Chat", back_populates="messages")
    attachments = relationship("Attachment", back_populates="message")


class Attachment(Base):
    __tablename__ = "attachments"

    id = Column(String, primary_key=True)
    message_id = Column(String, ForeignKey("messages.id"))
    file_name = Column(String, nullable=False)
    file_url = Column(String, nullable=False)
    file_type = Column(String, nullable=False)

    message = relationship("ChatMessage", back_populates="attachments")


class AIModelCatalog(Base):
    __tablename__ = "models"

    id = Column(String, primary_key=True)
    name = Column(String, unique=True, nullable=False)  # AuroVex 1, AuroVex 1.5, Claude 3.5
    provider = Column(String, nullable=False)  # Auromind, Anthropic, Google, OpenAI
    context_length = Column(Integer, default=1000000)
    is_active = Column(Boolean, default=True)


class Agent(Base):
    __tablename__ = "agents"

    id = Column(String, primary_key=True)
    workspace_id = Column(String, ForeignKey("workspaces.id"))
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String, nullable=False)
    system_prompt = Column(Text, nullable=False)
    status = Column(String, default="active")  # active, draft, paused
    tools = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    workspace = relationship("Workspace", back_populates="agents")


class KnowledgeDocument(Base):
    __tablename__ = "knowledge_documents"

    id = Column(String, primary_key=True)
    workspace_id = Column(String, ForeignKey("workspaces.id"))
    file_name = Column(String, nullable=False)
    file_type = Column(String, nullable=False)
    file_size = Column(String, nullable=False)
    status = Column(String, default="processing")  # processing, indexed, error
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    workspace = relationship("Workspace", back_populates="knowledge_documents")
    embeddings = relationship("DocumentEmbedding", back_populates="document", cascade="all, delete-orphan")


class DocumentEmbedding(Base):
    __tablename__ = "embeddings"

    id = Column(String, primary_key=True)
    document_id = Column(String, ForeignKey("knowledge_documents.id"))
    chunk_index = Column(Integer, nullable=False)
    content = Column(Text, nullable=False)
    vector = Column(Vector(1536), nullable=True)  # pgvector similarity search column

    document = relationship("KnowledgeDocument", back_populates="embeddings")


class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(String, primary_key=True)
    organization_id = Column(String, ForeignKey("organizations.id"))
    plan = Column(String, default="Pro")
    status = Column(String, default="active")
    current_period_end = Column(DateTime, nullable=False)

    organization = relationship("Organization", back_populates="subscriptions")


class Payment(Base):
    __tablename__ = "payments"

    id = Column(String, primary_key=True)
    subscription_id = Column(String, ForeignKey("subscriptions.id"))
    amount = Column(Float, nullable=False)
    currency = Column(String, default="USD")
    status = Column(String, default="succeeded")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"))
    title = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True)
    user_id = Column(String, nullable=True)
    action = Column(String, nullable=False)
    details = Column(JSON, nullable=True)
    ip_address = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)


class UserSession(Base):
    __tablename__ = "sessions"

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"))
    token = Column(String, unique=True, nullable=False)
    expires_at = Column(DateTime, nullable=False)

    user = relationship("User", back_populates="sessions")


class APIKey(Base):
    __tablename__ = "api_keys"

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"))
    key_hash = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="api_keys")


class UsageLog(Base):
    __tablename__ = "usage_logs"

    id = Column(String, primary_key=True)
    user_id = Column(String, nullable=False)
    model = Column(String, nullable=False)
    tokens_prompt = Column(Integer, default=0)
    tokens_completion = Column(Integer, default=0)
    cost = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

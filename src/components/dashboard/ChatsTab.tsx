import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send, Phone, MoreVertical, Bot, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "customer" | "assistant";
  timestamp: Date;
}

interface Conversation {
  id: string;
  phoneNumber: string;
  customerName: string;
  lastMessage: string;
  timestamp: Date;
  status: "lead" | "negotiation" | "confirmed" | "cancelled";
  unread: number;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    phoneNumber: "+51 999 888 777",
    customerName: "María García",
    lastMessage: "¿Tienen disponible el producto X en color azul?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    status: "negotiation",
    unread: 2,
    messages: [
      {
        id: "m1",
        content: "Hola, buenos días! 👋",
        sender: "customer",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
      },
      {
        id: "m2",
        content: "¡Hola María! 😊 Bienvenida a nuestra tienda. Soy MIA, tu asesora virtual. ¿En qué puedo ayudarte hoy?",
        sender: "assistant",
        timestamp: new Date(Date.now() - 1000 * 60 * 28),
      },
      {
        id: "m3",
        content: "Estoy buscando un regalo para mi mamá",
        sender: "customer",
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
      },
      {
        id: "m4",
        content: "¡Qué lindo detalle! 💝 Tenemos varias opciones perfectas para regalo. ¿Me podrías contar un poco más sobre sus gustos? Por ejemplo, ¿prefiere algo práctico o más decorativo?",
        sender: "assistant",
        timestamp: new Date(Date.now() - 1000 * 60 * 23),
      },
      {
        id: "m5",
        content: "¿Tienen disponible el producto X en color azul?",
        sender: "customer",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
      },
    ],
  },
  {
    id: "2",
    phoneNumber: "+51 999 777 666",
    customerName: "Carlos López",
    lastMessage: "Perfecto, procedo con el pago",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    status: "confirmed",
    unread: 0,
    messages: [
      {
        id: "m1",
        content: "Quiero comprar 3 unidades del producto Y",
        sender: "customer",
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
      },
      {
        id: "m2",
        content: "¡Excelente elección, Carlos! 🎉 El producto Y es uno de nuestros más vendidos. Para 3 unidades el total sería $75. ¿Te gustaría proceder con el pedido?",
        sender: "assistant",
        timestamp: new Date(Date.now() - 1000 * 60 * 58),
      },
      {
        id: "m3",
        content: "Perfecto, procedo con el pago",
        sender: "customer",
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
      },
    ],
  },
  {
    id: "3",
    phoneNumber: "+51 999 666 555",
    customerName: "Ana Martínez",
    lastMessage: "Gracias por la información",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: "lead",
    unread: 0,
    messages: [
      {
        id: "m1",
        content: "¿Cuáles son sus horarios de atención?",
        sender: "customer",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5),
      },
      {
        id: "m2",
        content: "¡Hola Ana! 👋 Nuestro horario de atención es de lunes a viernes de 9:00 AM a 6:00 PM, y sábados de 9:00 AM a 1:00 PM. ¿Hay algo específico en lo que pueda ayudarte?",
        sender: "assistant",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.3),
      },
      {
        id: "m3",
        content: "Gracias por la información",
        sender: "customer",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      },
    ],
  },
];

const ChatsTab = () => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.phoneNumber.includes(searchTerm)
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation?.messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return formatTime(date);
    }
    return date.toLocaleDateString("es", { day: "2-digit", month: "short" });
  };

  const getStatusBadge = (status: Conversation["status"]) => {
    const variants: Record<typeof status, { variant: any; label: string }> = {
      lead: { variant: "lead", label: "Lead" },
      negotiation: { variant: "negotiation", label: "Negociando" },
      confirmed: { variant: "confirmed", label: "Confirmado" },
      cancelled: { variant: "cancelled", label: "Cancelado" },
    };
    return variants[status];
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "assistant",
      timestamp: new Date(),
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedConversation.id
          ? { ...conv, messages: [...conv.messages, message], lastMessage: newMessage }
          : conv
      )
    );

    setSelectedConversation((prev) =>
      prev ? { ...prev, messages: [...prev.messages, message], lastMessage: newMessage } : null
    );

    setNewMessage("");
  };

  return (
    <div className="h-screen flex">
      {/* Conversations List */}
      <div className="w-96 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <h1 className="text-xl font-bold text-foreground mb-4">Conversaciones</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar conversaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`w-full p-3 rounded-lg text-left transition-all duration-200 mb-1 ${
                  selectedConversation?.id === conv.id
                    ? "bg-primary/10"
                    : "hover:bg-accent"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {conv.customerName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-foreground truncate">
                        {conv.customerName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(conv.timestamp)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Phone className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{conv.phoneNumber}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant={getStatusBadge(conv.status).variant as any}>
                        {getStatusBadge(conv.status).label}
                      </Badge>
                      {conv.unread > 0 && (
                        <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat View */}
      <div className="flex-1 flex flex-col bg-background">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {selectedConversation.customerName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-foreground">
                    {selectedConversation.customerName}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedConversation.phoneNumber}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getStatusBadge(selectedConversation.status).variant as any}>
                  {getStatusBadge(selectedConversation.status).label}
                </Badge>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4 max-w-3xl mx-auto">
                {selectedConversation.messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === "assistant" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex items-end gap-2 max-w-[70%]">
                      {message.sender === "customer" && (
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                            {selectedConversation.customerName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`px-4 py-3 ${
                          message.sender === "assistant"
                            ? "chat-bubble-assistant"
                            : "chat-bubble-customer"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "assistant"
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                      {message.sender === "assistant" && (
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="max-w-3xl mx-auto flex items-center gap-3">
                <Input
                  placeholder="Escribe un mensaje..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Selecciona una conversación
              </h3>
              <p className="text-muted-foreground">
                Elige una conversación de la lista para ver los mensajes
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatsTab;

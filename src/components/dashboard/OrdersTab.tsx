import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign,
  Search,
  Eye,
  MoreVertical
} from "lucide-react";

interface Order {
  id: string;
  phoneNumber: string;
  customerName: string;
  products: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  status: "lead" | "negotiation" | "confirmed" | "cancelled";
  createdAt: Date;
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    phoneNumber: "+51 999 888 777",
    customerName: "María García",
    products: [
      { name: "Camiseta Premium", quantity: 2, price: 29.99 },
      { name: "Zapatillas Running Pro", quantity: 1, price: 89.99 },
    ],
    totalAmount: 149.97,
    status: "confirmed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "ORD-002",
    phoneNumber: "+51 999 777 666",
    customerName: "Carlos López",
    products: [
      { name: "Reloj Smart Watch", quantity: 1, price: 199.99 },
    ],
    totalAmount: 199.99,
    status: "negotiation",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
  {
    id: "ORD-003",
    phoneNumber: "+51 999 666 555",
    customerName: "Ana Martínez",
    products: [
      { name: "Mochila Urban", quantity: 1, price: 49.99 },
    ],
    totalAmount: 49.99,
    status: "lead",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "ORD-004",
    phoneNumber: "+51 999 555 444",
    customerName: "Pedro Sánchez",
    products: [
      { name: "Camiseta Premium", quantity: 3, price: 29.99 },
    ],
    totalAmount: 89.97,
    status: "cancelled",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
];

const OrdersTab = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalToday: orders.filter(
      (o) => o.createdAt.toDateString() === new Date().toDateString()
    ).length,
    activeLeads: orders.filter((o) => o.status === "lead" || o.status === "negotiation").length,
    pendingOrders: orders.filter((o) => o.status === "negotiation").length,
    confirmedOrders: orders.filter((o) => o.status === "confirmed").length,
    revenue: orders
      .filter((o) => o.status === "confirmed")
      .reduce((sum, o) => sum + o.totalAmount, 0),
  };

  const getStatusBadge = (status: Order["status"]) => {
    const config: Record<typeof status, { variant: any; label: string }> = {
      lead: { variant: "lead", label: "Lead" },
      negotiation: { variant: "negotiation", label: "Negociando" },
      confirmed: { variant: "confirmed", label: "Confirmado" },
      cancelled: { variant: "cancelled", label: "Cancelado" },
    };
    return config[status];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Ventas y Pedidos</h1>
        <p className="text-muted-foreground">Gestiona tus pedidos y leads de ventas</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.totalToday}</p>
                <p className="text-sm text-muted-foreground">Ventas hoy</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.activeLeads}</p>
                <p className="text-sm text-muted-foreground">Leads activos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.pendingOrders}</p>
                <p className="text-sm text-muted-foreground">Pendientes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">${stats.revenue.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Ingresos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar pedidos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="lead">Lead</SelectItem>
            <SelectItem value="negotiation">Negociando</SelectItem>
            <SelectItem value="confirmed">Confirmado</SelectItem>
            <SelectItem value="cancelled">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Productos</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{order.customerName}</p>
                    <p className="text-sm text-muted-foreground">{order.phoneNumber}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {order.products.map((product, index) => (
                      <p key={index} className="text-sm">
                        {product.quantity}x {product.name}
                      </p>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="font-semibold">${order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadge(order.status).variant as any}>
                    {getStatusBadge(order.status).label}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(order.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default OrdersTab;

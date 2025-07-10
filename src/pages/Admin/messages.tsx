import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { BreadcrumbNav } from '@/components/Admin/breadcrumb-nav';
import { Search, Send, Star, Archive, Trash2, Reply } from 'lucide-react';

const messages = [
  {
    id: 1,
    sender: 'John Smith',
    email: 'john@example.com',
    subject: 'Question about order #1234',
    preview: 'Hi, I have a question about my recent order...',
    time: '2 hours ago',
    status: 'unread',
    priority: 'high',
  },
  {
    id: 2,
    sender: 'Sarah Johnson',
    email: 'sarah@example.com',
    subject: 'Feature request',
    preview: 'Would it be possible to add a dark mode...',
    time: '4 hours ago',
    status: 'read',
    priority: 'medium',
  },
  {
    id: 3,
    sender: 'Mike Wilson',
    email: 'mike@example.com',
    subject: 'Bug report',
    preview: 'I found an issue with the checkout process...',
    time: '1 day ago',
    status: 'replied',
    priority: 'high',
  },
  {
    id: 4,
    sender: 'Emily Davis',
    email: 'emily@example.com',
    subject: 'Thank you!',
    preview: 'Just wanted to say thanks for the great service...',
    time: '2 days ago',
    status: 'read',
    priority: 'low',
  },
  {
    id: 5,
    sender: 'Alex Brown',
    email: 'alex@example.com',
    subject: 'Refund request',
    preview: 'I would like to request a refund for...',
    time: '3 days ago',
    status: 'unread',
    priority: 'high',
  },
];

const statusColors = {
  unread: 'destructive',
  read: 'secondary',
  replied: 'default',
};

const priorityColors = {
  high: 'destructive',
  medium: 'secondary',
  low: 'outline',
};

export function Messages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(messages[0]);

  const filteredMessages = messages.filter(message =>
    message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <BreadcrumbNav items={[{ title: 'Messages' }]} />
        </div>
        <Button size="sm">
          <Send className="h-4 w-4 mr-2" />
          Compose
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-green-600 font-medium">+12 today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-red-600 font-medium">Needs attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-green-600 font-medium">Average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-green-600 font-medium">Customer rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Messages Interface */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Message List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 cursor-pointer hover:bg-muted/50 border-b ${
                    selectedMessage.id === message.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {message.sender
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{message.sender}</p>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                      <p className="text-sm font-medium truncate">{message.subject}</p>
                      <p className="text-xs text-muted-foreground truncate">{message.preview}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant={statusColors[message.status as keyof typeof statusColors] as any} className="text-xs">
                          {message.status}
                        </Badge>
                        <Badge variant={priorityColors[message.priority  as keyof typeof priorityColors] as any} className="text-xs">
                          {message.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Detail */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {selectedMessage.sender
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedMessage.sender}</h3>
                  <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Archive className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold">{selectedMessage.subject}</h2>
              <p className="text-sm text-muted-foreground">{selectedMessage.time}</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose max-w-none">
              <p>Hi there,</p>
              <p>
                I hope this message finds you well. I'm writing to inquire about my recent order
                and wanted to get some clarification on the delivery timeline.
              </p>
              <p>
                The order was placed on January 10th, and I received a confirmation email stating
                that it would be delivered within 3-5 business days. However, it's been over a week
                now and I haven't received any updates on the shipping status.
              </p>
              <p>
                Could you please provide me with an update on when I can expect to receive my order?
                If there are any delays, I'd appreciate being informed so I can plan accordingly.
              </p>
              <p>Thank you for your time and assistance.</p>
              <p>Best regards,<br />{selectedMessage.sender}</p>
            </div>

            {/* Reply Section */}
            <div className="border-t pt-4">
              <div className="space-y-3">
                <Textarea placeholder="Type your reply..." className="min-h-[100px]" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Template
                    </Button>
                    <Button variant="outline" size="sm">
                      Attach
                    </Button>
                  </div>
                  <Button size="sm">
                    <Reply className="h-4 w-4 mr-2" />
                    Send Reply
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
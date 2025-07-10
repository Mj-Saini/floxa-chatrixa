import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  Users,
  Search,
  Crown,
  Shield,
  Camera,
  Check,
  X,
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  isSelected: boolean;
  role?: "admin" | "member";
}

export default function CreateGroup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Group Info, 2: Add Members, 3: Set Admins
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<Contact[]>([]);
  const [contacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "",
      isOnline: true,
      isSelected: false,
    },
    {
      id: "2",
      name: "Alex Rodriguez",
      avatar: "",
      isOnline: true,
      isSelected: false,
    },
    {
      id: "3",
      name: "Lisa Chen",
      avatar: "",
      isOnline: false,
      isSelected: false,
    },
    {
      id: "4",
      name: "Mike Wilson",
      avatar: "",
      isOnline: true,
      isSelected: false,
    },
    {
      id: "5",
      name: "Emma Davis",
      avatar: "",
      isOnline: false,
      isSelected: false,
    },
    {
      id: "6",
      name: "John Smith",
      avatar: "",
      isOnline: true,
      isSelected: false,
    },
    {
      id: "7",
      name: "David Brown",
      avatar: "",
      isOnline: false,
      isSelected: false,
    },
    {
      id: "8",
      name: "Sophie Miller",
      avatar: "",
      isOnline: true,
      isSelected: false,
    },
  ]);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleMemberSelection = (contactId: string) => {
    const contact = contacts.find((c) => c.id === contactId);
    if (!contact) return;

    if (selectedMembers.find((m) => m.id === contactId)) {
      setSelectedMembers((prev) =>
        prev.filter((member) => member.id !== contactId),
      );
    } else {
      setSelectedMembers((prev) => [...prev, { ...contact, role: "member" }]);
    }
  };

  const toggleAdminRole = (memberId: string) => {
    setSelectedMembers((prev) =>
      prev.map((member) =>
        member.id === memberId
          ? {
              ...member,
              role: member.role === "admin" ? "member" : "admin",
            }
          : member,
      ),
    );
  };

  const handleCreateGroup = () => {
    const groupData = {
      id: Date.now().toString(),
      name: groupName,
      description: groupDescription,
      members: selectedMembers,
      createdBy: "current-user",
      createdAt: new Date(),
    };

    console.log("Creating group:", groupData);
    // Store in localStorage temporarily to show in groups list
    const existingGroups = JSON.parse(
      localStorage.getItem("createdGroups") || "[]",
    );
    localStorage.setItem(
      "createdGroups",
      JSON.stringify([groupData, ...existingGroups]),
    );

    // Navigate back to groups
    navigate("/groups");
  };

  const canProceed = () => {
    if (step === 1) return groupName.trim().length > 0;
    if (step === 2) return selectedMembers.length > 0;
    if (step === 3) return true;
    return false;
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-background border-b border-border/50">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/groups")}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h3 className="font-medium">
              {step === 1
                ? "New Group"
                : step === 2
                  ? "Add Members"
                  : "Set Admins"}
            </h3>
            <p className="text-sm text-muted-foreground">Step {step} of 3</p>
          </div>
        </div>

        {step < 3 ? (
          <Button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            size="sm"
          >
            Next
          </Button>
        ) : (
          <Button onClick={handleCreateGroup} size="sm">
            Create
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Step 1: Group Info */}
        {step === 1 && (
          <div className="p-6 max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-6 w-6" />
                  <span>Group Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Group Photo */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-brand-pink rounded-full flex items-center justify-center">
                      <Users className="h-12 w-12 text-white" />
                    </div>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Add group photo
                  </p>
                </div>

                {/* Group Name */}
                <div className="space-y-2">
                  <Label htmlFor="groupName">Group Name *</Label>
                  <Input
                    id="groupName"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter group name"
                    maxLength={50}
                  />
                  <p className="text-xs text-muted-foreground">
                    {groupName.length}/50 characters
                  </p>
                </div>

                {/* Group Description */}
                <div className="space-y-2">
                  <Label htmlFor="groupDescription">
                    Group Description (Optional)
                  </Label>
                  <Input
                    id="groupDescription"
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                    placeholder="What's this group about?"
                    maxLength={100}
                  />
                  <p className="text-xs text-muted-foreground">
                    {groupDescription.length}/100 characters
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Add Members */}
        {step === 2 && (
          <div className="p-4">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Selected Members */}
            {selectedMembers.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">
                  Selected ({selectedMembers.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMembers.map((member) => (
                    <Badge
                      key={member.id}
                      variant="secondary"
                      className="flex items-center space-x-2 px-3 py-1"
                    >
                      <span>{member.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => toggleMemberSelection(member.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Contacts List */}
            <div className="space-y-2">
              {filteredContacts.map((contact) => {
                const isSelected = selectedMembers.some(
                  (m) => m.id === contact.id,
                );
                return (
                  <div
                    key={contact.id}
                    className="flex items-center space-x-3 p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors"
                    onClick={() => toggleMemberSelection(contact.id)}
                  >
                    <Checkbox checked={isSelected} readOnly />
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                          {contact.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {contact.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{contact.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {contact.isOnline ? "online" : "offline"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Set Admins */}
        {step === 3 && (
          <div className="p-4">
            <div className="mb-4">
              <h4 className="text-lg font-medium mb-2">Set Group Admins</h4>
              <p className="text-sm text-muted-foreground">
                Admins can add/remove members and change group settings
              </p>
            </div>

            <div className="space-y-2">
              {selectedMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 bg-card rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {member.role === "admin" ? "Admin" : "Member"}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant={member.role === "admin" ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleAdminRole(member.id)}
                    className="flex items-center space-x-2"
                  >
                    {member.role === "admin" ? (
                      <>
                        <Crown className="h-4 w-4" />
                        <span>Admin</span>
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4" />
                        <span>Make Admin</span>
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-muted/20 rounded-lg">
              <h5 className="font-medium mb-2">Group Summary</h5>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>
                  <strong>Name:</strong> {groupName}
                </p>
                {groupDescription && (
                  <p>
                    <strong>Description:</strong> {groupDescription}
                  </p>
                )}
                <p>
                  <strong>Members:</strong> {selectedMembers.length + 1} (
                  {selectedMembers.filter((m) => m.role === "admin").length + 1}{" "}
                  admins)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Camera,
  MapPin,
  Calendar,
  Star,
  MessageCircle,
  Settings,
  Edit,
  Save,
  X,
  Phone,
  Mail,
  Globe,
  Lock,
  Bell,
  Eye,
  Shield,
} from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "Alex_2024",
    fullName: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 234 567 8900",
    bio: "Love connecting with people from around the world! 🌍",
    country: "India",
    gender: "Male",
    age: "25",
    interests: ["Technology", "Travel", "Music", "Movies"],
    languages: ["English", "Hindi", "Spanish"],
    profileVisibility: "public",
    showOnlineStatus: true,
    allowMessages: true,
    allowCalls: true,
    notifications: true,
  });

  const [editData, setEditData] = useState(profileData);

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const addInterest = (interest: string) => {
    if (interest && !editData.interests.includes(interest)) {
      setEditData({
        ...editData,
        interests: [...editData.interests, interest],
      });
    }
  };

  const removeInterest = (interest: string) => {
    setEditData({
      ...editData,
      interests: editData.interests.filter((i) => i !== interest),
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-brand-pink flex items-center justify-center mx-auto">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  {profileData.username}
                </h2>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profileData.country}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined Jan 2024</span>
                  </div>
                </div>
                <div className="flex justify-center space-x-2 mt-4">
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    <Star className="h-3 w-3 mr-1" />
                    4.8 Rating
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Online
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Activity Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Chats</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Friends</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Points Earned</span>
                  <span className="font-semibold">1,250</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Referrals</span>
                  <span className="font-semibold">5</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Settings */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-6 w-6" />
                    <span>Profile Settings</span>
                  </CardTitle>
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        size="sm"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Basic Information</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={
                          isEditing ? editData.username : profileData.username
                        }
                        onChange={(e) =>
                          setEditData({ ...editData, username: e.target.value })
                        }
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={
                          isEditing ? editData.fullName : profileData.fullName
                        }
                        onChange={(e) =>
                          setEditData({ ...editData, fullName: e.target.value })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                      value={isEditing ? editData.bio : profileData.bio}
                      onChange={(e) =>
                        setEditData({ ...editData, bio: e.target.value })
                      }
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center space-x-2">
                    <Mail className="h-5 w-5" />
                    <span>Contact Information</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={isEditing ? editData.email : profileData.email}
                        onChange={(e) =>
                          setEditData({ ...editData, email: e.target.value })
                        }
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={isEditing ? editData.phone : profileData.phone}
                        onChange={(e) =>
                          setEditData({ ...editData, phone: e.target.value })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span>Personal Details</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={
                          isEditing ? editData.country : profileData.country
                        }
                        onValueChange={(value) =>
                          setEditData({ ...editData, country: value })
                        }
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="India">India</SelectItem>
                          <SelectItem value="USA">USA</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="UK">UK</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        value={isEditing ? editData.gender : profileData.gender}
                        onValueChange={(value) =>
                          setEditData({ ...editData, gender: value })
                        }
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                          <SelectItem value="Prefer not to say">
                            Prefer not to say
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={isEditing ? editData.age : profileData.age}
                        onChange={(e) =>
                          setEditData({ ...editData, age: e.target.value })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                {/* Interests */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {(isEditing
                      ? editData.interests
                      : profileData.interests
                    ).map((interest) => (
                      <Badge
                        key={interest}
                        variant="secondary"
                        className="flex items-center space-x-1"
                      >
                        <span>{interest}</span>
                        {isEditing && (
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeInterest(interest)}
                          />
                        )}
                      </Badge>
                    ))}
                    {isEditing && (
                      <Input
                        placeholder="Add interest..."
                        className="w-32"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            addInterest(e.currentTarget.value);
                            e.currentTarget.value = "";
                          }
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Privacy & Settings</span>
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Online Status</Label>
                        <p className="text-sm text-muted-foreground">
                          Let others see when you're online
                        </p>
                      </div>
                      <Switch
                        checked={
                          isEditing
                            ? editData.showOnlineStatus
                            : profileData.showOnlineStatus
                        }
                        onCheckedChange={(checked) =>
                          setEditData({
                            ...editData,
                            showOnlineStatus: checked,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow Messages</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive messages from other users
                        </p>
                      </div>
                      <Switch
                        checked={
                          isEditing
                            ? editData.allowMessages
                            : profileData.allowMessages
                        }
                        onCheckedChange={(checked) =>
                          setEditData({ ...editData, allowMessages: checked })
                        }
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow Calls</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive video and voice calls
                        </p>
                      </div>
                      <Switch
                        checked={
                          isEditing
                            ? editData.allowCalls
                            : profileData.allowCalls
                        }
                        onCheckedChange={(checked) =>
                          setEditData({ ...editData, allowCalls: checked })
                        }
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive push notifications
                        </p>
                      </div>
                      <Switch
                        checked={
                          isEditing
                            ? editData.notifications
                            : profileData.notifications
                        }
                        onCheckedChange={(checked) =>
                          setEditData({ ...editData, notifications: checked })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                {/* Account Actions */}
                <div className="pt-6 border-t">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" className="flex-1">
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                    <Button variant="destructive" className="flex-1">
                      <X className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

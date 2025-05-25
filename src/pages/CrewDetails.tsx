
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ExpandableHeader from "../components/ExpandableHeader";
import { Calendar, Clock, MapPin, Star, Users, Award, Globe, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CrewMember {
  id: string;
  name: string;
  role: string;
  age: number;
  bio: string;
  avatar: string;
  isVerified: boolean;
  canClaim: boolean;
  experience: string;
  location: string;
  email?: string;
  phone?: string;
  website?: string;
  specialties: string[];
  awards: string[];
}

interface Show {
  id: string;
  title: string;
  image: string;
  dates: string;
  venue: string;
  status: string;
  role: string;
}

const CrewDetails = () => {
  const { id } = useParams();
  const [selectedFilter, setSelectedFilter] = useState("همه");

  // Mock crew data
  const crewMember: CrewMember = {
    id: id || "1",
    name: "احمد محمدی",
    role: "کارگردان",
    age: 42,
    bio: "کارگردان با بیش از 15 سال تجربه در تئاتر ایران. فارغ‌التحصیل هنرهای نمایشی از دانشگاه تهران و دارای چندین جایزه ملی و بین‌المللی.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    isVerified: true,
    canClaim: false,
    experience: "15+ سال",
    location: "تهران، ایران",
    email: "ahmad.mohammadi@example.com",
    website: "www.ahmadmohammadi.ir",
    specialties: ["تراژدی", "درام اجتماعی", "تئاتر تجربی"],
    awards: ["جایزه بهترین کارگردانی جشنواره فجر 1401", "نشان هنری درجه یک", "جایزه انتقادگران تئاتر تهران"]
  };

  const shows: Show[] = [
    {
      id: "1",
      title: "هملت",
      image: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=300&h=200&fit=crop",
      dates: "15 دی الی 25 دی 1403",
      venue: "تالار شهر",
      status: "در حال اجرا",
      role: "کارگردان"
    },
    {
      id: "2", 
      title: "مرگ فروشنده",
      image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=300&h=200&fit=crop",
      dates: "1 بهمن الی 10 بهمن 1403",
      venue: "تئاتر مستقل",
      status: "آینده",
      role: "کارگردان"
    }
  ];

  const filterOptions = ["همه", "در حال اجرا", "آینده", "گذشته"];

  const filteredShows = selectedFilter === "همه" 
    ? shows 
    : shows.filter(show => show.status === selectedFilter);

  return (
    <div className="min-h-screen bg-background">
      <ExpandableHeader />
      
      {/* Hero Section */}
      <div className="relative h-80 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white">
              <AvatarImage src={crewMember.avatar} alt={crewMember.name} />
              <AvatarFallback>{crewMember.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <h1 className="text-4xl font-bold mb-2">{crewMember.name}</h1>
            <p className="text-xl text-gold-200">{crewMember.role}</p>
            {crewMember.isVerified && (
              <Badge variant="secondary" className="mt-2">
                <Award className="w-4 h-4 mr-1" />
                تایید شده
              </Badge>
            )}
            {crewMember.canClaim && (
              <Button variant="outline" className="mt-4 text-white border-white hover:bg-white hover:text-black">
                ادعای مالکیت این صفحه
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Personal Information */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-4">اطلاعات شخصی</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-foreground/60">سن</p>
                  <p className="font-semibold">{crewMember.age} سال</p>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm text-foreground/60">تجربه</p>
                  <p className="font-semibold">{crewMember.experience}</p>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm text-foreground/60">محل سکونت</p>
                  <p className="font-semibold flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {crewMember.location}
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm text-foreground/60 mb-2">تخصص‌ها</p>
                  <div className="flex flex-wrap gap-1">
                    {crewMember.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm text-foreground/60 mb-2">راه‌های ارتباط</p>
                  <div className="space-y-2">
                    {crewMember.email && (
                      <p className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4" />
                        {crewMember.email}
                      </p>
                    )}
                    {crewMember.website && (
                      <p className="flex items-center gap-2 text-sm">
                        <Globe className="w-4 h-4" />
                        {crewMember.website}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="shows" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="shows">نمایش‌ها</TabsTrigger>
                <TabsTrigger value="bio">بیوگرافی</TabsTrigger>
                <TabsTrigger value="awards">افتخارات</TabsTrigger>
              </TabsList>
              
              <TabsContent value="shows" className="mt-6">
                {/* Filter Section */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.map((filter) => (
                      <Button
                        key={filter}
                        variant={selectedFilter === filter ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedFilter(filter)}
                        className={selectedFilter === filter ? "bg-gold-500 hover:bg-gold-600" : ""}
                      >
                        {filter}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Shows Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredShows.map((show) => (
                    <Link
                      key={show.id}
                      to={`/show/${show.id}`}
                      className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={show.image}
                        alt={show.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">{show.title}</h3>
                        <p className="text-sm text-foreground/60 mb-1">نقش: {show.role}</p>
                        <div className="flex items-center gap-2 text-sm text-foreground/60 mb-2">
                          <Calendar className="w-4 h-4" />
                          {show.dates}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-foreground/60">
                          <MapPin className="w-4 h-4" />
                          {show.venue}
                        </div>
                        <Badge 
                          variant={show.status === "در حال اجرا" ? "default" : "secondary"}
                          className="mt-2"
                        >
                          {show.status}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="bio" className="mt-6">
                <div className="bg-card rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4">بیوگرافی</h3>
                  <p className="text-foreground/80 leading-relaxed">{crewMember.bio}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="awards" className="mt-6">
                <div className="bg-card rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4">افتخارات و جوایز</h3>
                  <div className="space-y-3">
                    {crewMember.awards.map((award, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-background rounded-lg">
                        <Award className="w-5 h-5 text-gold-500" />
                        <span>{award}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrewDetails;
